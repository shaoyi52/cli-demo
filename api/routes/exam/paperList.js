/*
 * @Description: Do not edit
 * @Author: yzf
 * @Date: 2022-07-26 11:32:28
 * @LastEditors: yzf
 * @LastEditTime: 2022-07-29 15:17:20
 * @FilePath: \vue3-inith:\gitHub\node-api\routes\exam\paperList.js
 */
var express = require("express");
var router = express.Router();
const { oauth, tool, db, log } = require("../../common/tool/require");

/*
 *   page 页数
 *   limit 一页几条
 *
 * */
router.use("", async function (req, res, next) {
  let page = tool.getParams(req, "page") || 1;
  let limit = tool.getParams(req, "limit") || 10;
  /* let bookId = parseInt(tool.getParams(req, "bookId"));
  if (!bookId) {
    res.send(tool.toJson(null, "bookId不可为空", 1002));
    return;
  }

  let questionsList = {
    count: 10,
    catalog: { bookId: 1, name: "书籍名" }
  }; */
  let searchSqlStart = `select * from paper`;
  let searchSqlEnd = `limit ${(page - 1) * limit} , ${limit}`;
  let papers, count;
  try {
    papers = await db.query(`${searchSqlStart} ${searchSqlEnd}`);
    count = (await db.query(`select count(*) from paper`))[0]["count(*)"];
  } catch (err) {
    res.send(tool.toJson(null, "数据出错", 1002));
    return;
  }
  let papersList = {
    papers: papers || [],
    count: count || 0,
  };
  res.send(tool.toJson(papersList, "成功", 1000));
});

module.exports = router;
