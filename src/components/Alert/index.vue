<template>
  <el-alert v-bind="$attrs">
    <template v-for="(index,name) in $slots" :key="name" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps||{}" />
    </template>
  </el-alert>
</template>
  
<script setup lang='ts'>
  
</script>
  
<style>
  
</style>