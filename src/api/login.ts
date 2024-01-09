import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { LoginData, LoginResult, VerifyCodeResult, TenantInfo } from './types';
import { UserInfo } from '@/api/system/user/types';

// pc端固定客户端授权id
const clientId = import.meta.env.VITE_APP_CLIENT_ID;

/**
 * @param data {LoginData}
 * @returns
 */
export function login(data: LoginData): AxiosPromise<LoginResult> {
  const params = {
    ...data,
    clientId: data.clientId || clientId,
    grantType: data.grantType || 'password'
  };
  return request({
    url: '/auth/login',
    headers: {
      isToken: false,
      isEncrypt: true
    },
    method: 'post',
    data: params
  });
}

// 注册方法
export function register(data: any) {
  const params = {
    ...data,
    clientId: clientId,
    grantType: 'password'
  };
  return request({
    url: '/auth/register',
    headers: {
      isToken: false,
      isEncrypt: true
    },
    method: 'post',
    data: params
  });
}

/**
 * 注销
 */
export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  });
}

/**
 * 获取验证码
 */
export function getCodeImg(): AxiosPromise<VerifyCodeResult> {
  return request({
    url: '/auth/code',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  });
}

/**
 * 第三方登录
 */
export function callback(data: LoginData): AxiosPromise<any> {
  const LoginData = {
    ...data,
    clientId: clientId,
    grantType: 'social'
  };
  return request({
    url: '/auth/social/callback',
    method: 'post',
    data: LoginData
  });
}

// 获取用户详细信息
//export function getInfo(): AxiosPromise<UserInfo> {
export function getInfo() {
  return new Promise((resolve) =>
    resolve({
      code: 200,
      data: {
        user: {
          userId: 1,
          tenantId: '000000',
          deptId: 103,
          userName: 'admin',
          nickName: '疯狂的狮子Li',
          userType: 'sys_user',
          email: 'crazyLionLi@163.com',
          phonenumber: '15888888888',
          sex: '0',
          avatar: '',
          status: '0',
          loginIp: '113.89.233.66',
          loginDate: '2024-01-08 16:20:12',
          remark: '管理员',
          createTime: '2023-12-08 10:55:01',
          dept: {
            deptId: 103,
            parentId: 101,
            parentName: '',
            ancestors: '0,100,101',
            deptName: '研发部门',
            orderNum: 1,
            leader: '1',
            //leaderName: '',
            phone: '',
            email: 'xxx@qq.com',
            status: '0',
            createTime: '',
            id: '',
            children: [],
            delFlag: '',
            menuId: ''
          },
          roles: [
            {
              roleId: 1,
              roleName: '超级管理员',
              roleKey: 'superadmin',
              roleSort: 1,
              dataScope: '1',
              menuCheckStrictly: false,
              deptCheckStrictly: false,
              status: '0',
              remark: '管理员',
              createTime: '',
              flag: false,
              delFlag: '0',
              admin: true,
              superAdmin: true
            }
          ],
          roleIds: null,
          postIds: null,
          roleId: 1
        },
        permissions: ['*:*:*'],
        roles: ['superadmin']
      }
    })
  );

  return request({
    url: '/system/user/getInfo',
    method: 'get'
  });
}

// 获取租户列表
export function getTenantList(): AxiosPromise<TenantInfo> {
  return request({
    url: '/auth/tenant/list',
    headers: {
      isToken: false
    },
    method: 'get'
  });
}
