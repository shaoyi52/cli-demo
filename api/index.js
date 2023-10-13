/*
 * @Description: Do not edit
 * @Author: yzf
 * @Date: 2022-07-26 10:58:13
 * @LastEditors: yzf
 * @LastEditTime: 2022-07-29 11:45:53
 * @FilePath: \vue3-inith:\gitHub\node-api\app.js
 */
//global._base = __dirname + "/"; //设置全局requir目录前缀
const express = require("express"),
  app = express();
  const { db,tool, fs, path, } = require("./common/tool/_require");

  const basePathG =__dirname; //path.join(__dirname, "./routes");
  let arrG = fs.readdirSync(basePathG);
  console.log(arrG)
  let basePathStrG = "";
//let compress = require("compression"); //gzip压缩
//require("./common/prototype/_index");
//let cors = require("cors");
//app.use(compress());
//const routeEach = require("./core/_routeEach");
//const hostArr = require("./common/host"); //允许访问的域名
//const { fs, path, tool, log } = require("./common/tool/_require");

/* app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
}); */

//morgan(app);
//app.use(cors());
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
// 字段不符合就就不允许
/* app.use((req, res, next) => {
  
  console.log(tool.getParams);
  let limit = tool.getParams(req, "limit");
  if (limit && limit > 200) {
    res.send(tool.toJson("", "limit参数不能大于200", 1002));
  } else {
    next();
  }
}); */
app.get('/api', async(req, res) => {
  const path = `/api/item/22`;
  let searchSqlStart = `select * from user`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  try {
    users = await db.query(`${searchSqlStart}`);
    count = (await db.query(`select count(*) from user `))[0]["count(*)"];
    let bookList = {
      count: count,
      book: users,
    };
  
    res.send(tool.toJson(bookList, "basePathG:"+basePathG+"--arrG:"+JSON.stringify(arrG), 1000));
  } catch (err) {
    res.end(`Hello! Go to item1: <a href="${path}">${path}</a>`);

    res.send(tool.toJson(null, "数据出错", 1002));
    return;
  }
});
/* let router = express.Router()
router.use("", async function (req, res, next) {
  let path='1122'
  let searchSqlStart = `select * from user`;

  try {
    users = await db.query(`${searchSqlStart}`);
    count = (await db.query(`select count(*) from user `))[0]["count(*)"];
    let bookList = {
      count: count,
      book: users,
    };
  
    res.send(tool.toJson(bookList, "sucess", 1000));
  } catch (err) {
    res.end(`Hello! Go to item1: <a href="${path}">${path}</a>`);

    res.send(tool.toJson(null, "数据出错", 1002));
    return;
  }
})
app.all("/api/user", router) */
//routeEach(app);
module.exports = app;