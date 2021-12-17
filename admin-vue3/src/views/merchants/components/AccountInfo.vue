<!--
 * @Description: 账户信息
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-16 12:49:10
-->

<template>
  <el-row :gutter="20" v-if="config.tradeReq">
    <el-col :span="8" class="card-box">
      <h3>账户余额</h3>
      <strong>{{ config.tradeReq.account_balance }}</strong>
    </el-col>
    <el-col :span="8" class="card-box">
      <h3>交易量</h3>
      <strong>{{ config.tradeReq.trans_num }}</strong>
    </el-col>
    <el-col :span="8" class="card-box">
      <h3>代理数</h3>
      <strong>{{ config.tradeReq.agent_num }}</strong>
    </el-col>
    <!-- <el-col :span="8" class="card-box">
      <h3>可用余额</h3>
      <strong>{{ config.tradeReq.usable_balance }}</strong>
    </el-col> -->
  </el-row>

  <h3>交易流水</h3>
  <div>{{ config }}</div>
</template>

<script>
//组件script
import { SortUp, SortDown } from '@element-plus/icons'
export default {
  components: {
    SortDown,
    SortUp
  }
}
</script>

<script setup>
import { reactive, ref } from '@vue/reactivity'
import { POST_merchantTradeReq } from '@/api'
import { watch } from 'vue-demi'

const config = reactive({
  tradeReq: null
})

const props = defineProps({
  id: String
})

const merchant_id = Number(props.id)
const query = async type => {
  const { code, data, message } = await POST_merchantTradeReq({ merchant_id })
  console.log(code, data, message)
  if (!code) {
    config.tradeReq = data

    // const { merchant, current_approval } = data
    // config.merchant = merchant
    // config.current_approval = current_approval
  }
}

query()
</script>

<style lang="scss" scoped>
.card-box {
  border-left: 3px solid $opay-color;
  // background: #fff;
}
</style>
