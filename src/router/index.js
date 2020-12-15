import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import cookie from '@/utils/cookie';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_API,
  routes,
});

router.beforeEach((to, from, next) => {
  if (cookie.getCookie('usertoken') || to.path === '/login') {
    next();
  } else {
    next('/login');
  }
});

export default router;
