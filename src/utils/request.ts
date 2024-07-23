import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { useUserStore } from '@/store/modules/user';
import { getToken } from '@/utils/auth';
import { tansParams, blobValidate } from '@/utils/ruoyi';
import cache from '@/plugins/cache';
import { HttpStatus } from '@/enums/RespEnum';
import { errorCode } from '@/utils/errorCode';
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading';
import FileSaver from 'file-saver';
import { getLanguage } from '@/lang';
import { encryptBase64, encryptWithAes, generateAesKey } from '@/utils/crypto';
import { encrypt } from '@/utils/jsencrypt';
import * as services from "@/services/index";
let downloadLoadingInstance: LoadingInstance;
// 是否显示重新登录
export const isRelogin = { show: false };
export const globalHeaders = () => {
  return {
    Authorization: 'Bearer ' + getToken(),
    clientid: import.meta.env.VITE_APP_CLIENT_ID,
  };
};

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers['clientid'] = import.meta.env.VITE_APP_CLIENT_ID;
// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
});

// 请求拦截器
service.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // 对应国际化资源文件后缀
    config.headers['Content-Language'] = getLanguage();

    const isToken = (config.headers || {}).isToken === false;
    // 是否需要防止数据重复提交
    const isRepeatSubmit = (config.headers || {}).repeatSubmit === false;
    // 是否需要加密
    const isEncrypt = (config.headers || {}).isEncrypt === 'true';
    if (getToken() && !isToken) {
      config.headers['Authorization'] = 'Bearer ' + getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = config.url + '?' + tansParams(config.params);
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }

    if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
      const requestObj = {
        url: config.url,
        data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
        time: new Date().getTime(),
      };
      const sessionObj = cache.session.getJSON('sessionObj');
      if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
        cache.session.setJSON('sessionObj', requestObj);
      } else {
        const s_url = sessionObj.url; // 请求地址
        const s_data = sessionObj.data; // 请求数据
        const s_time = sessionObj.time; // 请求时间
        const interval = 500; // 间隔时间(ms)，小于此时间视为重复提交
        if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
          const message = '数据正在处理，请勿重复提交';
          console.warn(`[${s_url}]: ` + message);
          return Promise.reject(new Error(message));
        } else {
          cache.session.setJSON('sessionObj', requestObj);
        }
      }
    }
    // 当开启参数加密
    if (isEncrypt && (config.method === 'post' || config.method === 'put')) {
      // 生成一个 AES 密钥
      const aesKey = generateAesKey();
      config.headers['encrypt-key'] = encrypt(encryptBase64(aesKey));
      config.data = typeof config.data === 'object' ? encryptWithAes(JSON.stringify(config.data), aesKey) : encryptWithAes(config.data, aesKey);
    }
    // FormData数据去请求头Content-Type
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    console.log('config.url',config.url);
    console.log('process.env.BASE_URL',import.meta.env.BASE_URL);
    console.log("services",services);
    // 使用本地数据render
    if(config.url?.startsWith('/system')&&import.meta.env.VITE_APP_ENV==='development'){
      //console.log('import.meta.env',import.meta.env.VITE_APP_ENV==='development');
      const urlWithoutBase = config.url.replace(service.defaults.baseURL, '');
      const jsonFileUrl = process.env.BASE_URL + 'static/data/' + urlWithoutBase + '.json'; // 假设本地JSON文件放在static/data目录下
      try {
        const response = await fetch(jsonFileUrl);
        const data = await response.json();
        return { data };
      } catch (error) {
        console.error('Failed to load local JSON:', error);
        return Promise.reject(error);
      }
    }
    return config;
  },
  (error: any) => {
    console.log(error);
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (res: AxiosResponse) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || HttpStatus.SUCCESS;
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode['default'];
    // 二进制数据则直接返回
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
      return res.data;
    }
    if (code === 401) {
      // prettier-ignore
      if (!isRelogin.show) {
        isRelogin.show = true;
        ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          isRelogin.show = false;
          useUserStore().logout().then(() => {
              location.href = import.meta.env.VITE_APP_CONTEXT_PATH + 'index';
            });
        }).catch(() => {
          isRelogin.show = false;
        });
      }
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。');
    } else if (code === 1000) {
      return Promise.resolve(res.data.result);
    } else if (code === HttpStatus.SERVER_ERROR) {
      console.log(msg);
      ElMessage({ message: msg, type: 'error' });
      return Promise.reject(new Error(msg));
    } else if (code === HttpStatus.WARN) {
      ElMessage({ message: msg, type: 'warning' });
      return Promise.reject(new Error(msg));
    } else if (code !== HttpStatus.SUCCESS) {
      ElNotification.error({ title: msg });
      return Promise.reject('error');
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
    ElMessage({ message, type: 'error', duration: 5 * 1000 });
    return Promise.reject(error);
  },
);
// 通用下载方法
export function download(url: string, params: any, fileName: string) {
  downloadLoadingInstance = ElLoading.service({ text: '正在下载数据，请稍候', background: 'rgba(0, 0, 0, 0.7)' });
  // prettier-ignore
  return service.post(url, params, {
      transformRequest: [
        (params: any) => {
          return tansParams(params);
        },
      ],
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'blob',
    }).then(async (resp: any) => {
      const isLogin = blobValidate(resp);
      if (isLogin) {
        const blob = new Blob([resp]);
        FileSaver.saveAs(blob, fileName);
      } else {
        const resText = await resp.data.text();
        const rspObj = JSON.parse(resText);
        const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default'];
        ElMessage.error(errMsg);
      }
      downloadLoadingInstance.close();
    }).catch((r: any) => {
      console.error(r);
      ElMessage.error('下载文件出现错误，请联系管理员！');
      downloadLoadingInstance.close();
    });
}

function displayPdfPreview(pdfBlob:any) {
  const url = URL.createObjectURL(pdfBlob);
  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.style.width = '100%'; // 设置宽度
  iframe.style.height = '100%'; // 设置高度
  document.body.appendChild(iframe); // 将 iframe 添加到DOM中
}

export  async function  pdfDownLoad(url: string){
  try {
    const response = await service({
      url: '/your-api-endpoint-to-get-pdf', // 替换为你的API地址
      method: url,
      responseType: 'blob', // 重要！告诉 Axios 把响应体当作 Blob 处理
      headers: { 
        // 如果需要，可以在这里添加认证信息等 headers
      },
    });
    displayPdfPreview(response.data) ; // 返回 Blob 数据
  } catch (error) {
    console.error('Error fetching PDF:', error);
    throw error;
  }
}
// 导出 axios 实例
export default service;
