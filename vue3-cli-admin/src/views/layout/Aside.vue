<!--
 * @Description: 左侧，菜单
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-02 20:29:23
-->
<template>
  <header>
    <img src="@/assets/img/opay-logo.png" alt="logo" />
  </header>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    router
    :collapse="false"
  >
    <template v-for="item in routers" :key="item">
      <el-sub-menu v-if="item.meta.menu" :index="item.path">
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
        <el-menu-item-group v-if="item.children">
          <template v-for="citem in item.children" :key="citem">
            <el-menu-item
              v-if="citem.meta.menu"
              :index="item.path + '/' + citem.path"
            >
              {{ citem.meta.title }}
            </el-menu-item>
          </template>
        </el-menu-item-group>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup>
import { useStore } from 'vuex'
const store = useStore()
const routers = store.state.routers
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  background: none;
  width: 100%;
  min-height: 400px;
  overflow: scroll;
}

header {
  height: 60px;
  background-color: $opay-color;

  img {
    height: 100%;
  }
}
</style>
