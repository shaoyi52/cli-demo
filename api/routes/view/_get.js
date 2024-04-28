var express = require('express');
var router = express.Router();
const { oauth, tool, db, log } = require('../../common/tool/_require');

/*
 *   page 页数
 *   limit 一页几条
 * */
const fn = async function (req, res, next) {
  let page = tool.getParams(req, 'page') || 1;
  let limit = tool.getParams(req, 'limit') || 10;
  let params = req.params;
  //console.log('url参数 :', params);
  //res.send(tool.toJson({ ...params }, '成功', 1000));
  //return;
  let { urlname } = params;

  let list,
    count,
    sqlArr = [],
    sql;
  let searchSqlStart = `select * from view  `;

  let searchSqlEnd = `limit ${(page - 1) * limit} , ${limit}`;

  if (urlname) {
    sqlArr.push(`name='${urlname}'`);
  }

  sql = sqlArr.join(' and ');
  if (sql) {
    sql = 'where ' + sql;
  }

  let result = {};

  try {
    console.log(`${searchSqlStart} ${sql} ${searchSqlEnd}`);
    list = await db.query(`${searchSqlStart} ${sql} ${searchSqlEnd}`);
  } catch (err) {
    res.send(tool.toJson(null, '数据出错', 1002));
    return;
  }
  if (urlname) {
    result = list.length ? list[0] : null;
  } else {
    res.send(tool.toJson({ ...result }, '失败', 1002));
  }

  res.send(tool.toJson({ ...result }, '成功', 1000));
};

module.exports = fn;
