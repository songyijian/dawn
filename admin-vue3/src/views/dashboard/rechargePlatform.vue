<!--
 * @Description: 企业充值
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-03 11:21:34
-->
<template>
  <el-form
    ref="platformRechargeform"
    :model="platformRechargeReq"
    label-width="130px"
  >
    <el-form-item
      label="Upload receipt"
      prop="receipt"
      :rules="verify('required', 'string')"
    >
      <FileUpload @uploaderCallback="uploaderCallback">
        <template v-slot:handle="{ onSelectFile }">
          <el-button size="small" type="primary" @click="onSelectFile"
            >select file</el-button
          >
        </template>
        <p v-if="platformRechargeReq.receipt">
          <el-image
            fit="cover"
            :src="platformRechargeReq.receipt"
            :preview-src-list="[platformRechargeReq.receipt]"
          >
          </el-image>
        </p>
      </FileUpload>
    </el-form-item>

    <el-form-item
      label="Transaction ID"
      prop="receipt_no"
      :rules="verify('required', 'string')"
    >
      <el-input v-model.trim="platformRechargeReq.receipt_no"></el-input>
    </el-form-item>

    <el-form-item
      label="Top-up amount"
      prop="amount"
      :rules="verify('required', 'int64')"
    >
      <el-input v-model="platformRechargeReq.amount" type="number"></el-input>
    </el-form-item>

    <el-form-item
      label="Currency"
      prop="currency"
      :rules="verify('required', 'string')"
    >
      <el-input v-model.trim="platformRechargeReq.currency"></el-input>
    </el-form-item>

    <el-form-item
      label="State"
      prop="country"
      :rules="verify('required', 'string')"
    >
      <el-input v-model.trim="platformRechargeReq.country"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="subRechargeOpay"
        >Top up for OPay</el-button
      >
    </el-form-item>
  </el-form>

  <h3>交易流水</h3>
  <el-table :data="mydata.rechargeList" style="width: 100%">
    <el-table-column label="充值到账时间">
      <template #default="scope">
        {{ scope.row.create_time }}
      </template>
    </el-table-column>
    <el-table-column prop="amount" label="充值金额" />
    <el-table-column prop="merchant_id" label="商户ID" />
    <el-table-column prop="create_time" label="申请时间" />
    <el-table-column label="状态">
      <template #default="scope">
        {{ RECHARGE_STATUS[scope.row.approval_status] }}
      </template>
    </el-table-column>
    <el-table-column prop="accruing_amount" label="累计充值金额" />
    <el-table-column label="View">
      <template #default="scope">
        <el-button type="text" @click="view(scope.row)">View</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    layout="prev, pager, next"
    v-model:page-size="page_size"
    v-model:current-page="config.page"
    :total="total"
  ></el-pagination>

  <el-dialog v-model="mydata.dialogVisible" title="" width="70%">
    <el-form label-width="130px">
      <el-form-item label="ID" prop="receipt">
        <p v-if="mydata.viewData.receipt">id</p>
      </el-form-item>

      <el-form-item label="Upload receipt" prop="receipt">
        <el-image
          fit="cover"
          v-if="mydata.viewData.receipt"
          :src="mydata.viewData.receipt"
          :preview-src-list="[mydata.viewData.receipt]"
        >
        </el-image>
      </el-form-item>

      <el-form-item label="Transaction ID" prop="receipt_no">
        {{ mydata.viewData.receipt_no }}
      </el-form-item>

      <el-form-item label="Top-up amount" prop="amount">
        {{ mydata.viewData.amount }}
      </el-form-item>

      <el-form-item label="Currency" prop="currency">
        {{ mydata.viewData.currency }}
      </el-form-item>

      <el-form-item label="Country" prop="country">
        {{ mydata.viewData.country }}
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="mydata.dialogVisible = false">Cancel</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import FileUpload from "@/components/FileUpload.vue";
import { reactive, ref } from "@vue/reactivity";
import {
  POST_DashboardPlatformTradeInfo,
  POST_DashboardPlatformRecharge,
  POST_DashboardRechargeDetail,
  POST_DashboardPlatformRechargeList,
} from "@/api";
import { RECHARGE_STATUS } from "@/utils/treatymap.js";
import { verify } from "@/utils/tools.validate.js";
import { watch } from "vue-demi";

const platformRechargeform = ref(null);
const total = ref(0);
const page_size = ref(10);
const config = reactive({
  page: 1, // int32 当前页码
});
const mydata = reactive({
  tradeInfo: null,
  rechargeList: null,
  dialogVisible: false,
  viewData: null,
});

const platformRechargeReq = reactive({
  //票据URL string
  receipt: "",
  //发票流水号 string
  receipt_no: "",
  //充值金额 int64
  amount: 3,
  //币种string
  currency: "",
  //国家string
  country: "",
});

const subRechargeOpay = async () => {
  const validatefn = platformRechargeform.value.validate;
  validatefn(async (status) => {
    alert(status);
    if (status) {
      const { code, message } = await POST_DashboardPlatformRecharge({
        ...platformRechargeReq,
      });
      if (!code) {
        ElMessage.success(message);
        mydata.dialogVisible = false;
      }
    }
  });
};

const uploaderCallback = ({ code, data }) => {
  if (!code) {
    platformRechargeReq.receipt = data;
  }
};

const queryList = async () => {
  const { code, data } = await POST_DashboardPlatformRechargeList({
    ...config,
  });
  if (!code) {
    mydata.rechargeList = data.recharge_data;
    total.value = data.pagination.total;
    page_size.value = data.pagination.page_size;
  }
};

const queryTradeInfo = async () => {
  const { code, data } = await POST_DashboardPlatformTradeInfo();
  if (!code) {
    mydata.tradeInfo = data;
  }
};

async function view(row) {
  console.log(row);
  const { code, data } = await POST_DashboardRechargeDetail({
    recharge_id: row.id,
  });
  if (!code) {
    mydata.dialogVisible = true;
    mydata.viewData = data;
    queryList();
  }
}

watch(() => config.page, queryList);

queryTradeInfo();
queryList();
</script>
