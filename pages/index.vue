<template>
  <div class="pb-16">
    <!-- Header -->
    <div class="bg-blue-900 py-16 sm:pb-24">
      <div class="text-center px-4 sm:px-6 lg:px-8 pb-10 space-y-4">
        <!-- TODO: Logo -->
        <h1 class="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold">
          Repositorios UANL
        </h1>
        <div class="max-w-xl text-blue-200 space-y-4 mx-auto">
          <p class="text-lg sm:text-xl">
            Descubre proyectos creados por alumnos y docentes de la
            <a
              href="https://uanl.mx"
              class="hocus:text-blue-500 border-b border-blue-300 hocus:border-blue-600"
              target="_blank"
              rel="noopener"
            >
              Universidad Autónoma de Nuevo León
            </a>
          </p>
          <div>
            <a
              href="https://github.com/iksaku/uanl-repo-search"
              class="hocus:text-blue-500 border-b border-blue-300 hocus:border-blue-600"
              target="_blank"
              rel="noopener"
            >
              Contribuye en Github
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="max-w-screen-xl px-4 sm:px-6 lg:px-8 mx-auto -mt-16">
      <div class="max-w-4xl mx-auto">
        <dl
          class="sm:grid sm:grid-cols-3 bg-white rounded-lg shadow-lg sm:divide-x divide-y sm:divide-y-0"
        >
          <stats
            title="repositorios"
            :value="stats.repositories"
            :class="{
              'animate-pulse': $fetchState.pending || rateLimit.retry.stats,
            }"
          />
          <stats
            title="lenguajes"
            :value="stats.languages"
            :class="{
              'animate-pulse': $fetchState.pending || rateLimit.retry.stats,
            }"
          />
          <stats
            title="autores"
            :value="stats.authors"
            :class="{
              'animate-pulse': $fetchState.pending || rateLimit.retry.stats,
            }"
          />
        </dl>
      </div>
    </div>

    <!-- Repositories -->
    <div class="pt-8 sm:pt-16 px-4 sm:px-6 lg:px-8 space-y-8">
      <div
        class="flex flex-col sm:flex-row items-center justify-center sm:justify-between text-blue-900 space-y-4 sm:space-y-0"
      >
        <!-- Rate Limit -->
        <div
          class="flex flex-col sm:flex-row items-center sm:items-baseline sm:space-x-1 space-y-1 sm:space-y-0"
        >
          <span>{{ rateLimit.remaining }} requests available</span>
          <span
            v-if="rateLimit.reset > 0"
            class="text-blueGray-700 text-sm italic"
          >
            (Resets in {{ rateLimit.countdown }} seconds...)
          </span>
          <span
            v-else-if="rateLimit.retry.stats || rateLimit.retry.search"
            class="text-blueGray-700 text-sm italic"
          >
            (Retrying...)
          </span>
        </div>

        <!-- Sort + Order -->
        <div class="flex items-center space-x-2">
          <label class="flex items-baseline space-x-1">
            <span>Sort by</span>

            <select
              v-model="repos.sortBy"
              class="border-none bg-transparent rounded-lg"
            >
              <option value="stars">Stars</option>
              <option value="forks">Forks</option>
              <option value="updated">Update Time</option>
              <option value="help-wanted-issues">Help Wanted Issues</option>
            </select>
          </label>

          <button @click="repos.orderAscending = !repos.orderAscending">
            <sort-ascending-icon v-if="repos.orderAscending" class="w-6 h-6" />
            <sort-descending-icon v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
      <div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        <div v-if="repos.list.length > 0" class="contents">
          <repo-card
            v-for="repo in repos.list"
            :key="repo.id"
            :repository="repo"
          />
        </div>
        <div v-else class="contents">
          <repo-placeholder v-for="i in 9" :key="i" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    defineComponent,
    useContext,
    useFetch,
    reactive,
    watch,
  } from '@nuxtjs/composition-api'
  import dayjs from 'dayjs'

  import RepoCard from '@/components/Repo/RepoCard.vue'
  import RepoPlaceholder from '@/components/Repo/RepoPlaceholder'
  import SortAscendingIcon from '@/components/icons/SortAscendingIcon'
  import SortDescendingIcon from '@/components/icons/SortDescendingIcon'
  import Stats from '~/components/Stats.vue'

  export default defineComponent({
    components: {
      SortDescendingIcon,
      SortAscendingIcon,
      RepoPlaceholder,
      RepoCard,
      Stats,
    },

    head: {
      link: [
        { rel: 'dns-prefetch', href: 'https://api.github.com' },
        { rel: 'preconnect', href: 'https://api.github.com' },
      ],
    },

    setup() {
      const { $octokit } = useContext()

      // Rate Limit
      const rateLimit = reactive({
        limit: 10,
        remaining: 10,
        reset: 0,
        countdown: 0,
        retry: {
          stats: false,
          search: false,
        },
      })

      function rateLimitTimer() {
        if (rateLimit.limit === rateLimit.remaining) {
          rateLimit.reset = 0
          return
        }

        const timeDiff = Math.ceil(
          dayjs.unix(rateLimit.reset).diff(dayjs(), 'second', true)
        )

        rateLimit.countdown = Math.max(0, timeDiff)

        if (timeDiff > 0) {
          setTimeout(rateLimitTimer, 500)
          return
        }

        rateLimit.remaining = rateLimit.limit
        rateLimit.reset = 0

        if (rateLimit.retry.stats) {
          setTimeout(fetch, 1000)
        }

        if (rateLimit.retry.search) {
          setTimeout(search, 1000)
        }
      }

      function updateRateLimitFromRequest(response) {
        rateLimit.limit = response.headers['x-ratelimit-limit']

        rateLimit.remaining = Math.min(
          rateLimit.remaining,
          response.headers['x-ratelimit-remaining']
        )

        rateLimit.reset = Math.max(
          rateLimit.reset,
          response.headers['x-ratelimit-reset']
        )
      }

      watch(() => rateLimit.reset, rateLimitTimer)

      // Stats
      const stats = reactive({
        authors: 0,
        languages: 0,
        repositories: 0,
      })

      const { fetch } = useFetch(
        () =>
          new Promise((resolve, reject) => {
            $octokit.search
              .repos({ q: 'topic:uanl' })
              .then((response) => {
                updateRateLimitFromRequest(response)

                const authors = new Set()
                const languages = new Set()

                response.data.items.forEach((repo) => {
                  authors.add(repo.owner.login)

                  if (repo.language) {
                    languages.add(repo.language)
                  }
                })

                stats.authors = authors.size
                stats.languages = languages.size
                stats.repositories = response.data.total_count

                if (rateLimit.retry.stats) {
                  rateLimit.retry.stats = false
                }

                resolve()
              })
              .catch((error) => {
                updateRateLimitFromRequest(error)
                if (error.status === 403) {
                  rateLimit.retry.stats = true

                  resolve()
                  return
                }

                reject(error)
              })
          })
      )

      fetch()

      // Repository Search
      const repos = reactive({
        isLoading: false,
        topics: ['uanl'],
        sortBy: 'stars',
        orderAscending: false,
        list: [],
      })

      function search() {
        if (repos.isLoading) return

        const payload = {
          q: repos.topics.map((topic) => `topic:${topic}`).join('+'),
        }

        if (repos.sortBy) {
          if (
            !['stars', 'forks', 'updated', 'help-wanted-issues'].includes(
              repos.sortBy
            )
          )
            return

          payload.sort = repos.sortBy
          payload.order = repos.orderAscending ? 'asc' : 'desc'
        }

        repos.isLoading = true

        $octokit.search
          .repos(payload)
          .then((response) => {
            updateRateLimitFromRequest(response)
            repos.list = response.data.items

            if (rateLimit.retry.search) {
              rateLimit.retry.search = false
            }
          })
          .catch((error) => {
            updateRateLimitFromRequest(error)
            if (error.status === 403) {
              rateLimit.retry.search = true
            }
          })
          .finally(() => {
            repos.isLoading = false
          })
      }

      search()

      watch(() => [repos.topics, repos.sortBy, repos.orderAscending], search)

      return {
        rateLimit,
        stats,
        repos,
      }
    },
  })
</script>
