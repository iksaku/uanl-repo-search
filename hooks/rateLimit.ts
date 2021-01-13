import { inject, reactive } from '@nuxtjs/composition-api'

type RateLimit = {
  abused: boolean
  limited: boolean
  retryAfter: number | false
}

export const rateLimit = reactive<RateLimit>({
  abused: false,
  limited: false,
  retryAfter: 0,
})

export const useRateLimit = () =>
  inject('RateLimit', {
    rateLimit,
  })
