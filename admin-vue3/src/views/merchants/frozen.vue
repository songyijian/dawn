<!--
 * @Description: 冻结列表
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-03 11:21:34
-->
<template>
  <el-form ref="myform" :model="config" :inline="true" @keyup.enter="query('search')">
    <el-form-item label="Name" prop="name" :rules="verify('string')">
      <el-input v-model.trim="config.name"></el-input>
    </el-form-item>

    <el-form-item label="Mobile No." prop="mobile" :rules="verify('string')">
      <el-input v-model.string="config.mobile"></el-input>
    </el-form-item>

    <el-form-item label="Role" prop="merchant_role" :rules="verify('int')">
      <el-select v-model="config.merchant_role" @change="query('search')">
        <el-option label="All" :value="0"></el-option>
        <el-option v-for="(value, keys) in MERCHANT_ROLE" :key="keys" :label="value" :value="Number(keys)"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="query('search')">Search</el-button>
      <el-button @click="resetForm">Reset</el-button>
    </el-form-item>
  </el-form>

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
        <!-- {{ scope.row }} -->
        <el-button type="text" @click="view(scope.row)">View</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination layout="prev, pager, next" v-model:page-size="page_size" v-model:current-page="config.page" :total="total"></el-pagination>
</template>

<script setup>
import { reactive, ref } from '@vue/reactivity'
import { POST_merchantFreezeList } from '@/api'
import { useRouter } from 'vue-router'
import { MERCHANT_ROLE } from '@/utils/treatymap.js'
import { verify } from '@/utils/tools.validate.js'

const router = useRouter()
const myform = ref(null)
const total = ref(0)
const page_size = ref(10)

const config = reactive({
  page: 1, // int32 page = 1;         // 当前页码
  name: '', // 商户名称 string
  mobile: '', // 电话 string
  merchant_role: 0 //  int32
})

const mydata = reactive({
  tableData: []
})

const dateToNum = date => new Date(date).getTime()
const query = async type => {
  config.page = type === 'search' ? 0 : config.page
  // let res = {
  //   page_size: page_size.value,
  //   ...config
  // }
  // res.query_begin_time ? (res.query_begin_time = dateToNum(res.query_begin_time)) : delete res.query_begin_time
  // res.query_end_time ? (res.query_end_time = dateToNum(res.query_end_time)) : delete res.query_end_time
  const { code, data, message } = await POST_merchantFreezeList({})
  if (!code) {
    const { pagination, merchants } = data
    config.total = pagination.total
    page_size.value = pagination.page_size
    mydata.tableData = merchants
  }
}

const resetForm = () => {
  myform.value.resetFields()
  query('search')
}

const view = ({ id }) => {
  router.push({
    path: '/merchants/audit',
    query: { id }
  })
}

const create = () => {
  router.push({ path: '/merchants/create' })
}

query()
</script>
