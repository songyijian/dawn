const path = require('path')

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

console.log(process.env.NODE_ENV, 'prod：' + IS_PROD)

const config = {
  productionSourceMap: !IS_PROD,
  outputDir: 'dist',
  assetsDir: '',
  indexPath: 'index.html',
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, './src')
      }
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "src/assets/styles/_variable.scss";`
      }
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 6799,
    https: false,
    proxy: {
      '/cmapi': {
        bypass: (req, res) => {
          req.headers.referer =
            'https://dev-westafrica-cm-web.frontends.opayweb.com/'
        },
        target: 'https://zm-admin-api-test.opayweb.com/',
        resure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/cmapi': ''
        }
      }
    }
  }
}

module.exports = config
