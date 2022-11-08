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
  add(state, task) {
    state.tasks.push(task)
  },
  remove(state, { task }) {
    state.tasks.splice(state.tasks.indexOf(task), 1)
  },
  toggle(state, task) {
    task.done = !task.done
  },
}

export const actions = {
  async getTasks({ commit }) {
    const tasks = await this.$axios.$get(
      'https://6368e81715219b849609f2b8.mockapi.io/api/v1/tasks'
    )
    commit('store', tasks)
  },
  async addTask({ commit }, todo) {
    const task = await this.$axios.$post(
      'https://6368e81715219b849609f2b8.mockapi.io/api/v1/tasks',
      todo
    )
    commit('add', task)
  },
}
