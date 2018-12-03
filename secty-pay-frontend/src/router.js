import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import store from './store';

Vue.use(Router);

const requireAuth = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/');
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
      beforeEnter: requireAuth,
    },
  ],
});
