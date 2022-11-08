export const state = () => ({
  tasks: [],
})

export const getters = {
  get(state) {
    return state.tasks
  },
}

export const mutations = {
  store(state, tasks) {
    state.tasks = tasks
  },
  add(state, todo) {
    state.tasks.push(todo)
  },
  remove(state, { todo }) {
    state.tasks.splice(state.tasks.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  },
}

export const actions = {
  async getTasks({ commit }) {
    const tasks = await this.$axios.$get(
      'https://6368e81715219b849609f2b8.mockapi.io/api/v1/tasks'
    )
    commit('store', tasks)
  },
}
