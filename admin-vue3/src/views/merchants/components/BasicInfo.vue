<!--
 * @Description: 详情，商户基本信息
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-16 12:28:18
-->

<template>
  <div v-if="config.merchant">
    <h3>Basic information</h3>
    <FormItemStyle :label-width="'200px'">
      ID
      <template #body>
        {{ config.merchant.id }}
      </template>
    </FormItemStyle>
    <MerchantsRole :inData="config.merchant" :disabled="true"></MerchantsRole>
    <PersonalInformation :inData="config.merchant" :disabled="!Boolean(evn)"></PersonalInformation>

    <h3>Account information</h3>
    <OutletsInformation :inData="config.merchant" :disabled="!Boolean(evn)"></OutletsInformation>
    <!--     
    <BusinessDocuments :inData="config.merchant" ></BusinessDocuments>

    <h3>Review Status</h3>
    <Approval :inData="config.current_approval" ref="approvalForm"></Approval> -->
    <div class="btn-box">
      {{ approvalStatus }}
      <template v-if="approvalStatus === 101 || approvalStatus === 201">
        101.入驻待审核,通过、驳回、拒绝
        <el-button type="primary" @click="befSbu('Approve')">通过 Approve</el-button>
        <el-button type="primary" @click="befSbu('Return')">驳回 Return</el-button>
        <el-button type="primary" @click="befSbu('Reject')">拒绝 Reject</el-button>
      </template>

      <template v-if="approvalStatus === 103 || approvalStatus === 1 || approvalStatus === 203">
        103.入驻驳回
        <el-button type="primary" @click="edit">编辑 Edit</el-button>
        <el-button type="primary" @click="edit">编辑 Edit</el-button>
      </template>

      <el-button @click="back">Back</el-button>
    </div>
  </div>

  <el-dialog v-model="config.dialogVisible" title="" width="70%">
    {{ dialogData }}
    <el-form v-if="config" ref="dialogForm" :model="dialogData" label-width="100px">
      <el-form-item label="审批理由" prop="reason" :rules="verify('required', 'string')">
        <el-select v-model="dialogData.reason">
          <el-option v-for="(val, key) in MERCHANT_REJEACT_RESON" :key="key" :label="val" :value="val">{{ val }}</el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="备注" prop="remark" :rules="verify('required', 'string')">
        <el-input v-model="dialogData.remark" type="textarea"></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="config.dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="sbu">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import MerchantsRole from './MerchantsRole.vue'
import PersonalInformation from './PersonalInformation.vue'
import OutletsInformation from './OutletsInformation.vue'
import BusinessDocuments from './BusinessDocuments.vue'
import Approval from './Approval.vue'
import FormItemStyle from '@/components/FormItemStyle.vue'

import { MERCHANT_REJEACT_RESON } from '@/utils/treatymap'
import { verify } from '@/utils/tools.validate.js'
import { computed, reactive, ref } from '@vue/reactivity'
import { POST_merchantApprovalInfo, POST_merchantApprovalRefus, POST_merchantApprovalPass, POST_merchantApprovalReject } from '@/api'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const dialogForm = ref()
const approvalForm = ref(null)
let config = reactive({
  merchant: null,
  current_approval: null,
  disabledStatus: true,
  pageStatus: '',
  dialogVisible: false
})

const evn = ref('')

const { id } = defineProps({
  id: String
})

const merchant_id = Number(id)
const approvalStatus = computed(() => config.merchant.approval_status)

const dialogData = reactive({
  reason: '',
  remark: '',
  status: ''
})

const back = () => router.go(-1)

const query = async type => {
  const { code, data, message } = await POST_merchantApprovalInfo({ merchant_id: merchant_id })
  if (!code) {
    const { merchant, current_approval } = data
    config.merchant = merchant
    config.current_approval = current_approval
  }
}

const subMap = {
  Approve: async () => {
    const { code, message } = await POST_merchantApprovalPass(req)
    if (!code) {
      ElMessage.success(message)
      back()
    }
  },
  Return: async () => {
    const req = {
      merchant_id: merchant_id,
      reason: dialogData.reason,
      remark: dialogData.remark
    }
    const validatefn = dialogForm.value.validate
    validatefn(async status => {
      if (status) {
        const { code, message } = await POST_merchantApprovalReject(req)
        if (!code) {
          ElMessage.success(message)
          back()
        }
      }
    })
  },
  Refus: async () => {
    const req = {
      merchant_id: merchant_id,
      reason: dialogData.reason,
      remark: dialogData.remark
    }
    const validatefn = dialogForm.value.validate
    validatefn(async status => {
      if (status) {
        const { code, message } = await POST_merchantApprovalRefus(req)
        if (!code) {
          ElMessage.success(message)
          back()
        }
      }
    })
  }
}

const edit = () => {
  evn.value = 'edit'
  config.disabledStatus = false
}

const befSbu = _status => {
  dialogData.status = _status
  config.dialogVisible = true
}

const sbu = () => subMap[dialogData.status]()

query()
</script>

<style lang="scss" scoped>
h3 {
  font-size: 1em;
  margin-bottom: 0.5em;
}
.btn-box {
  text-align: center;
}
</style>
