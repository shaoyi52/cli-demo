var express = require("express");
var router = express.Router();
const { oauth, tool, db, log } = require("../../common/tool/require");

/*
 *   渠道列表
 * */
router.use("", async function (req, res, next) {
  try {
    let data = null;
    let reptileList = await db.query(`select * from reptiletool2`);
    let count = reptileList.length;
    data = {
      reptileList,
      count,
    };
    res.send(tool.toJson(data, null, 1000));
  } catch (err) {
    log.error(`select * from reptiletool2`);
    log.error(err);
    res.send(tool.toJson(null, "查询渠道失败，失败原因：" + err, 1002));
  }
});

module.exports = router;
