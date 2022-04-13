<script>
  import { Code, ExternalLink, Scale, Star } from './Icons/index.ts'

  export let repository
</script>

<div
  class='flex flex-col justify-between bg-white rounded-lg shadow hover:shadow-xl divide-y overflow-hidden transform ease-out duration-200 hover:-translate-y-1'
>
  <!-- Repo Description -->
  <a
    href={repository.html_url}
    class='relative block p-4 sm:p-6 group'
    target='_blank'
    rel='noopener'
  >
    <div class='flex flex-col space-y-2'>
      <img
        class='w-14 h-14 rounded-full'
        src={repository.owner.avatar_url}
        alt="Author's Avatar"
      />

      <h2 class='text-gray-900 text-xl overflow-hidden overflow-ellipsis'>
        {repository.name}
      </h2>

      {#if repository.description}
        <p class='text-gray-700 group-hover:text-gray-900 line-clamp-3 transition-colors ease-out duration-200'>
          {repository.description}
        </p>
      {/if}
    </div>

    <div class='fixed right-0 top-0 p-4'>
      <ExternalLink
        class='opacity-0 group-hover:opacity-100 w-6 h-6 text-gray-500 transition-opacity ease-out duration-200' />
    </div>
  </a>

  <!-- Repo Metadata -->
  <div class='grid grid-cols-3 bg-gray-100 text-gray-500 text-xs sm:text-sm font-semibold divide-x'>
    <!-- Language -->
    <div class='flex items-center justify-center hover:bg-gray-200 hover:text-gray-900 p-4 sm:p-6 space-x-1 group'>
      <Code class='flex-shrink-0 w-4 sm:w-5 h-4 sm:h-5 group-hover:text-blue-500' />

      <span class:italic={!repository.language}>
        {repository.language ?? 'N/A'}
      </span>
    </div>

    <!-- Stars -->
    <a
      class='flex items-center justify-center hover:bg-gray-200 hover:text-gray-900 p-4 sm:p-6 space-x-1 group'
      href='{repository.html_url}/stargazers'
      target='_blank'
      rel='noopener'
    >
      <Star class='flex-shrink-0 w-4 sm:w-5 h-4 sm:h-5 group-hover:text-amber-600' />

      <span>
        {repository.stargazers_count}
      </span>
    </a>

    <!-- License -->
    <div class='flex items-center justify-center hover:bg-gray-200 hover:text-gray-900 p-4 sm:p-6 space-x-1 group'>
      <Scale class='flex-shrink-0 w-4 sm:w-5 h-4 sm:h-5' />

      <span
        class:italic={!repository.license}
        class:group-hover:text-gray-500={!repository.license}
      >
        {repository.license?.spdx_id ?? 'N/A'}
      </span>
    </div>
  </div>
</div>
