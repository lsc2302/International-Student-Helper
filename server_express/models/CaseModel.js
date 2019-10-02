const mongoose = require('mongoose');

const CaseSchema = new mongoose.Schema({
    AppName:{type:String,required: true},
    University:{type:String},
    Nation:{type:String},
    Score:{type:Number},
    School:{type:String},
    Degree:{type:String}
});

const CaseModel = mongoose.model('Case', CaseSchema);

default_app = {
    AppName:"Jack",
    University:"Peking University",
    Nation:"USA",
    Score:90,
    School:"UCLA",
    Degree: "PhD",
};

module.exports=CaseModel;
