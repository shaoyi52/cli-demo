/*
 * @Description: Do not edit
 * @Author: yzf
 * @Date: 2022-07-26 11:32:28
 * @LastEditors: yzf
 * @LastEditTime: 2022-07-29 17:22:25
 * @FilePath: \vue3-inith:\gitHub\node-api\routes\exam\questionAdd.js
 */
var express = require("express");
var router = express.Router();
const { oauth, tool, db, log } = require("../../common/tool/require");

/*
 *   page 页数
 *   limit 一页几条
 *
 * */
/*
 *   userName 用户名
 *   telephone 手机号
 * */
router.use("", async function (req, res, next) {
  console.log(req);
  let caption = tool.getParams(req, "caption");
  let answer = tool.getParams(req, "answer");
  let options = tool.getParams(req, "options");
  let type = tool.getParams(req, "type");
  let analysis = tool.getParams(req, "analysis");
  if (!caption) {
    res.send(tool.toJson(null, "标题不能为空", 1002));
    return;
  }
  if (!answer) {
    res.send(tool.toJson(null, "答案不能为空", 1002));
    return;
  }

  if (!options) {
    res.send(tool.toJson(null, "选项不能为空", 1002));
    return;
  }

  let question = {
    analysis: analysis,
    answer: answer,
    caption: caption,
    options: options,
    type: type,
  };
  // let sql = `INSERT INTO book(name, author, description, reptileType, originUrl, imgUrl, type,updateTime,bookType,bookStatus,isJin) VALUES ("${book.title}","${tool.toSql(book.author)}","${tool.toSql(book.description)}", ${book.reptileType},"${book.originUrl}","${book.imgUrl}", 2, date_sub("${book.updateTime}",interval 0 day), "${book.bookType}", ${book.bookStatus},2)`;
  try {
    let sql = `INSERT INTO questions(type,caption, options,answer,analysis) VALUES ("${question.type}", "${question.caption}", "${question.options}", "${question.answer}", "${question.analysis}")`;
    await db.query(sql);
  } catch (err) {
    res.send(tool.toJson(null, `题目添加失败，失败原因：${err}`, 1002));
    return;
  }

  res.send(tool.toJson(null, "题目添加成功", 1000));
});

module.exports = router;
