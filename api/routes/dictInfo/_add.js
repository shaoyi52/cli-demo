var express = require('express');
var router = express.Router();
const { oauth, tool, db, log } = require('../../common/tool/_require');

/*
 *   page 页数
 *   limit 一页几条
 * */
router.use('', async function (req, res, next) {
  let cssClass = tool.getParams(req, 'cssClass');
  let dictCode = tool.getParams(req, 'dictCode');
  let dictLabel = tool.getParams(req, 'dictLabel');
  let dictSort = tool.getParams(req, 'dictSort');
  let listClass = tool.getParams(req, 'listClass');
  let dictValue = tool.getParams(req, 'dictValue');
  let isDefault = tool.getParams(req, 'isDefault');
  let dictType = tool.getParams(req, 'dictType');
  let dictId = tool.getParams(req, 'dictId');
  let remark = tool.getParams(req, 'remark');
  if (!dictId) {
    res.send(tool.toJson(null, '字典类型ID不能为空', 1002));
    return;
  }
  if (!dictLabel) {
    res.send(tool.toJson(null, '名称不能为空', 1002));
    return;
  }
  if (!dictValue) {
    res.send(tool.toJson(null, '字典值不能为空', 1002));
    return;
  }
  if (!dictType) {
    res.send(tool.toJson(null, '类型不能为空', 1002));
    return;
  }
  let list = {
    cssClass,
    dictCode,
    dictLabel,
    dictSort,
    dictType,
    dictValue,
    isDefault,
    listClass,
    remark
  };
  try {
    let sql = `INSERT INTO dict_info( cssClass,dictCode, dictLabel, dictSort,dictType,   dictValue,    isDefault,    listClass,    remark) 
    VALUES ("${list.cssClass}","${list.dictCode}","${list.dictLabel}","${list.dictType}","${list.dictValue}","${list.isDefault}","${list.listClass}","${list.remark}")`;
    await db.query(sql);
  } catch (err) {
    res.send(tool.toJson(null, `你的字典添加失败，失败原因：${err}`, 1002));
    return;
  }
  res.send(tool.toJson('字典添加成功', null, 1000));
});

module.exports = router;
