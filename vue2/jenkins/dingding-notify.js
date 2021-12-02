// node jenkins/dingding-notify.js ${access_token} ${BUILD_NUMBER} ${prod_tag} ${BUILD_USER}
var request = require("request");
var exec = require("child_process").exec;
var argvs = process.argv.slice(2);
var access_token = argvs[0]; //钉钉access_token
var BUILD_NUMBER = argvs[1]; //构建序号
var prod_tag = argvs[2]; //构建tag
// var BUILD_USER = argvs[3]; //构建人

function execute(command) {
  return new Promise(resolve => {
    exec(command, function(error, stdout, stderr) {
      resolve(stdout);
    });
  });
}
var mergeRequestPromise = execute(
  `git log -1 --pretty=format:"%s" ${prod_tag}`
);
var mergeRequestMesPromise = execute(
  `git log -1 --pretty=format:"%s"  --no-merges  ${prod_tag}`
);
Promise.all([mergeRequestPromise, mergeRequestMesPromise]).then(
  ([mergeRequestBranch, mergeRequestMes]) => {
    request({
      url: "https://oapi.dingtalk.com/robot/send?access_token=" + access_token,
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json"
      },
      body: {
        msgtype: "markdown",
        markdown: {
          title: "h5发布通知",
          text: `
###  项目： h5-fe
*  构建序号：${BUILD_NUMBER}
*  构建分支/Tag： ${prod_tag}
*  分支合并记录：${mergeRequestBranch}
*  分支合并描述：${mergeRequestMes}
          `
          //jenkins版本太低，装不了插架拿用户
          //*  构建操作人： ${BUILD_USER}
        }
      }
    });
  }
);
