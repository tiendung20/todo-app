<template>
  <div id="app">
    <button class="btn btn__primary" @click="logout">Logout</button>
    <h1>My To-Do List</h1>
    <to-do-form @todo-added="addToDo"></to-do-form>
    <h2 id="list-summary" ref="listSummary" tabindex="-1">{{ listSummary }}</h2>
    <ul aria-labelledby="list-summary" class="stack-large">
      <li v-for="item in ToDoItems" :key="item.id">
        <to-do-item
          :id="item.id"
          :label="item.label"
          :done="item.done"
          @checkbox-changed="updateDoneStatus(item.id)"
          @item-deleted="deleteToDo(item.id)"
          @item-edited="editToDo(item.id, $event)"
        ></to-do-item>
      </li>
    </ul>
  </div>
</template>

<script>
import uniqueId from 'lodash.uniqueid'

export default {
  middleware: 'auth',
  computed: {
    ToDoItems() {
      return this.$store.getters['todos/get']
    },
    listSummary() {
      const numberFinishedItems = this.ToDoItems.filter(
        (item) => item.done
      ).length
      return `${numberFinishedItems} out of ${this.ToDoItems.length} items completed`
    },
  },
  created() {
    this.$store.dispatch('todos/getTasks')
  },
  methods: {
    addToDo(toDoLabel) {
      this.$store.dispatch('todos/addTask', {
        id: uniqueId(),
        label: toDoLabel,
        done: false,
      })
    },
    updateDoneStatus(toDoId) {
      const toDoToUpdate = this.ToDoItems.find((item) => item.id === toDoId)
      this.$store.dispatch('todos/toggleTask', toDoToUpdate)
    },
    deleteToDo(toDoId) {
      const toDoToDelete = { id: toDoId }
      this.$store.dispatch('todos/removeTask', toDoToDelete)
      this.$refs.listSummary.focus()
    },
    editToDo(toDoId, newLabel) {
      const toDoToEdit = { label: newLabel, id: toDoId }
      this.$store.dispatch('todos/editTask', toDoToEdit)
    },
    async logout() {
      await this.$auth.logout('laravelJWT')
      if (!this.$auth.loggedIn) {
        this.$router.push('/login')
      }
    },
  },
}
</script>

<style scoped>
button {
  float: right;
}
h1 {
  clear: both;
}
</style>
