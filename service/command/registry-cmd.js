const cli = require('cli');
const child_process = require('child_process');
const util = require('util');

class RegistryCmd {
  listImage(paras) {
    let cmd = util.format('curl -X GET -u %s:%s https://%s/v2/_catalog', paras.user, paras.password, paras.registry);
    return this.exec(cmd);
  }

  listImageTag(paras) {
    let cmd = util.format('curl -X GET -u %s:%s https://%s/v2/%s/tags/list', paras.user, paras.password, paras.registry, paras.image);
    return this.exec(cmd);
  }

  getImageTagHead(paras) {
    let cmd = util.format('curl -H "Accept:application/vnd.docker.distribution.manifest.v2+json" GET -vvv -k -u %s:%s https://%s/v2/%s/manifests/%s', paras.user, paras.password, paras.registry, paras.image, paras.tag);
    return this.exec(cmd);
  }

  getImageTagBody(paras) {
    let cmd = util.format('curl -X GET -u %s:%s https://%s/v2/%s/manifests/%s', paras.user, paras.password, paras.registry, paras.image, paras.tag);
    return this.exec(cmd);
  }

  deleteImageTag(paras) {
    let cmd = util.format('curl -X DELETE -u %s:%s https://%s/v2/%s/manifests/%s', paras.user, paras.password, paras.registry, paras.image, paras.digest);
    return this.exec(cmd);
  }

  exec(cmd) {
    console.log(cmd);

    return new Promise((resolve, reject) =>{
      child_process.exec(cmd, function(err, stdout, stderr){
        if(err) reject(err);
        else resolve(stdout);
      });
    });
  }


}

module.exports = RegistryCmd;
