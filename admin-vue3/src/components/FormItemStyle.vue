<!--
 * @Description: 表单一致性布局样式
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-13 17:15:37
-->

<template>
  <div class="el-form-item is-required el-form-item--small">
    <label for="mobile" class="el-form-item__label" :style="{ width: labelWidth }">
      <slot></slot>
    </label>
    <div class="el-form-item__content">
      <div class="el-input el-input--small is-disabled">
        <slot name="body">
          <span class="el-input--small"></span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const { labelWidth } = defineProps({
  'label-width': {
    type: String,
    required: false
  }
})
</script>
