/*
 * @Description:
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2022-01-10 16:06:21
 */
import { onMounted, ref } from 'vue-demi'

export function afn() {
  const a = ref(1)
  onMounted(() => {
    a.value = 100
  })
  return a
}

export function bfn() {
  const b = ref(2)
  onMounted(() => {
    b.value = 200
  })
  return b
}

export function cfn() {
  const c = ref(3)
  onMounted(() => {
    c.value = 800
  })

  setTimeout(() => {
    c.value = 'xxxxxx'
  }, 1000)
  return c
}

export function dfn() {
  const d = ref(4)
  onMounted(() => {
    d.value = 400
  })
  return d
}
