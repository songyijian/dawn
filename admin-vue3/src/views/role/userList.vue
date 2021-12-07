<!--
 * @Description: user列表
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-03 11:21:34
-->
<template>
  {{ mydata.editData }}

  <el-form ref="myform" :model="config" :inline="true" @keyup.enter.native="sub('search')">
    <el-form-item label="user_id">
      <el-input v-model.number="config.user_id" type="number"></el-input>
    </el-form-item>
    <el-form-item label="email">
      <el-input v-model.trim="config.email"></el-input>
    </el-form-item>
    <el-form-item label="user_name">
      <el-input v-model.trim="config.user_name"></el-input>
    </el-form-item>

    <el-button type="primary" @click="sub('search')">Search</el-button>
    <el-button @click="resetForm">Reset</el-button>
  </el-form>

  <el-table :data="mydata.tableData" style="width: 100%">
    <el-table-column prop="user.id" label="id" />
    <el-table-column prop="user.name" label="name" />

    <el-table-column label="roles">
      <template #default="scope">
        <el-tag size="mini" v-for="item in scope.row.roles" :key="item.id">{{ item.name }}</el-tag>
      </template>
    </el-table-column>

    <el-table-column prop="user.email" label="email" />
    <el-table-column prop="user.status" label="status">
      <template #default="scope">{{ scope.row.user.status }}</template>
    </el-table-column>

    <el-table-column prop="update_time" label="update time">
      <template #default="scope">{{ scope.row.user.update_time }}</template>
    </el-table-column>

    <el-table-column label="set">
      <template #default="scope">
        <el-button type="text" @click="subMap.dele(scope.row)">delete</el-button>
        <el-button type="text" @click="subMap.edit(scope.row)">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- pagination -->
  <el-pagination layout="prev, pager, next" v-model:page-size="config.page_size" v-model:current-page="config.page" :total="config.total"></el-pagination>

  <!-- dialog -->
  <el-dialog v-model="mydata.dialogTableVisible" title="Edit">
    <div>{{ mydata.editData }}</div>

    <el-form ref="editform" v-model="mydata.editData" label-width="70px">
      <el-form-item label="name">
        <el-input v-model="mydata.editData.user.name"></el-input>
        <!-- <div>{{ mydata.editData.user.name }}</div> -->
      </el-form-item>
      <el-form-item label="email">
        <el-input v-model="mydata.editData.user.email"></el-input>
        <!-- <div>{{ mydata.editData.user.email }}</div> -->
      </el-form-item>
      <el-form-item label="roles">
        <!-- <div>
          <el-tag size="mini" v-for="item in mydata.editData.roles" :key="item.id">{{ item.name }}</el-tag>
        </div> -->
        <el-select v-model="mydata.editRolesResult" multiple placeholder="Select">
          <el-option v-for="item in mydata.editData.roles" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { computed, reactive, ref, toRef } from '@vue/reactivity'
import { onMounted, watch, watchEffect } from '@vue/runtime-core'
import { POST_userlist, POST_userdelete } from '@/api'
import { JSONcopy } from '@/utils/tools.js'

const config = reactive({
  total: 0,
  page: 0, // int32 page = 1;         // 当前页码
  page_size: 10, // int32 page_size = 2;	    // 每页记录条数
  user_id: undefined, // int64 user_id = 3;      // 搜索的用户 ID (不限制不传或传 0)
  role_id: 0, // int64 role_id = 4;      // 搜索的角色 ID (不限制不传或传 0)
  user_name: '', // string user_name = 5;   // 搜索的用户名 (不限制不传或传空字符串)
  email: '', // string email = 6;       // 搜索的邮件地址 (不限制不传或传空字符串)
  status: 0 // int32 status = 7;       // 搜索的用户状态 (不限制不传或传 0)
})

const mydata = reactive({
  dialogTableVisible: false,
  editData: {},
  tableData: [],
  editRolesResult: []
})

const myform = ref(null)
// let tableData = ref([])
// let editRolesResult = ref([])

watchEffect(() => {
  mydata.editRolesResult = mydata.editData?.roles ? mydata.editData.roles.map(item => item.id) : []
})

const sub = async type => {
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

const subMap = {
  async dele(data) {
    var { code } = await POST_userdelete({ id: 'data.user.id' })
    !code && sub()
  },
  edit(data) {
    mydata.editData = JSONcopy({ ...data })
    mydata.dialogTableVisible = true
  }
}

const resetForm = () => {
  // myform.value.resetFields()
  config.user_id = undefined
  config.email = ''
  config.user_name = ''
  sub()
}

onMounted(sub)
watch(() => config.page, sub)
</script>

<style lang="scss" scoped></style>
