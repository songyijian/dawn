<!--
 * @Description: 账户信息
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-16 12:49:10
-->

<template>
  <TradeInfo :data="mydata.tradeReq"></TradeInfo>
  <div>
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
      <!-- <el-table-column label="View">
        <template #default="scope">
          <el-button type="text" @click="view(scope.row)">View</el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      v-model:page-size="page_size"
      v-model:current-page="mydata.page"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script setup>
import TradeInfo from "@/components/TradeInfo.vue";
import { reactive, ref } from "@vue/reactivity";
import { POST_merchantTradeReq, POST_MerchantRechargeListReq } from "@/api";
import { watch } from "vue-demi";
import { RECHARGE_STATUS } from "@/utils/treatymap.js";

const total = ref(0);
const page_size = ref(10);
const config = reactive({
  page: 1, // int32  当前页码
});

const mydata = reactive({
  rechargeList: null,
  tradeReq: null,
});

const props = defineProps({
  id: String,
});

const merchant_id = Number(props.id);
const query = async (type) => {
  const { code, data, message } = await POST_merchantTradeReq({ merchant_id });
  console.log(code, data, message);
  if (!code) {
    mydata.tradeReq = data;
  }
};

const queryList = async () => {
  const { code, data } = await POST_MerchantRechargeListReq(config);
  if (!code) {
    mydata.rechargeList = data.recharge_data;
    total.value = data.pagination.total;
    page_size.value = data.pagination.page_size;
  }
};

watch(() => config.page, queryList);

queryList();
query();
</script>

<style lang="scss" scoped>
.card-box {
  border-left: 3px solid $opay-color;
  // background: #fff;
}
</style>
