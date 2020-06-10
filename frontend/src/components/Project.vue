<template>
  <div class="mx-lg">
    <li class="list-group-item list-group-item-light row mx-auto">
      <div class="row mx-auto" >
        <div class="col-auto folder " @click="toggle" > {{getTextIcon}} </div>
        <div class="col-auto">
          <span @click="editing=true" v-show="!editing">
            {{model.name}}
          </span>
          <span v-show="editing" >
            <input :value="model.name"
              @change="updateName(model, $event.target.value)"
              @keyup.enter="editing=false"
              type="text"
              class="form-control" >
          </span>
        </div>
        <div class="col-lg progress">
          <div class="progress-bar align-bottom" role="progressbar" v-bind:style="{width: model.percent + '%'}" aria-valuemin="0" aria-valuemax="100">{{model.percent}} %</div>
        </div>
        <button type="button" class="close" aria-label="Close" @click="deleteProject(model)">&times;</button>
      </div>
      <ul class="list-group" v-show="open" :class="{'open': open}">
        <span v-for="(it, index) in model.items" class="row">
          <item  class="col item" :model="it" v-bind:parent="model"></item>
          <button type="button" class="close float-right float-top col-0 item" aria-label="Close" @click="deleteItem(it, model, index)">&times;</button>
        </span>
        <li @click="addItem(model)" class="list-group-item list-group-item-dark text-left">add new task</li>
      </ul>
    </li>
  </div>
</template>

<script>
import Item from './Item.vue';

export default {
  props: {
    model: Object
  },
  data () {
    return {
      editing: false,
      open: true
    }
  },

  computed: {
    getTextIcon() {
      return this.open? '-' : '+';
    },

    getPercent: function() {
      return this.model.percent + '%';
    }

  },

  methods: {
    toggle: function() {
      console.log('[UI:Project] toggle.');
      this.open = !this.open;
    },

    addItem: function(project) {
      console.log('[UI:Project] add new item.');
      this.$store.dispatch('addItem', project)
    },

    deleteItem: function(item, project, index) {
      console.log('[UI:Project] delete item: id=' + item.id + ' parent.id=' + parent.id + ' index=' + index);
      this.$store.dispatch('deleteItem', {item, project, index})
    },

    updateName: function(project, projectName) {
      console.log('[UI:Project] update name: name=' + projectName);
      var data = {
        id: project.id,
        name: projectName
      };
      this.$store.dispatch('updateProject', {project, data});
    },

    deleteProject: function(project) {
      console.log('[UI:Project] delete project.');
      this.$store.dispatch('deleteProject', project)
    },

  },
  components: {
    Item
  }
}
</script>

<style>

.folder {
    font-weight: bold;
    color: #2c3e50;
    font-size: 20px;
}


</style>
