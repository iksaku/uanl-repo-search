<template>
  <div class="max-w-screen-xl px-4 sm:px-6 lg:px-8 mx-auto -mt-16">
    <div class="max-w-4xl mx-auto">
      <dl
        class="sm:grid sm:grid-cols-3 bg-white rounded-lg shadow-lg sm:divide-x divide-y sm:divide-y-0"
      >
        <!-- Repositories -->
        <div
          class="flex sm:flex-col items-center justify-center text-center p-4 sm:p-6 space-x-2 sm:space-x-0 sm:space-y-2"
          :class="{ 'animate-pulse': loading }"
        >
          <dd
            class="text-blue-700 text-2xl sm:text-4xl font-extrabold"
            v-text="repositories"
          />
          <dt class="text-gray-500 font-medium sm:capitalize">repositorios</dt>
        </div>

        <!-- Languages -->
        <div
          class="flex sm:flex-col items-center justify-center text-center p-4 sm:p-6 space-x-2 sm:space-x-0 sm:space-y-2"
          :class="{ 'animate-pulse': loading }"
        >
          <dd
            class="text-blue-700 text-2xl sm:text-4xl font-extrabold"
            v-text="languages"
          />
          <dt class="text-gray-500 font-medium sm:capitalize">lenguajes</dt>
        </div>

        <!-- Authors -->
        <div
          class="flex sm:flex-col items-center justify-center text-center p-4 sm:p-6 space-x-2 sm:space-x-0 sm:space-y-2"
          :class="{ 'animate-pulse': loading }"
        >
          <dd
            class="text-blue-700 text-2xl sm:text-4xl font-extrabold"
            v-text="authors"
          />
          <dt class="text-gray-500 font-medium sm:capitalize">autores</dt>
        </div>
      </dl>
    </div>
  </div>
</template>

<script lang="ts">
import millify from 'millify'
import { computed, defineComponent } from 'vue'
import { useFetch } from '@/hooks/fetch'

type Stats = {
  authors: number
  languages: number
  repositories: number
}

export default defineComponent({
  name: 'Stats',

  setup() {
    function numberFormat(value: number) {
      return millify(value, { precision: 0 })
    }

    const { loading, data } = useFetch<Stats>('/api/stats')

    const authors = computed(() => numberFormat(data?.value?.authors ?? 0))
    const languages = computed(() => numberFormat(data?.value?.languages ?? 0))
    const repositories = computed(() => numberFormat(data?.value?.repositories ?? 0))

    return {
      loading,
      authors,
      languages,
      repositories,
    }
  },
})
</script>
