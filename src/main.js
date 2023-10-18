import Vue from 'vue'
import 'reset-css';
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css';
Vue.use(ElementUI);

//引入模拟的数据
import './mock/index.js'

Vue.prototype.axios = axios
Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  console.log("next: ", to.path)
  if (!store.state.token) {
    console.log("next matched: ", to.matched)
    if (to.matched.length > 0 && !to.matched.some(record => record.meta.requiresAuth)) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else if (!store.state.permission.permissionList) {
    store.dispatch('permission/FETCH_PERMISSION').then((res) => {
      console.log("next: ", to.path)
      next({ path: to.path })
    })
  } else if (to.path !== '/login') {
    next()
  } else {
    next(from.fullPath)
  }
})

router.afterEach((to, from, next) => {
  var routerList = to.matched
  console.log("setCrumbList", routerList.children)
  store.commit('setMenus', routerList.children)
  store.commit('permission/SET_CURRENT_MENU', to.name)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
