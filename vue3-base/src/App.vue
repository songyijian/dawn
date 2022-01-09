<!--
 * @Author: your name
 * @Date: 2022-01-07 23:39:27
 * @LastEditTime: 2022-01-09 01:18:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-base/src/App.vue
-->
<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <!-- <HelloWorld msg="Hello Vue 3.0 + Vite" /> -->
  <Test></Test>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import Test from "./components/Test.vue";

export default {
  name: "App",
  components: {
    // HelloWorld,
    Test,
  },
};
</script>
