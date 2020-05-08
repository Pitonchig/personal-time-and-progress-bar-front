<template>
  <div>
    <li class="list-group-item text-left" v-bind:class="{
                'list-group-item-success': model.isCompleted,
                'list-group-item-primary': !model.isCompleted}">
      <div class="row form-check mx-auto">
        <input type="checkbox" class="form-check-input" v-model="model.isCompleted" @change="check(model, $event.target.checked)">
        <div class="col-auto">
          <span @click="editing=true" v-show="!editing">
            {{model.content}}
          </span>
          <span v-show="editing" >
            <input :value="model.content"
              @change="updateContent(model, $event.target.value)"
              @keyup.enter="editing=false"
              type="text"
              class="form-control" >
          </span>
        </div>
      </div>
    </li>
  </div>
</template>

<script>

export default {
  content: 'item',
  props: ['model'],
  data () {
    return {
      editing: false
    }
  },
  methods: {
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

      this.$store.dispatch('updateItem', {item, data});
    }
  }
}

</script>
