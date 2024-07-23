<template>
  <!-- <Search :visible="true" /> -->
  <el-card>
    <Form @register="registerForm" @submit="formSubmit">
      <template #f3="{ schema, field }">
        <el-input placeholder="自定义slot" :model-value="schema['defaultValue']" />
      </template>
      <template #f2="{ model, field }">
        <el-input placeholder="自定义2slot" />
      </template>
    </Form>
    <el-button @click="submit">
      提交
    </el-button>
  </el-card>
</template>
  
<script setup lang='ts'>
import {  FormSchema, useForm } from '@/components/Form';
const schemas: FormSchema[] = [
  {
    field: 'field3',
    component: 'ElInput',
    label: '自定义',
    colProps: {
      span: 8,
    },
    slot:"f3",
    rules: [{ required: true }],
    defaultValue: '111',
  },
  {
    field: 'field1',
    component: 'ElInput',
    label: '签约客户名称',
    colProps: {
      span: 8,
    },
    rules: [{ required: true }],
    defaultValue: '111',
  },
  {
    field: 'field2',
    component: 'ElInput',
    label: '我方公司名称',
    rulesMessageJoinLabel:true,
    required:true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'field4',
    component: 'ElSelect',
    label: '我方公司名称',
    rulesMessageJoinLabel:true,
    componentProps:{
      
    },
    required:true,
    colProps: {
      span: 8,
    },
  },
];
const [registerForm,{
  submit:handleSubmit,
}]=useForm({
  labelWidth: 120,
  schemas,
});
const formSubmit=(data)=>{
  console.log('formSubmit',data);
};
const submit=async ()=>{
  handleSubmit();  
};
</script>
  
<style>
  
</style>