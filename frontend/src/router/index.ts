import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/Login.vue'
import RegisterPage from '@/views/Register.vue'
import UsersPage from '@/views/Users.vue';
import AboutPage from '@/views/About.vue';
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
    },
    children: [
      {path: '/', name: 'users', component: UsersPage},
      {path: '/about', name: 'about', component: AboutPage},
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {path: '/register', name: 'Register', component: RegisterPage},
];

const router = new VueRouter({
  routes
});

export default router
