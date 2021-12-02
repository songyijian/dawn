<!--
 * @Description: 系用内部布局
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-01 18:13:11
-->
<template>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>

<style></style>
