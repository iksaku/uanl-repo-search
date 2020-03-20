<template>
    <header class="h-16 flex-shrink-0 z-30 text-gray-300 bg-gray-900 px-4 sm:px-6 py-4 shadow-md flex items-center justify-between">
        <div class="flex-1 min-w-0 flex items-center">
            <button
                @click="toggle"
                class="text-2xl text-gray-200 lg:hidden"
            >
                <fa icon="bars" />
            </button>

            <div class="flex-shrink-1 ml-4 lg:ml-0">
                <h1 class="text-xl md:text-2xl font-semibold">
                    UANL Repo Search
                </h1>
            </div>
        </div>

        <div>
            <a
                href="https://github.com/iksaku/uanl-repo-search"
                target="_blank"
                rel="noopener"
                class="text-2xl lg:text-lg text-gray-200 font-medium"
            >
                <span class="hidden lg:inline-block align-middle mr-2">
                    Contribuye en Github
                </span>

                <fa class="inline-block align-middle" :icon="['fab', 'github']" />
            </a>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useSidebar } from '@/plugins/store/sidebar'

export default defineComponent({
    name: 'Navbar',

    setup () {
        const { isSidebarOpen, setSidebar } = useSidebar()

        function toggle () {
            setSidebar(!isSidebarOpen.value)
        }

        return {
            toggle
        }
    }
})
</script>
