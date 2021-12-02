<!--
 * @Description: login
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-01 17:30:34
-->
<template>
  <div class="login-moudle">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <div class="logo">
          <!-- <img src="../../assets/img/logo@2x.jpg" alt /> -->
        </div>
        <!-- <p class="text">
        LOG IN TO
        <span class="bold">OPAY DASHBOARD</span>
      </p> -->
      </div>
      <div class="from-container">
        <div class="item-tips-container">
          <span class="tips-text">Email address</span>
        </div>
        <el-form-item prop="username" class="input">
          <span class="svg-container">
            <!-- <svg-icon icon-class="user" /> -->
          </span>
          <el-input
            ref="username"
            v-model.trim="loginForm.username"
            placeholder="Enter your email address"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
        <div class="item-tips-container">
          <span class="tips-text">Password</span>
          <span class="tips-forgot" @click="handleModuleChange('forgot')"
            >Forgot password?</span
          >
        </div>
        <el-form-item prop="password" class="input">
          <span class="svg-container">
            <!-- <svg-icon icon-class="password" /> -->
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Enter your password"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <!-- <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            /> -->
          </span>
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          class="item-btn-login"
          :class="{ active: verifyUserNotEmpty() }"
          @click.native.prevent="handleLogin"
          >Login</el-button
        >

        <div class="tips-module">
          <span class="item-label">New to OPay dashboard?</span>
          <span
            class="item-active item-margin"
            @click="handleModuleChange('signup')"
            >Sign up</span
          >
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Please enter the correct email"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 8) {
        callback(new Error("The password can not be less than 8 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        clientId: "loan",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: "password",
    };
  },
  computed: {
    ...mapGetters([]),
  },
  created() {},
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    // 验证用户信息是否为空
    verifyUserNotEmpty() {
      let t = false;
      const data = this.loginForm;

      for (const i in data) {
        const type = Object.prototype.toString.call(data[i]);

        if (type === "[object Undefined]" || type === "[object Null]") {
          t = false;
        } else {
          t = !!data[i].toString().replace(/(^s*)|(s*$)/g, "").length;
        }

        if (!t) break;
      }

      return t;
    },
    // 登录
    handleLogin() {
      // this.loading = true;
      this.$store
        .dispatch("user/login", this.loginForm)
        .then((json) => {
          this.$router.push({ path: this.redirect || "/" });
          // this.loading = false;
        })
        .catch(() => {
          // this.loading = false;
        });
    },
    // 模块切换
    handleModuleChange(type) {
      this.$emit("moduleChange", type);
    },
  },
};
</script>

<style lang="scss" scoped>
.login-moudle {
  background: $opay-color;
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: wrap nowrap;
  justify-content: center;
  align-items: center;

  .login-form {
    padding: 20px;
    border-radius: 3px;
    width: 400px;
    height: 452px;
    background-color: #fff;
  }
}
</style>
