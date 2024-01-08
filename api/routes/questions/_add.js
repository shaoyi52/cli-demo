var express = require("express");
var router = express.Router();
const { oauth, tool, db, log } = require("../../common/tool/_require");

/*
 *   page 页数
 *   limit 一页几条
 * */
router.use("", async function (req, res, next) {
    let config = tool.getParams(req, "config",true);
    const {options,type,answer,analysis,qtype,question}=config
   
    if (!config.question) {
        res.send(tool.toJson(null, "问题不能为空", 1002));
        return;
      }
      if (!config.answer) {
        res.send(tool.toJson(null, "答案不能为空", 1002));
        return;
      } 
      let insertSqlArr=  [options,type,answer,analysis,qtype,question];
      insertSqlArr.forEach((value, index) => {
        insertSqlArr[index] = `'${
          value ? (value + '').replace(/'/g, `"`) : value
        }'`;
      });
      try {
        let sql = `INSERT INTO questions(options,type,answer,analysis,qtype,question) VALUES (${insertSqlArr.join(',')})`;
          await db.query(sql);
    } catch (err) {
      res.send(tool.toJson(null, `题目添加失败，失败原因：${err}`, 1002));
      return;
    }
  
    
    res.send(tool.toJson("题目添加成功", null, 1000));
  });
  
  module.exports = router;