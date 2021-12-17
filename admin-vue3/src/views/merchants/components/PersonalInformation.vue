<!--
 * @Description: 个人信息
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-07 20:30:20
-->

<template>
  <!-- {{ env }} {{ disabled }} {{ props }} -->
  <el-form v-if="config" ref="myform" :model="config" label-width="200px" :disabled="disabled">
    <el-form-item label="ID" v-if="config.id">
      {{ config.id }}
    </el-form-item>

    <el-form-item label="Mobile number" prop="mobile" :rules="verify('required', 'string')">
      <el-input v-model.string="config.mobile" type="string"></el-input>
    </el-form-item>

    <el-form-item label="E-mail" prop="email" :rules="verify('required', 'email')" disabled="false">
      <el-input v-model.trim="config.email" type="email"></el-input>
    </el-form-item>

    <el-form-item label="Name" prop="user_name" :rules="verify('required', 'string')">
      <el-input v-model="config.user_name" type="string"></el-input>
    </el-form-item>

    <el-form-item label="gender" prop="gender">
      <el-select v-model.number="config.gender" :rules="verify('required', 'int')">
        <el-option v-for="(key, val) in GENDER" :key="val" :value="Number(val)" :label="key"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Date of birth" prop="birthday" :rules="verify('required')">
      <el-date-picker v-model="config.birthday" type="date" format="DD/MM/YYYY"></el-date-picker>
    </el-form-item>

    <el-form-item label="Detailed address" prop="user_address" :rules="verify('required', 'string')">
      <el-input v-model.trim="config.user_address" type="string"></el-input>
    </el-form-item>

    <el-form-item label="证件类型" prop="id_type" :rules="verify('required', 'int')">
      <el-select v-model.number="config.id_type">
        <el-option v-for="(key, val) in MERCHANT_ID_TYPE" :key="val" :value="Number(val)" :label="key"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="证件号码" prop="id_number" :rules="verify('required', 'string')">
      <el-input v-model.trim="config.id_number" type="string"></el-input>
    </el-form-item>

    <el-form-item label="Referral code" prop="recommend_mobile" :rules="verify('required', 'string')">
      <el-input v-model.number="config.recommend_mobile" type="string"></el-input>
    </el-form-item>

    <el-form-item label="Government-issued ID card" prop="id_pics" :rules="verify('required', 'arryRepeatedString')">
      <FileUpload @uploaderCallback="uploaderCallback($event, config.id_pics)" :disabled="disabled">
        <template v-slot:handle="{ onSelectFile }">
          <el-button size="small" type="primary" @click="onSelectFile">select file</el-button>
        </template>
        <div class="img-box">
          <p v-for="(url, index) in config.id_pics" :key="url">
            <el-image class="el-img" fit="cover" :src="url" :preview-src-list="config.id_pics"></el-image>
            <el-button type="text" @click="rmImage(index, config.id_pics)">Remov</el-button>
          </p>
        </div>
      </FileUpload>
    </el-form-item>
  </el-form>
</template>

<script setup>
import FileUpload from '@/components/FileUpload.vue'
import { computed, ref, toRefs } from '@vue/reactivity'
import { watch } from 'vue-demi'
import { verify } from '@/utils/tools.validate.js'
import { MERCHANT_ID_TYPE, GENDER } from '@/utils/treatymap.js'

const myform = ref(null)

const props = defineProps({
  inData: {
    type: Object,
    required: true,
    default: null
  },
  disabled: {
    type: [String, Boolean],
    default: false
  },
  env: {
    type: String,
    required: false,
    default: ''
  }
})

let config = ref(props.inData)

const uploaderCallback = ({ code, data }, obj) => {
  if (!code) {
    obj.push(data)
  }
}

const rmImage = (n, obj) => {
  obj.splice(n, 1)
}

// watch(
//   () => inData,
//   a => {
//     config.value = a
//   },
//   { deep: true, immediate: true }
// )

defineExpose({ formObj: myform })
</script>

<style lang="scss" scoped>
.img-box > p {
  border: 1px solid #dcdfe6;
  display: inline-block;
  padding: 1em;
  margin: 0.5em;
  // height: 110px;
  & > * {
    text-align: center;
  }
}
.el-img {
  width: 100px;
}
</style>
