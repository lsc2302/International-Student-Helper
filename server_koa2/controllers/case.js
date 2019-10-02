const CaseModel = require('../models/CaseModel.js');

const Router = require('koa-router');

const router = Router();

// Applicants

const searchAll_func = async (ctx) => {
  try{
    const app = await CaseModel.find();
    if (app.length>0){
      ctx.body = {status: 0, data: app}
    }
    else{
      ctx.body = { status: 1, msg: 'Applicants information not found!' }
    }
  }
  catch(err){
    ctx.body = { status: 2, msg: "Error!" }
  }
};

const searchAppName_func = async (ctx) => {
  const AppName = ctx.request.body;
  const app = await CaseModel.find(AppName);
  try{
    if(app.length>0){
      ctx.body = { status: 0, data: app }
    }
    else{
      ctx.body = { status: 1, msg: 'Applicants information not found!' }
    }
  }catch(err){
    ctx.body = { status: 2, msg: 'Error!' }
  }
};

const searchUniversity_func = async (ctx) => {
  const University = ctx.request.body;
  const app = await CaseModel.find(University);
  try{
    if(app.length>0){
      ctx.body = { status: 0, data: app, total: app.length }
    }
    else{
      ctx.body = { status: 1, msg: 'Applicants information not found!' }
    }
  }catch(err){
    ctx.body = { status: 2, msg: "Error!" }
  }
};

const searchNation_func = async (ctx) => {
  const Nation = ctx.request.body;
  const app = await CaseModel.find(Nation);
  try{
    if(app.length>0){
      ctx.body = { status: 0, data: app, total: app.length }
    }
    else{
      ctx.body = { status: 1, msg: 'Applicants information not found!' }
    }
  }catch(err){
    ctx.body = { status: 2, msg: "Error!" }
  }
};

const searchScore_func = async (ctx) => {
  const { low_bound, up_bound } = ctx.request.body;
  const app = await CaseModel.find({ Score: { $gte: low_bound, $lte: up_bound } })
  try{
    if(app.length>0){
      ctx.body = { status: 0, data: app, total: app.length }
    }
    else{
      ctx.body = { status: 1, msg: 'Applicants information not found!' }
    }
  }catch(err){
    ctx.body = { status: 2, msg: "Error!" }
  }
};

const searchSchool_func = async (ctx) => {
  const School = ctx.request.body;
  const app = await CaseModel.find(School);
  try{
    if(app.length>0){
      ctx.body = { status: 0, data: app, total: app.length }
    }
    else{
      ctx.body = { status: 1, msg: 'Applicants information not found!' }
    }
  }catch(err){
    ctx.body = { status: 2, msg: "Error!" }
  }
};

const searchDegree_func = async (ctx) => {
  const Degree = ctx.request.body;
  const app = await CaseModel.find(Degree);
  try{
    if(app.length>0){
      ctx.body = { status: 0, data: app, total: app.length }
    }
    else{
      ctx.body = { status: 1, msg: 'Applicants information not found!' }
    }
  }catch(err){
    ctx.body = { status: 2, msg: "Error!" }
  }
};

const update_func = async (ctx) => {
  const app = ctx.request.body;
  try {
    await CaseModel.findOneAndUpdate({ AppName: app.AppName }, { $set: app })
    ctx.body = { status: 0, msg: 'Applicants Update Successfully!' }
  }catch(err){
    ctx.body = { status: 2, msg: 'Error!' }
  }
};

const add_func = async (ctx) => {
  const app = ctx.request.body;
  try{
    const new_app =  await CaseModel.create(app);
    if(new_app){
      ctx.body = { status: 0, data: app }
    }}catch(err){
    ctx.body = { status: 2, msg: 'Error!' }
  }
};

router.get('/searchAll', searchAll_func);
router.post('/searchAppName', searchAppName_func);
router.post('/searchUniversity', searchUniversity_func);
router.post('/searchNation', searchNation_func);
router.post('/searchScore', searchScore_func);
router.post('/searchSchool', searchSchool_func);
router.post('/searchDegree', searchDegree_func);
router.post('/update', update_func);
router.post('/add', add_func);

module.exports = router;
