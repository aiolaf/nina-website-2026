import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// De frontend draait op :5173 en proxyt /api naar de Express-backend op :8787.
// Zo blijft alles op localhost met één `npm run dev`.
const API_PORT = process.env.PORT ?? '8787'

const proxy = {
  '/api': {
    target: `http://localhost:${API_PORT}`,
    changeOrigin: true,
  },
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Zowel `vite` (dev) als `vite preview` proxyen /api naar de backend, zodat de
  // frontend niet per ongeluk zonder API draait.
  server: { port: 5173, proxy },
  preview: { port: 4173, proxy },
})
