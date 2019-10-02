const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const indexRouter = require('./routes');
app.use('/',indexRouter);

mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost/server_db2',{useNewUrlParser:true})
.then(()=>{
  console.log('successful connection!');
  app.listen('5000', () => {
    console.log('successful launch!')
  })
})
.catch(()=>{
  console.log('could not launch database!')
});

module.exports = app;
