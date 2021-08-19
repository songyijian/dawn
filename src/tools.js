/*
 * @Description: 工具函数
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-08-19 11:33:39
 */

import fs from 'fs'
// import os from 'os'
// import path from 'path'
// import AdmZip from 'adm-zip'

/**
 * Checks whether something exists on given path.
 * @param input input path
 */
export const exists = async input => {
  try {
    const stat = await fs.promises.stat(input)
    /* istanbul ignore else */
    if (stat.isDirectory()) {
      return 'dir'
    } else if (stat.isFile()) {
      return 'file'
    } else {
      return 'other'
    }
  } catch (err) {
    /* istanbul ignore if */
    if (err.code !== 'ENOENT') {
      throw err
    }
    return false
  }
}

/**
 * 是否为文件
 * @param input input path
 */
export const isFile = async input => {
  const result = await exists(input)
  return result === 'file'
}

/**
 * 是否为文件夹
 * @param input input path
 */
export const isDirectory = async input => {
  const result = await exists(input)
  return result === 'dir'
}

/**
 * 是否为空
 * @param input input path
 */
export const isEmpty = async input => {
  const files = await fs.promises.readdir(input)
  return files.length === 0
}
