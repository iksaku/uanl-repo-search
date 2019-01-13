<template>
    <v-app>
        <v-toolbar app dark clipped-left>
            <v-toolbar-side-icon
                    class="hidden-lg-and-up"
                    @click.stop="drawer = !drawer"
            ></v-toolbar-side-icon>

            <v-toolbar-title class="headline text-uppercase">
                <span>UANL Repo Search</span>
            </v-toolbar-title>
        </v-toolbar>

        <v-navigation-drawer app clipped dark v-model="drawer">
            <v-toolbar flat dense>
                <v-btn block flat href="https://github.com/iksaku/uanl-repo-search" target="_blank">
                    <span class="mr-2">Contribute on Github</span>
                    <v-icon>fab fa-github</v-icon>
                </v-btn>
            </v-toolbar>

            <v-toolbar flat dense>
                <v-tooltip bottom color="#0a0a0a" v-model="rateTooltip">
                    <span slot="activator"></span>
                    <span>
                            This is the available requests' count your computer have to ping Github's servers in order
                            to search for the selected topics.
                            <br>
                            This count resets every minute after first request.
                            <br>
                            To learn more about it please refer to
                            <a href="https://developer.github.com/v3/search/#rate-limit" target="_blank">
                                Github's Documentation
                            </a>
                        </span>
                </v-tooltip>

                <span class="justify-self-center">
                    <!-- TODO: Align this to the center -->

                    Available Requests: {{ rate.remaining }} / {{ rate.limit }}

                    <v-icon right small @click.stop="rateTooltip = !rateTooltip">fas fa-question-circle</v-icon>
                </span>
            </v-toolbar>

            <v-list>
                <v-list-tile v-for="(topic, index) in topics" :key="index">
                    <v-list-tile-title>
                        <label>
                            <input type="checkbox" :id="topic" :value="topic" v-model="selectedTopics">
                            {{ topic.toUpperCase() }}
                        </label>
                    </v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <v-content>
            <p v-for="repo in repos" :key="repo['id']">
                <a :href="repo['html_url']" target="_blank">
                    {{ repo['full_name'] }}
                </a>
            </p>
        </v-content>
    </v-app>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'App',
        data() {
            return {
                drawer: null,
                rateTooltip: null,

                selectedTopics: ['uanl', 'fime'],
                topics: [
                    'uanl',
                    'fime',
                    'its'
                ],
                repos: [],
                rate: {
                    limit: 0,
                    remaining: 0,
                    reset: null
                },
                token: null
            }
        },
        watch: {
            selectedTopics() {
                this.fetchData()
            }
        },
        methods: {
            fetchData() {
                if (this.selectedTopics.length < 1) {
                    console.log('Fetch skipped')
                    return
                }

                let query = this.selectedTopics.map(topic => 'topic:' + topic).join('+')

                axios.get('https://api.github.com/search/repositories?q=' + query)
                    .then((response) => {
                        console.log(response.data.items)
                        this.repos = response.data.items
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                    .then(() => {
                        this.remainingLimit()
                    })
            },
            remainingLimit() {
                axios.get('https://api.github.com/rate_limit')
                    .then((response) => {
                        this.rate = response.data['resources']['search']
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        },
        beforeMount() {
            this.fetchData()
        }
    }
</script>
