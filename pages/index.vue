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
            :class="$fetchState.pending ? 'animate-pulse' : ''"
          />
          <stats
            title="lenguajes"
            :value="stats.languages"
            :class="$fetchState.pending ? 'animate-pulse' : ''"
          />
          <stats
            title="autores"
            :value="stats.authors"
            :class="$fetchState.pending ? 'animate-pulse' : ''"
          />
        </dl>
      </div>
    </div>

    <!-- Repositories -->
    <div class="container pt-16 px-4 sm:px-6 lg:px-8 mx-auto">
      <div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        <div v-if="results.repositories.length > 0" class="contents">
          <repo-card
            v-for="repo in results.repositories"
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
  } from '@nuxtjs/composition-api'

  import RepoCard from '@/components/Repo/RepoCard.vue'
  import RepoPlaceholder from '@/components/Repo/RepoPlaceholder'
  import Stats from '~/components/Stats.vue'

  export default defineComponent({
    components: { RepoPlaceholder, RepoCard, Stats },

    head: {
      link: [
        { rel: 'dns-prefetch', href: 'https://api.github.com' },
        { rel: 'preconnect', href: 'https://api.github.com' },
      ],
    },

    setup() {
      const { $octokit } = useContext()

      // Stats
      const stats = reactive({
        authors: 0,
        languages: 0,
        repositories: 0,
      })

      const { fetch } = useFetch(async () => {
        const response = await $octokit.search.repos({ q: 'topic:uanl ' })

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
      })

      fetch()

      // Repository Search
      const results = reactive({
        isLoading: false,
        searchTopics: ['uanl'],
        repositories: [],
      })

      function search() {
        if (results.isLoading) return

        results.isLoading = true

        $octokit.search
          .repos({
            q: results.searchTopics.map((topic) => `topic:${topic}`).join('+'),
          })
          .then((response) => {
            results.repositories = response.data.items
          })
          // .catch((error) => {
          //   console.log(error.response)
          // })
          .finally(() => {
            results.isLoading = false
          })
      }

      search()

      return {
        stats,
        results,
      }
    },
  })
</script>
