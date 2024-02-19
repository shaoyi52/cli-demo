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

  let id = parseInt(tool.getParams(req, 'id'));

  let list,
    count,
    sqlArr = [],
    sql;
  let searchSqlStart = `select * from dict  `;

  let searchSqlEnd = `limit ${(page - 1) * limit} , ${limit}`;

  if (id) {
    sqlArr.push(`dictId=${id}`);
  }
  sql = sqlArr.join(' and ');
  if (sql) {
    sql = 'where ' + sql;
  }
  try {
    list = await db.query(`${searchSqlStart} ${sql} ${searchSqlEnd}`);
  } catch (err) {
    res.send(tool.toJson(null, '数据出错', 1002));
    return;
  }

  let result = {
    data: list[0] || {}
  };

  res.send(tool.toJson({ ...result }, '成功', 1000));
};

module.exports = fn;
