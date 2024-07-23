import axios from './request';
import {config} from '.';

const reloginFlag = false;
// 标识是否是简单传参数， 值为true标识复杂封装
export const rejectToData = Symbol('flag');

const request=async (options={})=>{
  let retData={success:false};

  if(options.mock){
    retData= await new Promise((resolve)=>{
      setTimeout(()=>{
        resolve(options.mock);
      },options.delay||500);
    });
  }else {
    try{
      const opts = {
        url:options.url,
        baseURl:options.baseURL,
        params:options.params,
        method:options.method,
        headers:options.headers,
        data:options.data,
        timeout:options.timeout,
      };
      const data = await axios(opts);
      retData=data;
    }catch(err){
      retData.success=false;
      retData.message=err.message;
      if(err.response){
        retData.status = err.response.status;
        retData.content = err.response.data;
        retData.message=`游览器请求非正常返回：状态码${retData.status}`;
      }
    }
  }
  return retData;
};


/**
 * 
 * @param ioContent {any:{url,method,mock,apiPrefix}}
 * @param name 
 * @returns 
 */
const createIo = (ioContent,name='')=>{
  const content ={};
  Object.keys(ioContent).forEach((key)=>{
    content[key] = async(options={})=>{
      if(!options[rejectToData]){
        options={
         ...options,
        };
      }
      delete options[rejectToData];

      if(config.debug === false&&
        name&&
        config.mock&&
        config.mock[`${name}.${key}`]&&
        mockData[name]&&
        mockData[name][key]
      ){// 判断是否生产打包mock注入到代码中
        ioContent[key].mock = JSON.parse(JSON.stringify(mockData[name][key][config.mock[`${name}.${key}`]]));
      } else if(name && config.debug === true){//注入mock请求头
        if(options.headers){
          options.headers['mock-key'] = name;
          options.headers['mock-method'] = key;
        } else{
          options['headers']={'mock-key':name,'mock-method':key};
        }
      }
      const option={...ioContent[key],...options};

      option.url=((option.apiPrefix?option.apiPrefix:config.apiPrefix)||'')+option.url;
      return request(option);
    };
  });
  return content;
};
// 导出 axios 实例
export default createIo;
