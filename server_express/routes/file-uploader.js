// const express = require('express')
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const dirPath = path.join(__dirname, '..', 'public/upload');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(dirPath)) {
            fs.mkdir(dirPath, function (err) {
                if (err) {
                    console.log(err)
                } else {
                    cb(null, dirPath)
                }
            })
        } else {
            cb(null, dirPath)
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage});
const uploadSingle = upload.single('image');

module.exports = uploadSingle;
