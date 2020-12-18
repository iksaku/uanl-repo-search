<template>
  <div>
    <!-- Header -->
    <div class="bg-blue-900 py-16 sm:pb-24">
      <div class="text-center px-4 sm:px-6 lg:px-8 pb-10 space-y-4">
        <!-- TODO: Logo -->
        <h1 class="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold">
          Repositorios UANL
        </h1>
        <div class="max-w-xl text-blue-200 space-y-4 mx-auto">
          <p class="text-lg sm:text-xl">
            Descubre proyectos creados por alumnos y docentes de la
            <a
              href="https://uanl.mx"
              class="hover:text-blue-500 border-b border-blue-300 hover:border-blue-600"
              target="_blank"
              rel="noopener"
            >
              Universidad Autónoma de Nuevo León
            </a>
          </p>
          <div>
            <a
              href="https://github.com/iksaku/uanl-repo-search"
              class="hover:text-blue-500 border-b border-blue-300 hover:border-blue-600"
              target="_blank"
            >
              Contribuye en Github
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="max-w-screen-xl px-4 sm:px-6 lg:px-8 mx-auto -mt-16">
      <div class="max-w-4xl mx-auto">
        <dl
          class="sm:grid sm:grid-cols-3 bg-white rounded-lg shadow-lg sm:divide-x divide-y sm:divide-y-0"
        >
          <stats title="facultades" value="0" />
          <stats title="repositorios" value="0" />
          <stats title="autores" value="0" />
        </dl>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Stats from '~/components/Stats.vue'

  export default {
    components: { Stats },
    setup() {},
  }
</script>
