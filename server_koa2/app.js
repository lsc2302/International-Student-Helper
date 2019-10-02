const mongoose = require('mongoose');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const staticRes = require('koa-static');
const path = require('path');
const login = require('./controllers/login.js');
const manage = require('./controllers/manage.js');
const json = require('koa-json');
const Router = require('koa-router');
const router = new Router();

const app = new Koa();
const staticPath = './public';
app.use(staticRes(path.join(__dirname, staticPath)));
app.use(bodyParser());
app.use(json());
router.use(login.routes());
router.use('/manage',manage.routes());
app.use(router.routes()).use(router.allowedMethods());

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/server_db2',
  {useNewUrlParser:true,useUnifiedTopology: true})
  .then(()=>{
    console.log('successful connection!');
    app.listen('5000', () => {
      console.log('successful launch!')
    })
  })
  .catch(()=>{
    console.log('could not launch database!')
  });
