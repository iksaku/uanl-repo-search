<template>
  <div class="pb-8">
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
    <stats />

    <!-- Repositories -->
    <div class="pt-8 sm:pt-16 px-4 sm:px-6 lg:px-8 space-y-8">
      <!-- Filters -->
      <filters @update="search" />

      <!-- Repository Listing -->
      <div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        <repo-card v-for="[id, repo] of repos" :key="id" :repository="repo" />
      </div>

      <div
        v-if="rateLimit.abused || rateLimit.limited"
        class="flex flex-col items-center justify-center text-blueGray-800 text-center py-4 space-y-2"
      >
        <p class="text-xl sm:text-2xl font-semibold">Por favor espera...</p>
        <p class="sm:text-lg font-medium">
          Has alcanzado el límite de consultas por minuto. Realizaremos tu
          consulta en un momento.
        </p>
        <lazy-loading-icon class="w-6 h-6" />
      </div>

      <div
        v-show="searchState.pending"
        class="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
      >
        <repo-placeholder v-for="i in 9" :key="i" />
      </div>

      <lazy-intersection-observer
        v-if="!searchState.pending && hasMorePages"
        @intersect="loadMore"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api'

  import { rateLimit } from '~/hooks/octokit'
  import { repos } from '~/hooks/repos'
  import { hasMorePages, useSearch } from '~/hooks/search'

  export default defineComponent({
    name: 'Index',

    fetchOnServer: false,

    setup() {
      return {
        rateLimit,
        repos,
        hasMorePages,
        ...useSearch(),
      }
    },

    head: {
      link: [
        { rel: 'dns-prefetch', href: 'https://api.github.com' },
        { rel: 'preconnect', href: 'https://api.github.com' },
      ],
    },
  })
</script>
