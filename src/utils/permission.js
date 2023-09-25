// import router from '../router'
// router.beforeEach(async (to, from, next) => {
//     let hasToken = getCache['user/token']
    
//     if (hasToken) {
//       if (to.path === '/login') {
//         next({ path: '/' })
//     //   } else {
//     //     const hasRoles =
//     //       store.getters['acl/admin'] ||
//     //       store.getters['acl/role'].length > 0 ||
//     //       store.getters['acl/ability'].length > 0
//     //     if (hasRoles) {
//     //       next()
//     //     } else {
//     //       try {
//     //         if (loginInterception) {
//     //           await store.dispatch('user/getUserInfo')
//     //         } else {
//     //           //loginInterception为false（关闭登录拦截时）时，创建虚拟角色
//     //           await store.dispatch('user/setVirtualRoles')
//     //         }
  
//     //         let accessRoutes = []
//     //         if (authentication === 'intelligence') {
//     //           accessRoutes = await store.dispatch('routes/setRoutes')
//     //         } else if (authentication === 'all') {
//     //           accessRoutes = await store.dispatch('routes/setAllRoutes')
//     //         }
//     //         accessRoutes.forEach((item) => {
//     //           router.addRoute(item)
//     //         })
  
//     //         next({ ...to, replace: true })
//     //       } catch {
//     //         await store.dispatch('user/resetAll')
//     //         if (recordRoute)
//     //           next({
//     //             path: '/login',
//     //             query: { redirect: to.path },
//     //             replace: true,
//     //           })
//     //         else next({ path: '/login', replace: true })
//     //       }
//     //     }
//       }
//     } else {
//       if (routesWhiteList.indexOf(to.path) !== -1) {
//         next()
//       } else {
//         if (recordRoute)
//           next({ path: '/login', query: { redirect: to.path }, replace: true })
//         else next({ path: '/login', replace: true })
//       }
//     }
//   })
// //   router.afterEach((to) => {
// //     document.title = getPageTitle(to.meta.title)
// //   })
  