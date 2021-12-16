<!--
 * @Description: 商户角色
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-07 20:30:20
-->
<template>
  <el-form v-if="config" ref="myform" :model="config" label-width="200px" :disabled="disabledStatus">
    <el-form-item label="Resources" prop="merchant_role" :rules="[{ validator: validatePass }, ...verify('required')]">
      <el-radio-group v-model.number="config.merchant_role">
        <el-radio v-for="(val, key) in MERCHANT_ROLE" :key="val" :label="Number(key)">{{ val }}</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { computed, ref } from '@vue/reactivity'
import { watch } from 'vue-demi'
import { verify } from '@/utils/tools.validate.js'
import { MERCHANT_ROLE } from '@/utils/treatymap.js'

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
const disabledStatus = computed(() => !!editEnv)

const validatePass = (a, val, callback) => {
  if (val < 1 || val > 2) return callback(new Error('is required'))
  callback()
}

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
