<template>
  <div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Content: </label>
        <div class="col-sm-10">
          <input type="text" class="form-control col-6" ref="content">
        </div>
      </div>
      <div class="form-group row">
        <label for="itemStartDateTime" class="col-sm-2 col-form-label">Start from: </label>
        <div class="col-sm-10" id="itemStartDateTime">
          <input type="time" class="col-2" ref="startTime">
          <input type="date" class="col-4" ref="startDate" data-date-format="YYYY-MM-dd">
        </div>
      </div>
      <div class="form-group row">
        <label for="itemFinishDateTime" class="col-sm-2 col-form-label">Finish to: </label>
        <div class="col-sm-10" id="itemFinishDateTime">
          <input type="time" class="col-2" ref="finishTime">
          <input type="date" class="col-4" ref="finishDate" data-date-format="YYYY-MM-dd">
        </div>
      </div>
      <div class="form-group row">
        <div lass="col-sm-10"> </div>
        <button type="button" class="btn btn-success col-2"  @click="onUpdate()">Update</button>
        <button type="button" class="btn btn-secondary col-2" @click="onCancel()">Cancel</button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'item-editor',

  data: function() {
    return {
      model: null
    }
  },

  props: {
    parent: Object,
  },

  computed: {

  },

  methods: {

    calcStartTime: function() {
      console.log('startTime');
      return this.formatTime(this.$data.model.start)
    },
    calcFinishTime() {
      console.log('finishTime');
      return this.formatTime(this.$data.model.finish);
    },
    calcStartDate() {
      console.log('startDate');
      return this.formatDate(this.$data.model.start);
    },
    calcFinishDate() {
      console.log('finishDate');
      return this.formatDate(this.$data.model.finish);
    },


    setModel: function(data) {
       console.log('[UI:ItemEditor] setModel: data=' + data);
       this.$data.model = data;

       this.$refs.content.value = this.$data.model.content;
       this.$refs.startTime.value = this.calcStartTime();
       this.$refs.startDate.value = this.calcStartDate();
       this.$refs.finishTime.value = this.calcFinishTime();
       this.$refs.finishDate.value = this.calcFinishDate();
    },

    formatDate: function(date) {
      console.log('format date=' + date);
      var year = 1900 + date.getYear();
      console.log('year=' + year);

      var month = 1 + date.getMonth();
      if(month<10) {
        month = '0' + month;
      }
      console.log('month=' + month);

      var day = date.getDate();
      if(day<10) {
        day = '0' + day;
      }
      console.log('day=' + day);

      console.log('formatted=' + year + '-' + month + '-' + day);
      return year + '-' + month + '-' + day;
    },

    formatTime: function(date) {
      console.log('format time=' + date);
      var hours = date.getHours();
      if(hours<10) {
        hours = '0' + hours;
      }

      var minutes = date.getMinutes();
      if(minutes<10) {
        minutes = '0' + minutes;
      }

      console.log('formatted time=' + hours + ':' + minutes);
      return hours + ':' + minutes;
    },


    updateContent: function(item, itemContent) {
      console.log('[UI:ItemEditor] update content: content=' + itemContent);
      var data = item;
      data.content = itemContent;
      this.$store.dispatch('updateItem', {item, data});
    },

    onUpdate: function() {
      console.log('[UI:ItemEditor] update');
      console.log('[UI:ItemEditor] start = ' + this.$refs.startDate.value  + ' ' + this.$refs.startTime.value);
      const start = new Date(this.$refs.startDate.value + 'T' + this.$refs.startTime.value);
      console.log('[UI:ItemEditor] start dt=' + start);

      const finish = new Date(this.$refs.finishDate.value + 'T' + this.$refs.finishTime.value);
      console.log('[UI:ItemEditor] finish dt=' + finish);

      var item = this.$data.model;
      var data = {
        id: item.id,
        content: this.$refs.content.value,
        start: start,
        finish: finish,
        isComplete: item.isComplete,
      };
      this.$emit('update', "update");
      this.$store.dispatch('updateItem', { item, data});
    },

    onCancel: function() {
      console.log('[UI:ItemEditor] cancel');
      this.$emit('cancel');
    },

  }
}
</script>

