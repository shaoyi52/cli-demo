var express = require("express");
var router = express.Router();
const { oauth, tool, db, log } = require("../../common/tool/_require");

/*
 *   page 页数
 *   limit 一页几条
 * */
router.use("", async function (req, res, next) {
    let name = tool.getParams(req, "name");
    let id = tool.getParams(req, "id");
    let sqlSearch="";
    if (name) {
        sqlSearch=`name="${name}"`
    }else if(id){
        sqlSearch=`id="${id}"`
    }
    let tag="";
    if(sqlSearch){
        tag= await db.query(
            `select * from tags where ${sqlSearch} `
          );
    }else{
        res.send(tool.toJson(null, "名称或id不能为空", 1002));
        return;
    }
   
    if (tag.length <= 0) {
        res.send(tool.toJson(null, "没有这标签", 1002));
        return;
      }
      
    try {
        //let sql = `delete from catalog where ${sqlSearch}`;
        let sql=`UPDATE tags SET statu = 0 WHERE ${sqlSearch}  `
          await db.query(sql);          
    } catch (err) {
      res.send(tool.toJson(null, `删除失败，失败原因：${err}`, 1002));
      return;
    }  
    
    res.send(tool.toJson("删除成功", "", 1000));
  });
  
  module.exports = router;