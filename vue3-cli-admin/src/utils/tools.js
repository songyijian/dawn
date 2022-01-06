/*
 * @Description: 工具方法
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-07-12 15:40:39
 */

function tiemFormat(t = new Date(), fmt = 'yyyy-MM-dd hh:mm:s.s') {
  const tf = n => (n < 10 ? '0' + n : n)
  const ot = new Date(t)
  const obj = {
    yyyy: ot.getFullYear(),
    yy: ot.getFullYear().toString().slice(2),
    MM: tf(ot.getMonth() + 1),
    M: ot.getMonth() + 1,
    dd: tf(ot.getDate()),
    d: ot.getDate(),
    HH: tf(ot.getHours()),
    H: ot.getHours(),
    hh: tf(ot.getHours()),
    h: ot.getHours(),
    mm: tf(ot.getMinutes()),
    m: ot.getMinutes(),
    ss: tf(ot.getSeconds()),
    s: ot.getSeconds()
    // w: ['日', '一', '二', '三', '四', '五', '六'][ot.getDay()]
  }
  return fmt.replace(/[a-z]+/gi, $1 => obj[$1])
}

class Logger {
  constructor(fn) {
    this.db = 0
    this.change = fn
  }
  up() {
    this.db = ++this.db
    this.change(this.db)
  }
  down() {
    if (this.db > 0) {
      this.db = --this.db
      this.change(this.db)
    }
  }
}

export const logger = fn => new Logger(fn)

export const JSONcopy = data => JSON.parse(JSON.stringify(data))

export function getURLParams(url) {
  if (typeof url !== 'string') return
  let strData = url.split('?')[1]
  return strData
    ? JSON.parse(
        '{"' +
          decodeURIComponent(strData)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
          '"}'
      )
    : undefined
}

export const timeStyle = t =>
  t ? tiemFormat(t * 1000, 'dd/MM/yyyy hh:mm:ss') : '-'

export const dateToNum = date => new Date(date).getTime() / 1000

export const convert = n => n / 100

export function delByVal(json, rm) {
  const ar = o => Array.isArray(o)
  const isAr = ar(json)
  const a = isAr ? [...json] : { ...json }
  const r = new Set(ar(rm) ? rm : [rm])

  if (isAr) return a.filter(item => !r.has(item))

  for (const key in a) {
    if (Object.hasOwnProperty.call(a, key)) {
      const item = a[key]
      r.has(item) && delete a[key]
    }
  }
  return a
}
