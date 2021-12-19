<!--
 * @Description: 交易信息
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-17 18:32:11
-->
<template>
  <div v-if="data" class="info-style">
    <p><strong>商户名称</strong> {{ data.name }}</p>
    <p><strong>商店地址</strong> {{ data.store_address }}</p>
    <p><strong>经、纬度</strong> {{ data.lng }} - {{ data.lat }}</p>
    <p><strong>申请时间</strong> {{ data.create_time }}</p>
  </div>
</template>

<script setup>
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