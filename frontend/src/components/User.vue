<template>
  <div>
    <div class="container">
        <div class="msg-img">
        <img src="/img/avatar.png" alt="avatar">
    </div>

    <div class="container">
        <div class="mb-3">
            <span v-show="getIsLoggedIn" class="badge badge-primary mx-3">Online</span>
            <span v-show="!getIsLoggedIn" class="badge badge-danger mx-3">Offline</span>
        </div>
        <div class="mb-3">
            <span class="mr-2 d-block d-sm-inline-block mb-2 mb-sm-0 text-primary">Id:</span>
            <span class="bg-light-blue text-dark"> {{getUserInfo.id}} </span>
        </div>
        <div class="mb-3">
            <span class="mr-2 d-block d-sm-inline-block mb-2 mb-sm-0 text-primary">Name:</span>
            <span class="bg-light-blue text-dark"> {{getUserInfo.name}} </span>
        </div>
        <div class="mb-3">
            <span class="mr-2 d-block d-sm-inline-block mb-2 mb-sm-0 text-primary">Email:</span>
            <span class="bg-light-blue text-dark"> {{getUserInfo.email}} </span>
        </div>
        <div class="mb-3">
            <span class="mr-2 d-block d-sm-inline-block mb-2 mb-sm-0 text-primary">Services: </span>
            <span @click="updateTodoistToken()" v-bind:class="{
                    'badge': true,
                    'mx-3': true,
                    'badge-primary': getUserInfo.isTodoistLinked,
                    'badge-danger': !getUserInfo.isTodoistLinked,
                }" > Todoist </span>
        </div>
        <div v-show="isTodoistServiceEditing" class="mb-3">
            <span class="mr-2 d-block d-sm-inline-block mb-2 mb-sm-0 text-primary">Todoist token:</span>
            <input type="text" class="col-5 mr-2 mb-2 mb-sm-0" ref="token">
            <button type="button" class="btn btn-primary mr-2 mb-2 mb-sm-0" @click="onUpdateTodoistToken(getUserInfo.userId)">Update</button>
        </div>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
export default {
  name: 'user',

  data: function() {
    return {
      isTodoistServiceEditing: false
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
  },

  methods: {
    updateTodoistToken: function() {
      console.log('[UI:User] updateTodoistToken: editing=' + this.$data.isTodoistServiceEditing);
      this.$data.isTodoistServiceEditing = !this.$data.isTodoistServiceEditing ;
    },

    onUpdateTodoistToken: function() {
        var token = this.$refs.token.value;
        console.log('[UI:User] update todoist token: ' + token);

        this.$store.dispatch('updateTodoistToken', {token});
        this.$refs.token.value = "";
        this.$data.isTodoistServiceEditing = false;
    },

//    onSync: function() {
//        console.log('[UI:User] sync tasks');
//        var from = this.$refs.fromCheck.checked;
//        var to = this.$refs.toCheck.checked;
//        this.$store.dispatch('syncTasks', {from, to});
//    },
  }

}
</script>