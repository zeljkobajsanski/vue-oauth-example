import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios';
import VueAxios from "vue-axios";
import VueMeta from 'vue-meta'

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VueMeta);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
