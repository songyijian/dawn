/*
 * @Description: ajax
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-02 16:08:38
 */

import axios from '@/plugins/axios.js'

export const GET_logout = () => axios.get('/cmapi/manage/sys/user/logout')

export const GET_meInfo = () => axios.get('/cmapi/manage/sys/user/me')

export const POST_userlist = (data = {}) =>
  axios.post('/cmapi/manage/sys/user/list', data)

export const POST_userdelete = (data = {}) =>
  axios.post('/cmapi/manage/sys/user/delete', data)

export const POST_userEdit = (data = {}) =>
  axios.post('/cmapi/manage/sys/user/edit', data)

export const GET_roleList = () => axios.get('/cmapi/manage/sys/role/list')


/*
文件上传
*/
export const POST_uploadImage = (data) =>
  axios.post('/cmapi/manage/upload/form/image', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
