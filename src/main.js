import Vue from 'vue';
import {
  Form, Button, Icon, Field, Popup, List, SwipeCell, Search, Col, Row, Toast, Tab, Tabs, Picker
} from 'vant';
import App from './App.vue';
// import './registerServiceWorker';
import router from './router';
import store from './store';
import 'assets/reset.less';
import 'normalize.css/normalize.css';
// import 'assets/fonts/iconfont.css';

Vue.use(Col);
Vue.use(Row);
Vue.use(Form);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Field);
Vue.use(Popup);
Vue.use(List);
Vue.use(SwipeCell);
Vue.use(Search);
Vue.use(Toast);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Picker);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
