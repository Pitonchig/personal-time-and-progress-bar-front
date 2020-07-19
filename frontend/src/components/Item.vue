<template>
  <div v-show="!model.isDeleted">
    <li class="list-group-item text-left" v-bind:class="{
                'list-group-item-success': model.isCompleted,
                'list-group-item-primary': !model.isCompleted && getPercent <100,
                'list-group-item-danger': !model.isCompleted && getPercent==100 }">
      <span class="row mx-auto container">
        <input type="checkbox" class="col-1" v-model="model.isCompleted" @change="check(model, $event.target.checked)" :value="123">
        <span @click="updateEditorComponent(model)" class="col">{{model.content}}</span>

        <div class="col-lg progress">
          <div class="progress-bar align-bottom" role="progressbar" v-bind:style="{width: getPercent + '%'}" aria-valuemin="0" aria-valuemax="100">{{getPercent}} %</div>
        </div>
      </span>
      <item-editor v-show="editing" ref="refItemEditor" v-bind:parent='parent' @update="onItemUpdateOk" @cancel="onItemUpdateCancel"></item-editor>
    </li>
  </div>
</template>

<script>
import ItemEditor from './ItemEditor.vue';

export default {
  props: {
    model: Object,
    parent: Object
  },

  data: function() {
    return {
      editing: false
    }
  },

  computed: {
    getPercent: function() {
      var total = this.model.finish-this.model.start;
      if(total <= 0 ) return 0;

      //var delta = this.model.finish-Date.now();
      var delta;
      if (this.model.isCompleted) {
        delta = this.model.finish-this.model.completion;
      } else {
        delta = this.model.finish-Date.now();
      }

      var percent = Math.round(100* (total-delta)/total);

      if(percent < 0) percent=0;
      if(percent > 100) percent=100;

      console.log('percent=' + percent);
      return percent;
    }
  },

  methods: {
    updateEditorComponent: function(model) {
      console.log('[UI:Item] setItemEditor model: editing=' + this.$data.editing);
      this.$data.editing = !this.$data.editing ;
      this.$refs.refItemEditor.setModel(model);
    },

    updateContent: function(item, itemContent) {
      console.log('[UI:Item] update content: content=' + itemContent);
      var data = item;
      data.content = itemContent;
      this.$store.dispatch('updateItem', {item, data});
    },

    check: function(item, flag) {
      console.log('[UI:Item] checked: flag=' + flag + ' id=' + item.id + ' item.content=' + item.content);
      var data = item;
      data.isCompleted = flag;
      if (flag) data.completion = new Date();
      this.$store.dispatch('updateItem', {item, data});
    },

    deleteItem: function(item, parent) {
      console.log('[UI:Item] delete item.');
      this.$store.dispatch('deleteItem', {item, parent})
    },

    onItemUpdateOk: function(msg) {
      console.log('[UI:Item] on item update ok: msg=' + msg);
      this.editing=false;
    },

    onItemUpdateCancel: function(msg) {
      console.log('[UI:Item] on item update cancel.');
      this.editing=false;
    },

  },
  components: {
    ItemEditor
  }
}

</script>
