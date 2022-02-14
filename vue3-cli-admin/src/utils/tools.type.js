/*
 * @Description: 数据类型验证函数集合
 * @Author: songyijian
 * @Date: 2019-07-15 14:00:39
 * @LastEditTime: 2022-02-14 15:06:20
 * @LastEditors: Please set LastEditors
 */

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
  if (!o || o === 'null' || o === 'undefined' || o === 'false' || o === 'NaN')
    return true
  return false
}

//是不是true
export function isTrue(o) {
  return !isFalse(o)
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
export function isFloat(n) {
  return isNumber(n) && n > -3.4e38 && n < 3.4e38
}

// double 小数，精度高于 float
export function isDouble(n) {
  return isNumber(n) && n > -1.7e308 && n < 1.7e308
}

// 邮箱
export function isEmail(str) {
  return /^[A-Za-z0-9]+([_.][A-Za-z0-9]+)*@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/.test(
    str
  )
}
