/*
 * @Description: 工具方法
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-07-12 15:40:39
 */

function tiemFormat(t = new Date(), fmt = 'yyyy-MM-dd h:m:s.s') {
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
    hh: tf(ot.getHours() % 12),
    h: ot.getHours() % 12,
    mm: tf(ot.getMinutes()),
    m: ot.getMinutes(),
    ss: tf(ot.getSeconds()),
    s: ot.getSeconds(),
    w: ['日', '一', '二', '三', '四', '五', '六'][ot.getDay()]
  }
  return fmt.replace(/[a-z]+/gi, function ($1) {
    return obj[$1]
  })
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
  return strData ? JSON.parse('{"' + decodeURIComponent(strData).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}') : undefined
}

// dd/mm/yyyy hh:mm:ss
export const fFullTime = t => tiemFormat(t, 'dd/MM/yyyy hh:m:s')

// 	29/01/2021
export const fDate = t => tiemFormat(t, 'dd/MM/yyyy')
