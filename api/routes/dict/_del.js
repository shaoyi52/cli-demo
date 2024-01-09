var express = require('express');
var router = express.Router();
const { oauth, tool, db, log } = require('../../common/tool/_require');

/*
 *   page 页数
 *   limit 一页几条
 * */
router.use('', async function (req, res, next) {
  let dicId = tool.getParams(req, 'dicId');
  let sqlSearch = '';
  if (dicId) {
    sqlSearch = `dicId="${dicId}"`;
  }
  let list = '';
  if (sqlSearch) {
    list = await db.query(`select * from dict where ${sqlSearch} `);
  } else {
    res.send(tool.toJson(null, '名称或dicId不能为空', 1002));
    return;
  }

  if (list.length <= 0) {
    res.send(tool.toJson(null, '没有这字典', 1002));
    return;
  }

  try {
    let sql = `delete from dict where ${sqlSearch}`;
    //let sql = `UPDATE tags SET statu = 0 WHERE ${sqlSearch}  `;
    await db.query(sql);
  } catch (err) {
    res.send(tool.toJson(null, `删除失败，失败原因：${err}`, 1002));
    return;
  }

  res.send(tool.toJson('删除成功', '', 1000));
});

module.exports = router;
