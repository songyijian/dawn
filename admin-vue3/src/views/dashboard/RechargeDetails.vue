<!--
 * @Description: 商户充值交易详情
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-17 21:16:48
-->

<template>
  <div v-if="merchant">
    <div>
      <h3>基本信息</h3>
      <UserInfo :data="merchant"></UserInfo>
    </div>
    <div>
      <h3>商户信息</h3>
      <MerchantInfo :data="merchant"></MerchantInfo>
    </div>

    <h3>交易信息</h3>
    <div v-if="recharge_data" class="info-style">
      <p><strong>充值金额</strong> {{ merchant.amount }}</p>
      <p><strong>审核人ID</strong> {{ merchant.approval_id }}</p>
      <p><strong>申请时间</strong> {{ merchant.create_time }}</p>
      <p><strong>充值到账时间</strong> {{ merchant.arrive_time }}</p>
      <p>
        <strong>状态</strong> {{ RECHARGE_STATUS[merchant.approval_status] }}
      </p>
    </div>

    <template v-if="!merchant.approval_status">
      <el-button type="primary" @click="toMap(1)"> Approve </el-button>
      <el-button type="primary" @click="toMap(-1)"> Reject </el-button>
    </template>
    <el-button @click="$router.go(-1)">Back</el-button>
  </div>

  <el-dialog v-model="mydata.dialogVisible" title="" width="70%">
    <el-form ref="dialogform" :model="mydata" label-width="130px">
      <el-form-item
        label="拒绝理由"
        prop="reason"
        :rules="verify('required', 'string')"
      >
        <el-input v-model="mydata.reason" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="beforSub">confirm</el-button>
        <!-- <el-button @click="mydata.dialogVisible = false">Cancel</el-button> -->
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, reactive, ref } from "@vue/reactivity";
import { POST_RechargeDetailReq, POST_RechargeApproveReq } from "@/api";
import { verify } from "@/utils/tools.validate.js";
import { watch } from "vue-demi";
import { RECHARGE_STATUS } from "@/utils/treatymap.js";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import MerchantInfo from "@/components/MerchantInfo.vue";
import UserInfo from "@/components/UserInfo.vue";

const myform = ref(null);
const dialogform = ref(null);
const total = ref(0);
const page_size = ref(10);

const mydata = reactive({
  dialogVisible: false,
  merchant: null,
  recharge_data: null,
  reasonStatus: undefined,
  reason: "",
});

const merchant = computed(() => mydata?.merchant);
const recharge_data = computed(() => mydata?.recharge_data);

const router = useRouter();
const route = useRoute();
const recharge_id = Number(route.query.id);

const queryDetail = async () => {
  const { code, data } = await POST_RechargeDetailReq({
    recharge_id,
  });
  if (!code) {
    mydata.merchant = data.merchant;
    mydata.recharge_data = data.recharge_data;
  }
};

const sub = async (params) => {
  const req = {
    status: mydata.reasonStatus,
    reason: mydata.reason,
    recharge_id: mydata.recharge_data.id,
  };
  const { code } = await POST_RechargeApproveReq(req);
  if (!code) {
    mydata.dialogVisible = false;
    router.go(-1);
  }
};

const beforSub = async (t) => {
  const validatefn = dialogform.value.validate;
  validatefn((a) => {
    if (a) sub();
  });
};

const toMap = async (t) => {
  mydata.reasonStatus = t;
  if (t == 1) return sub();
  mydata.dialogVisible = true;
};

queryDetail();
</script>


<style lang="scss" scoped>
.info-style {
  line-height: 2.5rem;
  & > p > strong {
    display: inline-block;
    width: 150px;
    text-align: right;
    padding-right: 00.5rem;
  }
}
</style>
