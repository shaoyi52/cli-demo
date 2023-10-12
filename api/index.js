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
require("./common/prototype/_index");
let cors = require("cors");
app.use(compress());
const routeEach = require("./core/_routeEach");
//const hostArr = require("./common/host"); //允许访问的域名
const { fs, path, tool, log } = require("./common/tool/_require");

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
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

routeEach(app);
module.exports = app;