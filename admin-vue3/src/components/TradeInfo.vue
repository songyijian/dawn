<!--
 * @Description: 交易信息表
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-17 18:32:11
-->

<template>
  <div class="trade-info" v-if="data">
    <div>
      <h3>账户余额</h3>
      <strong>{{ data.account_balance }}</strong>
    </div>
    <div>
      <h3>交易量</h3>
      <strong>{{ data.trading_num }}</strong>
    </div>
    <div v-if="data.agent_num">
      <h3>代理数</h3>
      <strong>{{ data.agent_num }}</strong>
    </div>
    <div>
      <h3>可用余额</h3>
      <strong>{{ data.usable_balance }}</strong>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: Object,
});
</script>

<style lang="scss" scoped>
.trade-info {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  & > div {
    width: 33.3%;
    box-sizing: border-box;
    padding: 0.5rem;
    border-left: 3px solid $opay-color;
    margin: 0 0.5em;
  }
}
</style>
