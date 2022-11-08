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
  remove(state, task) {
    const index = state.tasks.findIndex((item) => item.id === task.id)
    state.tasks.splice(index, 1)
  },
  toggle(state, task) {
    const todo = state.tasks.find((item) => item.id === task.id)
    todo.done = task.done
  },
  edit(state, task) {
    const todo = state.tasks.find((item) => item.id === task.id)
    todo.label = task.label
  },
}

export const actions = {
  async getTasks({ commit }) {
    const tasks = await this.$axios.$get('/tasks')
    commit('store', tasks)
  },
  async addTask({ commit }, todo) {
    const task = await this.$axios.$post('/tasks', todo)
    commit('add', task)
  },
  async toggleTask({ commit }, todo) {
    const task = await this.$axios.$put(`/tasks/${todo.id}`, {
      done: !todo.done,
    })
    commit('toggle', task)
  },
  async removeTask({ commit }, todo) {
    const task = await this.$axios.$delete(`/tasks/${todo.id}`)
    commit('remove', task)
  },
  async editTask({ commit }, todo) {
    const task = await this.$axios.$put(`/tasks/${todo.id}`, {
      label: todo.label,
    })
    commit('edit', task)
  },
}
