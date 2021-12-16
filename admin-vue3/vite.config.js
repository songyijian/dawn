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
          target: 'https://zm-admin-api-test.opayweb.com/',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/cmapi/, '')
        }
      }
    }
  })
}
