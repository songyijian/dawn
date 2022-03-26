<!--
 * @Description: 调试验证文件，不会被部署
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-29 16:27:48
-->

<template>
  <div ref="dev">xxxx</div>
  <el-form ref="form" label-width="80px"></el-form>
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
