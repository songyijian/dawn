<!--
 * @Description: 冻结信息
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-07 20:30:20
-->
<template>
  <el-form v-if="config" ref="myform" :model="config" label-width="200px">
    <el-form-item label="Operator ID">
      {{ config.manager_id }}
    </el-form-item>

    <el-form-item label="Freeze time">
      {{ config.freeze_time }}
    </el-form-item>

    <el-form-item label="Freeze duration">
      {{ config.freeze_expire_date }}
    </el-form-item>

    <el-form-item label="Freeze reason">
      {{ config.reason }}
    </el-form-item>
  </el-form>
</template>

<script setup>
import { computed, ref } from '@vue/reactivity'
// import { verify } from '@/utils/tools.validate.js'
// import { MERCHANT_APPROVAL_STATUS } from '@/utils/treatymap.js'

const myform = ref(null)
let { inData, editEnv } = defineProps({
  inData: {
    type: Object,
    default: null
  },
  editEnv: {
    type: String,
    default: ''
  }
})
let config = ref(inData)

defineExpose({ formObj: myform })
</script>

<style lang="scss" scoped>
.img-box > p {
  border: 1px solid #dcdfe6;
  display: inline-block;
  padding: 1em;
  margin: 0.5em;
  height: 130px;
  & > * {
    text-align: center;
  }
}
.el-img {
  width: 100px;
}
</style>
