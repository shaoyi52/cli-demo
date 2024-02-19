var express = require('express');
var router = express.Router();
const { oauth, tool, db, log } = require('../../common/tool/_require');

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
const handleTree = (data, id, parentId, children) => {
  const config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children'
  };

  const childrenListMap = {};
  const nodeIds = {};
  const tree = [];

  for (const d of data) {
    const parentId = d[config.parentId];
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    let { id, path, hidden, redirect, component, alwaysShow, menuName, icon, noCache, link } = d;
    let _item = {
      id,
      name: path,
      path,
      hidden,
      redirect,
      component,
      alwaysShow,
      meta: {
        title: menuName,
        icon,
        noCache,
        link
      }
    };
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(_item);
  }

  for (const d of data) {
    const parentId = d[config.parentId];
    if (nodeIds[parentId] == null) {
      let { id, path, hidden, redirect, component, alwaysShow, menuName, icon, noCache, link } = d;
      let _item = {
        id,
        name: path,
        path: '/' + path,
        hidden,
        redirect,
        component: 'Layout',
        alwaysShow,
        meta: {
          title: menuName,
          icon,
          noCache,
          link
        }
      };
      tree.push(_item);
    }
  }
  const adaptToChildrenList = (o) => {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
      delete o[config.id];
    }
    if (o[config.childrenList]) {
      for (const c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  };

  for (const t of tree) {
    adaptToChildrenList(t);
  }

  return tree;
};

/*
 *   page 页数
 *   limit 一页几条
 * */
router.use('', async function (req, res, next) {
  let page = tool.getParams(req, 'page') || 1;
  let limit = tool.getParams(req, 'limit') || 200;

  let title = tool.getParams(req, 'title');
  let id = tool.getParams(req, 'id');

  let list,
    count,
    sqlArr = [],
    sql;
  let searchSqlStart = `select * from menu  `;

  let searchSqlEnd = `limit ${(page - 1) * limit} , ${limit}`;

  if (title) {
    sqlArr.push(`title=${title}`);
  } else if (id) {
    sqlArr.push(`id=${id}`);
  }
  sql = sqlArr.join(' and ');
  if (sql) {
    sql = 'where ' + sql;
  }

  let result = {};

  try {
    list = await db.query(`${searchSqlStart} ${sql} ${searchSqlEnd}`);
  } catch (err) {
    res.send(tool.toJson(null, '数据出错', 1002));
    return;
  }
  if (id) {
    result = list.length ? list[0] : null;
  } else {
    result = { data: handleTree(list) };
  }

  res.send(tool.toJson(result, '成功', 1000));
});

module.exports = router;
