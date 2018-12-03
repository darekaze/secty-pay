import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import store from './store';

Vue.use(Router);

const ifAuthenticated = (to, from, next) => {
  next(store.getters.isAuthenticated ? null : '/');
};

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/history',
      name: 'history',
      component: () => import(/* webpackChunkName: "history" */ './views/History.vue'),
      beforeEnter: ifAuthenticated,
    },
  ],
});
