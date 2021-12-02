/*
 * @Description: cookie 操作
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-09-10 18:34:29
 */

//设置cookie，有效期为365天
export const setCookie = (keyName, value, expireDays) => {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expireDays);
  document.cookie =
    keyName +
    "=" +
    escape(value) +
    (expireDays == null ? "" : ";expires=" + exdate.toGMTString());
};

//取回，若cookie失效，将返回空
export const getCookie = (c_name) => {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      let c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) c_end = document.cookie.length;
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
};
