const Koa = require('koa');
const router = require('koa-router')();
const respond = require('koa-respond');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const port = 3000;
const app = new Koa();
let Student = require('./api/models/studentModel');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/local');

app.use(bodyParser());
app.use(respond());

let routes = require('./api/routes/studentRoutes');

routes(router);

app.use(router.routes())
        .use(router.allowedMethods());

app.listen(port);

console.log(`Listening on ${port}`);

module.exports = app.listen();