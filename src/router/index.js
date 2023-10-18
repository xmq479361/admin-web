import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Layout from '@/views/layout'

Vue.use(VueRouter)
//常量路由:就是不关用户是什么角色，都可以看见的路由
//什么角色（超级管理员，普通员工）：登录、404、首页
export  const DynamicRoutes = [
  {
    path: '',
    component: Layout,
    name: '首页',
    redirect: '/index',
    meta: {
      requiresAuth: true,
      name: '首页',
    },
    children: [
      { path: 'index', component: Home, name: '首页',
        meta: {
            name: '首页',
            icon: 'icon-home'
        }
      },
      // { path: '/index', component: () => import("@/views/Home.vue"), name: '首页'},
      // { path: '/index/user', componentn: () => import("") }
    ]
  },
  // {
  //   path: '/login',
  //   name: '登录',
  //   component: () => import('@/views/Login.vue')
  // },
  // {
  //   path: "*", name: "404",
  //   component: () => import("@/views/errorPage/404")
  // }
]

export default new VueRouter({
  mode: 'history',
  // scrollBehavior: () => ({ y: 0 }),
  //因为注册的路由是‘死的’，‘活的’路由如果根据不同用户（角色）可以展示不同菜单
  routes: [
      {
          path: '/login',
          name: '登录',
          component: Login
      }
  ]
})
