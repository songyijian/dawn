<template>
  <router-view></router-view>
  <el-row v-loading="ajaxLoading" v-if="ajaxLoading" id="global-loading" />
</template>

<script setup>
import '@/sentry.js'
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
const ajaxLoading = computed(() => useStore().state.ajaxLoading)
</script>

<style scoped lang="scss">
#global-loading {
  position: absolute !important;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 99999;
}

:deep(.el-loading-mask) {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
