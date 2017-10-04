var cli = require('cli');
var util = require('util');

class RegistryCmd {
  listImage(registry, user, password) {
    let cmd = util.format('curl -X GET -u %s:%s https://%s/v2/_catalog', user, password, registry);
    console.log(cmd);
  }

  listImageTag(registry, user, password, image) {
    let cmd = util.format('curl -X GET -u %s:%s https://%s/v2/%s/tags/list', user, password, registry, image);
    console.log(cmd);
  }

  getImageTagHead(registry, user, password, image, tag) {
    let cmd = util.format('curl -H "Accept:application/vnd.docker.distribution.manifest.v2+json" GET -vvv -k -u %s:%s https://%s/v2/%s/manifests/%s', user, password, registry, image, tag);
    console.log(cmd);
  }

  getImageTagBody(registry, user, password, image, tag) {
    let cmd = util.format('curl -X GET -u %s:%s https://%s/v2/%s/manifests/%s', user, password, registry, image, tag);
    console.log(cmd);
  }

  deleteImageTag(registry, user, password, image, digest) {
    let cmd = util.format('curl -X DELETE -u %s:%s https://%s/v2/%s/manifests/%s', user, password, registry, image, digest);
    console.log(cmd);
  }
}

module.exports = RegistryCmd;
