import { client, RepositorySearch, RateLimit } from '@/api'
import { reactive, inject } from '@vue/composition-api'

const qs = require('qs')

const results = reactive<RepositorySearch>({
    total_count: 0,
    incomplete_results: true,
    items: []
})

const rateLimit = reactive<RateLimit>({
    limit: 10,
    remaining: 10,
    reset: 0
})

function search(topics: string[]) {
    if (rateLimit.remaining < 1) {
        return
    }

    client.get<RepositorySearch>('search/repositories', {
        params: {
            q: topics
                .map(t => `topic:${t}`)
                .join('+'),
            sort: 'updated',
            order: 'desc'
        },

        paramsSerializer: function(params) {
            return qs.stringify(params, {
                encode: false
            })
        }
    })
        .then(response => {
            rateLimit.limit = response.headers['x-ratelimit-limit'] ?? 10
            rateLimit.remaining = response.headers['x-ratelimit-remaining'] ?? 10
            rateLimit.reset = response.headers['x-ratelimit-reset'] ?? 0

            results.total_count = response.data.total_count ?? 0
            results.incomplete_results = response.data.incomplete_results ?? false
            results.items = response.data.items ?? []
        })
}

export const useSearch = () => inject('SearchStore', {
    results,
    rateLimit,
    search
})
