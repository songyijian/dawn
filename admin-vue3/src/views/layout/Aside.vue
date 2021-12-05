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
  <el-menu default-active="2" class="el-menu-vertical-demo" router :collapse="false" @open="handleOpen"
    @close="handleClose">
    <el-sub-menu v-for="item in routers" :index="item.path" :key="item.path">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <el-menu-item-group v-if="item.children">
        <el-menu-item v-for="citem in item.children" :key="citem.path" :index="item.path + '/' + citem.path">
          {{ citem.meta.title }}</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
  import {
    reactive,
    ref
  } from 'vue'
  import {
    Location,
    Document,
    Menu as IconMenu,
    Setting
  } from '@element-plus/icons'
  import {
    asyncRouterMap
  } from '@/router/routes.js'
import { useRoute, useRouter } from 'vue-router'
  const isCollapse = ref(true)
  const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
  }
  
  const a = useRouter()
  const b = useRoute()
  console.log(a.getRoutes(),b)


  const routers = reactive(asyncRouterMap)
  // console.log('////', routers)

  const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
  }
</script>

<style lang="scss" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    background: none;
    width: 100%;
    min-height: 400px;
  }

  header {
    height: 60px;
    background-color: $opay-color;

    img {
      height: 100%;
    }
  }
</style>