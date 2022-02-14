<!--
 * @Description: 调试验证文件，不会被部署
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-29 16:27:48
-->

<template>
  {{ mydata }}

  <div>
    <div class="tip">审核通过状态能转退驻待审核</div>
    <el-input-number
      v-model="mydata.merchant_id"
      label="merchant_id"
    ></el-input-number>

    <el-button type="primary" @click="subTZ">改退驻待审核</el-button>
  </div>
</template>

<script setup>
import axios from '@/plugins/axios'
const mydata = {
  merchant_id: undefined
}

async function subTZ() {
  await axios.post('/cmapi/test/retire/pending', {
    merchant_id: mydata.merchant_id
  })
}
</script>
