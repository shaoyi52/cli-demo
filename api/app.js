/*
 * @Description: Do not edit
 * @Author: yzf
 * @Date: 2022-07-26 10:58:13
 * @LastEditors: yzf
 * @LastEditTime: 2022-07-29 11:45:53
 * @FilePath: \vue3-inith:\gitHub\node-api\app.js
 */
global._base = __dirname + "/"; //设置全局requir目录前缀
const express = require("express"),
  app = express();
let compress = require("compression"); //gzip压缩
require("./common/prototype");
let cors = require("cors");
app.use(compress());
const routeEach = require("./core/routeEach");
const hostArr = require("./common/host"); //允许访问的域名
const { fs, path, tool, log } = require("./common/tool/require");

app.all("*", function (req, res, next) {
  if (hostArr.indexOf(req.headers.host) == -1) {
    log.error(`${req.headers.host}在${new Date().Format()}访问，已被拦截`);
    res.send("非法访问！");
  } else {
    //res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", " 3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  }
});

//morgan(app);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 字段不符合就就不允许
app.use((req, res, next) => {
  console.log(tool.getParams);
  let limit = tool.getParams(req, "limit");
  if (limit && limit > 200) {
    res.send(tool.toJson("", "limit参数不能大于200", 1002));
  } else {
    next();
  }
});
/*
app.use("/a", function(req, res, next) {
  console.log("111");
  next();
});
app.all("/a/b", function(req, res, next) {
  console.log("222");
  res.end("执行完毕");
});
app.all("/c/b", function(req, res, next) {
  console.log("33");
  res.end("执行完毕c b");
});*/
routeEach(app);

module.exports = app;

//捕获node异常  不允许退出
process.on("uncaughtException", function (err) {
  console.log("api异常退出被捕获了");
  console.error(err.stack);
  console.log("Node NOT Exiting...");
});
