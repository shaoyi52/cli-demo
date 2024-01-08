var express = require("express");
var router = express.Router();
const { oauth, tool, db, log } = require("../../common/tool/_require");

/*
 *   page 页数
 *   limit 一页几条
 * */
router.use("", async function (req, res, next) {
  let page = tool.getParams(req, "page",true) || 1;
  let limit = tool.getParams(req, "limit",true) || 50;
  let pageSize = tool.getParams(req, "pageSize",true) || 10;
  let id = tool.getParams(req, "id"); 

  let dataList,
    count,
    sqlArr = [],
    sql;
  let searchSqlStart = `select * from test_paper_config `;

  let searchSqlEnd = `limit ${(page - 1) * limit} , ${limit}`;
   
 
  sql = sqlArr.join(" and ");
  if (sql) {
    sql = "where " + sql;
  }
  try {
    dataList = await db.query(`${searchSqlStart} ${sql} ${searchSqlEnd}`);
  } catch (err) {
    res.send(tool.toJson(null, "数据出错", 1002));
    return;
  }

  let list = {
    list: dataList,
  };

  res.send(tool.toJson(list, "", 1000));
});

module.exports = router;
