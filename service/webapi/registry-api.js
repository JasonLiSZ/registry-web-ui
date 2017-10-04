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
  }, function (result) {
    try {
      let data = JSON.parse(result);

      if (data.errors && data.errors.length > 0) {
        ctx.response.body = data.errors[0].message;
        ctx.response.status = 500;
        return;
      }

      ctx.response.body = data;
    } catch (ex) {
      ctx.throw(ex.message, 500);
    }
  });
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
  }, function (result) {
    try {
      let data = JSON.parse(result);

      if (data.errors && data.errors.length > 0) {
        ctx.response.body = data.errors[0].message;
        ctx.response.status = 500;
        return;
      }

      ctx.response.body = data;
    } catch (ex) {
      ctx.throw(ex.message, 500);
    }
  });
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
  }, function (result) {
    //Docker-Content-Digest: sha256:467af83b77759844196762fc8d9e981a0c3d4fa3c59d76445b7e35a6ee5ca916
    var matches = result.match(/Docker-Content-Digest: .*/);
    if (matches && matches.length == 1) {
      var sha256 = matches[0].replace(/Docker-Content-Digest: /, '');
      ctx.response.body = {
        'digest': sha256
      };
      return;
    }

    ctx.response.body = 'not found'
    ctx.response.status = 4040;
  });
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
  }, function (result) {
    try {
      let data = JSON.parse(result);

      if (data.errors && data.errors.length > 0) {
        ctx.response.body = data.errors[0].message;
        ctx.response.status = 500;
        return;
      }

      ctx.response.body = data;
    } catch (ex) {
      ctx.throw(ex.message, 500);
    }
  });
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
  }, function (result) {
    try {
      if (result == '') {
        ctx.response.body = 'delete success';
        return;
      }

      let data = JSON.parse(result);

      if (data.errors && data.errors.length > 0) {
        ctx.response.body = data.errors[0].message;
        ctx.response.status = 500;
        return;
      }

      ctx.response.body = data;
    } catch (ex) {
      ctx.throw(ex.message, 500);
    }
  });
}

module.exports = {
  'GET /image/': fnListImage,
  'GET /image/:image/tag/': fnListImageTag,
  'GET /image/:image/tag/:tag/head/': fnGetImageTagHead,
  'GET /image/:image/tag/:tag/body/': fnGetImageTagBody,

  'DELETE /image/:image/digest/:digest': fnDeleteImageTag
};
