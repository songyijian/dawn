<!--
 * @Description: 冻结
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-03 11:21:34
-->
<template>
  <el-form ref="myform" :model="config" :inline="true" @keyup.enter="query('search')">
    <el-form-item label="Name" prop="name">
      <el-input v-model.trim="config.name"></el-input>
    </el-form-item>
    <el-form-item label="Mobile No." prop="mobile">
      <el-input v-model.number="config.mobile" type="number"></el-input>
    </el-form-item>

    <el-form-item label="Registeration time">
      <el-col :span="11">
        <el-form-item prop="query_begin_time">
          <el-date-picker v-model="config.query_begin_time" type="date" format="DD/MM/YYYY" style="width: 100%"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="query_end_time">
          <el-date-picker v-model="config.query_end_time" type="date" format="DD/MM/YYYY" style="width: 100%"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>

    <el-form-item label="Role">
      <el-input v-model.trim="config.merchant_role"></el-input>
    </el-form-item>
    <el-form-item label="E-mail">
      <el-input v-model.trim="config.email"></el-input>
    </el-form-item>

    <el-form-item label="E-mail">
      <el-button type="primary" @click="query('search')">Search</el-button>
      <el-button @click="resetForm">Reset</el-button>
    </el-form-item>
  </el-form>

  <div class="fast-seek">
    <el-button type="primary" @click="create">Create merchant accounts</el-button>

    <el-button type="primary" @click="underReview">Under review</el-button>
    <el-button type="primary" @click="approved">Approved</el-button>
    <el-button type="primary" @click="rejected">入驻已驳回</el-button>
    <el-button type="primary" @click="rejected">Rejected</el-button>
  </div>

  <el-table :data="mydata.tableData" style="width: 100%">
    <el-table-column label="S.No.">
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

  <el-pagination layout="prev, pager, next" v-model:page-size="page_size" v-model:current-page="config.page" :total="total"></el-pagination>
</template>

<script setup>
import { computed, reactive, ref, toRef } from '@vue/reactivity'
import { onMounted, watch, watchEffect } from '@vue/runtime-core'
import { POST_merchantList, POST_merchantFreezeList, POST_merchantRetireList } from '@/api'
import { JSONcopy, fFullTime } from '@/utils/tools.js'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const myform = ref(null)
const total = ref(0)
const page_size = ref(10)

const config = reactive({
  page: 1, // int32 page = 1;         // 当前页码
  name: 1, // 商户名称 string
  mobile: '', // 电话 string
  email: '', // email string
  merchant_role: 0, // 商户角色(1.agent 2.master)int32
  query_begin_time: undefined, // 查询开始时间(时间戳:单位s)int64
  query_end_time: undefined, // 查询截止时间(时间戳:单位s)int64
  approval_status: 0, // 查询审批状态列表（0.全部 1.待审核 2.审核通过 3.驳回） int32
  // country: 8, // 国家 string
  kyc_level: 0 // kyc等级 int32
})

const mydata = reactive({
  tableData: []
})

const dateToNum = date => new Date(date).getTime()
const query = async type => {
  config.page = type === 'search' ? 0 : config.page
  const res = {
    page_size: page_size.value,
    ...config
  }
  res.query_begin_time ? (res.query_begin_time = dateToNum(res.query_begin_time)) : delete res.query_begin_time
  const { code, data, message } = await POST_merchantList(config)
  if (!code) {
    const { pagination, merchants } = data
    config.total = pagination.total
    mydata.tableData = merchants
  }
}

const resetForm = () => {
  myform.value.resetFields()
  query('search')
}

const approved = () => {}

const rejected = () => {
  config.approval_status = 3
  query('search')
}

const underReview = () => {
  config.approval_status = 1
  query('search')
}

const view = () => {}

const create = () => {
  router.push({ path: '/merchants/create' })
}

watch(() => config.page, query)
onMounted(query)
</script>

<style lang="scss" scoped>
.fast-seek {
  margin: 1em 0;
}
</style>
