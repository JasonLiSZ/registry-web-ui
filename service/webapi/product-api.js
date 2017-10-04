var fnGet = async(ctx, next) => {
  let id = ctx.params.id;

  console.log('get: %s', id);

  ctx.response.body = JSON.parse('{"name": "abc", "age": 33}');
};

var fnAdd = async(ctx, next) => {
  let product = ctx.request.body;

  console.log('add: %s', JSON.stringify(product));

  ctx.response.body = JSON.parse('{"name": "abc", "age": 34}');
};

var fnUpdate = async(ctx, next) => {
  let id = ctx.params.id;
  let product = ctx.request.body;

  console.log('update: %s, %s', id, JSON.stringify(product));

  ctx.response.body = JSON.parse('{"name": "abc", "age": 35}');
};

var fnDelete = async(ctx, next) => {
  let id = ctx.params.id;

  console.log('delete: %s', id);

  ctx.response.body = JSON.parse('{"name": "abc", "age": 36}');
}

module.exports = {
  'GET /product/:id': fnGet,
  'POST /product': fnAdd,
  'PUT /product/:id': fnUpdate,
  'DELETE /product/:id': fnDelete
};
