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
              v-model="filters.sortBy"
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
              filters.orderAscending ? 'descendente' : 'ascendente'
            }`"
            @click="filters.orderAscending = !filters.orderAscending"
          >
            <sort-ascending-icon
              v-if="filters.orderAscending"
              class="w-6 h-6"
            />
            <sort-descending-icon v-else class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Repository Listing -->
      <div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        <repo-card
          v-for="repo in repos.list.values()"
          :key="repo.id"
          :repository="repo"
        />

        <repo-placeholder
          v-for="i in 9"
          v-show="searchState.pending"
          :key="i"
        />
      </div>

      <intersection-observer
        v-if="
          !searchState.pending &&
          repos.pagination.current < repos.pagination.total
        "
        @intersect="loadMore"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, useFetch } from '@nuxtjs/composition-api'

  import { filters } from '~/hooks/filters'
  import { rateLimit } from '~/hooks/rateLimit'
  import { repos, search as _repoSearch } from '~/hooks/repos'

  export default defineComponent({
    name: 'Index',

    setup() {
      const { fetch: search, fetchState: searchState } = useFetch(_repoSearch)

      function loadMore() {
        if (repos.pagination.current >= repos.pagination.total) return

        ++repos.pagination.current

        search()
      }

      return {
        rateLimit,
        repos,
        filters,
        search,
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
