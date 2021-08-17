/*
 * @Description: Plop入口
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-08-13 15:41:29
 */

const data = {
  packageName: "", // (eae) 
  version: "1.0.0", // (1.0.0)
  keywords: "", // 
}


const test = {
  description: 'Polp create file',
  prompts: [
    {
      type: 'input', // 命令方式，input-输入，list-选择，confirm-是否
      name: 'fileName', // 获取的key
      message: 'create name' // 提示信息
    }
  ],
  actions (data) {
    const { fileName } = data
    const config = []

    // config.push({
    //   type: 'add',
    //   path: './src/index.jsx',
    //   templateFile: './template/index.js',
    //   data: { fileName }
    // })

    // config.push({
    //   type: 'add',
    //   path: './src/style.css',
    //   templateFile: './template/index.css',
    //   data: { fileName }
    // })

    config.push({
      type: 'add',
      path: '../src/index.jsx',
      templateFile: './template/index.js',
      data: { fileName }
    })

    return config
  }
}

module.exports = function (plop) {
  plop.setGenerator('run', test)
}
