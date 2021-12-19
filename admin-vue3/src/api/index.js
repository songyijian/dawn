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

/*
KYC管理
*/

export const POST_kycAppList = (data = {}) => axios.post('/cmapi/manage/kyc/application/list', data)

export const POST_kycView = (data = {}) => axios.post('/cmapi/manage/kyc/application/view', data)

export const POST_kycPass = (data = {}) => axios.post('/cmapi/manage/kyc/application/pass', data)

export const POST_kycReject = (data = {}) => axios.post('/cmapi/manage/kyc/application/reject', data)

/*
商户
*/
export const POST_merchantList = (data = {}) => axios.post('/cmapi/manage/merchant/application/list', data)

export const POST_merchantFreezeList = (data = {}) => axios.post('/cmapi/manage/merchant/freeze/list', data)

export const POST_merchantRetireList = (data = {}) => axios.post('/cmapi/manage/merchant/retire/list', data)

export const POST_merchantApprovalInfo = (data = {}) => axios.post('/cmapi/manage/merchant/approval/info', data)

// export const POST_merchantRechargeList = (data = {}) => axios.post('/cmapi/manage/merchant/recharge/list', data)

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

// 1,203、 302
export const POST_merchantModifyInfo = (data = {}) => axios.post('/cmapi/manage/merchant/modify/info', data) // 审核通过，入驻已通过,编辑后再申请（提交后进入审核201）

// 退驻 301
export const POST_merchantRetiredReject = (data = {}) => axios.post('/cmapi/manage/merchant/retired/reject', data) // 驳回退住

export const POST_merchantRetiredPass = (data = {}) => axios.post('/cmapi/manage/merchant/retired/pass', data) // 通过退驻 （变303）

// 可冻结 1、201、203、202、301、302
export const POST_merchantFreeze = (data = {}) => axios.post('/cmapi/manage/merchant/freeze', data) // 冻结

export const POST_merchantUnfreeze = (data = {}) => axios.post('/cmapi/manage/merchant/unfreeze', data) // 解冻结

export const POST_merchantTradeReq = (data = {}) => axios.post('/cmapi/manage/db/merchant/trade/info', data)

/*
文件上传
*/
export const POST_uploadImage = data => axios.post('/cmapi/manage/upload/form/image', data, { headers: { 'Content-Type': 'multipart/form-data' } })

/*
Dashboard 商户交易列表
*/
export const POST_DashboardAppOrderList = (data = {}) => axios.post('/cmapi/manage/merchant/app_order/list', data)

export const POST_DashboardPlatformTradeInfo = (data = {}) => axios.post('/cmapi/manage/db/platform/trade/info', data)

export const POST_DashboardPlatformRecharge = (data = {}) => axios.post('/cmapi/manage/db/platform/recharge', data)

export const POST_MerchantRechargeListReq = (data = {}) => axios.post('/cmapi/manage/db/merchant/recharge/list', data)

export const POST_DashboardRechargeDetail = (data = {}) => axios.post('/cmapi/manage/db/platform/recharge/detail', data)

export const POST_DashboardPlatformRechargeList = (data = {}) => axios.post('/cmapi/manage/db/platform/recharge/list', data)

// export const POST_DashboardMerchantSearchReq = (data = {}) => axios.post('/cmapi/manage/db/merchant/search', data) // 接口失败，通过手机搜索商户
export const POST_DashboardMerchantSearchReq =()=> Promise.resolve({
    "code": 0,
    "message": "success",
    "data": {
      "merchant": {
        "id": 7,
        "app_user_id": "",
        "merchant_role": 1,
        "name": "dylan",
        "business_description": "eee",
        "business_type": "fff",
        "merchant_province": "",
        "merchant_city": "",
        "lng": 3.2,
        "lat": 4.3,
        "store_address": "store_address",
        "business_time": "ggg",
        "email": "dylan@sina.com",
        "mobile": "+260123456783",
        "first_name": "aaa",
        "last_name": "bbb",
        "gender": 0,
        "user_province": "",
        "user_city": "",
        "user_address": "ccc",
        "id_type": 0,
        "id_number": "111",
        "birthday": "2001-01-01",
        "recommend_code": "ddd",
        "recommend_pics": [
          "aaa",
          "bbb"
        ],
        "id_pics": [
          "aaa",
          "bbb"
        ],
        "expense_bill_pics": [
          "aaa",
          "bbb"
        ],
        "store_pics": [
          "aaa",
          "bbb"
        ],
        "approval_status": 101,
        "stage": 1,
        "current_approval_id": 13,
        "freeze_expire_date": 0,
        "register_time": 0,
        "register_id": 195,
        "create_time": 1639481825,
        "update_time": 1639481825,
        "applicant_id": 195,
        "application_time": 1639481825,
        "manager_id": 0,
        "approval_time": 0,
        "kyc_level": 0
      },
      "trade_info": {
        "account_balance": 9999999,
        "usable_balance": 0,
        "trading_num": 0,
        "agent_num": 0
      }
    }
  }
  )

export const POST_DashboardMerchantRechargeReq = (data = {}) => axios.post('/cmapi/manage/db/merchant/recharge', data)

export const POST_RechargeDetailReq = (data = {}) => axios.post('/cmapi/manage/db/merchant/recharge/detail', data)

export const POST_SendOtpReq = (data = {}) => axios.post('/cmapi/manage/db/send/otp', data)

export const POST_RechargeApproveReq = (data = {}) => axios.post('/cmapi/manage/db/merchant/recharge/approve', data)




// 6.2 首页商户交易流水
// POST /manage/db/merchant/recharge/list


// 交易流水页不要。

// 首页的交易流水保留
// 首页商户交易流水
// POST /manage/db/merchant/recharge/list  参数为空


// 交易管理页面的list
// 复用首页的，首页商户交易流水
// POST /manage/db/merchant/recharge/list  

// 交易管理，详情
// 6.8 商户充值交易详情
// POST /manage/db/merchant/recharge/detail


// 审核
// 6.9 商户充值审核 审批状态(1 通过 -1 驳回)
// POST /manage/db/merchant/recharge/approve


