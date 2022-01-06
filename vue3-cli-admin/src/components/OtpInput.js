/*
 * @Description:Otp 模态框
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-27 11:16:55
 */

import { ElMessageBox } from 'element-plus'

export default function OtpInput() {
  return ElMessageBox.prompt('Otp', '', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    inputPattern: /\S/,
    inputErrorMessage: 'is required'
  })
}
