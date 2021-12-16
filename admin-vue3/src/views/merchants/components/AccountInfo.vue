<!--
 * @Description: 账户信息
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-16 12:49:10
-->

<template>
  <el-row :gutter="10">
    <el-col :span="8" class="card-box">
      <h2>钱包余额</h2>
      <strong>100%</strong>
      <p>
        较昨日
        <span>5.9%</span>
        <el-icon><SortDown /></el-icon>
      </p>
    </el-col>
    <el-col :span="8" class="card-box">
      <h2>钱包余额</h2>
      <strong>100%</strong>
      <p>
        较昨日
        <span>5.9%</span>
        <el-icon><SortDown /></el-icon>
      </p>
    </el-col>
    <el-col :span="8" class="card-box">
      <h2>钱包余额</h2>
      <strong>100%</strong>
      <p>
        较昨日
        <span>5.9%</span>
        <el-icon><SortDown /></el-icon>
      </p>
    </el-col>
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
import { POST_merchantRechargeList } from '@/api'
import { useRoute, useRouter } from 'vue-router'
import { watch } from 'vue-demi'
// import { Edit, Share, Delete, Search, Upload } from '@element-plus/icons-vue'

let config = reactive({})
const { id } = defineProps({
  id: String
})

const query = async type => {
  const { code, data, message } = await POST_merchantRechargeList({ app_id: Number(id) })
  console.log(code, data, message)
  if (!code) {
    // const { merchant, current_approval } = data
    // config.merchant = merchant
    // config.current_approval = current_approval
  }
}

// query()
</script>

<style lang="scss" scoped>
.card-box {
  border-left: 3px solid $opay-color;
}
</style>
