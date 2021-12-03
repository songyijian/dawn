<!--
 * @Description: 系统头
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-02 20:29:01
-->
<template>
  <div>
    <el-avatar>user</el-avatar>
    <span @click="logout">登出</span>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()
const userData = store.state.userInfo
const logout = () => alert('登出')
</script>

<style scoped lang="scss">
div {
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: right;
  align-items: center;
  & > * {
    margin-left: 1em;
  }
}
</style>
