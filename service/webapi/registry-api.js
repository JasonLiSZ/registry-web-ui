const registryCmd = require('../command/registry-cmd');
const cmd = new registryCmd();

var fnListImage = async(ctx, next) => {
  let registry = ctx.request.header.registry;
  let user = ctx.request.header.user;
  let password = ctx.request.header.password;

  await cmd.listImage({
      'registry': registry,
      'user': user,
      'password': password
    }).then(result => ctx.response.body = JSON.parse(result))
    .catch(err => {
      ctx.response.body = err.message;
      ctx.response.status = 500;
    });
};

var fnListImageTag = async(ctx, next) => {
  let registry = ctx.request.header.registry;
  let user = ctx.request.header.user;
  let password = ctx.request.header.password;

  let image = ctx.params.image;

  await cmd.listImageTag({
      'registry': registry,
      'user': user,
      'password': password,
      'image': image
    }).then(result => ctx.response.body = JSON.parse(result))
    .catch(err => {
      ctx.response.body = err.message;
      ctx.response.status = 500;
    });
};

var fnGetImageTagHead = async(ctx, next) => {
  let registry = ctx.request.header.registry;
  let user = ctx.request.header.user;
  let password = ctx.request.header.password;

  let image = ctx.params.image;
  let tag = ctx.params.tag;

  await cmd.getImageTagHead({
      'registry': registry,
      'user': user,
      'password': password,
      'image': image,
      'tag': tag
    }).then(result => {
      var matches = result.match(/Docker-Content-Digest: .*/);
      if (matches && matches.length == 1) {
        var sha256 = matches[0].replace(/Docker-Content-Digest: /, '');
        ctx.response.body = {
          'digest': sha256
        };
      }
      else{
        ctx.response.status = 404;
      }
    })
    .catch(err => {
      ctx.response.body = err.message;
      ctx.response.status = 500;
    });
};

var fnGetImageTagBody = async(ctx, next) => {
  let registry = ctx.request.header.registry;
  let user = ctx.request.header.user;
  let password = ctx.request.header.password;

  let image = ctx.params.image;
  let tag = ctx.params.tag;

  await cmd.getImageTagBody({
      'registry': registry,
      'user': user,
      'password': password,
      'image': image,
      'tag': tag
    }).then(result => ctx.response.body = JSON.parse(result))
    .catch(err => {
      ctx.response.body = err.message;
      ctx.response.status = 500;
    });
};

var fnDeleteImageTag = async(ctx, next) => {
  let registry = ctx.request.header.registry;
  let user = ctx.request.header.user;
  let password = ctx.request.header.password;

  let image = ctx.params.image;
  let digest = ctx.params.digest;

  await cmd.deleteImageTag({
      'registry': registry,
      'user': user,
      'password': password,
      'image': image,
      'digest': digest
    }).then(result => ctx.response.body = result)
    .catch(err => {
      ctx.response.body = err.message;
      ctx.response.status = 500;
    });
}

module.exports = {
  'GET /image/': fnListImage,
  'GET /image/:image/tag/': fnListImageTag,
  'GET /image/:image/tag/:tag/head/': fnGetImageTagHead,
  'GET /image/:image/tag/:tag/body/': fnGetImageTagBody,

  'DELETE /image/:image/digest/:digest/': fnDeleteImageTag
};
