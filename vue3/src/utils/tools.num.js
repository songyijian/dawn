/*
 * @Description: 数字精度计算
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-09-10 18:28:17
 */

function isInteger(obj) {
  return Math.floor(obj) === obj
}

function toInteger(floatNum) {
  var ret = { times: 1, num: 0 }
  if (isInteger(floatNum)) {
    ret.num = floatNum
    return ret
  }
  var strfi = floatNum + ''
  var dotPos = strfi.indexOf('.')
  var len = strfi.substr(dotPos + 1).length
  var times = Math.pow(10, len)
  var intNum = Number(floatNum.toString().replace('.', ''))
  ret.times = times
  ret.num = intNum
  return ret
}

function operation(a, b, digits, op) {
  var o1 = toInteger(a)
  var o2 = toInteger(b)
  var n1 = o1.num
  var n2 = o2.num
  var t1 = o1.times
  var t2 = o2.times
  var max = t1 > t2 ? t1 : t2
  var result = null
  switch (op) {
    case 'add':
      if (t1 === t2) {
        result = n1 + n2
      } else if (t1 > t2) {
        result = n1 + n2 * (t1 / t2)
      } else {
        result = n1 * (t2 / t1) + n2
      }
      return result / max
    case 'subtract':
      if (t1 === t2) {
        result = n1 - n2
      } else if (t1 > t2) {
        result = n1 - n2 * (t1 / t2)
      } else {
        result = n1 * (t2 / t1) - n2
      }
      return result / max
    case 'multiply':
      result = (n1 * n2) / (t1 * t2)
      return result
    case 'divide':
      result = (n1 / n2) * (t2 / t1)
      return result
  }
}

function add(a, b, digits) {
  return operation(a, b, digits, 'add')
}
function subtract(a, b, digits) {
  return operation(a, b, digits, 'subtract')
}
function multiply(a, b, digits) {
  return operation(a, b, digits, 'multiply')
}
function divide(a, b, digits) {
  return operation(a, b, digits, 'divide')
}

export default {
  add,
  subtract,
  multiply,
  divide
}
