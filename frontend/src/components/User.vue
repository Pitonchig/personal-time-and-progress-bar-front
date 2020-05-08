<template>
  <div>
    <ul class="list-group">
        <li class="list-group-item list-group-item-info">is logged in: {{getIsLoggedIn}}</li>
        <li class="list-group-item list-group-item-info">user info: {{getUserInfo}}</li>
        <li class="list-group-item list-group-item-info">projects: {{getProjectsInfo}}</li>
    </ul>
  </div>

</template>

<script>
export default {
  name: 'user',

  data () {
    return {

    }
  },
  computed: {
    getIsLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },

    getUserInfo() {
      return this.$store.getters.getUser;
    },

    getProjectsInfo() {
      return this.$store.getters.getProjects;
    }
  }

}
</script>