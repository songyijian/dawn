<!--
 * @Description: 详情，商户基本信息
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-16 12:28:18
-->

<template>
  <div v-if="config.merchant">
    <h3>Basic information</h3>
    <MerchantsRole
      :inData="config.merchant"
      :disabled="true"
      :env="config.env"
    ></MerchantsRole>
    <PersonInfo
      :inData="config.merchant"
      :disabled="config.disabled"
      :env="config.env"
    ></PersonInfo>

    <h3>Account information</h3>
    <OutletsInfo
      :inData="config.merchant"
      :disabled="config.disabled"
      :env="config.env"
    ></OutletsInfo>
    <BusinessDocuments
      :inData="config.merchant"
      :disabled="true"
      :env="config.env"
    ></BusinessDocuments>

    <h3>Review Status</h3>
    <Approval
      :inData="config.current_approval"
      ref="approvalForm"
      :disabled="true"
      :env="config.env"
    ></Approval>

    <div v-if="approvalStatus === 301">
      <p class="redtip">
        Please contact the merchant to confirm account cancellation application.
      </p>
      <p class="redtip">Mobile number: {{ config.merchant.mobile }}</p>
    </div>

    <div class="btn-box">
      {{ approvalStatus }}
      <template v-if="approvalStatus === 101 || approvalStatus === 201">
        <!-- 101.入驻待审核,通过、驳回、拒绝 -->
        <el-button type="primary" @click="subApprove">通过 Approve</el-button>
        <el-button type="primary" @click="befSbu('Return')"
          >驳回 Return</el-button
        >
        <el-button type="primary" @click="befSbu('Reject')"
          >拒绝 Reject</el-button
        >
      </template>

      <template
        v-if="
          approvalStatus === 1 ||
          approvalStatus === 201 ||
          approvalStatus === 203 ||
          approvalStatus === 202 ||
          approvalStatus === 301 ||
          approvalStatus === 302
        "
      >
        <!-- 1、201、203、202、301、302 冻结 -->
        <el-button type="primary" @click="befSbu('Freeze')"
          >冻结 Freeze</el-button
        >
      </template>

      <template v-if="approvalStatus === 400">
        <!-- 400 Unfreeze -->
        <el-button type="primary" @click="befSbu('Unfreeze')"
          >Unfreeze account</el-button
        >
      </template>

      <template v-if="approvalStatus === 301">
        <!-- 301 退驻  退驻待审核-->
        <el-button type="primary" @click="befSbu('DeletionUnder')"
          >Deletion rejected</el-button
        >
        <el-button type="primary" @click="befSbu('DeletionUnder')"
          >Deletion under review</el-button
        >
      </template>

      <template
        v-if="
          approvalStatus === 103 ||
          approvalStatus === 1 ||
          approvalStatus === 203 ||
          approvalStatus === 302
        "
      >
        <!-- 103、1、203、302.入驻驳回 -->
        <el-button type="primary" @click="edit" v-if="config.env !== 'edit'"
          >编辑 Edit</el-button
        >
        <el-button type="primary" v-if="config.env == 'edit'" @click="subEdit"
          >Submit Edit</el-button
        >
      </template>

      <template
        v-if="
          approvalStatus === 103 ||
          approvalStatus === 1 ||
          approvalStatus === 203 ||
          approvalStatus === 302
        "
      >
        <!-- 303.入驻驳回 -->
        <el-button type="primary" @click="edit" v-if="config.env !== 'edit'"
          >通过退驻 Edit</el-button
        >
      </template>

      <el-button @click="back">Back</el-button>
    </div>
  </div>

  <el-dialog v-model="config.dialogVisible" title="" width="70%">
    <el-form ref="dialogForm" :model="dialogData" label-width="140px">
      <template
        v-if="dialogData.status == 'Return' || dialogData.status == 'Reject'"
      >
        <el-form-item
          label="审批理由"
          prop="reason"
          :rules="verify('required', 'string')"
        >
          <el-select v-model="dialogData.reason">
            <el-option
              v-for="(val, key) in MERCHANT_REJEACT_RESON"
              :key="key"
              :label="val"
              :value="val"
              >{{ val }}</el-option
            >
          </el-select>
        </el-form-item>

        <el-form-item
          label="备注"
          prop="remark"
          :rules="verify('required', 'string')"
        >
          <el-input v-model="dialogData.remark" type="textarea"></el-input>
        </el-form-item>
      </template>

      <template v-if="dialogData.status == 'Freeze'">
        <el-form-item
          label="Freeze reason"
          prop="remark"
          :rules="verify('required', 'string')"
        >
          <el-input v-model="dialogData.remark" type="textarea"></el-input>
        </el-form-item>
        <el-form-item
          label="Freeze time"
          prop="freeze_time"
          :rules="verify('required', 'int')"
        >
          <el-row :gutter="10">
            <el-col :span="20">
              <el-input
                v-model.number="dialogData.freeze_time"
                type="number"
              ></el-input>
            </el-col>
            <el-col :span="4">Day</el-col>
          </el-row>
        </el-form-item>
      </template>

      <template v-if="dialogData.status == 'Unfreeze'">
        <FreezeInfo
          v-if="approvalStatus === 400"
          :inData="config.current_approval"
        ></FreezeInfo>
      </template>
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
import MerchantsRole from "./MerchantsRole.vue";
import PersonInfo from "./PersonInfo.vue";
import OutletsInfo from "./OutletsInfo.vue";
import BusinessDocuments from "./BusinessDocuments.vue";
import FreezeInfo from "./FreezeInfo.vue";
import Approval from "./Approval.vue";
import { MERCHANT_REJEACT_RESON } from "@/utils/treatymap";
import { verify } from "@/utils/tools.validate.js";
import { computed, reactive, ref } from "@vue/reactivity";
import {
  POST_merchantApprovalInfo,
  POST_merchantApprovalRefus,
  POST_merchantApprovalPass,
  POST_merchantApprovalReject,
  POST_merchantModifyInfo,
  POST_merchantReapplication,
  POST_merchantFreeze,
  POST_merchantUnfreeze,
} from "@/api";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const router = useRouter();
const dialogForm = ref();
const approvalForm = ref(null);
let config = reactive({
  merchant: null,
  current_approval: null,
  disabled: true,
  pageStatus: "",
  dialogVisible: false,
  env: "",
});

const props = defineProps({
  id: String,
});

const merchant_id = Number(props.id);

const approvalStatus = computed(() => config.merchant.approval_status);

const dialogData = reactive({
  reason: "",
  remark: "",
  status: "",
  freeze_time: "",
});

const back = () => router.go(-1);

const query = async (type) => {
  const { code, data, message } = await POST_merchantApprovalInfo({
    merchant_id,
  });
  if (!code) {
    const { merchant, current_approval } = data;
    config.merchant = merchant;
    config.current_approval = current_approval;
  }
};

const subMap = {
  _base: async (ajax, req) => {
    const validatefn = dialogForm.value.validate;
    validatefn(async (status) => {
      if (status) {
        const { code, message } = await ajax(req);
        if (!code) {
          ElMessage.success(message);
          back();
        }
      }
    });
  },

  Return: async () => {
    const req = {
      merchant_id,
      reason: dialogData.reason,
      remark: dialogData.remark,
    };
    subMap._base(POST_merchantApprovalReject, req);
  },
  Refus: async () => {
    const req = {
      merchant_id,
      reason: dialogData.reason,
      remark: dialogData.remark,
    };
    subMap._base(POST_merchantApprovalRefus, req);
  },
  Freeze: async () => {
    const req = {
      merchant_id,
      reason: dialogData.reason,
      freeze_time: dialogData.freeze_time,
    };
    subMap._base(POST_merchantFreeze, req);
  },
  Unfreeze: async () => {
    const req = {
      merchant_id,
    };
    subMap._base(POST_merchantUnfreeze, req);
  },
};

const edit = () => {
  config.env = "edit";
  config.disabled = false;
};

const subEdit = async () => {
  let req = {};
  let ajax = undefined;
  if (approvalStatus === 103) {
    ajax = POST_merchantReapplication;
    req = { merchant: config.merchant };
  } else {
    ajax = POST_merchantModifyInfo;
    const {
      merchant_id,
      email,
      user_address,
      store_address,
      business_time,
      lng,
      lat,
    } = config.merchant;
    req = {
      merchant_id,
      email,
      user_address,
      store_address,
      business_time,
      lng,
      lat,
    };
  }
  const { code, message } = await ajax(req);
  if (!code) {
    ElMessage.message(message);
    back();
  }
};

const subApprove = async () => {
  const { code, message } = await POST_merchantApprovalPass({ merchant_id });
  if (!code) {
    ElMessage.success(message);
    back();
  }
};

const befSbu = (_status) => {
  dialogData.status = _status;
  config.dialogVisible = true;
};

const sbu = () => subMap[dialogData.status]();

query();
</script>

<style lang="scss" scoped>
h3 {
  font-size: 1em;
  margin-bottom: 0.5em;
}
.btn-box {
  text-align: center;
  button {
    margin: 0 0.5em;
  }
}
.redtip {
  color: red;
  // font-size: 9px;
  // line-height: 3em;
  margin: 1em;
}
</style>
