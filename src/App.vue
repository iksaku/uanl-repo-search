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

            <v-list two-line style="background-color: #212121">
                <v-list-tile>
                    <v-list-tile-content>
                        <v-list-tile-title class="text-xs-center" @click.stop="rateTooltip = !rateTooltip">
                            <!-- TODO: Align this to the center -->

                            Available Requests: {{ rate.remaining }} / {{ rate.limit }}

                            <v-icon right small>fas fa-question-circle</v-icon>
                        </v-list-tile-title>

                        <v-list-tile-sub-title v-if="rate.reset" class="text-xs-center">
                            Resets in {{ timeToRateReset }} seconds...
                        </v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-tooltip bottom color="#0a0a0a" v-model="rateTooltip">
                        <span slot="activator"></span>
                        <span>
                            This is the available requests' count your computer have to ping Github's servers in order
                            to search for the selected topics.
                            <br>
                            This count resets every minute.
                            <br>
                            To learn more about it please refer to
                            <a href="https://developer.github.com/v3/search/#rate-limit" target="_blank">
                                Github's Documentation
                            </a>
                        </span>
                    </v-tooltip>
                </v-list-tile>
            </v-list>

            <v-divider></v-divider>

            <v-list dense>
                <v-list-tile v-for="(topic, index) in topics" :key="index">
                    <v-list-tile-action>
                        <v-checkbox :label="topic.toUpperCase()" :value="topic" v-model="selectedTopics"></v-checkbox>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <v-content>
            <v-container grid-list-lg>
                <v-alert :value="rateLimitExceeded" type="warning" transition="expand-transition">
                    You've exceeded Github's Search API Rate Limits.
                    Content on this page will not update until rate limit resets.
                </v-alert>

                <v-layout row wrap justify-center>
                    <v-flex xs12 sm10 md8 v-for="repo in repos" :key="repo['id']">
                        <repo-card :data="repo"></repo-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import axios from 'axios'
    import moment from 'moment'
    import RepoCard from '@/components/RepoCard'

    export default {
        name: 'App',
        components: {
            'repo-card': RepoCard
        },
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
                    limit: null,
                    remaining: null,
                    reset: null
                },
                timeToRateReset: null,
                token: null
            }
        },
        watch: {
            selectedTopics() {
                this.fetchData()
            }
        },
        computed: {
            rateLimitExceeded() {
                return this.rate.remaining != null && this.rate.remaining < 1
            }
        },
        methods: {
            fetchData() {
                if (this.selectedTopics.length < 1) {
                    console.log('Fetch skipped')
                    return
                }

                if (this.rateLimitExceeded) {
                    console.log('Search Rate Limit exceeded. Fetch skipped')
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
                        this.getRateLimit()
                    })
            },
            getRateLimit() {
                axios.get('https://api.github.com/rate_limit')
                    .then((response) => {
                        this.rate = response.data['resources']['search']
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            updateRateLimit() {
                if (this.rate.reset) {
                    let resets = moment.unix(this.rate.reset)
                    let diff = resets.diff(moment(), 'seconds')

                    if (diff > 0) {
                        this.timeToRateReset = diff
                    } else {
                        this.timeToRateReset = null
                        this.rate.reset = null

                        this.rate.remaining = this.rate.limit
                    }
                }
            }
        },
        beforeMount() {
            this.fetchData()
            setInterval(this.updateRateLimit, 1000)
        }
    }
</script>
