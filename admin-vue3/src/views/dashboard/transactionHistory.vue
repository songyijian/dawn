<!--
 * @Description: 交易流水(废弃了)
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
    <el-form-item label="ID" prop="app_id" :rules="verify('string')">
      <el-input v-model.trim="config.app_id"></el-input>
    </el-form-item>
    <el-form-item
      label="Mobile No."
      prop="phone_number"
      :rules="verify('string')"
    >
      <el-input v-model="config.phone_number" type="string"></el-input>
    </el-form-item>
    <el-form-item label="充值金额" prop="amount" :rules="verify('int64')">
      <el-input v-model="config.amount" type="number"></el-input>
    </el-form-item>

    <el-form-item label="Registeration time">
      <el-col :span="11">
        <el-form-item prop="start_time">
          <el-date-picker
            v-model="config.start_time"
            type="date"
            format="DD/MM/YYYY"
            style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="end_time">
          <el-date-picker
            v-model="config.end_time"
            type="date"
            format="DD/MM/YYYY"
            style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="query('search')">Search</el-button>
      <el-button @click="resetForm">Reset</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="mydata.rechargeList || []" style="width: 100%">
    <el-table-column label="充值到账时间">
      <template #default="scope">
        {{ scope.row.create_time }}
      </template>
    </el-table-column>
    <el-table-column prop="amount" label="充值金额" />
    <el-table-column prop="merchant_id" label="商户ID" />
    <el-table-column prop="create_time" label="申请时间" />
    <el-table-column label="状态">
      <template #default="scope">
        {{ RECHARGE_STATUS[scope.row.approval_status] }}
      </template>
    </el-table-column>
    <el-table-column prop="accruing_amount" label="累计充值金额" />
    <el-table-column label="View">
      <template #default="scope">
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
import { POST_MerchantRechargeListReq } from "@/api";
import { useRouter } from "vue-router";
import { RECHARGE_STATUS } from "@/utils/treatymap.js";
import { verify } from "@/utils/tools.validate.js";
import { delByVal } from "@/utils/tools.js";
import { watch } from "vue-demi";

const router = useRouter();
const myform = ref(null);
const total = ref(0);
const page_size = ref(10);
const config = reactive({
  page: 1, // int32 当前页码
  app_id: "", // string 商户app user id 可为空
  phone_number: "", // string手机号 可为空
  amount: undefined, // int64 充值金额 可为空
  start_time: undefined, // int64 开始时间 可为空
  end_time: undefined, // int64 结束时间 可为空
});

const mydata = reactive({
  rechargeList: [],
});

const dateToNum = (date) => new Date(date).getTime();
const query = async (type) => {
  config.page = type === "search" ? 1 : config.page;
  let res = delByVal(config, ["", undefined]);
  res.start_time && (res.start_time = dateToNum(res.start_time));
  res.end_time && (res.end_time = dateToNum(res.end_time));
  const { code, data, message } = await POST_MerchantRechargeListReq(res);
  if (!code) {
    mydata.rechargeList = data.recharge_data;
    total.value = data.pagination.total;
    page_size.value = data.pagination.page_size;
  }
};

const resetForm = () => {
  myform.value.resetFields();
  query("search");
};

const view = (row) => {
  console.log(row);
  // router.push({
  //   path: "/merchants/audit",
  //   query: {
  //     id,
  //   },
  // });
};

watch(() => config.page, query);

query();
</script>

<style lang="scss" scoped>
.fast-seek {
  margin: 1em 0;
}
</style>