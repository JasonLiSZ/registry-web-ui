const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const wrapper = require('./wrapper');
const cors = require('koa-cors');
const app = new Koa();

app.use(async(ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url} - start`);
  await next();
  console.log(`Process ${ctx.request.method} ${ctx.request.url} - end`);
});

app.use(cors());
app.use(bodyParser());
app.use(wrapper('/webapi'));

const service_port = 3000;

app.listen(service_port, function() {
  console.log('App listening on port %s!', service_port);
});
