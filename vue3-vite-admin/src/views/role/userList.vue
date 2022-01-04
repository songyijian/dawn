<!--
 * @Description: user列表
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-03 11:21:34
-->
<template>
  <el-form
    ref="myform"
    :model="config"
    :inline="true"
    @keyup.enter="query('search')"
  >
    <el-form-item label="User ID" prop="user_id">
      <el-input
        v-model.number="config.user_id"
        type="number"
        :rules="verify('int64')"
      ></el-input>
    </el-form-item>

    <el-form-item label="E-mail" prop="email" :rules="verify('string')">
      <el-input v-model.trim="config.email"></el-input>
    </el-form-item>

    <el-form-item label="Name" prop="user_name" :rules="verify('string')">
      <el-input v-model.trim="config.user_name"></el-input>
    </el-form-item>

    <el-button type="primary" @click="query('search')">Search</el-button>
    <el-button @click="resetForm">Reset</el-button>
  </el-form>

  <el-table :data="mydata.tableData" style="width: 100%">
    <el-table-column prop="user.id" label="User ID" />
    <el-table-column prop="user.name" label="Name" />
    <el-table-column label="Role" width="200px">
      <template #default="scope">
        <el-tag size="mini" v-for="item in scope.row.roles" :key="item.id">
          {{ item.name }}
        </el-tag>
      </template>
    </el-table-column>

    <el-table-column prop="user.email" label="E-mail" />
    <el-table-column prop="user.status" label="Status">
      <template #default="scope">
        {{ ROLE_STATUS[scope.row.user.status] }}
      </template>
    </el-table-column>

    <el-table-column prop="update_time" label="Last operation">
      <template #default="scope">
        {{ scope.row.user.update_time }}
      </template>
    </el-table-column>

    <el-table-column label="Operate">
      <template #default="scope">
        <el-button type="text" @click="showEdit(scope.row)">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    layout="prev, pager, next"
    v-model:page-size="page_size"
    v-model:current-page="config.page"
    :total="total"
  ></el-pagination>

  <el-dialog
    v-model="mydata.dialogTableVisible"
    @close="mydata.editData = null"
  >
    <el-form
      v-if="mydata.editData"
      :model="mydata.editData"
      ref="editform"
      label-width="100px"
    >
      <el-form-item label="ID">
        <div>{{ mydata.editData.id }}</div>
      </el-form-item>

      <el-form-item label="status" prop="status" :rules="verify('required')">
        <el-radio-group v-model="mydata.editData.status">
          <el-radio
            v-for="(value, key) in ROLE_STATUS"
            :key="key"
            :label="Number(key)"
          >
            {{ value }}
          </el-radio>
          <!-- <el-radio :label="0">no</el-radio> -->
        </el-radio-group>
      </el-form-item>

      <el-form-item label="name" prop="name" :rules="verify('required')">
        <el-input v-model.string="mydata.editData.name"></el-input>
      </el-form-item>

      <el-form-item label="email">
        {{ mydata.editData.email }}
      </el-form-item>

      <el-form-item prop="roles">
        <el-select
          v-model="mydata.editData.roles"
          multiple
          placeholder="Select"
        >
          <el-option
            v-for="item in mydata.roleList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="">
        <el-popconfirm title="Are you sure to operate？" @confirm="dele">
          <template #reference>
            <el-button v-has="'Delete'" type="warning">Delete User</el-button>
          </template>
        </el-popconfirm>
        <el-button v-has="'Edit'" type="primary" @click="edit">
          Submit
        </el-button>
        <el-button @click="mydata.dialogTableVisible = false">Back</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import {
  POST_userlist,
  POST_userdelete,
  GET_roleList,
  POST_userEdit
} from '@/api'
import { reactive, ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import { verify } from '@/utils/tools.validate.js'
import { timeStyle, delByVal } from '@/utils/tools.js'
import { ROLE_STATUS } from '@/utils/treatymap.js'

const myform = ref(null)
const editform = ref(null)
const total = ref(0)
const page_size = ref(10)
const config = reactive({
  page: 1, // int32 当前页码
  user_id: undefined, // int64   搜索的用户 ID (不限制不传或传 0)
  user_name: '', // string  搜索的用户名 (不限制不传或传空字符串)
  email: '' // string 搜索的邮件地址 (不限制不传或传空字符串)
  // role_id: 0, // int64  搜索的角色 ID (不限制不传或传 0)
  // status: 0, // int32  搜索的用户Status (不限制不传或传 0)
})

const mydata = reactive({
  dialogTableVisible: false,
  editData: null,
  tableData: [],
  roleList: []
})

const query = async type => {
  config.page = type === 'search' ? 1 : config.page
  const res = delByVal(
    {
      ...config,
      page_size: page_size.value
    },
    ['', undefined]
  )
  const { code, data, message } = await POST_userlist(res)
  if (!code) {
    total.value = data.total
    mydata.tableData = data.records
  }
}

const queryRoleList = async () => {
  const { code, data, message } = await GET_roleList()
  if (!code) mydata.roleList = data
}

const dele = async () => {
  const { id } = mydata.editData
  const { code } = await POST_userdelete({ id })
  if (!code) {
    query()
    mydata.dialogTableVisible = false
  }
}

const edit = async () => {
  editform.value.validate(async s => {
    if (s) {
      const { id, name, status, roles } = mydata.editData
      const resData = {
        id,
        name,
        status,
        roles
      }
      const { code } = await POST_userEdit(resData)
      if (!code) {
        query()
        mydata.dialogTableVisible = false
      }
    }
  })
}

const showEdit = data => {
  const roles = data.roles ? data.roles.map(item => item.id) : []
  mydata.editData = { ...data.user, roles }
  mydata.dialogTableVisible = true
}

const resetForm = () => {
  myform.value.resetFields()
  query()
}

watch(() => config.page, query)

query()
queryRoleList()
</script>
