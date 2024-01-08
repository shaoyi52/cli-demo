var express = require("express");
var router = express.Router();
const { oauth, tool, db, log } = require("../../common/tool/_require");

/*
 *   page 页数
 *   limit 一页几条
 * */
router.use("", async function (req, res, next) {
    let name = tool.getParams(req, "name");
    let id = tool.getParams(req, "id",true);
    let actionMsg=id?'编辑':'添加'
    if (!name) {
        res.send(tool.toJson(null, "名称不能为空", 1002));
        return;
      }
      let tag = {
        name:name
      }
      let sql=''
    try {
      if(id){
        sql= `UPDATE tags SET name="${tag.name}" WHERE id=${id}`;
      }else{
        sql = `INSERT INTO tags(name) VALUES ("${ tag.name}")`;

      }
          await db.query(sql);
    } catch (err) {
      res.send(tool.toJson(null, `你的标签${actionMsg}失败，失败原因：${err}`, 1002));
      return;
    }
  
    
    res.send(tool.toJson(`标签${actionMsg}成功`, null, 1000));
  });
  
  module.exports = router;