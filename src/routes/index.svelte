<script>
  import { onMount } from 'svelte'
  import { Filters, Logo, RepoCard, Stats } from '$components'
  import { Spinner } from '$components/Icons'
  import { useSearch } from '$lib/search.ts'
  import intersect from '$lib/intersect.ts'

  const search = useSearch()

  onMount(() => {
    search.freshFetch()
  })
</script>

<div class='pb-8'>
  <!-- Header -->
  <div class='bg-blue-900 py-16 sm:pb-24'>
    <div class='text-center px-4 sm:px-6 lg:px-8 pb-10 space-y-4'>
      <div class="w-full flex items-center justify-center">
        <Logo class="h-56 w-56" />
      </div>

      <h1 class='text-white text-4xl sm:text-5xl lg:text-6xl font-semibold'>
        Repositorios UANL
      </h1>

      <div class='max-w-xl text-blue-200 space-y-4 mx-auto'>
        <p class='text-lg sm:text-xl'>
          Descubre proyectos creados por alumnos y docentes de la
          <a
            href='https://uanl.mx'
            class='hocus:text-blue-500 border-b border-blue-300 hocus:border-blue-600'
            target='_blank'
            rel='noopener'
          >
            Universidad Autónoma de Nuevo León
          </a>
        </p>
        <div>
          <a
            href='https://github.com/iksaku/uanl-repo-search'
            class='hocus:text-blue-500 border-b border-blue-300 hocus:border-blue-600'
            target='_blank'
            rel='noopener'
          >
            Contribuye en Github
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Stats -->
  <Stats />

  <!-- Repositories -->
  <div class='pt-8 sm:pt-16 px-4 sm:px-6 lg:px-8 space-y-8'>
    <!-- Filters -->
    <Filters />

    <!-- Repository Listing -->
    <div class='grid gap-8 md:grid-cols-2 xl:grid-cols-3'>
      {#each [...$search.repositories] as [id, repository] (id)}
        <RepoCard repository={repository} />
      {/each}
    </div>

    {#if $search.pagination.hasMorePages()}
      <span use:intersect={search.loadMore}></span>
    {/if}

    <!--<div
        v-if="rateLimit.abused || rateLimit.limited"
        class="flex flex-col items-center justify-center text-blueGray-800 text-center py-4 space-y-2"
    >
        <p class="text-xl sm:text-2xl font-semibold">Por favor espera...</p>
        <p class="sm:text-lg font-medium">
            Has alcanzado el límite de consultas por minuto. Realizaremos tu
            consulta en un momento.
        </p>
        lazy-loading-icon class="w-6 h-6" />
    </div>-->

    {#if $search.isLoading}
      <div class='flex items-center justify-center'>
        <Spinner class='w-12 h-12 text-blue-900' />
      </div>
    {/if}
  </div>
</div>
