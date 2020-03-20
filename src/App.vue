<template>
    <div id="app" class="h-screen w-full font-sans flex bg-gray-200 overflow-hidden">
        <div
            v-if="isSidebarOpen"
            @click="setSidebar(false)"
            class="fixed z-40 inset-0 bg-black opacity-25 lg:hidden"
        ></div>

        <sidebar />

        <div class="flex-grow-0 min-w-0 w-full flex flex-col">
            <navbar />

            <div class="flex-grow w-full flex flex-wrap items-stretch overflow-auto">
                <repo-card
                    v-for="repo in results.items"
                    :key="repo.id"
                    :repository="repo"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useSearch } from '@/plugins/store/search'
import { useSidebar } from '@/plugins/store/sidebar'

import RepoCard from './components/RepoCard.vue'
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'

export default defineComponent({
    name: 'App',

    components: {
        RepoCard,
        Sidebar,
        Navbar
    },

    setup () {
        const { results } = useSearch()

        return {
            ...useSidebar(),
            results
        }
    }
})
</script>
