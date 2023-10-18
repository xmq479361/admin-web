import Vue from 'vue'
import axios from 'axios'
import QS from 'qs' //视情况用于不用;
import { Loading, Message } from 'element-ui';
import store from '../store/index'
import {
  baseURL,
  contentType,
  requestTimeout,
  successCode,
  tokenName,
} from '@/config'

let loading //定义loading变量

function startLoading() { //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '努力加载中……',
    background: 'rgba(0, 0, 0, 0.5)'
  })
}

function endLoading() { //使用Element loading-close 方法
  loading.close()
}

//那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
//声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

//生成一个axios实例
var instance = axios.create({
  baseURL: baseURL,
});
//1.请求超时时间
instance.defaults.timeout = 10000;
//2.post请求头 
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//3.公共部分(请求带token设置)
//instance.defaults.headers.common['Authorization'] = store.state.token;
//4.返回数据类型的定义
//instance.defaults.responseType = 'json';
//5.带cookie请求
instance.defaults.withCredentials = true

// 请求拦截器
instance.interceptors.request.use(
  config => {
    //1.全局loadin配置
    /*2.token校验:一般是在登录完成之后,将用户的token通过localStorage或者cookie存在本地;
    然后用户每次在进入页面的时候（即在main.js中），会首先从本地存储中读取token;
    如果token存在说明用户已经登陆过则更新vuex中的token状态;
    然后,在每次请求接口的时候,都会在请求的header中携带token;
    后台人员就可以根据你携带的token来判断你的登录是否过期,如果没有携带,则说明没有登录过。
    v1.每次发送请求之前判断vuex中是否存在token        
    v2.如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    v3.即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断*/
    const token = store.state.token;
    token && (config.headers.Authorization = token);
    if (config.method == 'post') {
      console.log('post请求统一需要做什么判断')
    }
    config.headers.Accept = 'application/json'; //规定接受形式json格式
    showFullScreenLoading() //开启loading
    console.log(config, 'config请求拦截器')
    return config;
  }, error => {
    return Promise.reject(error);
  });

// 响应拦截器
instance.interceptors.response.use(
  response => {
    console.log(response, 'response响应拦截器')
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
    //否则的话抛出错误
    if (response.status === 200) {
      tryHideFullScreenLoading() //关闭loading
      // Message({
      //   showClose: true,
      //   message: '响应成功',
      //   type: 'success'
      // })
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  }, error => {
    console.log(error, 'error')
    if (error.response.data.status) {
      console.log('后台错误码统一处理')
      switch (error.response.data.status) {
        // 401:未登录;未登录则跳转登录页面，并携带当前页面的路径;在登录成功后返回当前页面，这一步需要在登录页操作。                
        case 401:
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;
        // 403:token过期;登录过期对用户进行提示;清除本地token和清空vuex中token对象;跳转登录页面                
        case 403:
          Message({
            showClose: true,
            message: '登录过期，请重新登录',
            duration: 1000,
            type: 'warning'
          })
          //清除token
          localStorage.removeItem('userToken');
          store.commit('LOGIN_OUT', null);
          //跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
          break;
        //404请求不存在
        case 404:
          Message({
            showClose: true,
            message: '网络请求不存在',
            duration: 1000,
            type: 'error'
          })
          break;
        //其他错误,直接抛出错误提示
        default:
          Message({
            showClose: true,
            message: error.response.data.message,
            duration: 1000,
            type: 'error'
          })
      }
    }
    return Promise.reject(error);
  });


// 封装axios的get请求
export function getData(url, params) {
  return new Promise((resolve, reject) => {
    instance.get(url, params).then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
// 封装axios的post请求
export function postData(url, params) {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      instance.post(url, QS.stringify(params)).then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
    }, 1000)
  });
}