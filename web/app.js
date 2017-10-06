const fs = require('fs');
const path = require('path');

const Koa = require('koa');
const resouce = require('koa-static');
const app = new Koa();

app.use(resouce(__dirname + '/css'));
app.use(resouce(__dirname + '/js'));
app.use(resouce(__dirname + '/html'));

const web_port = 4000;

app.listen(web_port, function () {
  console.log('App listening on port %s!', web_port);
});
