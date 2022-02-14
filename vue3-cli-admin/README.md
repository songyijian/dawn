# 西非业务管理后台 zambia

## 开发指南

运行环境

```shell

# 1 init
npm install

# 2、启动
npm run dev

```

注意：

- 开发环境（`process.env.NODE_ENV !== 'development'`），进入页不会自动调到统一的登录页。请手动登录拷贝 token 到本地开发环境。
- 架构统一登录地址：https://xxxxx.com/login

## 环境配置

### url

### 部署工程

### 代理

### 产品文档

### api 文档

### 英文翻译

### 按钮权限整理

```js
export const asyncRouterMap = [
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
