<!--
 * @Description: 商户文件
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-07 20:30:20
-->

<template>
  <el-form v-if="config" ref="myform" :model="config" :disabled="disabledStatus" label-width="200px">
    {{ disabledStatus }}

    <el-form-item label="Utility bills" prop="expense_bill_pics" :rules="verify('required', 'arryRepeatedString')">
      <FileUpload @uploaderCallback="uploaderCallback($event, config.expense_bill_pics)" :disabled="disabledStatus">
        <template v-slot:handle="{ onSelectFile }">
          <el-button size="small" type="primary" @click="onSelectFile">select file</el-button>
        </template>
        <div class="img-box">
          <p v-for="(url, index) in config.expense_bill_pics" :key="url">
            <el-image class="el-img" fit="cover" :src="url" :preview-src-list="config.expense_bill_pics"></el-image>
            <br />
            <el-button type="text" @click="rmImage(index, config.expense_bill_pics)">Remov</el-button>
          </p>
        </div>
      </FileUpload>
    </el-form-item>

    <el-form-item label="photos of stores/outlets" prop="store_pics" :rules="verify('required', 'arryRepeatedString')">
      <FileUpload @uploaderCallback="uploaderCallback($event, config.store_pics)" :disabled="disabledStatus">
        <template v-slot:handle="{ onSelectFile }">
          <el-button size="small" type="primary" @click="onSelectFile">select file</el-button>
        </template>
        <div class="img-box">
          <p v-for="(url, index) in config.store_pics" :key="url">
            <el-image class="el-img" fit="cover" :src="url" :preview-src-list="config.store_pics"></el-image>
            <br />
            <el-button type="text" @click="rmImage(index, config.store_pics)">Remov</el-button>
          </p>
        </div>
      </FileUpload>
    </el-form-item>

    <el-form-item label="Stores/outlets" prop="store_owner_pics" :rules="verify('required', 'arryRepeatedString')">
      <FileUpload @uploaderCallback="uploaderCallback($event, config.store_owner_pics)" :disabled="disabledStatus">
        <template v-slot:handle="{ onSelectFile }">
          <el-button size="small" type="primary" @click="onSelectFile">select file</el-button>
        </template>
        <div class="img-box">
          <p v-for="(url, index) in config.store_owner_pics" :key="url">
            <el-image class="el-img" fit="cover" :src="url" :preview-src-list="config.store_owner_pics"></el-image>
            <br />
            <el-button type="text" @click="rmImage(index, config.store_owner_pics)">Remov</el-button>
          </p>
        </div>
      </FileUpload>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { computed, ref } from '@vue/reactivity'
import { watch } from 'vue-demi'
import { verify } from '@/utils/tools.validate.js'
import FileUpload from '@/components/FileUpload.vue'

const myform = ref(null)
const config = ref(null)
const { inData, editEnv } = defineProps({
  inData: Object,
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
