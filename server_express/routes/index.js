const express = require('express');
const UserModel = require('../models/UserModel.js');
const UniversityModel = require('../models/UniverisityModel.js');
const AppModel = require('../models/CaseModel.js');
const RoleModel = require('../models/RoleModel.js');
const uploadSingle  = require('./file-uploader.js');
const fs = require('fs');
const path = require('path');
const md5 = require('blueimp-md5');
const router = express.Router();

//Login
router.post('/login',(req,res)=>{
  const {username, password} = req.body;
  UserModel.findOne({username:username, password:md5(password)})
      .then(user => {
          if (user.role_id) {
              RoleModel.findOne({_id: user.role_id})
                  .then(role => {
                      user.role = role;
                      res.send({status: 0, data: user})
                  })
          } else {
              user.role = {menus: []};
              res.send({status: 0, data: user})
          }
      }
      )
      .catch((error) =>
          res.send({status:2, msg:"error login!"})
      )
});

// User
router.post('/manage/user/add', (req, res) => {
    const {username, password} = req.body
    UserModel.findOne({username})
        .then(user => {
            if (user) {
                res.send({status: 1, msg: 'User Already Exist!'});
                return new Promise(() => {})
            } else {
                return UserModel.create({...req.body, password: md5(password || 'default')})
            }
        })
        .then(user => {
            res.send({status: 0, data: user})
        })
        .catch(error => {
            res.send({status: 2, msg: 'Add User Failed'})
        })
});


router.post('/manage/user/update', (req, res) => {
    const user = req.body;
    UserModel.findOneAndUpdate({_id: user._id}, user)
        .then(oldUser => {
            const data = Object.assign(oldUser, user);
            // 返回
            res.send({status: 0, data})
        })
        .catch(error => {
            res.send({status: 2, msg: 'Update User Failed'})
        })
});

router.post('/manage/user/delete', (req, res) => {
    const {userId} = req.body;
    UserModel.deleteOne({_id: userId})
        .then((doc) => {
            res.send({status: 0})
        })
});

router.get('/manage/user/list', (req, res) => {
    UserModel.find({username: {'$ne': 'admin'}})
        .then(users => {
            RoleModel.find().then(roles => {
                res.send({status: 0, data: {users, roles}})
            })
        })
        .catch(error => {
            res.send({status: 2, msg: 'Delete User Failed'})
        })
});


//University
router.get('/manage/univ/searchAll',(req,res) =>{
    UniversityModel.find({})
        .then(univ => {
            if(univ){
                res.send({status:0,data:univ})
            }
            else{
                res.send({status:1,mas:"university information not found!"})
            }
        })
        .catch((error)=>
            res.send({status:2,msg:"error search!'"})
        )
});

router.post('/manage/univ/searchName',(req,res) =>{
   const {univ_name} = req.body;
   UniversityModel.findOne({univ_name})
       .then(univ => {
           if(univ){
               res.send({status:0,data:univ})
           }
           else{
               res.send({status:1,mas:"university information not found!"})
           }
       })
       .catch((error)=>
       res.send({status:2,msg:"error search!'"})
       )
});

router.post('/manage/univ/searchRank',(req,res) =>{
    const {univ_rank} = req.body;
    UniversityModel.findOne({univ_rank})
        .then(univ => {
            if(univ){
                res.send({status:0,data:univ})
            }
            else{
                res.send({status:1,mas:"university information not found!"})
            }
        })
        .catch((error)=>
            res.send({status:2,msg:"error search!'"})
        )
});

router.post('/manage/univ/update',(req,res)=>{
    const univ = req.body;
    UniversityModel.findOneAndUpdate({univ_name: univ.univ_name}, {$set:univ})
        .then(oldUniv => {
            // console.log(oldUniv);
            res.send({status: 0, msg:'Update Successfully!'})
        })
        .catch(error => {
            res.send({status: 2, msg: 'Failed Update, try again!'})
        })
});

router.post('/manage/univ/add',(req,res)=>{
    const univ = req.body;
    UniversityModel.create(univ)
        .then(univ => {
            res.send({status: 0, data: univ})
        })
        .catch(error => {
            res.send({status: 2, msg: 'Add info failed!'})
        })
});

router.post('/manage/univ/num',(req,res)=>{
    UniversityModel.countDocuments({},function (err, count) {
        res.send({status:0,count:count});
    });
});

router.post('/manage/univ/img/upload', (req, res) => {
    uploadSingle(req, res, function (err) {
        if (err) {
            return res.send({
                status: 1,
                msg: 'Upload File Failed!'
            })
        }
        var file = req.file;
        res.send({
            status: 0,
            data: {
                name: file.filename,
                url: 'http://localhost:5000/upload/' + file.filename
            }
        })

    })
});

const dirPath = path.join(__dirname, '..', 'public/upload');

router.post('/manage/univ/img/delete', (req, res) => {
    const {name} = req.body;
    fs.unlink(path.join(dirPath, name), (err) => {
        if (err) {
            res.send({
                status: 1,
                msg: 'Delete File failed!'
            })
        } else {
            res.send({
                status: 0
            })
        }
    })
});

//Applicants
router.get('/manage/case/searchAll',(req,res)=>{
    AppModel.find()
        .then(app => {
            if(app.length>0){
                res.send({status:0,data:app})
            }
            else{
                res.send({status:1,mas:"Applicants information not found!"})
            }
        })
        .catch((error)=>
            res.send({status:2,msg:"error search!'"})
        )
});

router.post('/manage/case/searchAppName',(req,res) =>{
    const AppName = req.body;
    AppModel.find(AppName)
        .then(app => {
            if(app.length>0){
                res.send({status:0,data:app})
            }
            else{
                res.send({status:1,mas:"Applicants information not found!"})
            }
        })
        .catch((error)=>
            res.send({status:2,msg:"error search!'"})
        )
});

router.post('/manage/case/searchUniversity',(req,res) =>{
    const University = req.body;
    AppModel.find(University)
        .then(app => {
            if(app.length>0){
                res.send({status:0,data:app,total:app.length})
            }
            else{
                res.send({status:1,mas:"Applicants information not found!"})
            }
        })
        .catch((error)=>
            res.send({status:2,msg:"error search!'"})
        )
});

router.post('/manage/case/searchNation',(req,res) =>{
    const Nation = req.body;
    AppModel.find(Nation)
        .then(app => {
            if(app.length>0){
                res.send({status:0,data:app})
            }
            else{
                res.send({status:1,mas:"Applicants information not found!"})
            }
        })
        .catch((error)=>
            res.send({status:2,msg:"error search!'"})
        )
});

router.post('/manage/case/searchScore',(req,res) =>{
    const {low_bound,up_bound} = req.body;
    AppModel.find({Score:{$gte:low_bound, $lte:up_bound}})
        .then(app => {
            if(app.length>0){
                res.send({status:0,data:app})
            }
            else{
                res.send({status:1,mas:"Applicants information not found!"})
            }
        })
        .catch((error)=>
            res.send({status:2,msg:"error search!'"})
        )
});

router.post('/manage/case/searchDegree',(req,res) =>{
    const Degree = req.body;
    AppModel.find(Degree)
        .then(app => {
            if(app.length>0){
                res.send({status:0,data:app})
            }
            else{
                res.send({status:1,mas:"Applicants information not found!"})
            }
        })
        .catch((error)=>
            res.send({status:2,msg:"error search!'"})
        )
});

router.post('/manage/case/searchSchool',(req,res) =>{
    const School = req.body;
    AppModel.find(School)
        .then(app => {
            if(app.length>0){
                res.send({status:0,data:app})
            }
            else{
                res.send({status:1,mas:"Applicants information not found!"})
            }
        })
        .catch((error)=>
            res.send({status:2,msg:"error search!'"})
        )
});


router.post('/manage/case/update',(req,res)=>{
    const app = req.body;
    AppModel.findOneAndUpdate({AppName: app.AppName}, {$set:app})
        .then(oldapp => {
            res.send({status: 0, msg:'Applicants Update Successfully!'})
        })
        .catch(error => {
            res.send({status: 2, msg: 'Failed Applicants Update, try again!'})
        })
});

router.post('/manage/case/add',(req,res)=>{
    const app = req.body;
    AppModel.create(app)
        .then(app => {
            res.send({status: 0, data: app})
        })
        .catch(error => {
            res.send({status: 2, msg: 'Add Applicants info failed!'})
        })
});

//Role
router.post('/manage/role/add', (req, res) => {
    const {roleName} = req.body;
    RoleModel.findOne({ name: roleName })
        .then(role=>{
            if(role){
                res.send({status: 1, msg: 'Role Already Exist!'});
                return new Promise(() => {})
            }else{
                return RoleModel.create({name: roleName})}
            })
        .then(role => {
        res.send({status: 0, data: role})
        }).catch(error => {
        res.send({status: 2, msg: 'Add Role Failed!'})
        });
});

router.get('/manage/role/list', (req, res) => {
    RoleModel.find()
        .then(roles => {
            res.send({status: 0, data: roles})
        })
        .catch(error => {
            res.send({status: 2, msg: 'Search Role Failed!'})
        })
});

router.post('/manage/role/update', (req, res) => {
    const role = req.body;
    role.auth_time = Date.now();
    RoleModel.findOneAndUpdate({_id: role._id}, role)
        .then(oldRole => {
            res.send({status: 0, data: {...oldRole._doc, ...role}})
        })
        .catch(error => {
            res.send({status: 2, msg: 'Update Role Failed'})
        })
});


module.exports = router;

