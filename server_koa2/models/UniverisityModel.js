const mongoose = require('mongoose');

const UniversitySchema = new mongoose.Schema({
  univ_name: { type: String, required: true },
  univ_address: { type: String },
  univ_rank: { type: Number },
  univ_qs_rank: { type: Number },
  univ_stars: { type: Number },
  univ_city: { type: String },
  univ_strength: { type: String },
  univ_intro: { type: String },
  univ_web: { type: String },
  univ_lat: { type: Number },
  univ_lng: { type: Number },
  univ_imgs: { type: Array },
  univ_hot: { type: Number, default: 0 }
});

const UniversityModel = mongoose.model('University', UniversitySchema);

const defaultUniv = {
  univ_name: 'Peking University',
  univ_address: 'No.5, Yiheyuan Road, Haidian District, Beijing 100871',
  univ_rank: 1,
  univ_qs_rank: 30,
  univ_stars: 8,
  univ_city: 'Beijing',
  univ_strength: 'Law, Chinese Language, Physics',
  univ_intro: '',
  univ_web: 'http://english.pku.edu.cn/',
  univ_lat: 39.987127,
  univ_lng: 116.305869,
  univ_imgs: [],
  univ_hot: 0
};

UniversityModel.findOne({ univ_name: 'Peking University' }).then((univ) => {
  if (!univ) {
    UniversityModel.create(defaultUniv);
  }
});

module.exports = UniversityModel;
