<!--
 * @Description: 系用板式
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-01 18:13:11
-->
<template>
  <el-container class="layout-box">
    <el-aside width="200px">
      <!-- <Aside></Aside> -->
      </el-aside>
    <el-container>
      <el-header><Header></Header></el-header>
      <el-main class="layout-mian">
        <router-view></router-view>
        <el-row v-loading="loding" v-if="loding" class="global-loading" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { useStore } from 'vuex'
// import Aside from '@/views/layout/Aside.vue'
import Header from '@/views/layout/Header.vue'

const store = useStore()
const loding = store.state.ajaxLoding
</script>

<style lang="scss" scoped>
.layout-box {
  min-height: 100vh;
}
.layout-mian {
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
