var express = require("express");
var router = express.Router();
const { oauth, tool, db, log } = require("../../common/tool/require");

/*
 *   添加渠道
 * */
router.use("", async function (req, res, next) {
  let page = tool.getParams(req, "page") || 1;
  let limit = tool.getParams(req, "limit") || 10;
  let bookName = tool.getParams(req, "bookName") || "";
  let selectSql = `progresserror.* ,book.name as bookName,catalog.name as catalogName,catalog.num `;
  let joinSql = `JOIN book on book.id=progresserror.bookId JOIN catalog on catalog.id=progresserror.catalogId`;
  let whereSql = "";
  if (bookName) {
    whereSql = `book.name= ${bookName}`;
  }

  try {
    let list = await db.query(
      `select ${selectSql} from progresserror ${joinSql} ${whereSql} ORDER BY id ASC limit ${
        (page - 1) * limit
      },${limit}`
    );
    let count = (
      await db.query(
        `select count(*) from progresserror ${joinSql} ${whereSql}`
      )
    )[0]["count(*)"];
    let errorList = {
      count,
      data: list,
    };
    res.send(tool.toJson(errorList, null, 1000));
  } catch (err) {
    log.error(
      `select ${selectSql} from progresserror ${joinSql} ${whereSql} ORDER BY id ASC limit ${
        (page - 1) * limit
      },${limit}`
    );
    log.error(err);
    res.send(tool.toJson(null, "查询采集进度失败：" + err, 1002));
  }
});

module.exports = router;
