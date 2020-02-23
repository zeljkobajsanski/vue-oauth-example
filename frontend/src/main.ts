import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import VueAxios from "vue-axios";
import VueAuthenticate from 'vue-authenticate';
Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(VueAuthenticate, {
  registerUrl: 'api/authentication/register',
  loginUrl: 'api/authentication/login',
  providers: {
    facebook: {
      clientId: '2081803578771989',
      url: '/api/authentication/authenticate/facebook',
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
