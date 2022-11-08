<template>
  <div id="app">
    <h1>My To-Do List</h1>
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
export default {
  computed: {
    ToDoItems() {
      return this.$store.getters['todos/get']
    },
  },
  created() {
    this.$store.dispatch('todos/getTasks')
  },
}
</script>
