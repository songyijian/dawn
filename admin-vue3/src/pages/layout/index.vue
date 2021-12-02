<!--
 * @Description: 系用板式
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-01 18:13:11
-->
<template>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main class="layout-mian">
        <router-view></router-view>
        <el-row v-loading="loding" class="global-loading" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { useStore } from 'vuex'
const store = useStore()
const loding = store.state.ajaxLoding
</script>

<style lang="scss" scoped>
.layout-mian {
  border: 1px solid red;
  position: relative;

  :deep(.global-loading) {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    .el-loading-mask {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
}

.el-header {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
}

.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
}

body > .el-container {
  height: 100vh;
}
</style>
