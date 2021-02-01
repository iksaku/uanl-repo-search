<template>
  <div ref="root" class="observer" />
</template>

<script lang="ts">
  import {
    defineComponent,
    onMounted,
    onUnmounted,
    ref,
  } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup(_props, { emit }) {
      const root = ref<Element | null>(null)
      let observer: IntersectionObserver | null = null

      onMounted(() => {
        observer = new IntersectionObserver(([entry]) => {
          if (entry && entry.isIntersecting) {
            emit('intersect')
          }
        })

        if (root.value) {
          observer.observe(root.value)
        }
      })

      onUnmounted(() => {
        observer?.disconnect()
      })

      return {
        root,
      }
    },
  })
</script>
