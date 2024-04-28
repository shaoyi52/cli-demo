import axios from 'axios';

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
const publicKey = '8121QQ00';
const privateKey = 'b8a1f115-cab2-4830-9180-6d663cbb7d53';
const service = axios.create({
  auth: {
    username: publicKey,
    password: privateKey
  },
  timeout: 50000
});
// 响应拦截器
service.interceptors.response.use(
  (res: AxiosResponse) => {
    // 未设置状态码则默认成功状态
    const code = res.status;
    // 获取错误信息
    const msg = res.data.msg;
    // 二进制数据则直接返回
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
      return res.data;
    }
    if (code === 401) {
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。');
    } else if (code === 200) {
      return Promise.resolve(res.data.data);
    } else {
      return Promise.resolve(res.data);
    }
  },
  (error: any) => {
    let { message } = error;
    if (message == 'Network Error') {
      message = '后端接口连接异常';
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时';
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常';
    }
    ElMessage({ message: message, type: 'error', duration: 5 * 1000 });
    return Promise.reject(error);
  }
);
// 导出 axios 实例
export default service;
