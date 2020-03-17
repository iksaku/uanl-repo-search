<template>
    <header class="flex-shrink-0 text-gray-300 bg-gray-900 px-4 sm:px-6 py-4 shadow-md flex items-center justify-between">
        <div class="flex-1 min-w-0 flex">
            <button
                
                class="lg:hidden text-gray-700"
            >
                <span class="text-2xl fas fa-bars"></span>
            </button>
            
            <div class="flex-shrink-1 ml-4 lg:ml-0">
                <h1 class="text-xl md:text-2xl font-semibold">
                    UANL Repo Search
                </h1>
            </div>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
//import { useSidebar } from '@/plugins/store/sidebar'

export default defineComponent({
    name: 'Navbar',

    // setup() {
    //     return {
    //         ...useSidebar()
    //     }
    // }
})
</script>