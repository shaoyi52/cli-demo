
// 需要先初始化
const path = require('path');
const fs = require("fs");
const {syncWalkDir}=require('./util');
let confGlobal = {};
let mockJsonData ={};

exports.getConfig=()=> confGlobal;
exports.getMockJson=()=>mockJsonData;

const init=(env)=>{
  delete require.cache[require.resolve('../config')];
  const config = require('../config');
  const confJson = env ==='build'? config.conf.build:config.conf.dev;
  confGlobal = confJson;
  // 1.根据环境变量自动生成
  fs.writeFileSync(path.join(__dirname,'../config/conf.json'),JSON.stringify(confGlobal,null,'\t'));
  buildMock(confJson);
};

// 生成mock文件数据
const buildMock = (conf)=>{
  let mockJson ={};
  const mockFiles = syncWalkDir(path.join(__dirname,'../src'),(file)=> /-mock.json$/.test(file));
  console.log('build mocks: ->>>>>>>>>>>>>',mockFiles);
  mockFiles.forEach(filePath=>{
    const p = path.parse(filePath);
    const mockKey=p.name.substring(0,p.name.length-5);
    if(mockJson[mockKey]){
      console.error(`有相同的mock文件名称${p.name}存在`,filePath);
    }
    delete require.cache[require.resolve(filePath)];
    mockJson[mockKey] = require(filePath);
  });

  //如果是打包环境，最小化mock资源数据
  const  mockMap = conf.mock|| {};
  const buildMockJson ={};
  Object.keys(mockMap).forEach(key=>{
    const [name,method] = key.split('.');
    console.log('mockJson',mockJson,name,method);

    if(mockJson[name][method] && mockJson[name][method][mockMap[key]]){
      if(!buildMockJson[name]) buildMockJson[name]={};
      if(!buildMockJson[name][method]) buildMockJson[name][method]={};
      buildMockJson[name][method][mockMap[key]]= mockJson[name][method][mockMap[key]];
    }
  });

  mockJsonData = buildMockJson;
  fs.writeFileSync(path.join(__dirname,'../mock.json'),JSON.stringify(buildMockJson,null,'\t'));

};

//监听配置文件目录下的config.js 和 config_default.js
const confPath = path.join(__dirname,'../config');

if((env= process.env.BUILD_ENV? 'build':'dev') ==='dev'){
  fs.watch(confPath,async(event,filename)=>{
    if(filename === 'config.js' || filename === 'config_default.js'){
      delete require.cache[path.join(confPath,filename)];
      delete require.cache[require.resolve('../config')];
      const config = require('../config');
      const env= process.env.BUILD_ENV? 'build':'dev';
      const confJson=env==='build'? config.conf.build:config.conf.dev;
      if(JSON.stringify(confJson)!==JSON.stringify(confGlobal)){
        this.init();
      }
    }
  });
}


exports.init=init;