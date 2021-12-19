<!--
 * @Description: Dashboard
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-03 11:21:34
-->
<template>
  <el-row :gutter="20">
    <el-col :span="19" :offset="0">
      <TradeInfo :data="mydata.tradeInfo"></TradeInfo>
    </el-col>
    <el-col :span="5" :offset="0" class="recharge-box">
      <el-button
        type="primary"
        @click="$router.push({ path: '/dashboard/recharge-platform' })"
        >Top up for OPay
      </el-button>
      <br />
      <el-button @click="$router.push({ path: '/dashboard/recharge-merchant' })"
        >Top up for agents</el-button
      >
    </el-col>
  </el-row>

  <h3>交易流水</h3>
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
import {
  POST_DashboardPlatformTradeInfo,
  POST_MerchantRechargeListReq,
} from "@/api";
import { RECHARGE_STATUS } from "@/utils/treatymap.js";
import TradeInfo from "@/components/TradeInfo.vue";
import { watch } from "vue-demi";

const total = ref(0);
const page_size = ref(10);

const config = reactive({
  page: 1, // int32  当前页码
});

const mydata = reactive({
  tradeInfo: null,
  rechargeList: null,
});

const queryTradeInfo = async () => {
  const { code, data } = await POST_DashboardPlatformTradeInfo();
  if (!code) {
    mydata.tradeInfo = data;
  }
};

const queryList = async () => {
  const { code, data } = await POST_MerchantRechargeListReq({
    ...config,
  });
  if (!code) {
    mydata.rechargeList = data.recharge_data;
    total.value = data.pagination.total;
    page_size.value = data.pagination.page_size;
  }
};

watch(() => config.page, queryList);

queryTradeInfo();
queryList();
</script>

<style lang="scss" scoped>
.fast-seek {
  margin: 1em 0;
}

.card-box {
  border-left: 3px solid $opay-color;
  box-sizing: border-box;
}

.recharge-box {
  text-align: left;
}
</style>