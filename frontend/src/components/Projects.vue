<template>
  <div class="container">
    <h6 class="pt-3 pl-3">Projects</h6>
    <hr>
    <div class="mb-3">
        <button type="button" class="btn btn-primary mr-2 mb-2 mb-sm-0" @click="onSave()">Save</button>
        <button type="button" class="btn btn-primary mr-2 mb-2 mb-sm-0" @click="onCancel()">Cancel</button>
        <button type="button" class="btn btn-primary mr-2 mb-2 mb-sm-0" @click="onRefresh()">Refresh</button>
        <button type="button" v-show="getIsTodoistLinked" class="btn btn-primary mr-2 mb-2 mb-sm-0" @click="onImport()">Import</button>
        <button type="button" v-show="getIsTodoistLinked" class="btn btn-primary mr-2 mb-2 mb-sm-0" @click="onExport()">Export</button>
    </div>
    <hr>
    <ul class="list-group-item">
      <Project v-for="(model, index) in projectsList" :model="model" v-bind:key="index"></project>
      <li @click="addProject" class="list-group-item list-group-item-dark text-left">add new project</li>
    </ul>

    <div>{{projectsList}}</div>
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
    },

    getIsTodoistLinked() {
      return this.$store.getters.getUser.isTodoistLinked;
    },

  },
  methods: {
    addProject: function() {
      console.log('[UI:Projects] add new project');
      this.$store.dispatch('addProject')
    },

    onSave: function() {
      console.log('[UI:Projects] onSave');
      this.$store.dispatch('saveProjects')
    },

    onCancel: function() {
        console.log('[UI:Projects] onCancel');
        this.$store.dispatch('getProjects');
    },

    onRefresh: function() {
        console.log('[UI:Projects] onRefresh');
        this.$store.dispatch('getProjects');
    },

    onImport: function() {
        console.log('[UI:Projects] onImport');
        var from = true;
        var to = false;
        this.$store.dispatch('syncTasks', {from, to});
    },

    onExport: function() {
        console.log('[UI:Projects] onExport');
        var from = false;
        var to = true;
        this.$store.dispatch('syncTasks', {from, to});
    },
  },

  components: {
    Project
  }
}

</script>
