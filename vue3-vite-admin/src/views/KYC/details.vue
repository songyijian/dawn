<!--
 * @Description: kyc 详情、审批
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-08 17:25:19
-->

<template>
  <div v-if="info">
    <h3 class="h1">Basic information</h3>
    <div class="info-style">
      <p>
        <strong>User ID</strong>
        {{ info.base_info.user_id }}
      </p>
      <p>
        <strong>ID type</strong>
        {{ MERCHANT_ID_TYPE[info.base_info.id_card_type] }}
      </p>
      <p>
        <strong>ID number</strong>
        {{ info.base_info.id_card_no }}
      </p>

      <p>
        <strong>Application Level</strong>
        {{ info.base_info.kyc_level }}
      </p>
      <p>
        <strong>Name</strong>
        {{ info.base_info.name }}
      </p>
      <p>
        <strong>Mobile number</strong>
        {{ info.base_info.mobile }}
      </p>
      <p>
        <strong>E-mail</strong>
        {{ info.base_info.email }}
      </p>
      <p>
        <strong>Application time</strong>
        {{ timeStyle(info.base_info.application_time) }}
      </p>
    </div>

    <h3>Transaction information</h3>

    <div class="info-style">
      <div>
        <strong>Certificate photos</strong>
        <div class="upload-img-list">
          <p
            class="upload-img-item"
            v-for="item in info.check_info.certificate_images"
            :key="item"
          >
            <el-image
              :src="item"
              :preview-src-list="info.check_info.certificate_images"
              :initial-index="1"
            ></el-image>
          </p>
        </div>
      </div>
    </div>

    <h3>Review information</h3>

    <div class="info-style">
      <p>
        <strong>Auditor ID</strong>
        {{ info.check_record.manager_id }}
      </p>

      <p>
        <strong>Status</strong>
        {{ KEY_CHECK_STATUS[info.check_record.check_status] }}
      </p>

      <p>
        <strong>Status description</strong>
        {{ info.check_record.check_state_desc }}
      </p>
      <p>
        <strong>Review time</strong>
        {{ timeStyle(info.check_record.check_time) }}
      </p>
    </div>

    <div class="center-box">
      <template v-if="info.check_record.check_status === 1">
        <el-button v-has="'Approve'" type="primary" @click="approve">
          Approve
        </el-button>
        <el-button
          v-has="'Reject'"
          type="primary"
          @click="mydata.rejectDialog = true"
        >
          Reject
        </el-button>
      </template>
      <el-button @click="back">Back</el-button>
    </div>
  </div>

  <el-dialog
    v-model="mydata.rejectDialog"
    title="Are you sure you want to reject this KYC upgrade application?"
  >
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
import { ElMessage } from 'element-plus'
import { verify } from '@/utils/tools.validate.js'
import { KEY_CHECK_STATUS, MERCHANT_ID_TYPE } from '@/utils/treatymap.js'
import { timeStyle } from '@/utils/tools.js'

const mydata = reactive({
  rejectDesc: '',
  rejectDialog: false
})
const info = ref(null)
const rejectForm = ref(null)
const router = useRouter()
const { id } = useRoute().query
const application_id = Number(id)

const back = () => router.go(-1)

const approve = async () => {
  const { code, message } = await POST_kycPass({
    application_id
  })
  if (!code) {
    ElMessage.success(message)
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

  const { code, data, message } = await POST_kycReject({
    application_id,
    reject_desc: mydata.rejectDesc
  })
  if (!data) {
    ElMessage.success(message)
    mydata.rejectDialog = false
    back()
  }
}

query()
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
