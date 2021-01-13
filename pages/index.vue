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
      <stats />
    </div>

    <!-- Repositories -->
    <div class="pt-8 sm:pt-16 px-4 sm:px-6 lg:px-8 space-y-8">
      <div
        class="flex flex-col sm:flex-row items-center justify-center sm:justify-end text-blue-900 space-y-4 sm:space-y-0"
      >
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

          <button
            :title="`Ordenar de manera ${
              repos.orderAscending ? 'descendente' : 'ascendente'
            }`"
            @click="repos.orderAscending = !repos.orderAscending"
          >
            <sort-ascending-icon v-if="repos.orderAscending" class="w-6 h-6" />
            <sort-descending-icon v-else class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Repository Listing -->
      <lazy-hydrate when-visible>
        <div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          <repo-card
            v-for="repo in repos.list.values()"
            v-show="repos.list.size > 0"
            :key="repo.id"
            :repository="repo"
          />

          <repo-placeholder
            v-for="i in 9"
            v-show="searchState.pending"
            :key="i"
          />
        </div>
      </lazy-hydrate>

      <intersection-observer
        v-if="repos.pagination.current < repos.pagination.total"
        @intersect="loadMore"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, useFetch } from '@nuxtjs/composition-api'

  import LazyHydrate from 'vue-lazy-hydration/src/LazyHydrate'

  import { useRateLimit } from '~/hooks/rateLimit'
  import { useRepos } from '~/hooks/repos'

  export default defineComponent({
    components: {
      LazyHydrate,
    },

    setup() {
      const { rateLimit } = useRateLimit()
      const { repos, search: _search } = useRepos()

      const { fetch: search, fetchState: searchState } = useFetch(_search)

      function loadMore() {
        if (repos.pagination.current >= repos.pagination.total) return

        ++repos.pagination.current

        search()
      }

      return {
        rateLimit,
        repos,
        searchState,
        loadMore,
      }
    },

    head: {
      link: [
        { rel: 'dns-prefetch', href: 'https://api.github.com' },
        { rel: 'preconnect', href: 'https://api.github.com' },
      ],
    },

    fetchOnServer: false,
  })
</script>
