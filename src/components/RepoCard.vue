<template>
    <div class="w-full lg:w-1/2 p-4">
        <div class="h-full bg-gray-100 flex flex-col border border-gray-400 rounded-lg overflow-hidden">
            <div class="flex-grow w-full flex p-4">
                <div class="flex-shrink-0 flex items-center justify-center pr-4">
                    <a :href="repo.owner.html_url" target="_blank" rel="noopener">
                        <img
                            class="h-10 sm:h-12 w-10 sm:w-12 rounded-full"
                            :src="repo.owner.avatar_url"
                            :alt="`Avatar of ${repo.owner.login}`"
                        >
                    </a>
                </div>

                <div class="min-w-0 flex flex-col justify-center">
                    <a
                        class="flex-none text-xl font-medium truncate"
                        :href="repo.html_url"
                        target="_blank"
                        rel="noopener"
                    >
                        {{ repo.full_name }}
                    </a>

                    <span v-if="repo.description" class="block truncate">
                        {{ repo.description }}
                    </span>

                    <a
                        v-if="repo.homepage"
                        class="min-w-0 text-sm text-gray-700"
                        :href="repo.homepage"
                        target="_blank"
                        rel="noopener"
                    >
                        <span class="block truncate ml-1">
                            <fa icon="link" />
                            {{ repo.homepage }}
                        </span>
                    </a>
                </div>
            </div>

            <hr class="w-full border">

            <div class="flex-shrink-0 w-full flex items-center p-4">
                <a 
                    class="w-1/3 text-center text-sm text-gray-700 whitespace-no-wrap"
                    :href="`${repo.html_url}/search?l=${repo.language}`"
                    target="_blank"
                    rel="noopener"
                >
                    <fa class="inline-block align-middle" icon="code" />
                    <span class="inline-block align-middle ml-1">
                        {{ repo.language }}
                    </span> 
                </a>

                <a 
                    class="w-1/3 text-center text-sm text-gray-700"
                    :href="`${repo.html_url}/stargazers`"
                    target="_blank"
                    rel="noopener"
                >
                    <fa class="inline-block align-middle" icon="star" />
                    <span class="inline-block align-middle ml-1">
                        {{ repo.stargazers_count }}
                    </span> 
                </a>

                <a 
                    class="w-1/3 text-center text-sm text-gray-700"
                    :href="repo.html_url + (repo.license ? '/master/blob/LICENSE' : '')"
                    target="_blank"
                    rel="noopener"
                >
                    <fa class="inline-block align-middle mr-1" icon="balance-scale" />
                    
                    <span class="inline-block align-middle">
                        <span v-if="repo.license">
                            {{ repo.license.spdx_id }}
                        </span>
                        <span v-else class="italic">
                            N/A
                        </span>
                    </span>
                </a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    name: 'RepoCard',

    props: {
        repository: Object
    },

    setup(props: { repository: object }) {
        return {
            repo: props.repository
        }
    }
})
</script>