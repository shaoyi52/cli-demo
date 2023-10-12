var express = require("express");
var router = express.Router();
const { tool, db, log } = require("../../common/tool/require");

/*
 *   userName 用户名
 *   telephone 手机号
 * */
router.use("", async function(req, res, next) {
  let userName = tool.getParams(req, "userName");
  let telephone = tool.getParams(req, "telephone");
  

  if (!userName) {
    res.send(tool.toJson(null, "用户名不能为空", 1002));
    return;
  }
  if (!telephone) {
    res.send(tool.toJson(null, "手机号不能为空", 1002));
    return;
  }
  

  let user = {
    userName: userName,
    telephone: telephone,    
  };
  // let sql = `INSERT INTO book(name, author, description, reptileType, originUrl, imgUrl, type,updateTime,bookType,bookStatus,isJin) VALUES ("${book.title}","${tool.toSql(book.author)}","${tool.toSql(book.description)}", ${book.reptileType},"${book.originUrl}","${book.imgUrl}", 2, date_sub("${book.updateTime}",interval 0 day), "${book.bookType}", ${book.bookStatus},2)`;
  try {
    let sql = `INSERT INTO User(userName, telephone) VALUES ("${
      user.userName
    }", ${user.telephone})`;
    await db.query(sql);
  } catch (err) {
    res.send(tool.toJson(null, `用户添加失败，失败原因：${err}`, 1002));
    return;
  }

  res.send(tool.toJson( null,"用户添加成功", 1000));
});

module.exports = router;
