<template>
    <div id="app">
        <div id="topics">
            <label v-for="(topic, index) in topics" :key="index">
                <input type="checkbox" :id="topic" :value="topic" v-model="checkedTopics">
                {{ topic }}
            </label>
        </div>

        <div v-if="repos.length > 0">
            <p v-for="(repo, index) in repos" :key="index">
                <span>{{ repo.full_name }}</span>
            </p>
        </div>
        <div v-else>
            <span>No repositories loaded</span>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'app',
        data() {
            return {
                repos: [],
                topics: ['uanl', 'fime', 'its'],
                checkedTopics: ['uanl', 'fime'],
                token: null
            }
        },
        watch: {
            checkedTopics() {
                this.fetchData()
            }
        },
        methods: {
            fetchData() {

                if (this.checkedTopics.length < 1) {
                    this.repos = []
                    return
                }

                let query = this.checkedTopics.map(topic => 'topic:' + topic).join('+')

                axios.get('https://api.github.com/search/repositories?q=' + query)
                    .then((response) => {
                        console.log(response.data)
                        this.repos = response.data.items
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

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
