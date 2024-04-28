<template>
    <div v-loading="loading" :style="'height:'+height">
      <iframe :src="url" frameborder="0" style="width: 100%;" />
    </div>
</template>
  
<script setup lang='ts'>
import { propTypes } from '@/utils/propTypes';

const props = defineProps({
  src:propTypes.string.isRequired
})

const height = ref(document.documentElement.clientHeight-94.5+"px;")
const loading=ref(false)
const url = computed(()=>props.src)
onMounted(()=>{
  setTimeout(()=>{
    loading.value=false
  },3000);
  window.onresize=()=>{
    height.value=document.documentElement.clientHeight-94.5+"px;"
  }
})
</script>
  
<style>
  
</style>