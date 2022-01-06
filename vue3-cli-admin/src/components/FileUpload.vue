<!--
 * @Description: 文件上传
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-13 17:15:37
-->

<template>
  <div>
    <input
      ref="fileInput"
      type="file"
      style="display: none"
      :disabled="disabled"
      :multiple="multiple"
      @change="onUploader($event)"
      :accept="accept"
    />
    <slot name="handle" :onSelectFile="onSelectFile"></slot>
    <slot name="default"></slot>
  </div>
</template>

<script setup>
import { ref } from 'vue-demi'
import { POST_uploadImage } from '@/api'

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
  }
})

const emit = defineEmits(['beforeUploader', 'uploaderCallback'])

const fileInput = ref(null)

const setReqData = file => {
  let fd = new FormData()
  fd.append('file', file[0])
  return fd
}

const onSelectFile = () => {
  fileInput.value.value = ''
  fileInput.value.click()
}

const onUploader = async event => {
  let files = event.target.files
  if (!files[0]) return
  var req = setReqData(files)
  const res = await POST_uploadImage(req)
  emit('uploaderCallback', res)
}

defineExpose({
  onSelectFile,
  fileInput
})
</script>
