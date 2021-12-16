/*
 * @Description: 验证
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-07-12 15:40:39
 */
import * as _typs from './tools.type'

export const isTypes = {
  string: _typs.isString,
  number: _typs.isNumber,
  boolean: _typs.isBoolean,
  array: _typs.isArray,
  date: _typs.isDate,
  int: _typs.isInteger,
  int32: _typs.isInteger,
  int64: _typs.isInteger,
  email: _typs.isEmail,
  arryRepeatedString: o => _typs.isArray(o) && o.every(i => _typs.isString(i)),
  double: _typs.isNumber, //n => _typs.isDouble(n),
  base64: _typs.isBase64
}

function validator(_type) {
  if (!isTypes[_type]) {
    console.error(new Error(_type + ' undefind'))
  }
  let myValidator = (rule, value, callback) => {
    if (isTypes[_type](value)) {
      callback()
    } else {
      callback(new Error('format error'))
    }
  }
  return myValidator
}

export const verify = (...type) => {
  return [...type].map(item => {
    return item === 'required' ? { required: true, message: 'is required' } : { validator: validator(item) }
  })
}

console.log()
