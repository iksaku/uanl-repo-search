import { Octokit, RestEndpointMethodTypes } from '@octokit/rest'
import { throttling } from '@octokit/plugin-throttling'
import { GetResponseDataTypeFromEndpointMethod } from '@octokit/types'

import { reactive } from 'vue'

const UserOctokit = Octokit.plugin(throttling)

export const per_page = 100

export const rateLimit = reactive({
  abused: false,
  limited: false,
})

export const octokit = new UserOctokit({
  throttle: {
    onRateLimit: (_retryAfter: number, options: any) => {
      rateLimit.limited = true

      return options.request.retryCount <= 3
    },

    onAbuseLimit: (_retryAfter: number, options: any) => {
      rateLimit.abused = true

      return options.request.retryCount <= 3
    },
  },
})

export type Repository = GetResponseDataTypeFromEndpointMethod<
  typeof octokit.search.repos
>['items'][number]

export type RepositorySearchParameters = RestEndpointMethodTypes['search']['repos']['parameters']
