const UniversityModel = require('../models/UniverisityModel.js');
const Router = require('koa-router');
const uploadSingle = require('./file-uploader.js');
const fs = require('fs');
const path = require('path');

const router = Router();
const dirPath = path.join(__dirname, '..', 'public/upload');

// University

const searchAll_func = async (ctx) => {
  try {
    const univ = await UniversityModel.find({});
    if (univ) {
      ctx.body = { status: 0, data: univ };
    } else {
      ctx.body = { status: 1, msg: 'university information not found!' };
    }
  }
  catch(err){
    ctx.body = { status: 2, msg: 'Error!' };
  }
};

const searchName_func = async (ctx) => {
  try {
    const { univ_name } = ctx.request.body;
    const univ = await UniversityModel.findOne({ univ_name });
    if (univ) {
      ctx.body = { status: 0, data: univ };
    } else {
      ctx.body = { status: 1, msg: 'university information not found!' };
    }
  }catch(err){
    ctx.body = { status: 2, msg: 'Error!' };
  }
};

const searchRank_func = async (ctx) => {
  const { univ_rank } = ctx.request.body;
  try {
    const univ = await UniversityModel.findOne({ univ_rank });
    if (univ) {
      ctx.body = { status: 0, data: univ };
    } else {
      ctx.body = { status: 1, msg: 'university information not found!' }
    }
  }catch(err){
    ctx.body = { status: 2, msg: 'Error!' };
  }
};

const update_func = async (ctx) => {
  const univ = ctx.request.body;
  try {
    await UniversityModel.findOneAndUpdate({ univ_name: univ.univ_name }, { $set: univ });
    ctx.body = { status: 0, msg: 'update successfully!' };
  }catch(err){
    ctx.body = { status: 2, msg: 'Error!' };
  }
};


const add_func = async (ctx) => {
  const univ = ctx.request.body;
  try{
    const univ =  await UniversityModel.create(univ);
    if(univ){
      ctx.body = { status: 0, msg: 'add univ info successfully!' };
    }
  }catch(err){
    ctx.body = { status: 2, msg: 'Error!' };
  }
};


const num_func = async (ctx) => {
  try{
    await UniversityModel.countDocuments({}, (err, count) => {
      ctx.body = { status: 0, count:count };
    });}
  catch(err){
    ctx.body = { status: 2, msg: 'Error!' };
  }
};

const img_upload_func = async (ctx,err) => {
  if (err) {
    ctx.body = { status: 2, msg: 'Upload File Failed!' }
  }
  const filename = ctx.req.file.filename;
  ctx.body = { status: 0, data: { name: filename, url: `http://localhost:5000/upload/${filename}` }
  }
};

const img_delete_func = async (ctx) => {
  const { name } = ctx.request.body;
  let deleteFile = ()=>{
    return new Promise((resolve,reject)=>{
      fs.unlink(path.join(dirPath, name), (err) => {
        if (err) {
          resolve({ status: 2, msg: 'Delete File failed!'})
        } else {
          resolve({status:0})
        }
      });
    })
  };
  ctx.body = await deleteFile();
};


router.get('/searchAll', searchAll_func);
router.post('/searchName', searchName_func);
router.post('/searchRank', searchRank_func);
router.post('/num', num_func);
router.post('/update', update_func);
router.post('/add', add_func);
router.post('/img/upload', uploadSingle, img_upload_func);
router.post('/img/delete', img_delete_func);

module.exports = router;
