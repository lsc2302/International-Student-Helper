const RoleModel = require('../models/RoleModel.js');
const Router = require('koa-router');

const router = Router();
// Role

const list_func = async (ctx) => {
  try {
    const roles = await RoleModel.find();
    if (roles) {
      ctx.body = { status: 0, data: roles }
    } else {
      ctx.body = { status: 1, msg: 'Search Role Failed!' }
    }
  }catch(err){
    ctx.body = { status: 2, msg: 'Error!' }
  }
};

const add_func =  async (ctx) => {
  const {roleName} = ctx.request.body;
  try {
    const role = await RoleModel.findOne({ name: roleName });
    if(role){
      ctx.body = { status: 1, msg:"Role Already Exists!" }
    }
    else{
      const new_role = await RoleModel.create({ name: roleName });
      ctx.body = { status: 0, data: new_role };
    }
  }catch(err){
    ctx.body = {status: 2, msg: 'Error!'}
  }
};

const update_func = async (ctx) => {
  const role = ctx.request.body;
  role.auth_time = Date.now();
  try {
    let oldRole = await RoleModel.findOneAndUpdate({ _id: role._id }, role);
    ctx.body = { status: 0, data: { ...oldRole._doc, ...role } }
  }
  catch(err){
    ctx.body = { status: 2, msg: 'Error!' }
  }
};
router.get('/list', list_func);
router.post('/add',add_func);
router.post('/update', update_func);

module.exports=router;
