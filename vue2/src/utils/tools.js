/*
 * @Description: 工具方法
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-07-12 15:40:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-26 17:30:36
 */
export function tIntervarl(fn, t = 0, ...args) {
  clearTimeout(ot);
  let time = t;
  var ot = setTimeout(function func() {
    fn.apply(this, args);
    ot = setTimeout(func, time);
  }, t);

  var setTime = (n) => (time = n);
  var clear = () => {
    clearTimeout(ot);
    time = ot = null;
  };
  return { clear, setTime };
}

// 计数器
export class Logger {
  constructor(fn) {
    this.db = 0;
    this.change = fn;
  }
  up() {
    this.db = ++this.db;
    this.change(this.db);
  }
  down() {
    if (this.db > 0) {
      this.db = --this.db;
      this.change(this.db);
    }
  }
}

// function flow
export function flow(...fns) {
  const db = [...fns];
  return (arg) => db.reduce((a, fn) => fn(a), arg);
}
/**
 * @Description: 格式化
 * @param {string} n 整数字符串
 * @param {*} unit 进制
 * @return {string}
 * quantile('1234')
 *    > 1,234
 */
function quantile(n, unit = 3) {
  let t = "";
  while (n.length > unit) {
    t = "," + n.slice(-unit) + t;
    n = n.slice(0, n.length - unit);
  }
  return n + t;
}
/**
 * @description: 清洗字符串得到分位格式化
 * @param {number} num
 * @param {number} precision 小数精度
 * @param {number} unit 进制
 * @return {string}
 * enQuantile("3abc454.2427",2)
 *  > 3,454.24
 */
export const enQuantile = function (num = "", precision, unit = 3) {
  let t = String(num).replace(/[^0-9|^.]/gi, "");
  let anchor = t.lastIndexOf(".");
  if (anchor < 0) return quantile(t, unit);
  t = t.replace(/\./gi, "");
  let head = t.slice(0, anchor);
  let after = t.slice(anchor);
  if (precision === 0) return quantile(head, unit);
  return (
    quantile(head, unit) +
    "." +
    (after.length > precision ? after.slice(0, precision) : after)
  );
};

/**
 * @description: 反解分位
 * @param {string} str
 * @param {function} type Number｜String 得到类型的构造函数
 * @return {string ｜ number}
 * 12,34,56,78 > 12345678
 */
export const deQuantile = (str = "", type = Number) => {
  if (str === "") return;
  let a = String(str).replace(/,/gi, "");
  return type(a);
};

/**
 * @Description:考包转奈拉
 * @param {*} params
 * @return {*}
 * @Author: yijian
 */
export function toNL(params) {
  return params / 100;
}

/**
 * @Description:奈拉转考包
 * @param {*} params
 * @return {*}
 * @Author: yijian
 */
export function toKB(params) {
  return params * 100;
}
