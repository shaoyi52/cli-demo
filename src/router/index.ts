import type { RouteOption } from 'vue-router';
import { createWebHistory, createRouter } from 'vue-router';
/* Layout */
import Layout from '@/_layout/index.vue';

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由
export const constantRoutes: RouteOption[] = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/social-callback',
    hidden: true,
    component: () => import('@/layout/components/SocialCallback/index.vue'),
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
    hidden: true,
  },
  {
    path: '/register',
    component: () => import('@/views/register.vue'),
    hidden: true,
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404.vue'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@/views/error/401.vue'),
    hidden: true,
  },
  {
    path: '',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/index.vue'),
        name: 'Index',
        meta: { title: '首页', icon: 'dashboard', affix: true },
      },
    ],
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: () => import('@/views/system/user/profile/index.vue'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' },
      },
    ],
  },
];

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes: RouteOption[] = [
  {
    path: '/system/user-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [
      {
        path: 'role/:userId(\\d+)',
        component: () => import('@/views/system/user/authRole.vue'),
        name: 'AuthRole',
        meta: { title: '分配角色', activeMenu: '/system/user', icon: '' },
      },
    ],
  },
  {
    path: '/system/role-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:role:edit'],
    children: [
      {
        path: 'user/:roleId(\\d+)',
        component: () => import('@/views/system/role/authUser.vue'),
        name: 'AuthUser',
        meta: { title: '分配用户', activeMenu: '/system/role', icon: '' },
      },
    ],
  },
  {
    path: '/system/dict-data',
    component: Layout,
    hidden: true,
    permissions: ['system:dict:list'],
    children: [
      {
        path: 'index/:dictId(\\d+)',
        component: () => import('@/views/system/dict/data.vue'),
        name: 'Data',
        meta: { title: '字典数据', activeMenu: '/system/dict', icon: '' },
      },
    ],
  },
  {
    path: '/system/oss-config',
    component: Layout,
    hidden: true,
    permissions: ['system:oss:list'],
    children: [
      {
        path: 'index',
        component: () => import('@/views/system/oss/config.vue'),
        name: 'OssConfig',
        meta: { title: '配置管理', activeMenu: '/system/oss', icon: '' },
      },
    ],
  },
  {
    path: '/tool/gen-edit',
    component: Layout,
    hidden: true,
    permissions: ['tool:gen:edit'],
    children: [
      {
        path: 'index/:tableId(\\d+)',
        component: () => import('@/views/tool/gen/editTable.vue'),
        name: 'GenEdit',
        meta: { title: '修改生成配置', activeMenu: '/tool/gen', icon: '' },
      },
    ],
  },
];

// 暂替后端获取数据
export const getRoutes=()=>{
  const menuList=[
    {
      title:'平台首页',key:"sysHome",menus:[
        {
          name: 'Afc',
          path: '/afc',
          hidden: false,
          redirect: 'noRedirect',
          component: 'Layout',
          alwaysShow: true,
          meta: {
            title: '资源管理',
            icon: 'tree',
            noCache: false,
            link: null,
          },
          children: [
            {
              name: 'Meta',
              path: 'meta',
              hidden: true,
              component: 'afc/meta/index',
              meta: {
                title: '元数据管理',
                icon: '#',
                noCache: false,
                link: null,
              },
            },
            {
              name: 'Model',
              path: 'model',
              hidden: false,
              component: 'afc/model/index',
              meta: {
                title: '数据模型',
                icon: 'cascader',
                noCache: false,
                link: null,
              },
            },
            {
              name: 'Modelmeta',
              path: 'modelmeta',
              hidden: true,
              component: 'afc/modelmeta/index',
              meta: {
                title: '模型元数据',
                icon: '#',
                noCache: false,
                link: null,
              },
            },
            {
              name: 'View',
              path: 'view',
              hidden: false,
              component: 'afc/view/index',
              meta: {
                title: '视图资源',
                icon: 'build',
                noCache: false,
                link: null,
              },
            },
            {
              name: 'Designer/preview',
              path: 'designer/preview',
              hidden: true,
              component: 'afc/designer/index',
              meta: {
                title: '预览表单',
                icon: 'education',
                noCache: false,
                link: null,
              },
            },
            {
              name: 'Afcdata',
              path: 'afcdata',
              hidden: true,
              component: 'afc/data/index',
              meta: {
                title: '数据存储',
                icon: '#',
                noCache: false,
                link: null,
              },
            },
            {
              name: 'Designer/index',
              path: 'designer/index',
              hidden: true,
              component: 'afc/designer/index',
              meta: {
                title: '表单构建',
                icon: 'build',
                noCache: false,
                link: null,
              },
            },
          ],
        },       
        {
          name: 'System',
          path: '/system',
          hidden: false,
          redirect: 'noRedirect',
          component: 'Layout',
          alwaysShow: true,
          meta: {
            title: '系统管理',
            icon: 'system',
            noCache: false,
            link: null,
          },
          children: [
            {
              name: 'User',
              path: 'user',
              hidden: false,
              component: 'system/user/index',
              meta: {
                title: '用户管理',
                icon: 'user',
                noCache: false,
                link: null,
              },
            },
            {
              name: 'Role',
              path: 'role',
              hidden: false,
              component: 'system/role/index',
              meta: {
                title: '角色管理',
                icon: 'peoples',
                noCache: false,
                link: null,
              },
            },
            {
              name: 'Menu',
              path: 'menu',
              hidden: false,
              component: 'system/menu/index',
              meta: {
                title: '菜单管理',
                icon: 'tree-table',
                noCache: false,
                link: null,
              },
            },
            {
              name: 'Dept',
              path: 'dept',
              hidden: false,
              component: 'system/dept/index',
              meta: {
                title: '部门管理',
                icon: 'tree',
                noCache: false,
                link: null,
              },
            },
            {
              name: 'Post',
              path: 'post',
              hidden: false,
              component: 'system/post/index',
              meta: {
                title: '岗位管理',
                icon: 'post',
                noCache: false,
                link: null,
              },
            },
            {
              name: 'Dict',
              path: 'dict',
              hidden: false,
              component: 'system/dict/index',
              meta: {
                title: '字典管理',
                icon: 'dict',
                noCache: false,
                link: null,
              },
            },
            {
              name: 'Config',
              path: 'config',
              hidden: false,
              component: 'system/config/index',
              meta: {
                title: '参数设置',
                icon: 'edit',
                noCache: false,
                link: null,
              },
            },
            {
              name: 'Notice',
              path: 'notice',
              hidden: false,
              component: 'system/notice/index',
              meta: {
                title: '通知公告',
                icon: 'message',
                noCache: false,
                link: null,
              },
            },
            {
              name: 'Log',
              path: 'log',
              hidden: false,
              redirect: 'noRedirect',
              component: 'ParentView',
              alwaysShow: true,
              meta: {
                title: '日志管理',
                icon: 'log',
                noCache: false,
                link: null,
              },
              children: [
                {
                  name: 'Operlog',
                  path: 'operlog',
                  hidden: false,
                  component: 'monitor/operlog/index',
                  meta: {
                    title: '操作日志',
                    icon: 'form',
                    noCache: false,
                    link: null,
                  },
                },
                {
                  name: 'Logininfor',
                  path: 'logininfor',
                  hidden: false,
                  component: 'monitor/logininfor/index',
                  meta: {
                    title: '登录日志',
                    icon: 'logininfor',
                    noCache: false,
                    link: null,
                  },
                },
              ],
            },
            {
              name: 'Oss',
              path: 'oss',
              hidden: false,
              component: 'system/oss/index',
              meta: {
                title: '文件管理',
                icon: 'upload',
                noCache: false,
                link: null,
              },
            },
            {
              name: 'Client',
              path: 'client',
              hidden: false,
              component: 'system/client/index',
              meta: {
                title: '客户端管理',
                icon: 'international',
                noCache: false,
                link: null,
              },
            },
          ],
        },
        {
          name: 'Biz',
          path: '/biz',
          hidden: false,
          redirect: 'noRedirect',
          component: 'Layout',
          alwaysShow: true,
          meta: {
            title: '业务管理',
            icon: 'form',
            noCache: false,
            link: null,
          },
          children: [
            {
              name: 'Info',
              path: 'info',
              hidden: false,
              component: 'biz/info/index',
              meta: {
                title: '仓库信息',
                icon: '#',
                noCache: false,
                link: null,
              },
            },
            {
              name: 'Order',
              path: 'order',
              hidden: false,
              component: 'biz/order/index',
              meta: {
                title: '仓库订单',
                icon: '#',
                noCache: false,
                link: null,
              },
            },
          ],
        },
        {
          name: 'Tenant',
          path: '/tenant',
          hidden: false,
          redirect: 'noRedirect',
          component: 'Layout',
          alwaysShow: true,
          meta: {
            title: '租户管理',
            icon: 'chart',
            noCache: false,
            link: null,
          },
          children: [
            {
              name: 'Tenant',
              path: 'tenant',
              hidden: false,
              component: 'system/tenant/index',
              meta: {
                title: '租户管理',
                icon: 'list',
                noCache: false,
                link: null,
              },
            },
            {
              name: 'TenantPackage',
              path: 'tenantPackage',
              hidden: false,
              component: 'system/tenantPackage/index',
              meta: {
                title: '租户套餐管理',
                icon: 'form',
                noCache: false,
                link: null,
              },
            },
          ],
        },
        {
          name: 'Monitor',
          path: '/monitor',
          hidden: false,
          redirect: 'noRedirect',
          component: 'Layout',
          alwaysShow: true,
          meta: {
            title: '系统监控',
            icon: 'monitor',
            noCache: false,
            link: null,
          },
          children: [
            {
              name: 'Online',
              path: 'online',
              hidden: false,
              component: 'monitor/online/index',
              meta: {
                title: '在线用户',
                icon: 'online',
                noCache: false,
                link: null,
              },
            },
            {
              name: 'Cache',
              path: 'cache',
              hidden: false,
              component: 'monitor/cache/index',
              meta: {
                title: '缓存监控',
                icon: 'redis',
                noCache: false,
                link: null,
              },
            },
            {
              name: 'Admin',
              path: 'Admin',
              hidden: false,
              component: 'monitor/admin/index',
              meta: {
                title: 'Admin监控',
                icon: 'dashboard',
                noCache: false,
                link: null,
              },
            },
            {
              name: 'Powerjob',
              path: 'powerjob',
              hidden: false,
              component: 'monitor/powerjob/index',
              meta: {
                title: '任务调度中心',
                icon: 'job',
                noCache: false,
                link: null,
              },
            },
          ],
        },
        {
          name: 'Tool',
          path: '/tool',
          hidden: false,
          redirect: 'noRedirect',
          component: 'Layout',
          alwaysShow: true,
          meta: {
            title: '系统工具',
            icon: 'tool',
            noCache: false,
            link: null,
          },
          children: [
            {
              name: 'Gen',
              path: 'gen',
              hidden: false,
              component: 'tool/gen/index',
              meta: {
                title: '代码生成',
                icon: 'code',
                noCache: false,
                link: null,
              },
            },
          ],
        },
        {
          name: 'Https://gitee.com/dromara/RuoYi-Vue-Plus',
          path: 'https://gitee.com/dromara/RuoYi-Vue-Plus',
          hidden: false,
          component: 'Layout',
          meta: {
            title: 'PLUS官网',
            icon: 'guide',
            noCache: false,
            link: 'https://gitee.com/dromara/RuoYi-Vue-Plus',
          },
        },
      ],
    },{title:'商户管理',key:"shManage",menus:[
      {
        name: 'Demo',
        path: '/demo',
        hidden: false,
        redirect: 'noRedirect',
        component: 'Layout',
        alwaysShow: true,
        meta: {
          title: '示例',
          icon: 'tool',
          noCache: false,
          link: null,
        },
        children: [
          {
            name: 'dynamicTabe',
            path: 'dynamicTabe',
            hidden: false,
            component: 'dynamic/table/index',
            meta: {
              title: '测试动态表单',
              icon: 'code',
              noCache: false,
              link: null,
            },
          },
          {
            name: 'dashboardBase',
            path: 'dashboardBase',
            hidden: false,
            component: 'demo/dashboard/base',
            meta: {
              title: '概览仪表盘',
              icon: 'code',
              noCache: false,
              link: null,
            },
          },
          {
            name: 'demo',
            path: 'demo',
            hidden: false,
            component: 'demo/demo/index',
            meta: {
              title: '示例主页',
              icon: 'code',
              noCache: false,
              link: null,
            },
          },
          {
            "name": "form",
            "path": "form",
            "hidden": false,
            "redirect": "noRedirect",
            "component": "ParentView",
            "alwaysShow": true,
            "meta": {
                "title": "表单管理",
                "icon": "log",
                "noCache": false,
                "link": null,
            },
            "children": [
                {
                    "name": "base-form",
                    "path": "base-form",
                    "hidden": false,
                    "component": "demo/form/base-form",
                    "meta": {
                        "title": "基础表单",
                        "icon": "form",
                        "noCache": false,
                        "link": null,
                    },
                },
                {
                  "name": "step-form",
                  "path": "step-form",
                  "hidden": false,
                  "component": "demo/form/step-form",
                  "meta": {
                      "title": "分布表单",
                      "icon": "form",
                      "noCache": false,
                      "link": null,
                  },
              },
              {
                "name": "formDetail",
                "path": "detail",
                "hidden": false,
                "component": "demo/form/detail",
                "meta": {
                    "title": "详细",
                    "icon": "form",
                    "noCache": false,
                    "link": null,
                },
            },
              
            ],
        },
        ],
      },
      {
        name: 'Data',
        path: '/Data',
        hidden: false,
        redirect: 'noRedirect',
        component: 'Layout',
        alwaysShow: true,
        meta: {
          title: '数据录入',
          icon: 'tool',
          noCache: false,
          link: null,
        },
        children: [
          {
            name: 'proform',
            path: 'proform',
            hidden: false,
            component: 'demo/datainput/proForm',
            meta: {
              title: '表单',
              icon: 'code',
              noCache: false,
              link: null,
            },
          },
        ],
      },
    ]},

  ];
  let  allMenu=[];
  menuList.forEach(item=>{
    allMenu=allMenu.concat(item.menus);
   });
 
  
 return {allMenu,menuList} ;
};

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_CONTEXT_PATH),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
