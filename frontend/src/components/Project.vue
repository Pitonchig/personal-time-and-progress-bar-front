<template>
  <div class="mx-lg">
    <li class="list-group-item list-group-item-light">
      <div class="row mx-auto" @click="toggle">
        <label class="col-md-auto folder">{{model.name}}</label>
        <div class="progress col-sm">
          <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
        </div>
      </div>
      <ul class="list-group" v-show="open" :class="{'open': open}">
        <item v-for="(it, index) in model.items" :model="it" v-bind:key="index"></item>
        <li @click="addItem(model)" class="list-group-item list-group-item-dark text-left">add new task</li>
      </ul>
    </li>
  </div>
</template>

<script>
import Item from './Item.vue';

export default {
  name: 'project',
  props: ['model'],
  data () {
    return {
      open: true
    }
  },
  methods: {
    toggle: function() {
        this.open = !this.open;
    },
    addItem: function(project) {
      console.log('add new item!');
      this.$store.dispatch('addItem', project)
    }
  },
  components: {
    Item
  }
}
</script>
