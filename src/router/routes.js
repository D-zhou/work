import Home from '../views/Home.vue';
import login from './login';

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard/Dashboard.vue'),
    },
    {
      path: 'follow',
      name: 'follow',
      component: () => import(/* webpackChunkName: "follow" */ '../views/follow/Follow.vue'),
    }],
  },
  ...login,
];
