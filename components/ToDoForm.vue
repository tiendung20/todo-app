<template>
  <form @submit.prevent="onSubmit">
    <label for="new-todo-input"> What needs to be done? </label>
    <input
      id="new-todo-input"
      v-model.lazy.trim="label"
      type="text"
      name="new-todo"
      autocomplete="off"
    />
    <button type="submit">Add</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      label: '',
    }
  },
  methods: {
    onSubmit() {
      if (this.label.length < 1) return
      this.$emit('todo-added', this.label)
      this.label = ''
    },
  },
}
</script>
