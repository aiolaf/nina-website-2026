import type {
  ClientDetail,
  FeasibilityReport,
  HistoryEntry,
  OfferCompareResult,
  OfferFillResult,
  ProfileResult,
  RecordInfo,
  RunResult,
  SheetGrid,
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
  record: (name: string, demoId: string, index: number) =>
    req<RecordInfo>(
      `/api/clients/${encodeURIComponent(name)}/record?demo=${encodeURIComponent(
        demoId,
      )}&index=${index}`,
    ),
  run: (name: string, demoId: string, recordIndex: number, realN8n: boolean) =>
    req<RunResult>(`/api/clients/${encodeURIComponent(name)}/run`, {
      method: 'POST',
      body: JSON.stringify({ demoId, recordIndex, realN8n }),
    }),
  history: (klant: string) =>
    req<{ entries: HistoryEntry[] }>(
      `/api/history?klant=${encodeURIComponent(klant)}`,
    ),
  deleteRun: (id: string) =>
    req<{ deleted: boolean }>(`/api/history/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    }),
  clearHistory: (klant: string) =>
    req<{ removed: number }>(
      `/api/history?klant=${encodeURIComponent(klant)}`,
      { method: 'DELETE' },
    ),
  excelView: (klant: string, demoId: string, mode: 'template' | 'filled') =>
    req<SheetGrid>(
      `/api/clients/${encodeURIComponent(klant)}/excel-view?demo=${encodeURIComponent(
        demoId,
      )}&mode=${mode}`,
    ),
  excelUrl: (klant: string, demoId: string) =>
    `/api/clients/${encodeURIComponent(klant)}/excel?demo=${encodeURIComponent(demoId)}`,
  sourceFileUrl: (klant: string, pathRel: string) =>
    `/api/clients/${encodeURIComponent(klant)}/source-file?path=${encodeURIComponent(pathRel)}`,
  offersFill: (
    klant: string,
    demoId: string,
    files: { name: string; base64: string }[],
  ) =>
    req<OfferFillResult>(
      `/api/clients/${encodeURIComponent(klant)}/offers-fill`,
      { method: 'POST', body: JSON.stringify({ demoId, files }) },
    ),
  offersLoad: (klant: string, demoId: string) =>
    req<OfferFillResult>(
      `/api/clients/${encodeURIComponent(klant)}/offers-load`,
      { method: 'POST', body: JSON.stringify({ demoId }) },
    ),
  offersNormalize: (
    klant: string,
    demoId: string,
    files?: { name: string; base64: string }[],
  ) =>
    req<OfferCompareResult>(
      `/api/clients/${encodeURIComponent(klant)}/offers-normalize`,
      { method: 'POST', body: JSON.stringify({ demoId, files }) },
    ),
}
