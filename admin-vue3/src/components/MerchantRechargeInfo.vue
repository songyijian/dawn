
<!--
 * @Description: 商户和充值信息展示
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-17 21:16:48
-->
<template>
  <!-- {{ merchant }} - {{ trade_info }} -->
  <TradeInfo :data="trade_info"></TradeInfo>
  <div v-if="merchant">
    <h3>基本信息</h3>
    <UserInfo :data="merchant"></UserInfo>
  </div>
  <div v-if="merchant">
    <h3>商户信息</h3>
    <MerchantInfo :data="merchant"></MerchantInfo>
  </div>
</template>


<script setup>
import { computed, reactive, ref } from "@vue/reactivity";
import { watch } from "vue-demi";
import TradeInfo from "@/components/TradeInfo.vue";
import MerchantInfo from "@/components/MerchantInfo.vue";
import UserInfo from "@/components/UserInfo.vue";

const props = defineProps({
  data: Object,
});
const merchant = computed(() => props?.data.merchant);
const trade_info = computed(() => props?.data.trade_info);
</script>
