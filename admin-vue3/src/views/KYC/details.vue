<!--
 * @Description: kyc 详情、审批
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-08 17:25:19
-->

<template>
  <div v-if="info">
    <h1 class="h1">Basic information</h1>
    <el-row :gutter="24" class="paragraph">
      <el-col :span="8">
        <div class="grid">
          <span>ID</span>
          {{ info.base_info.id }}
        </div>
        <div class="grid">
          <span>ID type</span>
          {{ info.base_info.id_card_type }}
        </div>
        <div class="grid">
          <span>ID number</span>
          {{ info.base_info.id_card_no }}
        </div>
      </el-col>

      <el-col :span="8">
        <div class="grid">
          <span>Application Level</span>
          {{ info.base_info.kyc_level }}
        </div>
        <div class="grid">
          <span>Name</span>
          {{ info.base_info.name }}
        </div>
        <div class="grid">
          <span>Mobile number</span>
          {{ info.base_info.mobile }}
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid">
          <span>E-mail</span>
          {{ info.base_info.email }}
        </div>
        <div class="grid">
          <span>申请时间</span>
          {{ fFullTime(info.base_info.application_time) }}
        </div>
        <div class="grid">
          <span>审批状态</span>
          {{ KEY_CHECK_STATUS[info.check_record.check_status] }}
        </div>
      </el-col>
    </el-row>

    <h1>Transaction information</h1>
    <el-row :gutter="24" class="paragraph">
      <el-col :span="12">
        <div class="grid">
          <span>Certificate photos</span>
        </div>
        <p class="img-list-box">
          <el-image
            style="width: 100px; height: 100px"
            v-for="item in info.check_info.certificate_images"
            :key="item"
            :src="item"
            :preview-src-list="info.check_info.certificate_images"
            :initial-index="1"
          ></el-image>
        </p>
      </el-col>
      <el-col :span="12">
        <!-- <div class="grid">
          {{ info.check_record }}
        </div> -->
      </el-col>
    </el-row>

    <el-button type="primary" @click="showApprove">Approve</el-button>
    <el-button type="primary" @click="mydata.rejectDialog = true">Reject</el-button>
    <el-button type="primary" @click="back">Back</el-button>
  </div>

  <el-dialog v-model="mydata.rejectDialog" title="Are you sure you want to reject this KYC upgrade application?">
    <template #default>
      <el-form ref="rejectForm" :model="mydata">
        <el-form-item :rules="verify('required')" prop="rejectDesc">
          <el-input v-model="mydata.rejectDesc" type="textarea"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="mydata.rejectDialog = false">Cancel</el-button>
        <el-button type="primary" @click="reject">Confirm</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { POST_kycView, POST_kycPass, POST_kycReject } from '@/api'
import { reactive, ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { ElMessageBox, ElMessage } from 'element-plus'
import { verify } from '@/utils/tools.validate.js'
import { KEY_CHECK_STATUS } from '@/utils/treatymap.js'
import { fFullTime } from '@/utils/tools.js'

const mydata = reactive({
  rejectDesc: '',
  rejectDialog: false
})
const info = ref(null)
const rejectForm = ref(null)
const router = useRouter()
const { id } = useRoute().query
const application_id = Number(id)

const back = () => {
  // router.replace({ path: '/KYC/list' })
  router.go(-1)
}

const approve = async () => {
  const { code } = await POST_kycPass({
    application_id
  })
  if (!code) {
    ElMessage.warning(message)
    back()
  }
}

const query = async () => {
  const { code, data } = await POST_kycView({
    application_id
  })
  if (!code) {
    info.value = data
  }
}

const reject = async () => {
  if (!mydata.rejectDesc) {
    rejectForm.value.validate(() => {})
    return
  }

  const { code, data, message } = await POST_kycReject({ application_id, reject_desc: mydata.rejectDesc })
  if (!data) {
    ElMessage.warning(message)
    mydata.rejectDialog = false
  }
}

const showApprove = () => {
  ElMessageBox.confirm('Are you sure you want to approve this KYC upgrade application?', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel'
  }).then(approve)
}

onMounted(query)
</script>

<style lang="scss" scoped>
.paragraph {
  padding-bottom: 2em;

  .grid {
    display: flex;
    flex-flow: row nowrap;
    padding-top: 0.5em;
    & > span {
      display: inline-block;
      width: 130px;
      text-align: right;
      color: red;
      padding-right: 0.5em;
      font-size: var(--el-form-label-font-size);
      color: var(--el-text-color-regular);
    }
  }
  .img-list-box > * {
    margin-top: 1em;
    margin-right: 1em;
  }
}
</style>
