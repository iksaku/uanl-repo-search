<template>
  <div class="grid gap-x-8 gap-y-4 md:grid-cols-2 text-blue-900">
    <!-- Search bar -->
    <input
      v-model.lazy="search"
      class="w-full md:max-w-lg bg-gray-100 focus:bg-white placeholder-blue-900 placeholder-opacity-80 border-blue-900 rounded-lg"
      type="search"
      placeholder="Buscar Repositorios"
      aria-label="Buscar Repositorios"
    />

    <!-- Sorting -->
    <label
      class="min-w-0 flex items-center justify-between md:justify-end space-x-2"
    >
      <span class="whitespace-nowrap">Ordenar por</span>

      <select
        v-model="filter"
        class="min-w-0 bg-gray-100 focus:bg-white border-blue-900 rounded-lg truncate pl-2 md:pl-4 py-2"
      >
        <option :value="{ sort: undefined, order: undefined }">
          Mejor resultado
        </option>
        <option :value="{ sort: 'stars', order: 'desc' }">
          Más estrellas &nbsp;
        </option>
        <option :value="{ sort: 'stars', order: 'asc' }">
          Menos estrellas
        </option>
        <option :value="{ sort: 'forks', order: 'desc' }">
          Más copias (Forks)
        </option>
        <option :value="{ sort: 'forks', order: 'asc' }">
          Menos copias (Forks)
        </option>
        <option :value="{ sort: 'updated', order: 'desc' }">
          Actualizaciones recientes
        </option>
        <option :value="{ sort: 'updated', order: 'asc' }">
          Actualizaciones menos recientes
        </option>
      </select>
    </label>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from '@nuxtjs/composition-api'
  import { RepositorySearchParameters } from '~/hooks/octokit'
  import { repos } from '~/hooks/repos'
  import { searchFilters, searchPagination } from '~/hooks/search'

  export default defineComponent({
    name: 'Filters',

    setup(_props, { emit }) {
      const search = ref<string>('')
      const filter = ref<Pick<RepositorySearchParameters, 'sort' | 'order'>>({
        sort: undefined,
        order: undefined,
      })

      watch([search, filter], () => {
        searchFilters.q = search.value

        searchFilters.sort = filter.value.sort

        searchFilters.order = filter.value.order

        repos.clear()

        searchPagination.total = 1
        searchPagination.current = 1

        emit('update')
      })

      return {
        search,
        filter,
      }
    },
  })
</script>
