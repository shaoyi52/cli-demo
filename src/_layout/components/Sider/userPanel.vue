<template>
  <div class="user-panel">
    <div class="img">
      <el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
    </div>
    <div class="info">
      <span style="display: block">Demo</span>
      <a href="#">demo</a>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
  
</script>
  
<style scoped lang="scss">
  .user-panel{
    display: flex;
    flex-direction: row;
    .img{
      display: flex;    
      align-items: center; 
    }
    .info{
      margin-left: 8px;
      display: flex;
      flex-direction: column;    
      justify-content: center;
      >a{
        line-height: 100%;
      }
      >span{
        line-height: 100%;
        margin-bottom: 4px;
      }
    }
  }
</style>