/*
 * @Description: 入口
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-08-18 14:30:22
 */

import fs from 'fs-extra'
// import ejs from 'ejs'
// import inquirer from 'inquirer'
// import { createType, configIng } from './src/input.js'
// import { readPath } from './src/tools.js'

// 输入配置交互
// const aConfig = await createType()
// if (aConfig.createType == 'npm') {
//   const bConfig = await configIng()
// }

// fs.readdir('./template/npm', 'utf8', (err, item) => {
//   console.log(item)
// })

// fs.readdir('./template/npm', (err, files) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(files)
//     files.forEach(x => {
//       // console.log('有' + x + '这个文件')
//     })
//   }
// })
// let a = await readPath('./template/npm')
// console.log(a)

// 创建
// fs.removeSync('./hi')
// fs.mkdirSync('./hi')
// fs.writeFileSync('./hi/index.js', 'var a = 1')

// 安装依赖

console.log(module.paths)
