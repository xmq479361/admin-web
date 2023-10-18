import Vue from 'vue'
import Vuex from 'vuex'
// import { anyRoutes, resetRouter,asyncRoutes,constantRoutes} from '../router';
// import router from '../router';
// import { login } from "../api/index.js";
import modules from './modules'

Vue.use(Vuex)

// //定义一个函数：两个数组进行对比，对比出当前用户到底显示哪些异步路由
// const computedAsyncRoutes = (asyncRoutes,routes)=>{
//   //过滤出当前用户【超级管理|普通员工】需要展示的异步路由
//   console.log("computedAsyncRoutes: ", asyncRoutes, routes)
//  asyncRoutes.filter(item=>{
//     console.log("computedAsyncRoutes filter: ", item.path, item)
//       //数组当中没有这个元素返回索引值-1，如果有这个元素返回的索引值一定不是-1 
//      if(routes.indexOf(item.path)!=-1){
//        //递归:别忘记还有2、3、4、5、6级路由
//        if(item.children && item.children.length > 0){
//            item.children = computedAsyncRoutes(item.children, routes);
//        }
//        return true;
//      }
//   })
// }

export default new Vuex.Store({
  state: {
    user: {},
    permissions: [],
    menus: [],
    // 存储token
    token: localStorage.getItem('userToken') ? localStorage.getItem('userToken') : ''
  },
  mutations: {
    setLoginInfo: (state, data) => {
      console.log("setLoginInfo: ", data);
      const {token, userInfo} = data
      state.user = userInfo;
      state.token = token;
      localStorage.setItem('userToken', userInfo.token)
      // store.commit('SET_RESULTASYNCROUTES', computedAsyncRoutes(asyncRoutes, routes));
      // this.SET_RESULTASYNCROUTES(computedAsyncRoutes(asyncRoutes, routes))
    },
    getUserInfo: (state)=>state.user,
    getMenus: (state)=>state.menus,
    setMenus: (state, menus)=>state.menus = menus,
    getToken: (state)=>state.token,
  },
  actions: {
    asyncLogin: (loginData) => {
      login(loginData)
    }
  },
  modules
})
