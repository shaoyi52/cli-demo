var express = require('express');
var router = express.Router();
router.use('', async function(req, res, next) {
    // let user = await db.query('select * from users');
    // res.send(user);
    res.send("兄弟，这是接口地址，你逛错位置了")
});

module.exports = router;