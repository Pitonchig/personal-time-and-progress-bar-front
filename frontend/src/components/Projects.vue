<template>
  <div class="container">
    <h6 class="pt-3 pl-3">Projects</h6>
    <hr>
    <ul class="list-group-item">
      <Project v-for="(model, index) in projectsList" :model="model" v-bind:key="index"></project>
      <li @click="addProject" class="list-group-item list-group-item-dark text-left">add new project</li>
    </ul>
  </div>
</template>

<script>
import Project from './Project.vue';

export default {
  data () {
    return {
    }
  },
  computed: {
    projectsList() {
      return this.$store.getters.getProjects;
    }
  },
  methods: {
    addProject: function() {
      console.log('[UI:Projects] add new project');
      this.$store.dispatch('addProject')
    },
  },

  components: {
    Project
  }
}

</script>
