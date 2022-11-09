<template>
  <form @submit.prevent="onSubmit">
    <label for="username" class="label"> Username </label>
    <input
      id="username"
      v-model.lazy.trim="username"
      type="text"
      name="username"
      autocomplete="off"
      class="input__lg"
    />
    <label for="password" class="label"> Password </label>
    <input
      id="password"
      v-model.lazy.trim="password"
      type="password"
      name="password"
      autocomplete="off"
      class="input__lg"
    />
    <button type="submit" class="btn btn__primary btn__lg">{{ label1 }}</button>
    <button class="btn btn__primary btn__lg" @click="onClick">
      {{ label2 }}
    </button>
  </form>
</template>

<script>
export default {
  props: {
    label1: { required: true, type: String },
    label2: { required: true, type: String },
  },
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    onSubmit() {
      if (this.username.length < 1 || this.password.length < 1) {
        return
      }
      this.$emit('data-sent', this.username, this.password)
      this.username = ''
      this.password = ''
    },
    onClick() {
      this.$emit('page-changed')
    },
  },
}
</script>
