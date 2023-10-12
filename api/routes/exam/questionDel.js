/*
 * @Description: Do not edit
 * @Author: yzf
 * @Date: 2022-08-01 11:10:44
 * @LastEditors: yzf
 * @LastEditTime: 2022-08-01 11:23:04
 * @FilePath: \vue3-inith:\gitHub\node-api\routes\exam\questionDel.js
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
  let id = tool.getParams(req, "id");

  if (!id) {
    res.send(tool.toJson(null, "id不可为空", 1002));
    return;
  }

  let questionsList = await db.query(
    `select * from questions where id="${id}"`
  );

  if (questionsList.length <= 0) {
    res.send(tool.toJson(null, "没有这题目", 1002));
    return;
  }
  try {
    await db.execTrans([`delete from questions where id = ${id}`]);
    res.send(tool.toJson(null, "删除成功", 1000));
  } catch (err) {
    res.send(tool.toJson(null, `删除失败，失败原因：${err}`, 1002));
  }
});

module.exports = router;
