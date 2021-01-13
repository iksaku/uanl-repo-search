import { GetResponseDataTypeFromEndpointMethod } from '@octokit/types'
import { Octokit } from '@octokit/rest'
import { throttling } from '@octokit/plugin-throttling'

import { rateLimit } from '~/hooks/rateLimit'

const UserOctokit = Octokit.plugin(throttling)

export const per_page = 100

export const octokit = new UserOctokit({
  throttle: {
    onRateLimit: (retryAfter: number, options: any) => {
      rateLimit.limited = true

      if (options.request.retryCount > 3) {
        rateLimit.retryAfter = false
        return false
      }

      rateLimit.retryAfter = retryAfter
      return true
    },

    onAbuseLimit: (retryAfter: number, options: any) => {
      rateLimit.abused = true

      if (options.request.retryCount > 3) {
        rateLimit.retryAfter = false
        return false
      }

      rateLimit.retryAfter = retryAfter
      return true
    },
  },
})

export type Repository = GetResponseDataTypeFromEndpointMethod<
  typeof octokit.search.repos
>['items'][number]
