import { to } from 'await-to-js';
import defAva from '@/assets/images/profile.jpg';
import store from '@/store';
import { getToken, removeToken, setToken } from '@/utils/auth';
import { login as loginApi, logout as logoutApi, getInfo as getUserInfo } from '@/api/login';
import type { LoginData } from '@/api/types';

export const useUserStore = defineStore('user', () => {
  const token = ref(getToken());
  const name = ref('');
  const nickname = ref('');
  const userId = ref<string | number>('');
  const avatar = ref('');
  const roles = ref<Array<string>>([]); // 用户角色编码集合 → 判断路由权限
  const permissions = ref<Array<string>>([]); // 用户权限编码集合 → 判断按钮权限

  /**
   * 登录
   * @param userInfo
   * @returns
   */
  const login = async (userInfo: LoginData): Promise<void> => {
    //const [err, res] = await to(loginApi(userInfo));
    const err = '',
      res = { data: { access_token: 'accesstttsssd' } };
    if (res) {
      const data = res.data;
      setToken(data.access_token);
      token.value = data.access_token;
      return Promise.resolve();
    }
    return Promise.reject(err);
  };

  // 获取用户信息
  const getInfo = async (): Promise<void> => {
    //const [err, res] = await to(getUserInfo());
    const err = null;
    const res = {
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
            menuId: '',
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
              superAdmin: true,
            },
          ],
          roleIds: null,
          postIds: null,
          roleId: 1,
        },
        permissions: ['*:*:*'],
        roles: ['superadmin'],
      },
    };
    if (res) {
      const data = res.data;
      const user = data.user;
      const profile = user.avatar == '' || user.avatar == null ? defAva : user.avatar;

      if (data.roles && data.roles.length > 0) {
        // 验证返回的roles是否是一个非空数组
        roles.value = data.roles;
        permissions.value = data.permissions;
      } else {
        roles.value = ['ROLE_DEFAULT'];
      }
      name.value = user.userName;
      nickname.value = user.nickName;
      avatar.value = profile;
      userId.value = user.userId;
      return Promise.resolve();
    }
    return Promise.reject(err);
  };

  // 注销
  const logout = async (): Promise<void> => {
    await logoutApi();
    token.value = '';
    roles.value = [];
    permissions.value = [];
    removeToken();
  };

  return {
    userId,
    token,
    nickname,
    avatar,
    roles,
    permissions,
    login,
    getInfo,
    logout,
  };
});

export default useUserStore;
// 非setup
export function useUserStoreHook() {
  return useUserStore(store);
}
