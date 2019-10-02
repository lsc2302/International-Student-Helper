const mongoose = require('mongoose');

const CaseSchema = new mongoose.Schema({
  AppName: { type: String, required: true },
  University: { type: String },
  Nation: { type: String },
  Score: { type: Number },
  School: { type: String },
  Degree: { type: String }
});

const CaseModel = mongoose.model('Case', CaseSchema);

module.exports = CaseModel;
