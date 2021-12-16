/*
 * @Description: 数据类型验证函数集合
 * @Author: songyijian
 * @Date: 2019-07-15 14:00:39
 * @LastEditTime: 2021-12-15 14:32:08
 * @LastEditors: Please set LastEditors
 */

//类型判断 返回数据类型
export function isType(o) {
  return Object.prototype.toString.call(o).slice(8, -1)
}

//是否字符串
export function isString(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'String'
}

//是否数字
export function isNumber(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Number'
}

//是否boolean
export function isBoolean(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'
}

//是否函数
export function isFunction(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Function'
}

//是否为null
export function isNull(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Null'
}

//是否undefined
export function isUndefined(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Undefined'
}

//是否对象
export function isObj(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
}

//是否数组
export function isArray(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Array'
}

//是否时间
export function isDate(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Date'
}

//是否正则
export function isRegExp(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'RegExp'
}

//是否错误对象
export function isError(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Error'
}

//是否Symbol函数
export function isSymbol(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Symbol'
}

//是否Promise对象
export function isPromise(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Promise'
}

//是否Set对象
export function isSet(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Set'
}

//是否Map对象
export function isMap(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Map'
}

//是不是 false
export function isFalse(o) {
  if (!o || o === 'null' || o === 'undefined' || o === 'false' || o === 'NaN') return true
  return false
}

//是不是true
export function isTrue(o) {
  return !isFalse(o)
}

//是不是一个文件
export function isFile(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'File'
}

//是不是整数
export function isInteger(o) {
  try {
    return typeof o === 'number' && o % 1 === 0
  } catch (e) {
    return false
  }
}

// float 小数
function isFloat(n) {
  return isNumber(n) && n > -3.4e38 && n < 3.4e38
}

// double 小数，精度高于 float
function isDouble(n) {
  return isNumber(n) && n > -1.7e308 && n < 1.7e308
}

// ArrayBuffer
export function isArrayBuffer(val) {
  return Object.prototype.toString.call(val) === '[object ArrayBuffer]'
}

// base64字符串
function isBase64(str) {
  try {
    return typeof str === 'string' && window.btoa(window.atob(str)) == str
  } catch (err) {
    return false
  }
}

// 是否包含中文字符
export function isContainCN(str) {
  return !(escape(str).indexOf('%u') < 0)
}

// 是否为身份证号
export function isIdCard(str) {
  return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
}

// 是否为手机号
export function isPhoneNum(str) {
  return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
}

// 是否为URL地址
export function isUrl(str) {
  return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str)
}

// 邮箱
export function isEmail(str) {
  return /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/.test(str)
}
