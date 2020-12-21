<template>
  <div
    class="flex flex-col justify-between bg-white text-transparent rounded-lg hover:shadow-xl divide-y animate-pulse overflow-hidden"
  >
    <!-- Repo Description -->
    <div class="relative block p-4 sm:p-6">
      <div class="flex flex-col space-y-2">
        <div class="w-14 h-14 bg-gray-300 rounded-full"></div>
        <div class="bg-gray-300 text-xl rounded-full">&nbsp;</div>
        <div class="bg-gray-300 rounded-full">&nbsp;</div>
      </div>
    </div>

    <!-- Repo Meta -->
    <div
      class="grid grid-cols-3 bg-gray-100 text-gray-500 text-xs sm:text-sm font-semibold divide-x"
    >
      <!-- Language -->
      <div class="flex items-center justify-center p-4 sm:p-6 space-x-1">
        <code-icon class="flex-shrink-0 w-4 sm:w-5 h-4 sm:h-5" />
      </div>

      <!-- Stars -->
      <div class="flex items-center justify-center p-4 sm:p-6 space-x-1">
        <star-icon class="flex-shrink-0 w-4 sm:w-5 h-4 sm:h-5" />
      </div>

      <!-- License -->
      <div class="flex items-center justify-center p-4 sm:p-6 space-x-1">
        <scale-icon class="flex-shrink-0 w-4 sm:w-5 h-4 sm:h-5" />
      </div>
    </div>
  </div>
</template>

<script>
  import CodeIcon from '@/components/icons/CodeIcon'
  import StarIcon from '@/components/icons/StarIcon'
  import ScaleIcon from '@/components/icons/ScaleIcon'

  export default {
    name: 'RepoPlaceholder',
    components: { ScaleIcon, StarIcon, CodeIcon },
  }
</script>
