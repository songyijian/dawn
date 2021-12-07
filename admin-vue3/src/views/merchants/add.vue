<!--
 * @Description: 新增入驻商户
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-03 11:21:34
-->
<template>
  <div>
    <!-- 选择录入身份 -->
    Choose identity
  </div>

  <el-row>
    <el-steps :active="data.active" finish-status="success" align-center>
      <el-step title="Please submit merchants' personal information" description="Basic information/photos of ID card"></el-step>
      <el-step title="Please submit stores/outlets' information" description="Basic information"></el-step>
      <el-step title="Please submit business documents" description="Business information, utility bills, photos of stores/outlets"></el-step>
    </el-steps>
  </el-row>

  <el-form ref="myform" :model="formData" label-width="200px" class="my-form">
    <div v-show="data.active == 0">
      <el-form-item label="Name">
        <el-col :span="10">
          <el-input v-model="formData.first_name"></el-input>
        </el-col>
        <el-col :span="4">-</el-col>
        <el-col :span="10">
          <el-input v-model="formData.last_name"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="Gender">
        <el-radio-group v-model="formData.gender">
          <el-radio label="Male"></el-radio>
          <el-radio label="Female"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="Mobile number" prop="mobile">
        <el-input v-model.number="formData.mobile"></el-input>
      </el-form-item>

      <el-form-item label="Date of birth" prop="birth">
        <el-date-picker v-model="formData.birth" type="date" placeholder="Pick a date"></el-date-picker>
      </el-form-item>

      <el-row>
        <el-col :span="12">
          <el-form-item label="State">
            <el-input v-model="formData.state"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="City">
            <el-input v-model="formData.city"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="Detailed address" prop="address">
        <el-input v-model="formData.address"></el-input>
      </el-form-item>

      <el-form-item label="Latitude and longitude" prop="coordinate">
        <el-input v-model="formData.coordinate"></el-input>
      </el-form-item>

      <el-form-item label="Referral code" prop="referral_code">
        <el-input v-model="formData.referral_code"></el-input>
      </el-form-item>

      <el-form-item label="Upload reference" prop="reference">
        <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
          <el-icon><plus /></el-icon>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="Government-issued ID card" prop="id">
        <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
          <el-icon><plus /></el-icon>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
    </div>

    <div v-show="data.active == 1">
      <el-form-item label="Mobile number" prop="mobile">
        <el-input v-model.number="formData.mobile"></el-input>
      </el-form-item>
    </div>
  </el-form>

  <el-form class="fast-seek">
    <el-button type="primary" @click="data.active > 0 && data.active--" :disabled="data.active <= 0">Previous</el-button>
    <el-button type="primary" @click="data.active < 2 && data.active++" :disabled="data.active >= 2">Next</el-button>
  </el-form>
</template>

<script setup>
import { reactive, ref } from '@vue/reactivity'
const data = reactive({
  active: 0
})

const myform = ref()
const rules = reactive({})
const formData = reactive({
  first_name: '',
  last_name: '',
  gender: 'Female',
  mobile: 1234555,
  birth: '',
  state: '',
  city: '',
  address: '',
  coordinate: '',
  referral_code: '',
  reference: '',
  id: ''
})
</script>

<style lang="scss" scoped>
.my-form {
  background: #ffff;
  padding: 1em;
}
</style>
