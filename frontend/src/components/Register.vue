<template>
    <form class="container" @submit.prevent="register()">
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
      <p v-if="error" class="error">{{errors}}</p>
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
      errors: []
    }
  },
  methods: {
    callLogin() {
      this.errors = [];
      this.$store.dispatch("register", { user: this.user, password: this.password, email: this.email} )
        .then(() => {
          this.$router.push('/Protected')
        })
        .catch(error => {
          this.errors.push(error);
          this.error = true
        })
    }
  }
}

</script>

