import type {
  ClientDetail,
  FeasibilityReport,
  ProfileResult,
  RecordInfo,
  RunResult,
} from './types'

async function req<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { 'content-type': 'application/json', ...(init?.headers ?? {}) },
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error((data as { error?: string }).error || `Fout ${res.status}`)
  }
  return data as T
}

export interface ClientsResponse {
  clients: string[]
  hasApiKey: boolean
  model: string
}

export interface SettingsResponse {
  hasApiKey: boolean
  source: 'settings' | 'env' | 'none'
  model?: string
}

export const api = {
  clients: () => req<ClientsResponse>('/api/clients'),
  settings: () => req<SettingsResponse>('/api/settings'),
  setApiKey: (apiKey: string) =>
    req<SettingsResponse>('/api/settings/api-key', {
      method: 'POST',
      body: JSON.stringify({ apiKey }),
    }),
  clearApiKey: () =>
    req<SettingsResponse>('/api/settings/api-key', { method: 'DELETE' }),
  client: (name: string) =>
    req<ClientDetail>(`/api/clients/${encodeURIComponent(name)}`),
  profile: (name: string) =>
    req<ProfileResult>(`/api/clients/${encodeURIComponent(name)}/profile`),
  feasibility: (name: string, context = '') =>
    req<FeasibilityReport>(
      `/api/clients/${encodeURIComponent(name)}/feasibility`,
      { method: 'POST', body: JSON.stringify({ context }) },
    ),
  record: (name: string, index: number) =>
    req<RecordInfo>(
      `/api/clients/${encodeURIComponent(name)}/record?index=${index}`,
    ),
  run: (name: string, recordIndex: number, realN8n: boolean) =>
    req<RunResult>(`/api/clients/${encodeURIComponent(name)}/run`, {
      method: 'POST',
      body: JSON.stringify({ recordIndex, realN8n }),
    }),
}
