<!--
 * @Author: your name
 * @Date: 2022-01-07 23:39:27
 * @LastEditTime: 2022-01-09 18:03:33
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-vite-admin/src/views/__test__/index.vue
-->
<template>
  <div class="box">
    <SetupFunc></SetupFunc>
    <hr />
    <MyRef></MyRef>
    <hr />
    <MyReactive></MyReactive>
  </div>
</template>

<script setup>
import SetupFunc from "@/views/__test__/SetupFunc.vue";
import MyRef from "@/views/__test__/MyRef.vue";
import MyReactive from "@/views/__test__/MyReactive.vue";
</script>

<style scoped>
.box {
  text-align: center;
}
</style>
