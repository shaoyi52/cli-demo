<template>
  <div
    style="width: 100%; text-align: center"
  >
    <FormItem>
      <el-button
        type="default"
        @click="resetAction"
      >
        {{ getResetBtnOptions.text }}
      </el-button>
      <el-button type="primary" @click="submitAction">
        {{ getSubmitBtnOptions.text }}
      </el-button>
    </FormItem>
  </div>
</template>

<script setup lang="ts" name="BasicFormAction">
import {computed} from 'vue';
import {propTypes} from '@/utils/propTypes';
import {useFormContext} from '../hooks/useFormContext';
const { resetAction, submitAction} =useFormContext();
const props = defineProps({
  showActionButtonGroup:propTypes.bool.def(true),
  resetButtonOptions:{
    type:Object,
    default:()=>{},
  },
});
const getResetBtnOptions=computed(()=>{
  return Object.assign(
    {text:'重置'},    
      props.resetButtonOptions,
    );
});

const getSubmitBtnOptions = computed(()=>{
  return Object.assign(
    {text:'提交'},
  );
});
</script>

<style></style>
