const Router = require('koa-router');
const UserModel = require('../models/UserModel.js');
const RoleModel = require('../models/RoleModel.js');
const md5 = require('blueimp-md5');

const router = Router();

// Login
const login_func = async (ctx) => {
  const { username, password } = ctx.request.body;
  try {
    let user = await UserModel.findOne({ username, password: md5(password) });
    if (user) {
      if (user.role_id) {
        user.role = await RoleModel.findOne({ _id: user.role_id });
        ctx.body = { status: 0, data: user };
      } else {
        user.role = { menus: [] };
        ctx.body = { status: 0, data: user };
      }
    } else {
      ctx.body = { status: 1, msg: 'Wrong username or password!' }
    }
  }catch(err){
    ctx.body = { status: 2, msg: 'Error!' }
  }
};
router.post('/login', login_func);

module.exports = router;
