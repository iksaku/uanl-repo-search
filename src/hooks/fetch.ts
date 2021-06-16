import { reactive, ref, Ref, shallowRef } from 'vue'

type useFetchFunction = ((key: string) => Promise<any>) | null

type useFetchOptions = {
  immediate?: boolean
}

type useFetchReturn<T> = {
  loading: Ref<boolean>
  response: Ref<Response | null>
  error: Ref
  data: Ref<T | null>
  refresh: () => Promise<void>
}

const fetchCache = reactive(new Map<string, useFetchReturn<any>>())

export function useFetch<T>(
  key: string,
  fetch: useFetchFunction = null,
  options: useFetchOptions = {}
): useFetchReturn<T> {
  if (fetchCache.has(key)) {
    return fetchCache.get(key) as useFetchReturn<T>
  }

  const loading = ref<boolean>(false)
  const response = ref<Response | null>(null)
  const error = ref<any>(null)
  const data = shallowRef<T | null>(null)

  /* If no fetch function is provided, try using browser's native */
  if (!fetch) {
    fetch = (key: string) => window?.fetch(key)
  }

  const refresh = async (): Promise<void> => {
    loading.value = true
    error.value = null
    data.value = null

    // @ts-ignore
    const isSSR: boolean = import.meta.env.SSR

    if (!fetch || isSSR) {
      loading.value = false
      return Promise.resolve()
    }

    try {
      let fetchResponse: Response = await fetch(key)

      response.value = fetchResponse

      if (!fetchResponse.ok) {
        error.value = fetchResponse.statusText
      }

      data.value = await fetchResponse.json()
    } catch (fetchError) {
      error.value = fetchError.message || fetchError.name
    } finally {
      loading.value = false
    }
  }

  const composed = {
    loading,
    response,
    error,
    data,
    refresh
  }

  fetchCache.set(key, composed)

  if (options.immediate ?? true) {
    setTimeout(refresh, 0)
  }

  return composed
}
