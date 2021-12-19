<!--
 * @Description: KYC列表
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
    <el-form-item label="Name" prop="name" :rules="verify('string')">
      <el-input v-model.trim="config.name" clearable></el-input>
    </el-form-item>

    <el-form-item label="Mobile No." prop="mobile" :rules="verify('string')">
      <el-input
        v-model.number="config.mobile"
        type="number"
        clearable
      ></el-input>
    </el-form-item>

    <el-form-item label="E-mail" prop="email" :rules="verify('email')">
      <el-input v-model.trim="config.email"></el-input>
    </el-form-item>

    <el-form-item label="Registeration time">
      <el-col :span="11">
        <el-form-item prop="query_begin_time">
          <el-date-picker
            v-model="config.query_begin_time"
            type="date"
            format="DD/MM/YYYY"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="query_end_time">
          <el-date-picker
            v-model="config.query_end_time"
            type="date"
            format="DD/MM/YYYY"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>

    <el-form-item label="kyc level" prop="kyc_level" :rules="verify('int32')">
      <el-select v-model.number="config.kyc_level" @change="query('search')">
        <el-option label="All" :value="0"></el-option>
        <el-option
          v-for="(val, key) in KYC_LEVEL"
          :key="key"
          :label="val"
          :value="Number(key)"
          >{{ val }}- {{ key }}</el-option
        >
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="query('search')">Search</el-button>
      <el-button @click="resetForm">Reset</el-button>
    </el-form-item>
  </el-form>
  {{ mydata }}
  <el-table :data="mydata.list" style="width: 100%">
    <el-table-column label="S.No.">
      <template #default="scope">
        {{ scope.$index + 1 }}
      </template>
    </el-table-column>
    <el-table-column prop="id" label="ID" />
    <el-table-column label="KYC Level">
      <template #default="scope">
        {{ scope.row.kyc_level }}
      </template>
    </el-table-column>
    <el-table-column prop="email" label="E-mail" />
    <el-table-column prop="register_time" label="Registeration time">
      <template #default="scope">
        {{ fFullTime(scope.row.register_time) }}
      </template>
    </el-table-column>
    <el-table-column prop="check_status" label="Status">
      <template #default="scope">
        {{ KEY_CHECK_STATUS[scope.row.check_status] }}
      </template>
    </el-table-column>

    <el-table-column prop="application_time" label="Application time">
      <template #default="scope">
        {{ fFullTime(scope.row.application_time) }}
      </template>
    </el-table-column>
    <el-table-column label="Operate">
      <template #default="scope">
        <el-button type="text" @click="details(scope.row)">Details</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    layout="prev, pager, next"
    v-model:page-size="page_size"
    v-model:current-page="config.page"
    :total="total"
  ></el-pagination>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed, reactive, ref, toRef } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { POST_kycAppList } from "@/api";
import { delByVal, fFullTime } from "@/utils/tools.js";
import { verify } from "@/utils/tools.validate.js";
import { KEY_CHECK_STATUS, KYC_LEVEL } from "@/utils/treatymap.js";

const total = ref(0);
const page_size = ref(20);
const config = reactive({
  page: 1, // int32  当前页码
  user_id: "", //string 用户名称
  name: "", //string 用户名称
  mobile: "", //string 电话
  email: "", //string 邮箱
  query_begin_time: undefined, //int64 查询开始时间(时间戳:单位s)
  query_end_time: undefined, //int64  查询截止时间(时间戳:单位s)
  check_status: 0, // int32  审批状态(0.不限 1.待审核 2.已通过 3.审核驳回)
  kyc_level: 0, //int32  申请的KYC等级(0.不限)
});

const mydata = reactive({
  dialogTableVisible: false,
  editData: null,
  list: [],
});

const router = useRouter();
const myform = ref(null);

const details = (data) => {
  router.push({ path: "/KYC/details", query: { id: data.id } });
};

const dateToNum = (date) => new Date(date).getTime();

const query = async (type) => {
  config.page = type === "search" ? 0 : config.page;
  const res = delByVal(
    {
      page_size: page_size.value,
      ...config,
    },
    ["", undefined]
  );
  res.query_begin_time &&
    (res.query_begin_time = dateToNum(res.query_begin_time));
  res.query_end_time && (res.query_end_time = dateToNum(res.query_end_time));

  const { code, data, message } = await POST_kycAppList({ page: 1 });
  if (!code) {
    console.log(data);
    mydata.list = data.list;
    total.value = data.pagination.total;
  }
};

const resetForm = () => {
  myform.value.resetFields();
  query();
};

watch(() => config.page, query);
query();
</script>

<style lang="scss" scoped></style>
