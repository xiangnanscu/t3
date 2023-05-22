<script setup>
const hmrTest = ()=>{
  uni.showToast({title:"显示1"})
}
</script>
<template>
  <div><button @click="hmrTest"  type="default">热重载测试</button></div>
</template>
