const render = require('./lib/render');
const logger = require('koa-logger');
const router = require('koa-router')();
const koaBody = require('koa-body');

const Koa = require('koa');
const app = module.exports = new Koa();

app.use(logger());
app.use(render);
app.use(koaBody());

router.get('/', fnIndex)
  .get('/image/', fnListImage)
  .get('/image/:image/tag/', fnListImageTag)
  .get('/image/:image/tag/:tag/head/', fnGetImageTagHead)
  .get('/image/:image/tag/:tag/body/', fnGetImageTagBody)
  .delete('/image/:image/digest/:digest/', fnDeleteImageTag);

app.use(router.routes());

async function fnIndex(ctx) {
  await ctx.render('index', {
    posts: ['a', 'b', 'x', 'y']
  });
}

async function fnListImage(ctx) {

}

async function fnListImageTag(ctx) {

}
async function fnGetImageTagHead(ctx) {

}
async function fnGetImageTagBody(ctx) {

}
async function fnDeleteImageTag(ctx) {

}

async function create(ctx) {
  const post = ctx.request.body;
  const id = posts.push(post) - 1;
  post.created_at = new Date();
  post.id = id;
  ctx.redirect('/');
}

app.listen(4000, function () {
  console.log('App listening on port 4000!');
});
