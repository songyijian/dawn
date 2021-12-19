<!--
 * @Description: 商户充值
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-17 21:16:48
-->

<template>
  <el-form
    v-if="!mydata.info"
    ref="myform"
    :model="mydata"
    label-width="130px"
    :inline="true"
  >
    <el-form-item
      label="Mobile No."
      prop="phone_number"
      :rules="verify('required', 'string')"
    >
      <el-input v-model="mydata.phone_number" type="string"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button @click="merchantSearchReq">Search</el-button>
    </el-form-item>
  </el-form>

  <div v-if="mydata.info">
    <MerchantRechargeInfo
      :data="{ trade_info, merchant }"
    ></MerchantRechargeInfo>

    <el-button type="primary" @click="mydata.dialogVisible = true"
      >Top up for OPay</el-button
    >
    <el-button @click="$router.go(-1)">Back</el-button>
  </div>

  <el-dialog v-model="mydata.dialogVisible" title="" width="70%">
    <el-form ref="dialogform" :model="recharge" label-width="130px">
      <el-form-item
        v-if="mydata.dialogStage === 'amount'"
        label="amount"
        prop="amount"
        :rules="verify('required', 'int')"
      >
        <el-input v-model.number="recharge.amount"></el-input>
      </el-form-item>

      <el-form-item
        v-else
        label="Top code"
        prop="otp_code"
        :rules="verify('required', 'string')"
      >
        <el-input v-model="recharge.otp_code"></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="merchantRechargeReq"
          >confirm</el-button
        >
        <!-- <el-button @click="mydata.dialogVisible = false">Cancel</el-button> -->
      </span>
    </template>
  </el-dialog>
</template>


<script setup>
import { computed, reactive, ref } from "@vue/reactivity";
import {
  POST_DashboardMerchantSearchReq,
  POST_DashboardPlatformTradeInfo,
  POST_DashboardMerchantRechargeReq,
  POST_SendOtpReq,
} from "@/api";
import { verify } from "@/utils/tools.validate.js";
import { watch } from "vue-demi";
import MerchantRechargeInfo from "@/components/MerchantRechargeInfo.vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();
const myform = ref(null);
const dialogform = ref(null);
const mydata = reactive({
  phone_number: undefined,
  info: null,
  dialogVisible: false,
  tradeInfo: null,
  dialogStage: "amount",
});

const recharge = reactive({
  amount: undefined,
  otp_code: undefined,
});
const merchant = computed(() => mydata?.info?.merchant);
const trade_info = computed(() => mydata?.info?.trade_info);

const merchantSearchReq = async () => {
  const { code, data } = await POST_DashboardMerchantSearchReq({
    phone_number: mydata.phone_number,
  });
  if (!code) {
    mydata.info = data;
  }
};

const queryTradeInfo = async () => {
  const { code, data } = await POST_DashboardPlatformTradeInfo();
  if (!code) {
    mydata.tradeInfo = data;
  }
};

async function sendOtpReq(params) {
  console.log(mydata.info.merchant.id);
  const { code, success } = await POST_SendOtpReq({
    merchant_id: mydata.info.merchant.id,
  });
  if (!code) {
    mydata.dialogStage = "otp_code";
  }
}

async function sbu(params) {
  console.log(mydata.info.merchant.id);
  const { code, success } = await POST_DashboardMerchantRechargeReq({
    ...recharge,
    merchant_id: mydata.info.merchant.id,
  });
  if (!code) {
    ElMessage.success(success);
    router.go(-1);
  }
}

const merchantRechargeReq = () => {
  const validatefn = dialogform.value.validate;
  validatefn((status) => {
    if (status) {
      if (mydata.dialogStage === "amount") {
        return sendOtpReq();
      }
      mydata.dialogStage === "otp_code" && sbu();
    }
  });
};
</script>

