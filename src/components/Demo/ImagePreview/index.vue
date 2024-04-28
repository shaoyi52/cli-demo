<template>
  <el-image :src="realSrc" fit="cover" :style="`width:${realWidth};height:${realHeight};`" :preview-src-list="realsrcList" preview-teleported>
    <template #error>
      <div class="image-slot">
        <el-icon><pictur-filled /></el-icon>
      </div>
    </template>
  </el-image>
</template>
  
<script setup lang='ts' name="ImagePreviews">
  import {proTypes} from '@/utils/propTypes';

  const props = defineProps({
    src: propTypes.string.def(''),
    width:{
      type:[Number,String],
      default:'',
    },
    height:{
      type:[Number,String],
      default:'',
    },
  });

  const realSrc= computed(()=>{
    if(!props.src){
      return ;
    }
    let real_src = props.src.split(",")[0];
    return real_src;
  });

  const realSrcList= computed(()=>{
    if(!props.src){
      return;
    }
    let real_src_list = props.src.split(",");
    let srcList:string[]=[];
    real_src_list.forEach(item=>{
      return srcList.push(item);
    });
    return real_src_list;
  });
</script>
  
<style lang="scss" scoped>
.el-image{
 border-radius: 5px;
 background-color:#ebeef5;
 box-shadow:0 0 5px 1px #ccc;

 :deep(.el-image__inner){
  transition:all 0.3s;
  cursor: pointer;

  &:hover{
    transform: scale(1.2);
  }
 }

 :deep(.image-slot){
  display: flex;
  justify-content: center;
  align-items: center;
  width:100%;
  height:100%;
  color:#909399;
  font-size:30;
 }

}
  
</style>