<template>
    <v-card>
        <v-layout row>
            <v-flex xs2>
                <v-avatar>
                    <v-img :src="data['owner']['avatar_url']"></v-img>
                </v-avatar>
            </v-flex>
            <v-flex xs10>
                <v-card-title>
                    <div>
                        <div>
                            <a :href="data['html_url']" class="headline font-weight-bold repoName">
                                {{ data['full_name'] }}
                            </a>
                        </div>
                        <div>
                            {{ data['description'] }}
                        </div>
                    </div>
                </v-card-title>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
    export default {
        name: "RepoCard",
        props: {
            data: Object
        }
    }
</script>

<style scoped>
    .repoName {
        color: black;
        text-decoration: none;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>