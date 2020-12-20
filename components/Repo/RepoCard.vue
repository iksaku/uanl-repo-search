<template>
  <div
    class="flex flex-col justify-between bg-white rounded-lg hover:shadow-xl divide-y overflow-hidden transform ease-out duration-200 hover:-translate-y-1"
  >
    <!-- Repo Description -->
    <a
      :href="url"
      class="relative block p-4 sm:p-6 group"
      target="_blank"
      rel="noopener"
    >
      <div class="flex flex-col space-y-2">
        <img
          class="w-14 h-14 rounded-full"
          :src="image"
          alt="Author's Avatar"
        />
        <h2 class="text-gray-900 text-xl">
          {{ name }}
        </h2>
        <p
          class="text-gray-500 group-hover:text-gray-900 transition-colors ease-out duration-200"
        >
          {{ description }}
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

        <span v-if="language">{{ language }}</span>
        <span v-else class="italic">N/A</span>
      </div>

      <!-- Stars -->
      <a
        class="flex items-center justify-center hover:bg-gray-200 hover:text-gray-900 p-4 sm:p-6 space-x-1 group"
        :href="`${url}/stargazers`"
        target="_blank"
        rel="noopener"
      >
        <star-icon
          class="flex-shrink-0 w-4 sm:w-5 h-4 sm:h-5 group-hover:text-amber-600"
        />

        <span>{{ stars }}</span>
      </a>

      <!-- License -->
      <div
        class="flex items-center justify-center hover:bg-gray-200 hover:text-gray-900 p-4 sm:p-6 space-x-1 group"
      >
        <scale-icon class="flex-shrink-0 w-4 sm:w-5 h-4 sm:h-5" />

        <span v-if="license">
          {{ license }}
        </span>
        <span v-else class="group-hover:text-gray-500 italic">N/A</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from '@nuxtjs/composition-api'

  import ExternalLinkIcon from '@/components/icons/ExternalLinkIcon.vue'
  import CodeIcon from '@/components/icons/CodeIcon'
  import StarIcon from '@/components/icons/StarIcon'
  import ScaleIcon from '@/components/icons/ScaleIcon'

  export default defineComponent({
    name: 'RepoCard',
    components: { ExternalLinkIcon, ScaleIcon, StarIcon, CodeIcon },
    props: {
      repository: {
        type: Object,
        required: true,
      },
    },

    setup({ repository }) {
      return {
        url: repository.html_url,
        name: repository.name,
        description: repository.description,
        image: repository.owner.avatar_url,
        language: repository.language,
        stars: repository.stargazers_count,
        license: repository.license?.spdx_id,
      }
    },
  })
</script>
