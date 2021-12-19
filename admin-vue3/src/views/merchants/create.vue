<!--
 * @Description: 新增入驻商户
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-03 11:21:34
-->
<template>
  <el-row>
    <el-steps :active="mydata.active" finish-status="success" align-center>
      <el-step title="Role" description="Select Create role"></el-step>
      <el-step
        title="Please submit merchants' personal information"
        description="Basic information/photos of ID card"
      ></el-step>
      <el-step
        title="Please submit stores/outlets' information"
        description="Basic information"
      ></el-step>
      <el-step
        title="Please submit business documents"
        description="Business information, utility bills, photos of stores/outlets"
      ></el-step>
    </el-steps>
  </el-row>

  <div v-show="mydata.active >= 0">
    <component
      ref="myComponent"
      :is="useComponentsMap[mydata.active]"
      :inData="merchant"
      :evn="'create'"
    ></component>
  </div>

  <el-form class="btn-box">
    <el-button type="primary" @click="previous" :disabled="mydata.active <= 0"
      >Previous</el-button
    >
    <el-button type="primary" @click="next" :disabled="mydata.active > limit">
      {{ mydata.active === limit ? "Submit" : "Next" }}
    </el-button>

    <el-button @click="$router.go(-1)"> Banck </el-button>
  </el-form>
</template>

<script setup>
import MerchantsRole from "./components/MerchantsRole.vue";
import PersonInfo from "./components/PersonInfo.vue";
import OutletsInfo from "./components/OutletsInfo.vue";
import BusinessDocuments from "./components/BusinessDocuments.vue";
import { reactive, ref } from "@vue/reactivity";
import { POST_merchantCreate } from "@/api";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const useComponentsMap = [
  MerchantsRole,
  PersonInfo,
  OutletsInfo,
  BusinessDocuments,
];
const limit = useComponentsMap.length - 1;

const mydata = reactive({
  active: 0,
});

const myComponent = ref();

const merchant = ref({
  // 商户角色(1.agent 2.master) int32
  merchant_role: undefined,
  // 商户名称 string
  name: "",
  // email string
  email: "",
  // 电话 string 9位
  mobile: "",
  // name string
  user_name: "",
  // 身份证号 string
  id_number: "",
  // 出生日期 string
  birthday: "",
  // int32性别（1.male 2.female）
  gender: 1,
  // int32证件类型 1.身份证 2.护照 3.驾驶证
  id_type: 1,
  // 用户地址 string
  user_address: "",
  // 推荐码 string
  recommend_code: "",
  // 经度 double
  lng: undefined,
  // 纬度 double
  lat: undefined,
  // 身份挣图片数组 repeated string
  id_pics: [],
  // 业务描述 string
  business_description: "",
  // 所属行业 string
  business_type: "",
  // 营业时间 string
  business_time: "",
  // 水电费账单图片数组 repeated string
  expense_bill_pics: [],
  // 店铺图片数组 repeated string
  store_pics: [],
  // 商家和店铺图片
  store_owner_pics: [],
  // string 推荐电话
  recommend_mobile: "",
  // 商店地址 string
  store_address: "",
});

const submit = async (_res) => {
  const { code, data, message } = await POST_merchantCreate(_res);
  if (!code) {
    ElMessage.success(message);
    useRouter().replace({ path: "/merchants/list" });
  }
  return true;
};

const next = () => {
  const validatefn = myComponent.value.formObj.validate;
  validatefn((status) => {
    if (status) {
      if (mydata.active == limit) return submit({ merchant: merchant.value });
      return mydata.active < limit && mydata.active++;
    }
  });
};

const previous = () => mydata.active > 0 && mydata.active--;
</script>

<style lang="scss" scoped>
.btn-box {
  text-align: center;
}
</style>
