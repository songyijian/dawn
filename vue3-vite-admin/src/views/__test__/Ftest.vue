<!--
 * @Author: your name
 * @Date: 2022-01-09 15:34:32
 * @LastEditTime: 2022-01-10 16:22:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-vite-admin/src/views/__test__/SetupFunc.vue
-->

<template>
  {{ a }}
  {{ b }}
  {{ c }}
  {{ d }}
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue-demi'
import { afn, bfn, cfn, dfn } from './a'

export default {
  setup(props) {
    const a = afn()
    const b = bfn()
    const c = cfn()
    const d = dfn()

    return {
      a,
      b,
      c,
      d
    }
  }
}
</script>
