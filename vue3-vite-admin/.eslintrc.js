/*
 * @Description: eslint配置
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-01 15:40:22
 */

module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'airbnb-base'],
  parserOptions: {
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    indent: [2, 4],
    'no-unused-vars': [
      2,
      {
        vars: 'all',
        args: 'all'
      }
    ]
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'no-unused-vars': [0]
      }
    }
  ]
}
