/*
 * @Description: 协议表
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-09 15:02:40
 */

const checkStatus = {
  1: 'Under review', //'待审核',
  2: 'Approved', //'已通过',
  3: 'Rejected' //'已驳回'
}



export const KEY_CHECK_STATUS = checkStatus

// 商户角色(1.agent 2.master)
export const MERCHANT_ROLE = {
  1: 'agent',
  2: 'master'
}

// approval_status 查询审批状态列表（0.全部 1.待审核 2.审核通过 3.驳回）
export const MERCHANT_QUERY_APPROVAL_STATUS = checkStatus

// 审批状态(1.入驻已通过 101.入驻待审核 102.入驻已拒绝 103.入驻驳回 201.修改待审核 202.修改拒绝 203.修改驳回 301.退驻待审核 302.退驻拒绝 303.退驻通过 400.冻结 401.人工解冻 402.自动解冻)
export const MERCHANT_APPROVAL_STATUS = {
  1: '入驻已通过',
  101: '入驻待审核',
  102: '入驻已拒绝',
  103: '入驻驳回',
  201: '修改待审核',
  202: '修改拒绝',
  203: '修改驳回',
  301: '退驻待审核',
  302: '退驻拒绝',
  303: '退驻通过',
  400: '冻结',
  401: '人工解冻',
  402: '自动解冻'
}

export const MERCHANT_ID_TYPE = {
  1: 'ID',
  2: '护照',
  3: '驾驶证'
}

export const GENDER = {
  1: 'male',
  2: 'female'
}

export const MERCHANT_REJEACT_RESON = {
  1: 'Abnormal account',
  2: 'Illegal account'
}

export const KYC_LEVEL = {
  1: 'KYC1',
  2: 'KYC2'
}

export const RECHARGE_STATUS = {
  0: "审核中",
  1: "已通过",
  "-1": "已拒绝"
}
