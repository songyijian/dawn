<!--
 * @Description: vue3 技术验证
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-02 13:54:26
-->
<script setup>
import { useStore } from 'vuex'
import { reactive, ref } from '@vue/reactivity'

// const store = useStore()
const name = ref('xiao ming')
const xiaoming = reactive({
  age: 10
})
const change = () => xiaoming.age++
</script>

<template>
  {{ name }}
  <button @click="change">{{ name }} 想长大 {{ xiaoming.age }}</button>
  <!-- <router-view></router-view> -->
  <!-- <el-row class="global-loading" v-loading="ajaxLoading" v-show="ajaxLoading" /> -->
</template>
