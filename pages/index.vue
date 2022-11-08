<template>
  <div id="app">
    <h1>My To-Do List</h1>
    <to-do-form @todo-added="addToDo"></to-do-form>
    <ul>
      <li v-for="item in ToDoItems" :key="item.id">
        <to-do-item
          :id="item.id"
          :label="item.label"
          :done="item.done"
        ></to-do-item>
      </li>
    </ul>
  </div>
</template>

<script>
import uniqueId from 'lodash.uniqueid'

export default {
  computed: {
    ToDoItems() {
      return this.$store.getters['todos/get']
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
  },
}
</script>
