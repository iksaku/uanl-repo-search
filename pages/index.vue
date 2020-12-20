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
          <stats
            title="repositorios"
            :value="$store.state.stats.repositories"
          />
          <stats title="lenguajes" :value="$store.state.stats.languages" />
          <stats title="autores" :value="$store.state.stats.authors" />
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

    fetch({ store }) {
      store.dispatch('stats/update')
    },

    setup() {
      const results = reactive({
        isLoading: false,
        searchTopics: ['uanl'],
        repositories: [],
      })

      const context = useContext()

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
        results,
        search,
      }
    },
  })
</script>
