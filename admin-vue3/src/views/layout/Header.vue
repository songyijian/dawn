<!--
 * @Description: 系统头
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-02 20:29:01
-->
<template>
  <div>
    {{ $store.state.userInfo.name }}
    <span @click="logout">登出</span>
  </div>
</template>

<script setup>
import { GET_logout } from '@/api'
import { loginRedirect } from '@/plugins/axios'
import { useStore } from 'vuex'
// import {  } from '@/store'
const store = useStore()

const logout = async () => {
  const { code } = await GET_logout()
  if (!code) {
    store.commit('SET_USER_INFO', '')
    store.commit('SET_USER_PERMISSIONS', '')
    store.commit('SET_USER_ROLES', '')
    loginRedirect()
  }
}
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
  span {
    cursor: pointer;
  }
}
</style>
