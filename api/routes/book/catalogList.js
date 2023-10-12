var express = require("express");
var router = express.Router();
const { oauth, tool, db, log } = require("../../common/tool/require");

/*
 *   page 页数
 *   limit 一页几条
 *
 * */
router.use("", async function(req, res, next) {
  let bookId = parseInt(tool.getParams(req, "bookId"));
  let page = tool.getParams(req, "page") || 1;
  let limit = tool.getParams(req, "limit") || 10;

  if (!bookId) {
    res.send(tool.toJson(null, "bookId不可为空", 1002));
    return;
  }

  let catalogList = {
    count: 10,
    catalog: { bookId: 1, name: "书籍名" }
  };

  res.send(tool.toJson(catalogList, "", 1000));
});

module.exports = router;
