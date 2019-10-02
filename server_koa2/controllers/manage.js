const role = require('./role.js');
const univ = require('./univ.js');
const user = require('./user.js');
const cases = require('./case.js');
const Router = require('koa-router');

const router = Router();
router.use('/role',role.routes());
router.use('/univ',univ.routes());
router.use('/user',user.routes());
router.use('/case',cases.routes());

module.exports = router;
