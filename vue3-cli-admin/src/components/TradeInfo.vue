<!--
 * @Description: 交易信息表
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-17 18:32:11
-->

<template>
  <div class="trade-info" v-if="data">
    <div>
      <p>Account balance</p>
      <strong>{{ convert(data.account_balance) }}</strong>
    </div>
    <div v-if="data.trading_num">
      <p>Transaction volume</p>
      <strong>{{ convert(data.trading_num) }}</strong>
    </div>
    <div v-if="data.agent_num">
      <p>Agent</p>
      <strong>{{ convert(data.agent_num) }}</strong>
    </div>
    <!-- <div>
      <p>Available balance</p>
      <strong>{{ convert(data.usable_balance) }}</strong>
    </div> -->
  </div>
</template>

<script setup>
import { convert } from '@/utils/tools.js'
defineProps({
  data: Object
})
</script>

<style lang="scss" scoped>
.trade-info {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-bottom: 1rem;
  & > div {
    flex: 1 1 auto;
    box-sizing: border-box;
    padding: 0.5rem;
    border-left: 3px solid $opay-color;
    margin: 0 0.5em;
    background: #fff;
  }
  p {
    color: #333;
    font-style: normal;
    font-weight: 100;
    font-size: 1rem;
  }
}
</style>
