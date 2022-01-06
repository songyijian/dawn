# 西非业务管理后台 zambia

## 环境配置

### gitlab

- https://git.opaydev.com/opay-app-h5/westafrica-pc

### url

- dev http://dev-westafrica-cm-web.frontends.opayweb.com/
- prod https://zm-admin.opayweb.com/

### jenkins

- https://deploy.opayweb.com/view/%20west-africa/job/prod-frontend-westafrica-pc/

### 产品文档

- https://wiki.opaydev.com/pages/viewpage.action?pageId=149783077&preview=/149783077/158662703/dashboard1210.png#id-2%E8%A5%BF%E9%9D%9E-AD%E5%90%8E%E5%8F%B0-%E6%98%8E%E5%8D%93-3.3DASHBOARD

### api 文档

- https://git.opaydev.com/opay-go/zambia/blob/master/README.md

### 英文翻译

- https://docs.qq.com/sheet/DRHhnQ2tyZFN1SUlX?tab=t6fwrt&_t=1639714422326

### 代理

- dev: 见 vue.config.js 配置
- 生产: 接口`https://zm-admin-api.opayweb.com`

### 按钮权限整理

```js
export const asyncRouterMap = [
  {
    path: '/dashboard',
    name: 'dashboard',
    children: [
      {
        path: 'recharge-platform',
        name: 'rechargePlatform',
        btns: ['Recharge']
      },
      {
        path: 'recharge-merchant',
        name: 'rechargeMerchant'
      },
      {
        path: 'transaction-management',
        name: 'transactionManagement'
      },
      {
        path: 'recharge-details',
        name: 'rechargeDetails',
        btns: ['Approve', 'Reject']
      }
    ]
  },
  {
    path: '/merchants',
    name: 'merchants',
    children: [
      {
        path: 'list',
        name: 'merchantsList',
        btns: ['CreateAgent', 'CreateMaster']
      },
      {
        path: 'create-agent',
        name: 'createAgent'
      },
      {
        path: 'create-master',
        name: 'createMaster'
      },
      // {
      //   path: 'create',
      //   name: 'merchantsCreatePage'
      // },
      {
        path: 'frozen',
        name: 'merchantsFrozen'
      },
      {
        path: 'settled',
        name: 'merchantsSettled'
      },
      {
        path: 'audit',
        name: 'merchantsAuditPage',
        btns: [
          'Approve',
          'Return',
          'Reject',
          'Freeze',
          'Unfreeze',
          'RetiredReject',
          'RetiredPass',
          'Edit'
        ]
      }
    ]
  },
  {
    path: '/KYC',
    name: 'KYC',
    children: [
      {
        path: 'list',
        name: 'KYClist'
      },
      {
        path: 'details',
        name: 'KYCdetails',
        btns: ['Approve', 'Reject']
      }
    ]
  },
  {
    path: '/role',
    name: 'role',
    children: [
      {
        path: 'list',
        name: 'roleUserlist',
        btns: ['Edit', 'Delete']
      }
    ]
  }
]
```
