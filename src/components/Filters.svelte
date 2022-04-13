<script>
  import { filters, useSearch } from '$lib/search.ts'

  const search = useSearch()

  let sorting = undefined

  function updateSorting() {
    filters.update((filters) => {
      filters.sort = sorting?.sort
      filters.order = sorting?.order

      return filters
    })

    onSubmit()
  }

  function onSubmit() {
    if ($search.isLoading) {
      return
    }

    search.freshFetch()
  }
</script>

<form
  class='grid gap-x-8 gap-y-4 md:grid-cols-2 text-blue-900'
  on:submit|preventDefault={onSubmit}
>
  <!-- Search bar -->
  <input
    bind:value={$filters.q}
    class='w-full md:max-w-lg bg-gray-100 focus:bg-white placeholder-blue-900 placeholder-opacity-80 border-blue-900 rounded-lg'
    type='search'
    placeholder='Buscar Repositorios'
    aria-label='Buscar Repositorios'
  />

  <!-- Sorting -->
  <label
    class='min-w-0 flex items-center justify-between md:justify-end space-x-2'
  >
    <span class='whitespace-nowrap'>Ordenar por</span>

    <select
      bind:value={sorting}
      on:change={updateSorting}
      class='min-w-0 bg-gray-100 focus:bg-white border-blue-900 rounded-lg truncate pl-2 md:pl-4 py-2'
    >
      <option value={undefined}>
        Mejor resultado
      </option>

      <option value={{ sort: 'stars', order: 'desc' }}>
        Más estrellas
      </option>

      <option value={{ sort: 'stars', order: 'asc' }}>
        Menos estrellas
      </option>

      <option value={{ sort: 'forks', order: 'desc' }}>
        Más copias (Forks)
      </option>

      <option value={{ sort: 'forks', order: 'asc' }}>
        Menos copias (Forks)
      </option>

      <option value={{ sort: 'updated', order: 'desc' }}>
        Actualizaciones recientes
      </option>

      <option value={{ sort: 'updated', order: 'asc' }}>
        Actualizaciones menos recientes
      </option>
    </select>
  </label>
</form>
