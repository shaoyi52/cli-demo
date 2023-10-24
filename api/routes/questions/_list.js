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

  let dataList,
    count,
    sqlArr = [],
    sql;
  let searchSqlStart = `select * from questions `;

  let searchSqlEnd = `limit ${(page - 1) * limit} , ${limit}`;
  if (id) {
    sqlArr.push(`id=${id}`);
  }  
 
  sql = sqlArr.join(" and ");
  if (sql) {
    sql = "where " + sql;
  }
  try {
    dataList = await db.query(`${searchSqlStart} ${sql} ${searchSqlEnd}`);
    count = (await db.query(`select count(*) from questions ${sql}`))[0]["count(*)"];
  } catch (err) {
    res.send(tool.toJson(null, "数据出错", 1002));
    return;
  }

  let list = {
    count: count,
    list: dataList,
  };

  res.send(tool.toJson(list, "", 1000));
});

module.exports = router;
