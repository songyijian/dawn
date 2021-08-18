/*
 * @Description:控制用书输入输出逻辑
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-08-18 15:24:03
 */

import fs from 'fs-extra'
import ejs from 'ejs'
import inquirer from 'inquirer'

export function createType() {
  // 只能选中一个
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

export function configIng() {
  const config = [{ type: 'input', message: '项目名:', name: 'jobName' }, {}]
  return inquirer.prompt(config)
}
