const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const publicPath = process.env.VUE_APP_ORIGIN;

const config = {
  outputDir: "dist",
  assetsDir: "",
  indexPath: "index.html",
  lintOnSave: true,
  productionSourceMap: !IS_PROD,
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/style/_mixin.scss";`,
      },
      // postcss: {
      //   plugins: [
      //     require("autoprefixer")({
      //       overrideBrowserslist: ["Android >= 4.0", "iOS >= 7"],
      //     }),
      //     require("postcss-pxtorem")({
      //       rootValue: 37.5, // 换算的基数
      //       selectorBlackList: ["ig"],
      //       propList: ["*"],
      //       exclude: /node_modules/,
      //     }),
      //   ],
      // },
    },
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      config.externals({
        vue: "Vue",
        "vue-router": "VueRouter",
        vuex: "Vuex",
        axios: "axios",
        vant: "vant",
        dateformat: "dateFormat",
      });
    }
  },
  devServer: {
    host: "0.0.0.0",
    port: 6799,
    https: false,
    proxy: {
      "/apiBuried": {
        target: "https://xxxxxx/",
        resure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/apiBuried": "",
        },
      },
    },
  },
};

if (process.env.NODE_ENV === "production") {
  config.publicPath = publicPath;
}

module.exports = config;
