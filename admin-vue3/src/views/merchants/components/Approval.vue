<!--
 * @Description: 审批
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-07 20:30:20
-->
<template>
  <el-form v-if="config" ref="myform" :model="config" label-width="200px" :disabled="!isReason">
    <el-form-item label="当前状态">
      {{ MERCHANT_APPROVAL_STATUS[config.approval_status] }}
    </el-form-item>
    <!-- <template v-if="isReason">
      <el-form-item label="审批理由" prop="reason" :rules="verify('required', 'string')">
        <el-input v-model.string="config.reason" type="textarea"></el-input>
      </el-form-item>

      <el-form-item label="备注" prop="remark" :rules="verify('required', 'string')">
        <el-input v-model="config.remark" type="textarea"></el-input>
      </el-form-item>
    </template> -->
  </el-form>
</template>

<script setup>
import { computed, ref } from '@vue/reactivity'
import { watch } from 'vue-demi'
import { verify } from '@/utils/tools.validate.js'
import { MERCHANT_APPROVAL_STATUS } from '@/utils/treatymap.js'

const myform = ref(null)
let config = ref(null)
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

const isReason = computed(() => config.approval_status == 103 || config.approval_status == 303 || config.approval_status == 102 || config.approval_status == 202 || config.approval_status == 302)

// const validatePass = (a, val, callback) => {
//   if (val < 1 || val > 2) return callback(new Error('is required'))
//   callback()
// }

watch(
  () => inData,
  a => {
    config.value = a
  },
  { deep: true, immediate: true }
)

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
