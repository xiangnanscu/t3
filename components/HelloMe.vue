<script setup>
  const hmrTest = () => {
    uni.showToast({
      title: "显示me"
    })
  }
  const name = process.env.foo
</script>
<template>
  <div><button @click="hmrTest" type="default">环境变量{{name}}测试</button></div>
</template>