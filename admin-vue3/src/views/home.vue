<template>
  <p>{{ data.name }}</p>
  <p>{{ data.age }}</p>
  <p>{{ data.info }}</p>
  <button @click="change">加一岁</button>
  <div class="lang"></div>
</template>

<script>
import { computed, reactive } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
export default {
  name: 'Compotion',
  setup() {
    let data = reactive({
      name: 'xiaoming',
      age: 18,
      info: computed(() => ` ${data.name} 叹气说：${data.age}了`)
    })

    const change = function () {
      data.age++
      console.log(data.age)
    }

    watch(
      () => data.age,
      (a, b) => {
        console.log(a, b)
      }
    )

    return { data, change }
  }
}
</script>

<style lang="scss" scoped>
p {
  border: 1px solid red;
  background: $opay-color;
}
.lang {
  height: 2000px;
}
</style>
