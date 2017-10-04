var fnListImage = async(ctx, next) => {
  let product = ctx.request.body;

  console.log('add: %s', JSON.stringify(product));

  ctx.response.body = JSON.parse('{"name": "abc", "age": 34}');
};

var fnListTag = async(ctx, next) => {
  let product = ctx.request.body;

  console.log('add: %s', JSON.stringify(product));

  ctx.response.body = JSON.parse('{"name": "abc", "age": 34}');
};

var fnGetImageHead = async(ctx, next) => {
  let product = ctx.request.body;

  console.log('add: %s', JSON.stringify(product));

  ctx.response.body = JSON.parse('{"name": "abc", "age": 34}');
};

var fnGetImageDetail = async(ctx, next) => {
  let product = ctx.request.body;

  console.log('add: %s', JSON.stringify(product));

  ctx.response.body = JSON.parse('{"name": "abc", "age": 34}');
};

var fnDeleteImage = async(ctx, next) => {
  let id = ctx.params.id;

  console.log('delete: %s', id);

  ctx.response.body = JSON.parse('{"name": "abc", "age": 36}');
}

module.exports = {
  'GET /image/': fnListImage,
  'GET /image/tag/': fnListTag,
  'GET /image/:tag/head/': fnGetImageHead,
  'GET /image/:tag/detail/': fnGetImageDetail,

  'DELETE /image/:digest': fnDelete
};
