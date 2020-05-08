<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Welcome |</router-link>
      <router-link to="/projects"> Projects |</router-link>
      <router-link v-if="!getIsLoggedIn" to="/login"> Login |</router-link>
      <router-link v-if="!getIsLoggedIn" to="/register"> Register |</router-link>
      <router-link v-if="getIsLoggedIn" to="/logout"><span @click="logout" > Logout |</span></router-link>
      <router-link to="/user"> User |</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {

    }
  },

  computed: {
    getIsLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },

  methods: {
    logout() {
      console.log("logout");
      this.$store.dispatch('logout')
        .then(() => {
          console.log("logout success");
        })
        .catch(error => {
          console.log("logout error");
          this.errorsList = error.errors;
        });
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
     color: #42b983;
    }
  }
}

</style>
