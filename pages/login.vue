<template>
  <div id="app">
    <h1>Login</h1>
    <auth-form
      label1="Login"
      label2="Register"
      @data-sent="login"
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
    login(username, password) {
      this.$auth.loginWith('laravelJWT', {
        data: {
          username,
          password,
        },
      })
      if (this.$auth.loggedIn) {
        this.$router.push('/')
      }
    },
    redirect() {
      this.$router.push('/register')
    },
  },
}
</script>
