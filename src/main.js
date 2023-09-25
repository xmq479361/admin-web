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
// Vue.prototype.store = store
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
