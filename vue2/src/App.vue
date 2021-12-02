<template>
  <div id="app">
    <router-view></router-view>
    <el-row
      class="global-loading"
      v-loading="ajaxLoading"
      v-show="ajaxLoading"
    />
  </div>
</template>
<script>
export default {
  name: "App",
  computed: {
    ajaxLoading() {
      return this.$store.state.ajaxLoading;
    },
  },
  mounted() {},
  methods: {},
  destory() {},
};
</script>
<style lang="scss" scoped>
::v-deep.global-loading {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;

  .el-loading-mask {
    background-color: rgba(255, 255, 255, 0.5);
  }
}
</style>
