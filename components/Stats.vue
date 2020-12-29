<template>
  <div
    class="flex sm:flex-col items-center justify-center text-center p-4 sm:p-6 space-x-2 sm:space-x-0 sm:space-y-2"
  >
    <dd class="text-blue-700 text-2xl sm:text-4xl font-extrabold">
      {{ numberFormat(value) }}
    </dd>
    <dt class="text-gray-500 font-medium sm:capitalize">{{ title }}</dt>
  </div>
</template>

<script lang="ts">
  import { millify } from 'millify'

  export default {
    name: 'Stats',

    props: {
      title: {
        type: String,
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
    },

    setup() {
      function numberFormat(value: number, options: object = { precision: 0 }) {
        return millify(value, options)
      }

      return {
        numberFormat,
      }
    },
  }
</script>
