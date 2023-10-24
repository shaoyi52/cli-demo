var express = require("express");
var router = express.Router();
const { oauth, tool, db, log } = require("../../common/tool/_require");

/*
 *   page 页数
 *   limit 一页几条
 * */
router.use("", async function (req, res, next) {
    let name = tool.getParams(req, "name");
  
    if (!name) {
        res.send(tool.toJson(null, "名称不能为空", 1002));
        return;
      }
      let obj = {
        name:name
      }
    try {
        let sql = `INSERT INTO questions(name) VALUES ("${ obj.name}")`;
          await db.query(sql);
    } catch (err) {
      res.send(tool.toJson(null, `题目添加失败，失败原因：${err}`, 1002));
      return;
    }
  
    
    res.send(tool.toJson("题目添加成功", null, 1000));
  });
  
  module.exports = router;