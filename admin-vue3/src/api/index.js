/*
 * @Description: ajax
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-02 16:08:38
 */

import axios from '@/plugins/axios.js'

export const GET_logout = () => axios.get('/cmapi/manage/sys/user/logout')

export const GET_meInfo = () => axios.get('/cmapi/manage/sys/user/me')

export const POST_userlist = (data = {}) => axios.post('/cmapi/manage/sys/user/list', data)

export const POST_userdelete = (data = {}) => axios.post('/cmapi/manage/sys/user/delete', data)

export const POST_userEdit = (data = {}) => axios.post('/cmapi/manage/sys/user/edit', data)

export const GET_roleList = () => axios.get('/cmapi/manage/sys/role/list')

export const GET_tree = () => axios.get('/cmapi/manage/sys/menu/tree')

// KYC管理

export const POST_kycAppList = (data = {}) => axios.post('/cmapi/manage/kyc/application/list', data)

export const POST_kycView = (data = {}) => axios.post('/cmapi/manage/kyc/application/view', data)

export const POST_kycPass = (data = {}) => axios.post('/cmapi/manage/kyc/application/pass', data)

export const POST_kycReject = (data = {}) => axios.post('/cmapi/manage/kyc/application/reject', data)

// 商户
export const POST_merchantList = (data = {}) => axios.post('/cmapi/manage/merchant/application/list', data)

export const POST_merchantFreezeList = (data = {}) => axios.post('/cmapi/manage/merchant/freeze/list', data)

export const POST_merchantRetireList = (data = {}) => axios.post('/cmapi/manage/merchant/retire/list', data)

export const POST_merchantApprovalInfo = (data = {}) => axios.post('/cmapi/manage/merchant/approval/info', data)

export const POST_merchantRechargeList = (data = {}) => axios.post('/cmapi/manage/merchant/recharge/list', data)

export const POST_merchantCreate = (data = {}) => axios.post('/cmapi/manage/merchant/create', data)

// 申请待审核：审核通过、驳回、拒绝 *

// 申请驳回：重新编辑后提交申请

// 申请拒绝：被拒绝、什么都干不了

// 审核通过：可以修改信息
// 修改待审核：审核通过、驳回、拒绝
// 修改驳回：重新修改后提交
// 修改拒绝：不可再修改，状态同入驻通过
// 退驻待审核：可以退驻驳回、通过
// 退驻已通过：最终态
// 退驻拒绝：同审核通过
// 退驻待审核、入驻通过、修改驳回、修改拒绝、都可以冻结
// 已冻结：可以解冻 （退驻待审核/冻结入驻已通过/修改已驳回/已拒绝退驻/修改已拒绝状态的商家账户）

// 审批状态(1.入驻已通过 101.入驻待审核 102.入驻已拒绝 103.入驻驳回 201.修改待审核 202.修改拒绝 203.修改驳回 301.退驻待审核 302.退驻拒绝 303.退驻通过 400.冻结)
// 101 || 201
export const POST_merchantApprovalRefus = (data = {}) => axios.post('/cmapi/manage/merchant/approval/refuse', data) //  审核拒绝

export const POST_merchantApprovalPass = (data = {}) => axios.post('/cmapi/manage/merchant/approval/pass', data) // 审核通过

export const POST_merchantApprovalReject = (data = {}) => axios.post('/cmapi/manage/merchant/approval/reject', data) // 审核驳回

// 103
export const POST_merchantReapplication = (data = {}) => axios.post('/cmapi/manage/merchant/reapplication', data) // 审核驳回,编辑后再申请

// 1,203
export const POST_merchantModifyInfo = (data = {}) => axios.post('/cmapi/manage/merchant/modify/info', data) // 审核通过，入驻已通过,编辑后再申请（提交后进入审核201）

// 退驻 301
export const POST_merchantRetiredReject = (data = {}) => axios.post('/cmapi/manage/merchant/retired/reject', data) // 驳回退住

export const POST_merchantRetiredPass = (data = {}) => axios.post('/cmapi/manage/merchant/retired/pass', data) // 通过退驻 （变303）

// 可冻结 1、203、202、301、302
export const POST_merchantFreeze = (data = {}) => axios.post('/cmapi/manage/merchant/freeze', data) // 冻结

export const POST_merchantUnfreeze = (data = {}) => axios.post('/cmapi/manage/merchant/unfreeze', data) // 解冻结

// 文件上传
export const POST_uploadImage = data => axios.post('/cmapi/manage/upload/form/image', data, { headers: { 'Content-Type': 'multipart/form-data' } })
