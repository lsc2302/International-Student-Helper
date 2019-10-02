const UserModel = require('../models/UserModel.js');
const RoleModel = require('../models/RoleModel.js');
const md5 = require('blueimp-md5');
const Router = require('koa-router');

const router = Router();
// User

const list_func = async (ctx) => {
  try{
    const users = await UserModel.find({ username: { $ne: 'admin' } });
    if(users){
      const roles = await RoleModel.find();
      ctx.body = { status: 0, data: { users, roles } }
    }
    else{
      ctx.body = { status: 1, msg: 'User Information Not Found!' }
    }
  }catch(err){
    ctx.body = { status: 2, msg: 'Error!' }
  }
};

const add_func = async (ctx) => {
  const { username, password } = ctx.request.body;
  try{
    const user = await UserModel.findOne({ username });
    if(user){
      ctx.body = { status: 1, msg: 'User Already Exists!' }
    }
    else{
      const new_user = await UserModel.create({ ...ctx.request.body, password: md5(password || 'default') });
      ctx.body = { status: 0, data: new_user }
    }
  }catch(err){
    ctx.body = { status: 2, msg: 'Error!' }
  }
};


const update_func = async (ctx) => {
  const user = ctx.request.body;
  try{
    let oldUser = await UserModel.findOneAndUpdate({ _id: user._id }, user);
    const data = Object.assign(oldUser, user);
    ctx.body = { status: 0, data }
  }catch(err) {
    ctx.body = { status: 2, msg: 'Error!' }
  }
};

const delete_func = async (ctx) => {
  const { userId } = ctx.request.body;
  try{
    await UserModel.deleteOne({ _id: userId });
    ctx.body = { status: 0}
  }catch(err){
    ctx.body = { status: 2, msg: 'Error!' }
  }
};

router.get('/list', list_func);
router.post('/add', add_func);
router.post('/update', update_func);
router.post('/delete', delete_func);


module.exports = router;
