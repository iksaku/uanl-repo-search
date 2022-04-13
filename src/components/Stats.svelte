<script>
  import { onMount } from 'svelte'
  import { api } from '$lib/util.ts'

  let authors = 0
  let languages = 0
  let repositories = 0

  let pending = false

  async function fetchStats() {
    if (pending) {
      return
    }

    pending = true

    const stats = await api.get(`${window.location.href}api/stats`)

    authors = stats.authors
    languages = stats.languages
    repositories = stats.repositories

    pending = false
  }

  onMount(() => {
    fetchStats()
  })
</script>

<div class='max-w-screen-xl px-4 sm:px-6 lg:px-8 mx-auto -mt-16'>
  <div class='max-w-4xl mx-auto'>
    <dl
      class='sm:grid sm:grid-cols-3 bg-white rounded-lg shadow-lg sm:divide-x divide-y sm:divide-y-0'
    >
      <!-- Repositories -->
      <div
        class='flex sm:flex-col items-center justify-center text-center p-4 sm:p-6 space-x-2 sm:space-x-0 sm:space-y-2'
        class:animate-pulse={pending}
      >
        <dd class='text-blue-700 text-2xl sm:text-4xl font-medium'>
          {repositories}
        </dd>
        <dt class='text-gray-500 font-medium sm:capitalize'>repositorios</dt>
      </div>

      <!-- Languages -->
      <div
        class='flex sm:flex-col items-center justify-center text-center p-4 sm:p-6 space-x-2 sm:space-x-0 sm:space-y-2'
        class:animate-pulse={pending}
      >
        <dd class='text-blue-700 text-2xl sm:text-4xl font-medium'>
          {languages}
        </dd>
        <dt class='text-gray-500 font-medium sm:capitalize'>lenguajes</dt>
      </div>

      <!-- Authors -->
      <div
        class='flex sm:flex-col items-center justify-center text-center p-4 sm:p-6 space-x-2 sm:space-x-0 sm:space-y-2'
        class:animate-pulse={pending}
      >
        <dd class='text-blue-700 text-2xl sm:text-4xl font-medium'>
          {authors}
        </dd>
        <dt class='text-gray-500 font-medium sm:capitalize'>autores</dt>
      </div>
    </dl>
  </div>
</div>
