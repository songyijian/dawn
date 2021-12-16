<!--
 * @Description: 新增入驻商户
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-03 11:21:34
-->
<template>
  {{ config }}
  <div class="tabs">
    <h1 @click="tabsClick('base')" :class="{ 'tabs-select': config.tabPosition === 'base' }">Basic information</h1>
    <h1 @click="tabsClick('account')" :class="{ 'tabs-select': config.tabPosition === 'account' }">Account information</h1>
  </div>
  <div class="tabs-body">
    <BasicInfo v-if="config.tabPosition === 'base'" :id="id"></BasicInfo>
    <AccountInfo v-else :id="id"></AccountInfo>
  </div>
</template>

<script setup>
import BasicInfo from './components/BasicInfo.vue'
import AccountInfo from './components/AccountInfo.vue'
import { reactive, ref } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const { id } = route.query
let config = reactive({
  tabPosition: 'base'
})

const tabsClick = (tab, event) => {
  config.tabPosition = tab
}
</script>

<style lang="scss" scoped>
.tabs {
  padding-bottom: 1em;
  & > h1 {
    display: inline-block;
    cursor: pointer;
    padding: 0.5em;
    margin-right: 1em;
    color: #999;
  }

  .tabs-select {
    color: $opay-color;
    font-weight: 900;
    // border-bottom: 2px solid $opay-color;
  }
}
</style>
