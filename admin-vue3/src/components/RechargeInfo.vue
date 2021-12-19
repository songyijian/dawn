<!--
 * @Description: 充值信息
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-17 18:32:11
-->
<template>
  <div v-if="data" class="info-style">
    <!-- MerchantRechargeData -->
    <p><strong>充值金额</strong> {{ data.amount }}</p>
    <p><strong>审核人ID</strong> {{ data.approval_id }}</p>
    <p><strong>申请时间</strong> {{ data.create_time }}</p>
    <p><strong>充值到账时间</strong> {{ data.arrive_time }}</p>
    <p><strong>状态</strong> {{ RECHARGE_STATUS[data.approval_status] }}</p>
  </div>
</template>

<script setup>
RECHARGE_STATUS;
import { RECHARGE_STATUS } from "@/utils/treatymap.js";
defineProps({
  data: Object,
});
</script>

<style lang="scss" scoped>
.info-style {
  line-height: 2.5rem;
  & > p > strong {
    display: inline-block;
    width: 150px;
    text-align: right;
    padding-right: 00.5rem;
  }
}
</style>