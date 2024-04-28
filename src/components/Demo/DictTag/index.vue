<template>
  <div>
    <template v-for="(item,index) in options">
      <template v-if="values.includes(item.value)">
        <span
          v-if="(item.elTagType == 'default' ||item.elTagType=='')&&(item.elTagClass == ''||item.elTagClass==null)" 
          :key="item.value"
          :index="index"
          :class="item.elTagClass"
        >{{ item.label+ " " }}</span>
        <el-tag
          v-else
          :key="item.value + ''"
          :disable-transitions="true"
          :index="index"
          :type="item.elTagType === 'primary'?'':item.elTagType"
          :class="item.elTagClass"
        >
          {{ item.label+" " }}
        </el-tag>
      </template>
    </template>
  </div>
</template>
  
<script setup name="DoctTags" lang='ts'>
import {computed} from 'vue';
import {propTypes} from '@/utils/propTypes';

const  props = defineProps({
  //数据
  options:{
    type:Array as PropType<DictDataOption[]>,
    default:null,
  },
  // 当前的值
  value:[Number,String,Array] as PropType<number|string|Array<number|string>>,
  showValue:propTypes.bool.def(true),
  separator:propTypes.string.def(","),
});
const values = computed(()=>{
  if(props.value===''|| props.value===null || typeof props.value ==="undefined") return [];
  return Array.isArray(props.value)?props.value.map(item=>''+item):String(props.value).split(props.separator);
});
</script>
  
<style scoped>
  .el-tag+.el-tag{
    margin-left: 10px;
  }
</style>