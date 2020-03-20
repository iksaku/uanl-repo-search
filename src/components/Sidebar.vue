<template>
    <div
        class="flex-shrink-0 fixed lg:sticky z-50 inset-y-0 left-0 w-64 text-gray-300 bg-gray-800 overflow-y-auto flex flex-col transform duration-200 lg:translate-x-0"
        :class="isSidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
    >
        <div class="h-16 bg-gray-900 p-4 shadow-md flex items-center justify-end">
            <button
                @click="setSidebar(false)"
                class="text-2xl text-gray-200 focus:outline-none lg:hidden"
            >
                <fa icon="times" />
            </button>
        </div>

        <div class="flex-grow w-full flex flex-col font-medium py-4">
            <div class="w-full flex flex-col px-4">
                <div class="font-medium">
                    Available Requests: {{ rateLimit.remaining }}/{{ rateLimit.limit }}
                </div>

                <div
                    v-show="timeToRateReset > 0"
                    class="text-sm font-medium text-gray-500 pl-4 mt-2"
                >
                    Resets in {{ timeToRateReset }} {{ timeToRateReset > 1 ? 'seconds' : 'second' }}...
                </div>
            </div>

            <hr class="border border-gray-700 my-4">

            <div class="w-full px-4">
                <span class="w-full block font-medium">
                    Topics
                </span>
                <ul class="px-4">
                    <li
                        v-for="(topic, index) in topics"
                        :key="index"
                    >
                        <label class="inline-block">
                            <input
                                v-model="selectedTopics"
                                type="checkbox"
                                :value="topic"
                                :disabled="rateLimit.remaining < 1"
                                class="form-checkbox text-indigo-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-75"
                            >

                            <span class="ml-2 uppercase">
                                {{ topic }}
                            </span>
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'

import { defineComponent, ref, watch } from '@vue/composition-api'
import { useSearch } from '@/plugins/store/search'
import { useSidebar } from '@/plugins/store/sidebar'

export default defineComponent({
    name: 'Sidebar',

    setup () {
        // Search Functionality
        const { search } = useSearch()

        const topics = ['uanl', 'fime', 'its']
        const selectedTopics = ref<string[]>(['uanl', 'fime'])

        watch(selectedTopics, search)

        // Rate Limit Functionality
        const { rateLimit } = useSearch()

        const timeToRateReset = ref<number>(0)

        function updateResetLimit () {
            if (rateLimit.limit === rateLimit.remaining) {
                timeToRateReset.value = 0
            } else {
                const resets = dayjs.unix(rateLimit.reset)
                const diff = resets.diff(dayjs(), 'second')

                timeToRateReset.value = diff

                if (diff < 1) {
                    rateLimit.remaining = rateLimit.limit
                } else {
                    setTimeout(updateResetLimit, 500)
                }
            }
        }

        watch(() => rateLimit.reset, updateResetLimit)

        return {
            ...useSidebar(),

            topics,
            selectedTopics,

            rateLimit,
            timeToRateReset
        }
    }
})
</script>
