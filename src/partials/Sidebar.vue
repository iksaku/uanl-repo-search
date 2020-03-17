<template>
    <div
        class="fixed lg:sticky z-50 inset-y-0 left-0 w-64 text-gray-300 bg-gray-800 overflow-y-auto transform lg:translate-x-0"
        
    >
        <div class="bg-gray-900 px-8 py-4 shadow-md flex items-center justify-between">
            <span class="flex-grow md:text-center text-xl md:text-2xl font-semibold">

            </span>
            
            <button
                
                class=""
            >
                <span class="text-2xl fas fa-times"></span>
            </button>
        </div>

        <nav class="font-medium px-8 py-4">
            Hello!
        </nav>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
// import { useSidebar } from '@/plugins/store/sidebar'

export default defineComponent({
    name: 'Sidebar',

    setup() {
        // console.log(useSidebar())

        // return {
        //     ...useSidebar()
        // }
    }
})
</script>