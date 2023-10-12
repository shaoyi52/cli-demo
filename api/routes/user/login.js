/*
 * @Description: Do not edit
 * @Author: yzf
 * @Date: 2022-08-10 17:43:24
 * @LastEditors: yzf
 * @LastEditTime: 2022-08-11 10:00:48
 * @FilePath: \vue3-inith:\gitHub\node-api\routes\user\login.js
 */
var express = require("express");
var router = express.Router();
const { tool, db, log } = require("../../common/tool/require");

/*
 *   userName 用户名
 *   telephone 手机号
 * */
router.use("", async function (req, res, next) {
  let username = tool.getParams(req, "username");
  let password = tool.getParams(req, "password");

  let sqlArr = [],
    page = 1,
    limit = 50,
    sql = "";

  if (!username) {
    res.send(tool.toJson(null, "用户名不能为空", 1002));
    return;
  }
  if (!password) {
    res.send(tool.toJson(null, "手机号不能为空", 1002));
    return;
  }

  sqlArr.push(`username="${username}"`);
  sqlArr.push(`password="${password}"`);

  sql = sqlArr.join(" and ");
  if (sql) {
    sql = "where " + sql;
  }
  let searchSqlStart = `select * from user`;
  let searchSqlEnd = `limit ${(page - 1) * limit} , ${limit}`;
  let count = 0;
  try {
    //users = await db.query(`${searchSqlStart} ${sql} ${searchSqlEnd}`);

    count = (await db.query(`select count(*) from user ${sql}`))[0]["count(*)"];
  } catch (err) {
    res.send(tool.toJson(null, `${err}`, 1002));
    return;
  }

  if (count == 1) {
    res.send(
      tool.toJson({ accessToken: username + "-token" }, "登录成功！", 1000)
    );
  } else {
    res.send(tool.toJson(null, `用户名或密码错误！`, 1002));
  }
});

module.exports = router;
