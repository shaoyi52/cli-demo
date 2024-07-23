// config/config_default.js
const pkg = require("../package.json");
module.exports = {
  projectName: pkg.name,
  version: pkg.version,
  port: 8888,
  proxy: {
    "/render-server/api/*": {
      target: `http://192.168.1.8:8888`,
      changeOrigin: true, // 支持跨域请求
      secure: true, // 支持 https
    },
  },  
  conf: {
    dev: {
      title: "前端模板",
      pathPrefix: "/react-starter", // 统一前端路径前缀
      apiPrefix: "/api/react-starter", //
      debug: true,
      delay: 500,    // mock数据模拟延迟
      mock: {
        // "global.login": "success",
        // "global.loginInfo": "success",
      },
    },
    build: {
      title: "前端模板",
      pathPrefix: "/react-starter",
      apiPrefix: "/api/react-starter",
      debug: false,
      mock: {},
    },
  },
};