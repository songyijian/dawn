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

// approval_status 查询审批Status列表（0.全部 1.待审核 2.审核通过 3.驳回）
export const MERCHANT_QUERY_APPROVAL_STATUS = checkStatus

// 商户角色(1.agent 2.master)
export const MERCHANT_ROLE = {
  1: 'Agent',
  2: 'Master'
}

// 审批Status
export const MERCHANT_APPROVAL_STATUS = {
  1: 'Registration approved', //1: '入驻已通过',
  101: 'Registration under review', //101: '入驻待审核',
  102: 'Registration rejected', //102: '入驻已拒绝',
  103: 'Registration returned', //103: '入驻驳回',
  201: 'Editing under review', //201: '修改待审核',
  202: 'Editing rejected', //202: '修改拒绝',
  203: 'Editing returned', //203: '修改驳回',
  301: 'Deletion under review', //301: '退驻待审核',
  302: 'Deletion rejected', //302: '退驻拒绝',
  303: 'Deletion approved', //303: '退驻通过',
  400: 'Frozen', //400: '冻结',
  401: 'Manual unfreezing', //401: '人工解冻',
  402: 'Auto unfreezing' //402: '自动解冻'
}

export const MERCHANT_ID_TYPE = {
  1: 'NRC',
  2: 'Passport',
  3: "Driver's license"
}

export const GENDER = {
  1: 'Male',
  2: 'Female'
}

//拒绝修改
export const MERCHANT_REJEACT_RESON = {
  1: 'Abnormal account',
  2: 'Illegal account'
}

export const KYC_LEVEL = {
  1: 'KYC-1',
  2: 'KYC-2'
}

export const RECHARGE_STATUS = {
  1: 'Under review', //'审核中',
  2: 'Approved',
  3: 'Rejected'
}

//驳回修改
export const MERCHANT_RETURN_REVISE_RESON = {
  1: 'Address format error',
  2: 'Incomplete address information'
}

// 拒绝修改
export const MERCHANT_REJEACT_REVISE_RESON = {
  1: 'The modified information is illegal',
  2: 'Address format error'
}

//拒绝入驻
export const MERCHANT_REJEACT_SETTLED_RESON = {
  1: 'Abnormal account',
  2: 'Illegal account'
}

//驳回入驻
export const MERCHANT_RETURN_SETTLED_RESON = {
  1: 'Incorrect information',
  2: 'Blurry photos',
  3: "Photos and description don't match",
  4: 'Incorrect photos',
  5: 'Invalid mobile number'
}

// 角色状态
export const ROLE_STATUS = {
  1: 'Enable',
  2: 'Disable'
}
