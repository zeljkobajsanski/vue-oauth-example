import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios';
import VueAxios from "vue-axios";
import VueAuthenticate from 'vue-authenticate';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
