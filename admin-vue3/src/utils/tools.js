/*
 * @Description: 工具方法
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-07-12 15:40:39
 */

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
