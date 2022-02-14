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
  arryRepeatedString: (o) =>
    _types.isArray(o) && o.every((i) => _types.isString(i)),
  double: _types.isNumber
}

const vmap = {
  required: { required: true, message: 'is required', trigger: 'blur' },
  money: {
    pattern: /^\d+(\.\d{1,2})?$/,
    message: 'It should be greater than 0 and accurate to two decimal places.',
    trigger: 'blur'
  },
  ID: {
    pattern: /^\d{9}$/,
    message: 'format error',
    trigger: 'blur'
  },
  mobile: {
    pattern: /^(\+260|260|0)?(77|76|95|96|97)\d{7}$/,
    message: 'format error',
    trigger: 'blur'
  },
  GPSlat: { type: 'number', min: -90, max: 90, trigger: 'blur' },
  GPSlng: { type: 'number', min: -180, max: 180, trigger: 'blur' }
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

function trimTip(rule, value, callback) {
  const oringinValue = value
  let beRightValue = value
  console.log(_types.isString(beRightValue), value, rule)
  if (!beRightValue.trim) return callback()
  if (beRightValue.trim().length == oringinValue.length) return callback()
  return callback(new Error('Space is not allowed at the beginning and end.'))
}

export const verify = (...type) => {
  let emap = type.map((item) =>
    vmap[item] ? vmap[item] : { validator: validator(item), trigger: 'blur' }
  )
  // 校验手动录入的表单前后不能有空格,整个系统需要校验
  return [{ validator: trimTip, trigger: 'blur' }, ...emap]
}

export const validateToAsync = async (validate) =>
  new Promise((resolve, reject) => {
    validate((status) => (status ? resolve(status) : reject(status)))
  })
