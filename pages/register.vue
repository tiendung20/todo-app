<template>
  <div id="app">
    <h1>Register</h1>
    <auth-form
      label1="Register"
      label2="Login"
      @data-sent="register"
      @page-changed="redirect"
    ></auth-form>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    if (this.$auth.loggedIn) {
      this.$router.push('/')
    }
  },
  methods: {
    async register(username, password) {
      await this.$axios.$post('/users', { username, password })
    },
    redirect() {
      this.$router.push('/login')
    },
  },
}
</script>
