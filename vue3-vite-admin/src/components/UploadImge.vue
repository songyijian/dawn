<!--
 * @Description: 文件上传再封装,支持预览
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-13 17:15:37
-->

<template>
  <FileUpload
    @uploaderCallback="uploaderCallback($event, imgList)"
    :disabled="disabled"
    :accept="accept"
    :multiple="multiple"
  >
    <template v-slot:handle="{ onSelectFile }">
      <el-button size="small" type="primary" @click="onSelectFile">
        Select file
      </el-button>
    </template>
    <div class="upload-img-list">
      <p class="upload-img-item" v-for="(url, index) in imgList" :key="url">
        <el-image
          class="el-img"
          fit="cover"
          :src="url"
          :preview-src-list="imgList"
        ></el-image>
        <el-button type="text" @click="rmImage(index, imgList)">
          Remove
        </el-button>
      </p>
    </div>
  </FileUpload>
</template>

<script setup>
import FileUpload from '@/components/FileUpload.vue'

defineProps({
  accept: {
    type: String,
    required: false,
    default: 'image/png, image/jpeg'
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  },
  multiple: {
    type: Boolean,
    required: false,
    default: false
  },
  imgList: {
    type: Array,
    required: true,
    default: () => []
  }
})

const uploaderCallback = ({ code, data }, list) => {
  if (!code) list.push(data)
}
const rmImage = (n, list) => list.splice(n, 1)
</script>
