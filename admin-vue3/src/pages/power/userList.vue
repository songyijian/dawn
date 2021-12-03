<!--
 * @Description: user列表
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-03 11:21:34
-->
<template>
  <!-- <el-h1>user列表</el-h1> -->

  <el-form ref="myform" :model="config" :inline="true" @keyup.enter.native="sub('search')">
    <el-form-item label="user_id">
      <el-input v-model.number="config.user_id"></el-input>
    </el-form-item>
    <el-form-item label="email">
      <el-input v-model.trim="config.email"></el-input>
    </el-form-item>
    <el-form-item label="user_name">
      <el-input v-model.trim="config.user_name"></el-input>
    </el-form-item>
  </el-form>

  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>

  <el-pagination layout="prev, pager, next" v-model:page-size="config.page_size" v-model:current-page="config.page" :total="config.total"></el-pagination>
</template>

<script setup>
import { reactive, ref } from '@vue/reactivity'
import { onMounted, watch } from '@vue/runtime-core'
import { POST_userlist } from '@/api'

const config = reactive({
  total: 0,
  page: 0, // int32 page = 1;         // 当前页码
  page_size: 20, // int32 page_size = 2;	    // 每页记录条数

  user_id: 3, // int64 user_id = 3;      // 搜索的用户 ID (不限制不传或传 0)
  role_id: 4, // int64 role_id = 4;      // 搜索的角色 ID (不限制不传或传 0)
  user_name: 'xxxx', // string user_name = 5;   // 搜索的用户名 (不限制不传或传空字符串)
  email: '', // string email = 6;       // 搜索的邮件地址 (不限制不传或传空字符串)
  status: 0 // int32 status = 7;       // 搜索的用户状态 (不限制不传或传 0)
})

const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
])

watch(
  () => config.page,
  (a, b) => {
    sub()
  }
)

const sub = async type => {
  config.page = type === 'search' ? 0 : config.page
  try {
    const { code, data, message } = await POST_userlist(config)
    config.total = data.total
    tableData.value = data
  } catch (error) {}
}

onMounted(sub())
</script>

<style lang="scss" scoped></style>
