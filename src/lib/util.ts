export function blank(value: unknown): boolean {
  if (value === null) {
    return true
  }

  if (typeof value === 'string') {
    return value.trim() === ''
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return false
  }

  if (Array.isArray(value)) {
    return value.length === 0
  }

  if (typeof value === 'object') {
    return Object.entries(value).length === 0
  }

  return !value
}

export function filled(value: unknown): boolean {
  return !blank(value)
}

export function recordFilter(
  o: Record<string, unknown>,
  predicate: (value: unknown, index: string) => boolean
): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(o).filter((entry) => {
      const [key, value] = entry

      return predicate(value, key)
    })
  )
}

export const api = {
  async get<TData extends object, TError = unknown>(
    url: string,
    query?: Record<string, unknown>,
    headers?: HeadersInit
  ): Promise<TData> {
    const compiledUrl = new URL(url)

    if (query) {
      const filtered = recordFilter(query, filled)
      compiledUrl.search = new URLSearchParams(
        Object.fromEntries(Object.entries(filtered).map(([key, value]) => [key, String(value)]))
      ).toString()
    }

    return await api_middleware<TData, TError>(compiledUrl.toString(), {
      headers: {
        Accept: 'application/json',
        ...headers,
      },
    })
  },

  async post<TData extends object, TError = unknown>(
    url: string,
    body: Record<string, unknown>,
    headers?: HeadersInit
  ): Promise<TData> {
    return await api_middleware<TData, TError>(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(recordFilter(body, filled)),
    })
  },
}

async function api_middleware<TData extends object, TError = unknown>(
  url: string,
  init: RequestInit
): Promise<TData> {
  const response = await fetch(url, init)

  const jsonResponse = await response.json()

  if (!response.ok) {
    throw jsonResponse as TError
  }

  return jsonResponse as TData
}
