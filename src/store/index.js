import Vue from 'vue';
import Vuex from 'vuex';
import cookie from "@/utils/cookie";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: cookie.getCookie('userInfo') ? JSON.parse(cookie.getCookie('userInfo')) : '',
  },
  mutations: {
    getUserInfo(state, obj) {
      state.userInfo = obj.userInfo
      cookie.setCookies({ 'userInfo': JSON.stringify(obj.userInfo) });
    }
  },
  actions: {
  },
  modules: {
  },
});
