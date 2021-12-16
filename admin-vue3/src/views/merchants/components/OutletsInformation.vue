<!--
 * @Description: 商户信息
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-07 20:30:20
-->

<template>
  <el-form v-if="config" ref="myform" :model="config" :disabled="disabledStatus" label-width="200px" class="my-form">
    <el-form-item label="Store/outlet name" prop="name" :rules="verify('required', 'string')">
      <el-input v-model.number="config.name"></el-input>
    </el-form-item>

    <el-form-item label="Business description" prop="business_description" :rules="verify('required', 'string')">
      <el-input v-model.trim="config.business_description"></el-input>
    </el-form-item>

    <el-form-item label="Business type" prop="business_type" :rules="verify('required', 'string')">
      <el-input v-model.trim="config.business_type"></el-input>
    </el-form-item>

    <el-row>
      <el-col :span="14">
        <el-form-item label="GPS Location" prop="lng" :rules="verify('required', 'number')" label-width="200px">
          <el-input type="number" v-model="config.lng" placeholder="lng"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="" prop="lat" :rules="verify('required', 'number')" label-width="10px">
          <el-input type="number" v-model="config.lat" placeholder="lat"></el-input>
        </el-form-item>
      </el-col>
      <el-form-item label="">Hint: GPS location can be reached via mapping app according to detailed address above.</el-form-item>
    </el-row>

    <el-form-item label="Business address" :rules="verify('required', 'string')">
      <el-input v-model.trim="config.store_address"></el-input>
    </el-form-item>

    <el-form-item label="Latitude and longitude" prop="coordinate" :rules="verify('required')">
      <el-input v-model.trim="config.coordinate"></el-input>
    </el-form-item>

    <el-form-item label="Business hours" prop="business_time" :rules="verify('required')">
      <el-input v-model.number="config.business_time" placeholder=" such as 10:00-20:00"></el-input>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { computed, ref } from '@vue/reactivity'
import { watch } from 'vue-demi'
import { verify } from '@/utils/tools.validate.js'

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

const uploaderCallback = ({ code, data }, obj) => {
  if (!code) {
    obj.push(data)
  }
}

const rmImage = (n, obj) => {
  obj.splice(n, 1)
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

<style></style>
