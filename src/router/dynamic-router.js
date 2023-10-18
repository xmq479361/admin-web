const SysLayout = () => import('@/views/sys')
export const dynamicRoutes = [
    {
    name: '学生管理',
    path: '/student',
    redirect: '/student/user',
    requiresAuth: true,
    children: [
        {
        name: 'student',
        path: '/student/user',
        requiresAuth: true,
        component: ()=> import('@/views/student/Student.vue'),
        children: []
        }
    ]
    },
  {
    name: '系统管理',
    path: '/sys',
    component: SysLayout,
    redirect: '/sys/user',
    children: [{
        name: '人员管理',
        path: '/sys/user',
        component: ()=> import('@/views/sys/user/index.vue'),
        children: []
        },{
        name: '角色管理',
        component: ()=> import('@/views/sys/role/index.vue'),
        path: '/sys/roles',
        children: []
        }
    ]
    }
  ];
export default dynamicRoutes