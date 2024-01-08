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
   
    if (!config.id) {
        res.send(tool.toJson(null, "题目id不能为空", 1002));
        return;
      }
      

      let insertSqlObj=  {options,type,answer,analysis,qtype,question};
      let Updatasql="";
      Object.keys(insertSqlObj).forEach((key,index) => {
        index>0?
        Updatasql+=`,${key}='${insertSqlObj[key]}'`:
         Updatasql+=`${key}='${insertSqlObj[key]}'`
      });
      console.log(`UPDATE questions SET ${Updatasql}  WHERE id=${config.id}`)
      try {
        let sql = `UPDATE questions SET ${Updatasql}  WHERE id=${config.id}`;
          await db.query(sql);
    } catch (err) {
      res.send(tool.toJson(null, `题目更新失败，失败原因：${err}`, 1002));
      return;
    }
  
    
    res.send(tool.toJson("题目更新成功", null, 1000));
  });
  
  module.exports = router;