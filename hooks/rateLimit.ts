import { reactive } from '@nuxtjs/composition-api'

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
