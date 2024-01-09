import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { RouteRecordRaw } from 'vue-router';

// 获取路由
//export function getRouters(): AxiosPromise<RouteRecordRaw[]> {
export function getRouters(): AxiosPromise<RouteRecordRaw[]> {
  return new Promise((resolve) =>
    resolve({
      code: 200,
      data: [
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
            link: null
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
                link: null
              }
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
                link: null
              }
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
                link: null
              }
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
                link: null
              }
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
                link: null
              }
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
                link: null
              }
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
                link: null
              }
            }
          ]
        },
        {
          name: 'Dynamic',
          path: '/dynamic',
          hidden: false,
          redirect: 'noRedirect',
          component: 'Layout',
          alwaysShow: true,
          meta: {
            title: '临时菜单',
            icon: 'code',
            noCache: false,
            link: null
          },
          children: [
            {
              name: 'SqlApi/list',
              path: 'sqlApi/list',
              hidden: false,
              component: 'dynamic/table/index',
              meta: {
                title: 'SQL字典管理',
                icon: 'drag',
                noCache: false,
                link: null
              }
            },
            {
              name: 'CarSerial/list',
              path: 'CarSerial/list',
              hidden: false,
              component: 'dynamic/table/index',
              meta: {
                title: '车系管理',
                icon: 'checkbox',
                noCache: false,
                link: null
              }
            },
            {
              name: 'ChannelInfo/list',
              path: 'channelInfo/list',
              hidden: false,
              component: 'dynamic/table/index',
              meta: {
                title: '渠道商',
                icon: 'company',
                noCache: false,
                link: null
              }
            },
            {
              name: 'ProductInfo/list',
              path: 'productInfo/list',
              hidden: false,
              component: 'dynamic/table/index',
              meta: {
                title: '产品管理',
                icon: 'dict',
                noCache: false,
                link: null
              }
            },
            {
              name: 'MaintainSupplier/list',
              path: 'maintainSupplier/list',
              hidden: false,
              component: 'dynamic/table/index',
              meta: {
                title: '维修供应商',
                icon: 'build',
                noCache: false,
                link: null
              }
            },
            {
              name: 'BizOrg/list',
              path: 'bizOrg/list',
              hidden: false,
              component: 'dynamic/table/index',
              meta: {
                title: '业务机构',
                icon: 'build',
                noCache: false,
                link: null
              }
            },
            {
              name: 'CarInfo/list',
              path: 'CarInfo/list',
              hidden: false,
              component: 'dynamic/table/index',
              meta: {
                title: '车辆信息',
                icon: 'clipboard',
                noCache: false,
                link: null
              }
            },
            {
              name: 'LiteflowChain/list',
              path: 'LiteflowChain/list',
              hidden: false,
              component: 'dynamic/table/index',
              meta: {
                title: '规则分组',
                icon: 'exit-fullscreen',
                noCache: false,
                link: null
              }
            },
            {
              name: 'CarModel/list',
              path: 'carModel/list',
              hidden: false,
              component: 'dynamic/table/index',
              meta: {
                title: '车型管理',
                icon: 'cascader',
                noCache: false,
                link: null
              }
            },
            {
              name: 'CarBrand/list',
              path: 'CarBrand/list',
              hidden: false,
              component: 'dynamic/table/index',
              meta: {
                title: '车辆品牌',
                icon: 'cascader',
                noCache: false,
                link: null
              }
            },
            {
              name: 'SerialInfo/list',
              path: 'serialInfo/list',
              hidden: false,
              component: 'dynamic/table/index',
              meta: {
                title: '流水号管理',
                icon: 'button',
                noCache: false,
                link: null
              }
            }
          ]
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
            link: null
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
                link: null
              }
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
                link: null
              }
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
                link: null
              }
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
                link: null
              }
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
                link: null
              }
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
                link: null
              }
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
                link: null
              }
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
                link: null
              }
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
                link: null
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
                    link: null
                  }
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
                    link: null
                  }
                }
              ]
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
                link: null
              }
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
                link: null
              }
            }
          ]
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
            link: null
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
                link: null
              }
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
                link: null
              }
            }
          ]
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
            link: null
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
                link: null
              }
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
                link: null
              }
            }
          ]
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
            link: null
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
                link: null
              }
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
                link: null
              }
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
                link: null
              }
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
                link: null
              }
            }
          ]
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
            link: null
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
                link: null
              }
            }
          ]
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
            link: 'https://gitee.com/dromara/RuoYi-Vue-Plus'
          }
        }
      ]
    })
  );
  return request({
    url: '/system/menu/getRouters',
    method: 'get'
  });
}
