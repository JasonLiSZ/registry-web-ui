const fs = require('fs');
const path = require('path');

const Koa = require('koa');
const resouce = require('koa-static');
const app = new Koa();

app.use(resouce(__dirname + '/css'));
app.use(resouce(__dirname + '/js'));
app.use(resouce(__dirname + '/html'));

app.listen(4000, function () {
  console.log('App listening on port 4000!');
});
