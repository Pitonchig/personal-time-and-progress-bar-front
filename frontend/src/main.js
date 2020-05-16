import Vue from 'vue'
import App from './App.vue'
import router from './router'
import $ from 'jquery'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'

Vue.config.productionTip = false;

// Bootstrap
Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: h => h(App),

  created: function () {
    console.log("Vue application created!");
  }

}).$mount('#app');

