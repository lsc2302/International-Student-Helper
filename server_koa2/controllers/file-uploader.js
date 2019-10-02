const multer = require('koa-multer');
const path = require('path');
const fs = require('fs');

const dirPath = path.join(__dirname, '..', 'public/upload');

const storage = multer.diskStorage({ destination(req, file, cb) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdir(dirPath, (err) => {
        if (err) {
          console.log(err);
        } else {
          cb(null, dirPath);
        }
      });
    } else {
      cb(null, dirPath);
    }
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  }
});

const upload = multer({storage});
const uploadSingle = upload.single('image');

module.exports = uploadSingle;
