/*
 * @Description: 入口
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-08-18 14:30:22
 */

import fs from 'fs-extra'
import ejs from 'ejs'
import inquirer from 'inquirer'
import { createType, configIng } from './src/input.js'

// 输入配置交互
const aConfig = await createType()
if (a.createType == 'npm') {
  const bConfig = await configIng()
}

// 创建
// fs.removeSync('./hi')
// fs.mkdirSync('./hi')
// fs.writeFileSync('./hi/index.js', 'var a = 1')

// 安装依赖
