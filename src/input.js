/*
 * @Description:控制用书输入输出逻辑
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-08-18 15:24:03
 */

import fs from 'fs-extra'
import ejs from 'ejs'
import inquirer from 'inquirer'

// 分类
export function createType() {
  const config = [
    {
      type: 'list',
      message: '选择项目类型',
      name: 'createType',
      choices: ['npm', 'vue2-cms', 'h5']
    }
  ]
  return inquirer.prompt(config)
}

// 每类项目的输入配置
export function configIng() {
  const config = [{ type: 'input', message: '项目名:', name: 'jobName' }, {}]
  return inquirer.prompt(config)
}
