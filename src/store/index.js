import Vue from 'vue'
import Vuex from 'vuex'
import { login } from "../api/index.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    permissions: [],
    menus: [],
    // 存储token
    token: localStorage.getItem('userToken') ? localStorage.getItem('userToken') : ''
  },
  mutations: {
    setLoginInfo: (state, userInfo) => {
      console.log("setLoginInfo: ", userInfo);
      state.user = userInfo;
      state.token = userInfo.token;
      state.menus = userInfo.menus;
      localStorage.setItem('userToken', userInfo.token)
    },
    getUserInfo: (state)=>state.user,
    getMenus: (state)=>state.menus,
    getToken: (state)=>state.token,
    getPermissions: (state)=>state.permissions,
  },
  actions: {
    asyncLogin: (loginData) => {
      login(loginData)
    }
  },
  modules: {
  }
})
