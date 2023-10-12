/*
 * @Description: Do not edit
 * @Author: yzf
 * @Date: 2022-07-26 11:32:28
 * @LastEditors: yzf
 * @LastEditTime: 2022-07-29 11:56:36
 * @FilePath: \vue3-composition-admin-mainh:\gitHub\node-api\routes\exam\paper.js
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
  let name = tool.getParams(req, "name");

  if (!name) {
    res.send(tool.toJson(null, "题库名称不能为空", 1002));
    return;
  }
  let createdTime = new Date().getTime();

  // let sql = `INSERT INTO book(name, author, description, reptileType, originUrl, imgUrl, type,updateTime,bookType,bookStatus,isJin) VALUES ("${book.title}","${tool.toSql(book.author)}","${tool.toSql(book.description)}", ${book.reptileType},"${book.originUrl}","${book.imgUrl}", 2, date_sub("${book.updateTime}",interval 0 day), "${book.bookType}", ${book.bookStatus},2)`;
  try {
    let sql = `INSERT INTO paper(name,createdTime) VALUES ("${name}", "${createdTime}")`;
    await db.query(sql);
  } catch (err) {
    res.send(tool.toJson(null, `题库添加失败，失败原因：${err}`, 1002));
    return;
  }

  res.send(tool.toJson(null, "题库添加成功", 1000));
});

module.exports = router;
