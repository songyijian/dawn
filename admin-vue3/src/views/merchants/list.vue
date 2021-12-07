<!--
 * @Description: 商户列表
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-03 11:21:34
-->
<template>
  <el-form ref="myform" :model="config" :inline="true" @keyup.enter.native="sub('search')">
    <el-form-item label="Name">
      <el-input v-model.trim="config.name"></el-input>
    </el-form-item>
    <el-form-item label="Mobile No.">
      <el-input v-model.number="config.mobile" type="number"></el-input>
    </el-form-item>
    <el-form-item label="Registeration time">
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker v-model="config.date1" type="date" style="width: 100%"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-date-picker v-model="config.date2" type="date" style="width: 100%"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="Identity">
      <el-input v-model.trim="config.identity"></el-input>
    </el-form-item>
    <el-form-item label="E-mail">
      <el-input v-model.trim="config.email"></el-input>
    </el-form-item>
    <el-button type="primary" @click="sub('search')">Search</el-button>
    <el-button @click="resetForm">Reset</el-button>
  </el-form>
  <el-form class="fast-seek">
    <el-button type="primary" @click="addItem">Add merchant accounts</el-button>
    <el-button type="primary" @click="subMap.underReview">Under review</el-button>
    <el-button type="primary" @click="subMap.approved">Approved</el-button>
    <el-button type="primary" @click="subMap.rejected">Rejected</el-button>
  </el-form>

  <!-- table -->
  <el-table :data="data.tableData" style="width: 100%">
    <el-table-column prop="id" label="S.No.">
      <template #default="scope">
        {{ scope.$index + 1 }}
      </template>
    </el-table-column>
    <el-table-column prop="id" label="ID" />
    <el-table-column prop="identity" label="Identity" />
    <el-table-column prop="email" label="E-mail" />
    <el-table-column prop="ctime" label="Registeration time" />
    <el-table-column prop="status" label="Status" />
    <el-table-column prop="application_time" label="Application time" />
    <el-table-column label="Operate">
      <template #default="scope">
        <el-button type="text" @click="view(scope.row, 'delete')">View</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- pagination -->
  <el-pagination layout="prev, pager, next" v-model:page-size="config.page_size" v-model:current-page="config.page" :total="config.total"></el-pagination>
</template>

<script setup>
import { computed, reactive, ref, toRef } from '@vue/reactivity'
// import { onMounted, watch, watchEffect } from '@vue/runtime-core'
// import { POST_userlist, POST_userdelete } from '@/api'
// import { JSONcopy } from '@/utils/tools.js'

import { useRoute, useRouter } from 'vue-router'

const config = reactive({
  total: 0,
  page: 0, // int32 page = 1;         // 当前页码
  page_size: 10, // int32 page_size = 2// 每页记录条数

  name: '',
  mobile: '',
  date1: '',
  date2: '',
  identity: '',
  email: ''
})

const data = reactive({
  tableData: [
    {
      id: 1,
      identity: 'xxxx',
      email: 'email',
      ctime: 'ctime',
      status: '112345',
      application_time: ''
    }
  ]
})
const myform = ref()
const subMap = {
  approved() {},
  rejected() {},
  underReview() {}
}

const view = () => {
  alert(1)
}

const sub = async type => {
  config.page = type === 'search' ? 0 : config.page
  try {
    const { code, data, message } = await POST_userlist(config)
    if (!code) {
      config.total = data.total
      data.data.tableData = data.records
      ElMessage.warning(message)
    }
  } catch (error) {}
}

const resetForm = () => {
  myform.value.resetFields()
}

const router = useRouter()

const addItem = () => {
  router.push({ path: '/merchants/add' })
}
</script>

<style lang="scss" scoped>
.fast-seek {
  margin-bottom: 1em;
}
</style>
