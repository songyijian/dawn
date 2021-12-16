<!--
 * @Description: user列表
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-03 11:21:34
-->
<template>
  <el-form ref="myform" :model="config" :inline="true" @keyup.enter="query('search')">
    <el-form-item label="ID" prop="user_id">
      <el-input v-model.number="config.user_id" type="number" clearable></el-input>
    </el-form-item>

    <el-form-item label="E-mail" prop="email">
      <el-input v-model.trim="config.email"></el-input>
    </el-form-item>

    <el-form-item label="Name" prop="name">
      <el-input v-model.trim="config.name" clearable></el-input>
    </el-form-item>

    <el-button type="primary" @click="query('search')">Search</el-button>
    <el-button @click="resetForm">Reset</el-button>
  </el-form>

  <el-table :data="mydata.tableData" style="width: 100%">
    <el-table-column prop="user.id" label="ID" />
    <el-table-column prop="user.name" label="Name" />

    <el-table-column label="Role" width="200px">
      <template #default="scope">
        <el-tag size="mini" v-for="item in scope.row.roles" :key="item.id">{{ item.name }}</el-tag>
      </template>
    </el-table-column>

    <el-table-column prop="user.email" label="E-mail" />
    <el-table-column prop="user.status" label="Status">
      <template #default="scope">{{ scope.row.user.status }}</template>
    </el-table-column>

    <el-table-column prop="update_time" label="Last operation">
      <template #default="scope">{{ fFullTime(scope.row.user.update_time) }}</template>
    </el-table-column>

    <el-table-column label="Operate">
      <template #default="scope">
        <el-button type="text" @click="dele(scope.row)">delete</el-button>
        <el-button type="text" @click="showEdit(scope.row)">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- pagination -->
  <el-pagination layout="prev, pager, next" v-model:page-size="config.page_size" v-model:current-page="config.page" :total="config.total"></el-pagination>

  <!-- dialog -->
  <el-dialog v-model="mydata.dialogTableVisible" @close="mydata.editData = null">
    <el-form v-if="mydata.editData" ref="editform" v-model="mydata.editData" label-width="100px">
      <el-form-item label="ID">
        <div>{{ mydata.editData.user.id }}</div>
      </el-form-item>

      <el-form-item label="status">
        <el-radio-group v-model="mydata.editData.user.status">
          <el-radio :label="1">yes</el-radio>
          <el-radio :label="0">no</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="name">
        <el-input v-model="mydata.editData.user.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="email">
        {{ mydata.editData.user.email }}
        <!-- <el-input v-model="mydata.editData.user.email" clearable></el-input> -->
      </el-form-item>
      <el-form-item label="roles">
        <el-select v-model="mydata.editRolesResult" multiple placeholder="Select" clearable>
          <el-option v-for="item in mydata.roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="">
        <el-button type="primary" @click="edit">submit</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { computed, reactive, ref, toRef } from '@vue/reactivity'
import { onMounted, watch, watchEffect } from '@vue/runtime-core'
import { POST_userlist, POST_userdelete, GET_roleList, POST_userEdit } from '@/api'
import { JSONcopy, fFullTime } from '@/utils/tools.js'
import { ElMessage } from 'element-plus'

const config = reactive({
  total: 0,
  page: 0, // int32 当前页码
  page_size: 10, // int32  每页记录条数

  user_id: undefined, // int64   搜索的用户 ID (不限制不传或传 0)
  role_id: 0, // int64  搜索的角色 ID (不限制不传或传 0)
  user_name: '', // string  搜索的用户名 (不限制不传或传空字符串)
  email: '', // string 搜索的邮件地址 (不限制不传或传空字符串)
  status: 0 // int32  搜索的用户状态 (不限制不传或传 0)
})

const mydata = reactive({
  dialogTableVisible: false,
  editData: null,
  tableData: [],
  editRolesResult: [],
  roleList: []
})

const myform = ref(null)

watchEffect(() => {
  mydata.editRolesResult = mydata.editData?.roles ? mydata.editData.roles.map(item => item.id) : []
})

const query = async type => {
  config.page = type === 'search' ? 0 : config.page
  try {
    const { code, data, message } = await POST_userlist(config)
    if (!code) {
      config.total = data.total
      mydata.tableData = data.records
      ElMessage.warning(message)
    }
  } catch (error) {}
}

const dele = async data => {
  const { code } = await POST_userdelete({ id: data.user.id })
  !code && query()
}

const edit = async () => {
  const { id, name, status } = mydata.editData.user
  const resData = {
    id,
    name,
    status,
    roles: [...mydata.editRolesResult]
  }
  const { code } = await POST_userEdit(resData)
  if (!code) {
    query()
    mydata.dialogTableVisible = false
  }
}

const showEdit = data => {
  mydata.editData = JSONcopy({ ...data })
  mydata.dialogTableVisible = true
}

const resetForm = () => {
  myform.value.resetFields()
  query()
}

watch(() => config.page, query)
onMounted(async () => {
  query()
  const { code, data, message } = await GET_roleList()
  if (!code) mydata.roleList = data
})
</script>

<style lang="scss" scoped></style>
