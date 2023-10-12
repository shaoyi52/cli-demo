var express = require("express");
var router = express.Router();
const { oauth, tool, db, log } = require("../../common/tool/_require");

/*
 *   page 页数
 *   limit 一页几条
 * */
router.use("", async function (req, res, next) {
  let page = tool.getParams(req, "page") || 1;
  let limit = tool.getParams(req, "limit") || 10;

  let id = tool.getParams(req, "id");
  let userName = tool.getParams(req, "userName");
  let role = tool.getParams(req, "role");
 

  let users,
    count,
    sqlArr = [],
    sql;
  let searchSqlStart = `select * from user`;

  let searchSqlEnd = `limit ${(page - 1) * limit} , ${limit}`;
  if (id) {
    sqlArr.push(`id=${id}`);
  } else if (userName) {
    sqlArr.push(`name like '%${userName}%'`);
  } 
 
  if (role) {
    sqlArr.push(`role=${role}`);
  }
 
  sql = sqlArr.join(" and ");
  if (sql) {
    sql = "where " + sql;
  }
  try {
    users = await db.query(`${searchSqlStart} ${sql} ${searchSqlEnd}`);
    count = (await db.query(`select count(*) from user ${sql}`))[0]["count(*)"];
  } catch (err) {
    res.send(tool.toJson(null, "数据出错", 1002));
    return;
  }

  let bookList = {
    count: count,
    book: users,
  };

  res.send(tool.toJson(bookList, "", 1000));
});

module.exports = router;
