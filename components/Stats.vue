<template>
  <div class="max-w-4xl mx-auto">
    <dl
      class="sm:grid sm:grid-cols-3 bg-white rounded-lg shadow-lg sm:divide-x divide-y sm:divide-y-0"
    >
      <!-- Repositories -->
      <div
        class="flex sm:flex-col items-center justify-center text-center p-4 sm:p-6 space-x-2 sm:space-x-0 sm:space-y-2"
        :class="{ 'animate-pulse': loading }"
      >
        <dd class="text-blue-700 text-2xl sm:text-4xl font-extrabold">
          {{ repositories }}
        </dd>
        <dt class="text-gray-500 font-medium sm:capitalize">repositorios</dt>
      </div>

      <!-- Languages -->
      <div
        class="flex sm:flex-col items-center justify-center text-center p-4 sm:p-6 space-x-2 sm:space-x-0 sm:space-y-2"
        :class="{ 'animate-pulse': loading }"
      >
        <dd class="text-blue-700 text-2xl sm:text-4xl font-extrabold">
          {{ languages }}
        </dd>
        <dt class="text-gray-500 font-medium sm:capitalize">lenguajes</dt>
      </div>

      <!-- Authors -->
      <div
        class="flex sm:flex-col items-center justify-center text-center p-4 sm:p-6 space-x-2 sm:space-x-0 sm:space-y-2"
        :class="{ 'animate-pulse': loading }"
      >
        <dd class="text-blue-700 text-2xl sm:text-4xl font-extrabold">
          {{ authors }}
        </dd>
        <dt class="text-gray-500 font-medium sm:capitalize">autores</dt>
      </div>
    </dl>
  </div>
</template>

<script lang="ts">
  import millify from 'millify'
  import {
    computed,
    defineComponent,
    reactive,
    ref,
    useContext,
    useFetch,
  } from '@nuxtjs/composition-api'

  type Stats = {
    authors: number
    languages: number
    repositories: number
  }

  export default defineComponent({
    name: 'Stats',

    setup() {
      const { $http } = useContext()

      function numberFormat(value: number) {
        return millify(value, { precision: 0 })
      }

      const stats = reactive<Stats>({
        authors: 0,
        languages: 0,
        repositories: 0,
      })

      const loading = ref<boolean>(false)

      if (process.client) {
        useFetch(async () => {
          if (loading.value) return

          loading.value = true

          const response = await $http.$get<Stats>('/api/stats')

          stats.authors = response.authors
          stats.languages = response.languages
          stats.repositories = response.repositories

          loading.value = false
        })
      }

      const authors = computed(() => numberFormat(stats.authors))
      const languages = computed(() => numberFormat(stats.languages))
      const repositories = computed(() => numberFormat(stats.repositories))

      return {
        loading,
        authors,
        languages,
        repositories,
      }
    },
  })
</script>
