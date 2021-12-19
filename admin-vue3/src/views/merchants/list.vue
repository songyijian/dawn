<!--
 * @Description: 商户列表
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
      <el-input v-model.trim="config.name"></el-input>
    </el-form-item>
    <el-form-item label="Mobile No." prop="mobile" :rules="verify('string')">
      <el-input v-model="config.mobile" type="string"></el-input>
    </el-form-item>

    <el-form-item label="Registeration time">
      <el-col :span="11">
        <el-form-item prop="query_begin_time">
          <el-date-picker
            v-model="config.query_begin_time"
            type="date"
            format="DD/MM/YYYY"
            style="width: 100%"
          >
          </el-date-picker>
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
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>

    <el-form-item label="Role" prop="merchant_role" :rules="verify('int32')">
      <el-select v-model="config.merchant_role" @change="query('search')">
        <el-option label="All" :value="0"></el-option>
        <el-option
          v-for="(value, keys) in MERCHANT_ROLE"
          :key="keys"
          :label="value"
          :value="Number(keys)"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="E-mail" prop="email" :rules="verify('email')">
      <el-input v-model.trim="config.email"></el-input>
    </el-form-item>

    <el-form-item label="Authority status" prop="approval_status">
      <el-select v-model="config.approval_status" @change="query('search')">
        <el-option label="All" :value="0"></el-option>
        <el-option
          v-for="(value, keys) in MERCHANT_APPROVAL_STATUS"
          :key="keys"
          :label="value"
          :value="Number(keys)"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="query('search')">Search</el-button>
      <el-button @click="resetForm">Reset</el-button>
    </el-form-item>
  </el-form>

  <div class="fast-seek">
    <el-button type="primary" @click="create"
      >Create merchant accounts</el-button
    >
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
        <!-- {{ scope.row }} -->
        <el-button type="text" @click="view(scope.row)">View</el-button>
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
import { reactive, ref } from "@vue/reactivity";
import { POST_merchantList } from "@/api";
import { useRouter } from "vue-router";
import { MERCHANT_APPROVAL_STATUS, MERCHANT_ROLE } from "@/utils/treatymap.js";
import { verify } from "@/utils/tools.validate.js";
import { delByVal } from "@/utils/tools.js";
import { watch } from "vue-demi";

const router = useRouter();
const myform = ref(null);
const total = ref(0);
const page_size = ref(10);

const config = reactive({
  page: 1, // int32 page = 1;         // 当前页码
  name: "", // 商户名称 string
  mobile: "", // 电话 string
  email: "", // email string
  merchant_role: 0, // 商户角色(1.agent 2.master)int32
  query_begin_time: undefined, // 查询开始时间(时间戳:单位s)int64
  query_end_time: undefined, // 查询截止时间(时间戳:单位s)int64
  approval_status: 0, // 查询审批状态列表（0.全部 1.待审核 2.审核通过 3.驳回） int32
});

const mydata = reactive({
  tableData: [],
});

const dateToNum = (date) => new Date(date).getTime();
const query = async (type) => {
  config.page = type === "search" ? 1 : config.page;
  let res = delByVal(
    {
      page_size: page_size.value,
      ...config,
    },
    [undefined, ""]
  );
  res.query_begin_time &&
    (res.query_begin_time = dateToNum(res.query_begin_time));
  res.query_end_time && (res.query_end_time = dateToNum(res.query_end_time));

  const { code, data, message } = await POST_merchantList(res);
  if (!code) {
    const { pagination, merchants } = data;
    config.total = pagination.total;
    page_size.value = pagination.page_size;
    mydata.tableData = merchants;
  }
};

const resetForm = () => {
  myform.value.resetFields();
  query("search");
};

const view = ({ id }) => {
  router.push({
    path: "/merchants/audit",
    query: {
      id,
    },
  });
};

const create = () => {
  router.push({
    path: "/merchants/create",
  });
};

watch(() => config.page, query);

query();
</script>

<style lang="scss" scoped>
.fast-seek {
  margin: 1em 0;
}
</style>