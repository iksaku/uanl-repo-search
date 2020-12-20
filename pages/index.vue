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
          <stats title="repositorios" :value="stats.repositories" />
          <stats title="lenguajes" :value="stats.languages" />
          <stats title="autores" :value="stats.authors" />
        </dl>
      </div>
    </div>

    <!-- Repositories -->
    <div class="container pt-16 px-4 sm:px-6 lg:px-8 mx-auto">
      <div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        <repo-card
          v-for="repo in results.repositories"
          :key="repo.id"
          :repository="repo"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import {
    defineComponent,
    useContext,
    reactive,
    useStatic,
    ref,
  } from '@nuxtjs/composition-api'

  import RepoCard from '~/components/RepoCard.vue'
  import Stats from '~/components/Stats.vue'

  export default defineComponent({
    components: { RepoCard, Stats },

    head: {
      link: [
        { rel: 'dns-prefetch', href: 'https://api.github.com' },
        { rel: 'preconnect', href: 'https://api.github.com' },
      ],
    },

    setup() {
      const context = useContext()

      // Stats
      const stats = useStatic(
        () =>
          new Promise((resolve, reject) => {
            context.$octokit.search
              .repos({ q: 'topic:uanl' })
              .then((response) => {
                const authors = new Set()
                const languages = new Set()

                response.data.items.forEach((repo) => {
                  authors.add(repo.owner.login)

                  if (repo.language) {
                    languages.add(repo.language)
                  }
                })

                resolve({
                  authors: authors.size,
                  languages: languages.size,
                  repositories: response.data.total_count,
                })
              })
              .catch((error) => {
                reject(error)
              })
          }),
        ref('stats'),
        'cache'
      )

      // Repository Search
      const results = reactive({
        isLoading: false,
        searchTopics: ['uanl'],
        repositories: [],
      })

      function search() {
        if (results.isLoading) return

        results.isLoading = true

        context.$octokit.search
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
