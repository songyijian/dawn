<template>
  <h1>{{ msg }}</h1>
  <form action="" ref="fff"></form>
</template>

<script setup>
const msg = 'ssss'

const props = defineProps({
  name: String,
  obj: Object
})

toRef()
console.log(props)
</script>
