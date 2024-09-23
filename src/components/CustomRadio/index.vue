<template>
  <el-radio-group @change="handleChange">
    <slot>
      <el-radio
        v-for="item in options"  
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </el-radio>
    </slot>
  </el-radio-group>
</template>
  
<script setup lang='ts'>
  import {PropType ,ref} from 'vue';
  type optionItem={label:string,value:string|number}
  
  // 从父组件接收的属性
  const props = defineProps({
    value:[String,Number],
    options:{
      type:Array as PropType<optionItem[]>,
      default:()=>[],
    },
  });

  // 暴露 emit 用于触发事件
  const emit = defineEmits(['update:modelValue']);
  // 创建一个响应式的本地变量存储选择的值
  const localValue = ref(props.value||'');
  
  // 监听 props.value 的变化；并更新localValue
  watch(()=>props.value,(newVal)=>[
    localValue.value=newVal,
  ]);

  const handleChange =(value)=>{

    emit("update:modelValue",value);
  };


</script>
  
<style>
  
</style>