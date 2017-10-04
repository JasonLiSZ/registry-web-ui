const cli = require('cli');
const child_process = require('child_process');
const util = require('util');

class RegistryCmd {
  listImage(paras, callback) {
    let cmd = util.format('curl -X GET -u %s:%s https://%s/v2/_catalog', paras.user, paras.password, paras.registry);
    this.exec(cmd, callback);
  }

  listImageTag(paras, callback) {
    let cmd = util.format('curl -X GET -u %s:%s https://%s/v2/%s/tags/list', paras.user, paras.password, paras.registry, paras.image);
    this.exec(cmd, callback);
  }

  getImageTagHead(paras, callback) {
    let cmd = util.format('curl -H "Accept:application/vnd.docker.distribution.manifest.v2+json" GET -vvv -k -u %s:%s https://%s/v2/%s/manifests/%s', paras.user, paras.password, paras.registry, paras.image, paras.tag);
    this.exec(cmd, callback);
  }

  getImageTagBody(paras, callback) {
    let cmd = util.format('curl -X GET -u %s:%s https://%s/v2/%s/manifests/%s', paras.user, paras.password, paras.registry, paras.image, paras.tag);
    this.exec(cmd, callback);
  }

  deleteImageTag(paras, callback) {
    let cmd = util.format('curl -X DELETE -u %s:%s https://%s/v2/%s/manifests/%s', paras.user, paras.password, paras.registry, paras.image, paras.digest);
    this.exec(cmd, callback);
  }

  exec(cmd, callback) {
    console.log(cmd);

    var resp = child_process.execSync(cmd);
    var result = resp.toString('UTF8');

    callback(result);
  }


}

module.exports = RegistryCmd;
