<!--
 * @Description: 系统板式
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-01 18:13:11
-->
<template>
  <el-container class="layout-box">
    <el-aside width="240px">
      <Aside></Aside>
    </el-aside>
    <el-container>
      <el-header><Header></Header></el-header>
      <el-main class="layout-mian">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import Aside from '@/views/layout/Aside.vue'
import Header from '@/views/layout/Header.vue'
</script>

<style lang="scss" scoped>
.layout-box {
  min-height: 100vh;
}

.el-header {
  background-color: $opay-color;
}

.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
}
</style>
