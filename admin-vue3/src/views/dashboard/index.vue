<!--
 * @Description: Dashboard
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-03 11:21:34
-->
<template>
  {{ mydata }}
  <el-row :gutter="20">
    <el-col :span="19" :offset="0">
      <el-row :gutter="20" v-if="mydata.tradeInfo">
        <el-col :span="8" class="card-box">
          <h3>账户余额</h3>
          <strong>{{ mydata.tradeInfo.account_balance }}</strong>
        </el-col>
        <el-col :span="8" class="card-box">
          <h3>交易量</h3>
          <strong>{{ mydata.tradeInfo.trans_num }}</strong>
        </el-col>
        <el-col :span="8" class="card-box">
          <h3>代理数</h3>
          <strong>{{ mydata.tradeInfo.agent_num }}</strong>
        </el-col>
        <!-- <el-col :span="8" class="card-box">
        <h3>可用余额</h3>
        <strong>{{ mydata.tradeInfo.usable_balance }}</strong>
        </el-col> -->
      </el-row>
    </el-col>
    <el-col :span="5" :offset="0" class="recharge-box">
      <el-button type="primary" @click="$router.push({ path: '/dashboard/rechargeOpay' })">Top up for OPay</el-button>
      <br />
      <el-button @click="$router.push({ path: '/dashboard/rechargeUser' })">Top up for agents</el-button>
    </el-col>
  </el-row>

  <!-- POST /manage/db/platform/recharge -->

  <!-- <el-form ref="myform" :model="config" :inline="true" @keyup.enter="query('search')">
    <el-form-item label="Name" prop="name" :rules="verify('string')">
      <el-input v-model.trim="config.name"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="query('search')">Search</el-button>
      <el-button @click="resetForm">Reset</el-button>
    </el-form-item>
  </el-form>

  <div class="fast-seek">
    <el-button type="primary" @click="create">Create merchant accounts</el-button>
  </div>

  <el-table :data="mydata.tableData" style="width: 100%">
    <el-table-column label="S.No.">
      <template #default="scope">
        {{ scope.$index + 1 }}
      </template>
    </el-table-column>
    <el-table-column prop="id" label="ID" />
    <el-table-column prop="identity" label="Identity" />
    <el-table-column prop="email" label="E-mail" />
    <el-table-column prop="ctime" label="Registeration time" />
    <el-table-column prop="status" label="Status" />
    <el-table-column prop="application_time" label="Application time" />

    <el-table-column label="Operate">
      <template #default="scope">
        <el-button type="text" @click="view(scope.row)">View</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination layout="prev, pager, next" v-model:page-size="page_size" v-model:current-page="config.page" :total="total"></el-pagination> -->
</template>

<script setup>
import FileUpload from '@/components/FileUpload.vue'
import { reactive, ref } from '@vue/reactivity'
import { POST_DashboardAppOrderList, POST_DashboardPlatformTradeInfo, POST_DashboardPlatformRecharge } from '@/api'
import { useRouter } from 'vue-router'
import { MERCHANT_APPROVAL_STATUS, MERCHANT_ROLE } from '@/utils/treatymap.js'
import { verify } from '@/utils/tools.validate.js'

const router = useRouter()
const platformRechargeform = ref(null)
const total = ref(0)
const page_size = ref(10)

const config = reactive({
  page: 1, // int32 page = 1;         // 当前页码
  name: '', // 商户名称 string
  mobile: '', // 电话 string
  email: '', // email string
  merchant_role: 0, // 商户角色(1.agent 2.master)int32
  query_begin_time: undefined, // 查询开始时间(时间戳:单位s)int64
  query_end_time: undefined, // 查询截止时间(时间戳:单位s)int64
  approval_status: 0 // 查询审批状态列表（0.全部 1.待审核 2.审核通过 3.驳回） int32
})

const mydata = reactive({
  tableData: [],
  tradeInfo: null,
  dialogVisible: true
})

const platformRechargeReq = reactive({
  //票据URL string
  receipt: '',
  //发票流水号 string
  receipt_no: '',
  //充值金额 int64
  amount: 3,
  //币种string
  currency: '',
  //国家string
  country: ''
})

const subRechargeOpay = async () => {
  const validatefn = platformRechargeform.value.validate
  validatefn(async status => {
    if (status) {
      const { code, message } = await POST_DashboardPlatformRecharge(req)
      if (!code) {
        ElMessage.success(message)
        mydata.dialogVisible = false
      }
    }
  })
}

const uploaderCallback = ({ code, data }) => {
  if (!code) {
    platformRechargeReq.receipt = data
  }
}

// const dateToNum = date => new Date(date).getTime()
// const query = async type => {
//   config.page = type === 'search' ? 0 : config.page
//   let res = {
//     page_size: page_size.value,
//     ...config
//   }
//   res.query_begin_time ? (res.query_begin_time = dateToNum(res.query_begin_time)) : delete res.query_begin_time
//   res.query_end_time ? (res.query_end_time = dateToNum(res.query_end_time)) : delete res.query_end_time
//   const { code, data, message } = await POST_merchantList(res)
//   if (!code) {
//     const { pagination, merchants } = data
//     config.total = pagination.total
//     page_size.value = pagination.page_size
//     mydata.tableData = merchants
//   }
// }

const queryTradeInfo = async () => {
  const { code, data } = await POST_DashboardPlatformTradeInfo()
  if (!code) {
    mydata.tradeInfo = data
  }
}

// const view = ({ id }) => {
//   router.push({
//     path: '/merchants/audit',
//     query: { id }
//   })
// }

// const create = () => {
//   router.push({ path: '/merchants/create' })
// }

queryTradeInfo()
// query()
</script>

<style lang="scss" scoped>
.fast-seek {
  margin: 1em 0;
}

.card-box {
  border-left: 3px solid $opay-color;
  box-sizing: border-box;
}

.recharge-box {
  text-align: left;
}

.recharge-form-box {
  background: #fff;
  padding: 1em;
}
</style>
