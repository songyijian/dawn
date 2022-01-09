<!--
 * @Author: your name
 * @Date: 2022-01-07 23:39:27
 * @LastEditTime: 2022-01-09 01:30:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-base/src/components/Test.vue
-->
<template>
  <h1>{{ msg }}</h1>
  <h1>{{ conf.age }}</h1>
  <!-- <Vprops :name="name" :conf="conf"></Vprops> -->
  <button @click="setfn">btn</button>

  <teleport to="body" :disabled="displayVideoInline">
    <h1>{{ msg }} {{ displayVideoInline }}</h1>
  </teleport>
</template>

<script setup>
// import Vprops from "./Vprops.vue";
import { computed, reactive, ref, toRef } from "@vue/reactivity";
import { h, nextTick, watch } from "@vue/runtime-core";

var msg = "var ------";
var name = ref("ref-xiaoming");
var conf = reactive({
  age: 18,
});

var displayVideoInline = ref(false);

var setfn = () => {
  // msg = 1;
  conf.age = conf.age++;
  // console.log(conf);
  displayVideoInline.value = true;
  alert(1);
};

// console.log(props);
//
</script>
