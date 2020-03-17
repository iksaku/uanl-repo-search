<template>
    <div id="app" class="min-h-screen h-full w-full bg-gray-200 flex overflow-auto">
        <sidebar />

        <div class="flex-1 w-full flex flex-col">
            <navbar />

            <div class="flex-grow w-full flex">
                <!-- TODO: Content -->
            </div>

            <!-- TODO: Footer? -->
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, provide } from '@vue/composition-api'
import Sidebar from './partials/Sidebar.vue'
import Navbar from './partials/Navbar.vue'
import { sidebarStore, useSidebar } from '@/plugins/store/sidebar'

export default defineComponent({
    name: 'App',
    
    components: {
        Sidebar,
        Navbar
    },

    setup() {
        provide('SidebarStore', sidebarStore)

        console.log(useSidebar())
    }
})
</script>
