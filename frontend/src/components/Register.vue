<template>
    <form class="container" @submit.prevent="register">
      <div class="form-group">
        <label for="input-name">Name</label>
        <input class="form-control" v-model="user" id="input-name" placeholder="Name" >
      </div>
      <div class="form-group">
        <label for="input-password">Password</label>
        <input type="password" v-model="password" class="form-control" id="input-password" placeholder="Password">
      </div>
      <div class="form-group">
        <label for="input-email">Email address</label>
        <input type="email" v-model="email" class="form-control" id="input-email" placeholder="Enter email">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>

      <ul v-if="error" class="list-group">
        <li class="list-group-item list-group-item-danger" v-for="(model, index) in errorsList">{{model.message}}.</li>
      </ul>
    </form>
</template>

<script>

export default {
  name: 'register',

  data () {
    return {
      user: '',
      password: '',
      email: '',
      error: false,
      errorsList: []
    }
  },

  methods: {
    register() {
      this.errorsList = [];
      this.$store.dispatch("registerUser", { user: this.user, password: this.password, email: this.email} )
        .then(() => {
          this.error = false;
          this.$router.push('/protected');
        })
        .catch(error => {
          this.error = true;
          this.errorsList = error.errors;
        });
    }
  }
}

</script>

