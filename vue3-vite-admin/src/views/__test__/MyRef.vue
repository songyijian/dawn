<!--
 * @Author: your name
 * @Date: 2022-01-09 15:34:32
 * @LastEditTime: 2022-01-10 01:31:27
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-vite-admin/src/views/__test__/SetupFunc.vue
-->

<template>
  <h1>MyRef</h1>
  <h2>{{ info.name }}</h2>
  <h2>{{ age }}</h2>
  <button @click="func">update</button>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue-demi";

export default {
  setup(props) {
    // 1、组件、dom的引用
    let item = ref(null);

    // 响应函数

    // 2、简单类型数据
    let age = ref(12);

    // 3、对象类型
    let info = ref({
      name: "xiao-ming",
      sex: "man",
    });

    function func() {
      age.value = age.value + 1; // 修改数据

      console.log(age); // RefImpl {value:12,...get/set} 引用实现对象

      console.log(info); // RefImpl

      console.log(info.name, info.value.name); // undefined ,'xiao-ming'

      console.log(item);
    }

    return {
      age,
      info,
      func,
    };
  },
};
</script>