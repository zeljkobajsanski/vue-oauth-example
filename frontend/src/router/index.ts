import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/Login.vue'
import RegisterPage from '@/views/Register.vue'
import store from '../store'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (store.getters.isAuthenticated) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {path: '/register', name: 'Register', component: RegisterPage}
];

const router = new VueRouter({
  routes
});

export default router
