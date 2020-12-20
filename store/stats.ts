import { MutationTree, ActionTree } from 'vuex'

export const state = () => ({
  loading: false,
  authors: 0,
  languages: 0,
  repositories: 0,
})

type StatsState = ReturnType<typeof state>
type StatsData = Omit<StatsState, 'loading'>

export const mutations: MutationTree<StatsState> = {
  setLoading(state, value: boolean) {
    state.loading = value
  },

  update(state, payload: StatsData) {
    const getKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>

    getKeys(payload).forEach((key) => {
      state[key] = payload[key]
    })
  },
}

export const actions: ActionTree<StatsState, object> = {
  update({ state, commit }) {
    if (state.loading) return

    commit('setLoading', true)

    this.$octokit.search
      .repos({
        q: 'topic:uanl',
      })
      .then((response) => {
        const authors = new Set()
        const languages = new Set()

        response.data.items.forEach((repo) => {
          authors.add(repo.owner.login)

          if (repo.language) {
            languages.add(repo.language)
          }
        })

        commit('update', {
          authors: authors.size,
          languages: languages.size,
          repositories: response.data.total_count,
        })
      })
      .finally(() => {
        commit('setLoading', false)
      })
  },
}
