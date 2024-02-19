var express = require('express');
var router = express.Router();
const { oauth, tool, db, log } = require('../../common/tool/_require');

/*
 *   page 页数
 *   limit 一页几条
 * */
router.use('', async function (req, res, next) {
  let id = tool.getParams(req, 'id', true);
  let component = tool.getParams(req, 'component');
  let createDept = tool.getParams(req, 'createDept', true);
  let icon = tool.getParams(req, 'icon');
  let isCache = tool.getParams(req, 'isCache');
  let isFrame = tool.getParams(req, 'isFrame', true);
  let menuId = tool.getParams(req, 'menuId', true);
  let menuName = tool.getParams(req, 'menuName', true);
  let menuType = tool.getParams(req, 'menuType');
  let orderNum = tool.getParams(req, 'orderNum', true);
  let parentId = tool.getParams(req, 'parentId', true);
  let path = tool.getParams(req, 'path');
  let perms = tool.getParams(req, 'perms');
  let queryParam = tool.getParams(req, 'queryParam');
  let remark = tool.getParams(req, 'remark');
  let status = tool.getParams(req, 'status');
  let visible = tool.getParams(req, 'visible');

  if (!menuName && !id) {
    res.send(tool.toJson(null, '名称不能为空', 1002));
    return;
  }

  let list = {
    component,
    createDept,
    icon,
    isCache,
    isFrame,
    menuId,
    menuName,
    menuType,
    orderNum,
    parentId,
    path,
    perms,
    queryParam,
    remark,
    status,
    visible
  };
  if (id) {
    let columnArr = [];
    try {
      Object.keys(list).forEach((key) => {
        if (list[key] || list[key] === '' || list[key] === 0) {
          columnArr.push(`${key} = '${list[key]}'`);
        }
      });
      let columnSql = columnArr.join(',');
      console.log('columnSql', columnSql);
      let sql = `UPDATE menu SET ${columnSql} WHERE id = ${id}`;
      await db.query(sql);
    } catch (err) {
      res.send(tool.toJson(null, `你的菜单更新失败，失败原因：${err}`, 1002));
      return;
    }
    res.send(tool.toJson('菜单更新成功', null, 1000));
  } else {
    try {
      let columnArr = [];
      let valueArr = [];
      Object.keys(list).forEach((key) => {
        if (list[key] || list[key] === '') {
          columnArr.push(`${key}`);
          valueArr.push(`'${list[key]}'`);
        }
      });
      let columnSql = columnArr.join(',');
      let valueSql = valueArr.join(',');

      let sql = `INSERT INTO menu(${columnSql}) 
      VALUES (${valueSql})`;
      await db.query(sql);
    } catch (err) {
      res.send(tool.toJson(null, `你的菜单添加失败，失败原因：${err}`, 1002));
      return;
    }
    res.send(tool.toJson('菜单添加成功', null, 1000));
  }
});

module.exports = router;
