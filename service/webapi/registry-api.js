const registryCmd = require('../command/registry-cmd');
const cmd = new registryCmd();

var fnListImage = async(ctx, next) => {
  let registry = ctx.request.header.registry;
  let user = ctx.request.header.user;
  let password = ctx.request.header.password;

  let result = cmd.listImage({
    'registry': registry,
    'user': user,
    'password': password
  });

  ctx.response.body = result;
};

var fnListImageTag = async(ctx, next) => {
  let registry = ctx.request.header.registry;
  let user = ctx.request.header.user;
  let password = ctx.request.header.password;

  let image = ctx.params.image;

  let result = cmd.listImageTag({
    'registry': registry,
    'user': user,
    'password': password,
    'image': image
  });

  ctx.response.body = result;
};

var fnGetImageTagHead = async(ctx, next) => {
  let registry = ctx.request.header.registry;
  let user = ctx.request.header.user;
  let password = ctx.request.header.password;

  let image = ctx.params.image;
  let tag = ctx.params.tag;

  let result = cmd.getImageTagHead({
    'registry': registry,
    'user': user,
    'password': password,
    'image': image,
    'tag': tag
  });

  ctx.response.body = result;
};

var fnGetImageTagBody = async(ctx, next) => {
  let registry = ctx.request.header.registry;
  let user = ctx.request.header.user;
  let password = ctx.request.header.password;

  let image = ctx.params.image;
  let tag = ctx.params.tag;

  let result = cmd.getImageTagBody({
    'registry': registry,
    'user': user,
    'password': password,
    'image': image,
    'tag': tag
  });

  ctx.response.body = result;
};

var fnDeleteImageTag = async(ctx, next) => {
  let registry = ctx.request.header.registry;
  let user = ctx.request.header.user;
  let password = ctx.request.header.password;

  let image = ctx.params.image;
  let digest = ctx.params.digest;

  let result = cmd.deleteImageTag({
    'registry': registry,
    'user': user,
    'password': password,
    'image': image,
    'digest': digest
  });

  ctx.response.body = result;
}

module.exports = {
  'GET /image/': fnListImage,
  'GET /image/:image/tag/': fnListImageTag,
  'GET /image/:image/tag/:tag/head/': fnGetImageTagHead,
  'GET /image/:image/tag/:tag/body/': fnGetImageTagBody,

  'DELETE /image/:image/digest/:digest': fnDeleteImageTag
};
