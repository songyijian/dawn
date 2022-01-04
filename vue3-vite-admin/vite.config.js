import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default ({ mode }) => {
  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: [{ find: '@', replacement: resolve(__dirname, 'src') }]
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
          additionalData: '@import "src/assets/styles/_variable.scss";'
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      open: true,
      proxy: {
        '/cmapi': {
          bypass: (req, res) => {
            req.headers.referer =
              'https://dev-westafrica-cm-web.frontends.opayweb.com/'
          },
          target: 'https://zm-admin-api-test.opayweb.com/',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/cmapi/, '')
        }
      }
    }
  })
}
