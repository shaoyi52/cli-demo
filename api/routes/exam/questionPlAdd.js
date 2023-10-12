/*
 * @Description: Do not edit
 * @Author: yzf
 * @Date: 2022-07-26 11:32:28
 * @LastEditors: yzf
 * @LastEditTime: 2022-07-29 17:59:02
 * @FilePath: \vue3-inith:\gitHub\node-api\routes\exam\questionPlAdd.js
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
  let dataList = tool.getParams(req, "dataList", true);
  let sqlValues = "";
  if (dataList.length > 0) {
    let values = [];
    dataList.forEach((item) => {
      let options = item.options.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      values.push(
        `("${item.type}", "${item.caption}", "${options}", "${item.answer}", "${item.analysis}")`
      );
    });
    sqlValues = values.join(",");
  } else {
    res.send(tool.toJson(null, "批量导入必需为数组格式", 1002));
    return;
  }

  // let sql = `INSERT INTO book(name, author, description, reptileType, originUrl, imgUrl, type,updateTime,bookType,bookStatus,isJin) VALUES ("${book.title}","${tool.toSql(book.author)}","${tool.toSql(book.description)}", ${book.reptileType},"${book.originUrl}","${book.imgUrl}", 2, date_sub("${book.updateTime}",interval 0 day), "${book.bookType}", ${book.bookStatus},2)`;
  try {
    let sql = `INSERT INTO questions(type,caption, options,answer,analysis) VALUES ${sqlValues}`;
    await db.query(sql);
  } catch (err) {
    res.send(tool.toJson(null, `题目添加失败，失败原因：${err}`, 1002));
    return;
  }

  res.send(tool.toJson(null, "批量导入题目成功", 1000));
});

module.exports = router;
