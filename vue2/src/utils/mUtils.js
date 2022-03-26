const dateFormat = require("dateformat");
/**
 * 存储sessionStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  }
  window.sessionStorage.setItem(name, content);
};

/**
 * 获取sessionStorage
 */
export const getStore = (name) => {
  if (!name) return;
  try {
    return JSON.parse(window.sessionStorage.getItem(name));
  } catch (error) {
    return window.sessionStorage.getItem(name);
  }
};

/**
 * 删除sessionStorage
 */
export const removeStore = (name) => {
  if (!name) return;
  window.sessionStorage.removeItem(name);
};

export const getParam = function (path) {
  let url = path || location.search;
  let theRequest = new Object();
  if (url.indexOf("?") != -1) {
    let str = url.substr(1);
    let strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURIComponent(
        strs[i].split("=")[1]
      );
    }
  }
  return theRequest;
};

//随机串
export const createRandomId = (key) => {
  let randomStr =
    (Math.random() * 10000000).toString(16).substr(0, 4) +
    "-" +
    new Date().getTime() +
    "-" +
    Math.random().toString().substr(2, 5);
  key && setStore(key, randomStr);
  return randomStr;
};

// copy
export const copy = (text) => {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.setAttribute("readonly", "readonly");
    input.setAttribute("value", text);
    document.body.appendChild(input);
    input.setSelectionRange(0, 9999);
    if (document.execCommand("copy")) {
      document.execCommand("copy");
      resolve();
      document.body.removeChild(input);
    } else {
      document.body.removeChild(input);
    }
  });
};

// 格式化金额
export const parseNumber = function (amount, showStyle = true) {
  const options = { currency: "NGN" };
  if (showStyle) {
    options.style = "currency";
  }
  return Number(amount).toLocaleString("en-NG", options);
};

export const parseNumberPlus = function (amount) {
  let num = Number(amount)
    .toString()
    .replace(/\d+/, function (s) {
      return s.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
    });
  return `₦${num}`;
};

export const timeZoneCorrection = function (
  date,
  format = "yyyy-mm-dd HH:MM:ss"
) {
  const UTCDifference = new Date().getTimezoneOffset() * 60 * 1000;
  date = new Date(date).getTime();
  const time =
    UTCDifference < 0
      ? date + Math.abs(UTCDifference)
      : date - Math.abs(UTCDifference);

  return dateFormat(time, format);
};

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function (...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

export function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

// 格式化金额
export const parseAmount = function (amount, showStyle = true) {
  const options = { currency: "NGN" };
  if (showStyle) {
    options.style = "currency";
  }
  return Number(amount).toLocaleString("en-NG", options).replace("₦", "");
};

// 设备类型
export const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i) ? !0 : !1;
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|ipad|iPod/i) ? !0 : !1;
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i) ? !0 : !1;
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i) ? !0 : !1;
  },
  any: function () {
    return this.Android() || this.BlackBerry() || this.iOS() || this.Windows();
  },
};
