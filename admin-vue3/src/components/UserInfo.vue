<!--
 * @Description: 用户信息
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-17 18:32:11
-->
<template>
  <div v-if="data" class="info-style">
    <p><strong>ID</strong> {{ data.id }}</p>
    <p><strong>Resources</strong> {{ MERCHANT_ROLE[data.merchant_role] }}</p>
    <p><strong>Mobile number</strong> {{ data.mobile }}</p>
    <p><strong>E-mail</strong>{{ data.email }}</p>
    <p><strong>Name</strong>{{ data.user_name }}</p>
    <p><strong>Detailed address</strong>{{ data.user_address }}</p>
    <p><strong>证件类型</strong> {{ MERCHANT_ID_TYPE[data.id_type] }}</p>
    <p><strong>证件号码</strong>{{ data.id_number }}</p>
  </div>
</template>

<script setup>
import { MERCHANT_ROLE, MERCHANT_ID_TYPE } from "@/utils/treatymap.js";
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