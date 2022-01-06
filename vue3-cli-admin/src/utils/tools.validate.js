/*
 * @Description: 验证
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-07-12 15:40:39
 */
import * as _types from './tools.type'

export const vfn = {
  string: _types.isString,
  number: _types.isNumber,
  boolean: _types.isBoolean,
  array: _types.isArray,
  date: _types.isDate,
  int: _types.isInteger,
  int32: _types.isInteger,
  int64: _types.isInteger,
  email: _types.isEmail,
  arryRepeatedString: o =>
    _types.isArray(o) && o.every(i => _types.isString(i)),
  double: _types.isNumber
}

const vGPS = { type: 'number', min: -90, max: 90 }

const vmap = {
  required: { required: true, message: 'is required' },
  money: {
    pattern: /^\d+(\.\d{1,2})?$/,
    message: 'It should be greater than 0 and accurate to two decimal places.'
  },
  ID: {
    pattern: /^\d{9}$/,
    message: 'format error'
  },
  mobile: {
    pattern: /^(\+260|260|0)?(77|76|95|96|97)\d{7}$/,
    message: 'format error'
  },
  GPSlat: vGPS,
  GPSlng: vGPS
}

function validator(_type) {
  if (!vfn[_type]) console.error(new Error(_type + ' undefind'))
  return (rule, value, callback) => {
    if (typeof value !== 'number' && !value) return callback()
    if (vfn[_type](value)) {
      callback()
    } else {
      callback(new Error('format error'))
    }
  }
}

export const verify = (...type) =>
  type.map(item => (vmap[item] ? vmap[item] : { validator: validator(item) }))

export const validateToAsync = async validate =>
  new Promise((resolve, reject) => {
    validate(status => (status ? resolve(status) : reject(status)))
  })
