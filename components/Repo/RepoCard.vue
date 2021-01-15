<template>
  <div
    class="flex flex-col justify-between bg-white rounded-lg hover:shadow-xl divide-y overflow-hidden transform ease-out duration-200 hover:-translate-y-1"
  >
    <!-- Repo Description -->
    <a
      :href="repository.html_url"
      class="relative block p-4 sm:p-6 group"
      target="_blank"
      rel="noopener"
    >
      <div class="flex flex-col space-y-2">
        <img
          class="w-14 h-14 rounded-full"
          :src="repository.owner.avatar_url"
          alt="Author's Avatar"
        />
        <h2 class="text-gray-900 text-xl overflow-hidden overflow-ellipsis">
          {{ repository.name }}
        </h2>
        <p
          class="text-gray-700 group-hover:text-gray-900 line-clamp-3 transition-colors ease-out duration-200"
        >
          {{ repository.description }}
        </p>
      </div>

      <div class="fixed right-0 top-0 p-4">
        <external-link-icon
          class="opacity-0 group-hover:opacity-100 w-6 h-6 text-gray-500 transition-opacity ease-out duration-200"
        />
      </div>
    </a>

    <!-- Repo Meta -->
    <div
      class="grid grid-cols-3 bg-gray-100 text-gray-500 text-xs sm:text-sm font-semibold divide-x"
    >
      <!-- Language -->
      <div
        class="flex items-center justify-center hover:bg-gray-200 hover:text-gray-900 p-4 sm:p-6 space-x-1 group"
      >
        <code-icon
          class="flex-shrink-0 w-4 sm:w-5 h-4 sm:h-5 group-hover:text-blue-500"
        />

        <span v-if="repository.language">{{ repository.language }}</span>
        <span v-else class="italic">N/A</span>
      </div>

      <!-- Stars -->
      <a
        class="flex items-center justify-center hover:bg-gray-200 hover:text-gray-900 p-4 sm:p-6 space-x-1 group"
        :href="`${repository.url}/stargazers`"
        target="_blank"
        rel="noopener"
      >
        <star-icon
          class="flex-shrink-0 w-4 sm:w-5 h-4 sm:h-5 group-hover:text-amber-600"
        />

        <span>{{ repository.stargazers_count }}</span>
      </a>

      <!-- License -->
      <div
        class="flex items-center justify-center hover:bg-gray-200 hover:text-gray-900 p-4 sm:p-6 space-x-1 group"
      >
        <scale-icon class="flex-shrink-0 w-4 sm:w-5 h-4 sm:h-5" />

        <span v-if="repository.license">
          {{ repository.license.spdx_id }}
        </span>
        <span v-else class="group-hover:text-gray-500 italic">N/A</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api'
  import { Repository } from '~/hooks/octokit'

  export default defineComponent({
    name: 'RepoCard',

    props: {
      repository: {
        type: Object as () => Repository,
        required: true,
      },
    },
  })
</script>
