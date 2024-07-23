let express = require('express');
let router = express.Router();
const { oauth, tool, db, log } = require('../../common/tool/_require');

/*
 *   page 页数
 *   limit 一页几条
 * */
router.use('', async function (req, res, next) {
  let dictName = tool.getParams(req, 'dictName');
  let dictType = tool.getParams(req, 'dictType');
  let remark = tool.getParams(req, 'remark');

  if (!dictName) {
    res.send(tool.toJson(null, '名称不能为空', 1002));
    return;
  }
  if (!dictType) {
    res.send(tool.toJson(null, '类型不能为空', 1002));
    return;
  }
  let list = {
    dictName,
    dictType,
    remark,
  };
  try {
    let sql = `INSERT INTO dict(dictName,dictType,remark) VALUES ("${list.dictName}","${list.dictType}","${list.remark}")`;
    await db.query(sql);
  } catch (err) {
    res.send(tool.toJson(null, `你的字典添加失败，失败原因：${err}`, 1002));
    return;
  }

  res.send(tool.toJson('字典添加成功', null, 1000));
});

module.exports = router;
