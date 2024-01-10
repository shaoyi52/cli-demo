var express = require('express');
var router = express.Router();
const { oauth, tool, db, log } = require('../../common/tool/_require');

/*
 *   page 页数
 *   limit 一页几条
 * */
router.use('', async function (req, res, next) {
  let modelName = tool.getParams(req, 'modelName');
  let id = tool.getParams(req, 'id');
  let name = tool.getParams(req, 'name');
  let title = tool.getParams(req, 'title');
  let type = tool.getParams(req, 'type');
  let isValid = tool.getParams(req, 'isValid');
  let componentCfg = tool.getParams(req, 'componentCfg');
  let customCfg = tool.getParams(req, 'customCfg');
  let remark = tool.getParams(req, 'remark');

  if (!title) {
    res.send(tool.toJson(null, '名称不能为空', 1002));
    return;
  }

  let list = {
    modelName,
    name,
    title,
    type,
    isValid,
    componentCfg,
    customCfg,
    remark
  };
  if (id) {
    let columnArr = [];
    try {
      Object.keys(list).forEach((key) => {
        columnArr.push(`${key} = "${list[key]}"`);
      });
      let columnSql = columnArr.join(',');
      let sql = `UPDATE view SET ${columnSql} WHERE id = ${id}'`;
      await db.query(sql);
    } catch (err) {
      res.send(tool.toJson(null, `你的视图更新失败，失败原因：${err}`, 1002));
      return;
    }
    res.send(tool.toJson('视图更新成功', null, 1000));
  } else {
    try {
      let sql = `INSERT INTO view(modelName,name,title,type,isValid,componentCfg,customCfg,remark) 
      VALUES ("${list.modelName}","${list.name}","${list.title}","${list.type}","${list.isValid}","${list.componentCfg}","${list.customCfg}","${list.remark}")`;
      await db.query(sql);
    } catch (err) {
      res.send(tool.toJson(null, `你的视图添加失败，失败原因：${err}`, 1002));
      return;
    }
    res.send(tool.toJson('视图添加成功', null, 1000));
  }
});

module.exports = router;
