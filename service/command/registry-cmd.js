var cli = require('cli');
var util = require('util');

class RegistryCmd {
  listImage(paras) {

    let cmd = util.format('curl -X GET -u %s:%s https://%s/v2/_catalog', paras.user, paras.password, paras.registry);
    console.log(cmd);
  }

  listImageTag(paras) {
    let cmd = util.format('curl -X GET -u %s:%s https://%s/v2/%s/tags/list', paras.user, paras.password, paras.registry, paras.image);
    console.log(cmd);
  }

  getImageTagHead(paras) {
    let cmd = util.format('curl -H "Accept:application/vnd.docker.distribution.manifest.v2+json" GET -vvv -k -u %s:%s https://%s/v2/%s/manifests/%s', paras.user, paras.password, paras.registry, paras.image, paras.tag);
    console.log(cmd);
  }

  getImageTagBody(paras) {
    let cmd = util.format('curl -X GET -u %s:%s https://%s/v2/%s/manifests/%s', paras.user, paras.password, paras.registry, paras.image, paras.tag);
    console.log(cmd);
  }

  deleteImageTag(paras) {
    let cmd = util.format('curl -X DELETE -u %s:%s https://%s/v2/%s/manifests/%s', paras.user, paras.password, paras.registry, paras.image, paras.digest);
    console.log(cmd);
  }
}

module.exports = RegistryCmd;
