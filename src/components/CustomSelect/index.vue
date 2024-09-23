<template>  
  <el-select  
    v-bind="$attrs"  
    ref="elSelect"  
    v-model="localValue"  
    class="custom-select"  
    @change="handleChange"  
  >  
    <slot>
      <el-option  
        v-for="item in options"  
        :key="item.value"  
        :label="item.label"  
        :value="item.value"  
      />
    </slot> <!-- 允许传递自定义选项或其他内容 -->  
  </el-select>  
</template>  
  
<script setup lang="ts">  
import { ref, computed, onMounted, watch } from 'vue';  
  
// 假设从父组件接收 value 和其他属性  
const props = defineProps({  
  value: [String, Number, Array],  
  options:{
    type:[Array],
    default:()=>[],
  },
  // 其他 props...  
});  
  
// 创建一个响应式的本地变量来存储选择的值  
const localValue = ref(props.value);  
  
// 监听 props.value 的变化，并更新 localValue  
watch(() => props.value, (newVal) => {  
  localValue.value = newVal;  
});  
  
// 处理 change 事件，并将值传回给父组件  
const handleChange = (value) => {  
  // 这里可以添加自定义逻辑，比如验证  
  // 然后使用 emit 触发 update:modelValue 事件，通知父组件更新  
  emit('update:modelValue', value);  
};  
  
// 暴露 emit 用于触发事件  
const emit = defineEmits(['update:modelValue', 'change']); // 'change' 可以根据需要添加  
  
// 如果需要，可以在这里添加其他 Composition API 功能，如计算属性、生命周期钩子等  
</script>  
  
<style scoped>  
.custom-select {  
  /* 自定义样式 */  
}  
</style>