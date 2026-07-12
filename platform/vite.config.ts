import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// De frontend draait op :5173 en proxyt /api naar de Express-backend op :8787.
// Zo blijft alles op localhost met één `npm run dev`.
const API_PORT = process.env.PORT ?? '8787'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: `http://localhost:${API_PORT}`,
        changeOrigin: true,
      },
    },
  },
})
