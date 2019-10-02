const mongoose = require('mongoose');
const md5 = require('blueimp-md5');


const UserSchema = new mongoose.Schema({
    username:{type:String, required:true},
    password:{type:String, required: true},
    email:{type:String},
    phone:{type:String},
    create_time:{type: Number, default: Date.now},
    role_id: {type: String},
    role:{},
});

const UserModel = mongoose.model('User', UserSchema);

UserModel.findOne({username:'admin'}).then(user => {
    if(!user){
        UserModel.create({username:'admin',password:md5('admin')}).then(user =>{
            console.log('user init: admin password:admin')
        })
    }
});

module.exports = UserModel;