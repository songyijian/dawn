<!--
 * @Author: your name
 * @Date: 2022-01-09 15:34:32
 * @LastEditTime: 2022-01-09 18:04:23
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-vite-admin/src/views/__test__/SetupFunc.vue
-->
<template>
  <h1>MyReactive</h1>
  <h2>{{ data.name }}</h2>
  <h2>{{ data.age }}</h2>
  <button @click="func">update</button>
</template>

<script>
import { reactive, ref } from "vue-demi";

export default {
  setup(props) {
    const data = reactive({
      name: "xiao-ming",
      age: 18,
    });

    function func() {
      console.log(data); // Proxy
      data.age = data.age + 1;
    }

    return {
      data,
      func,
    };
  },
};
</script>