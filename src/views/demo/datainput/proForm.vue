<template>
  <!-- <Search :visible="true" /> -->
  <el-card>
    <Form @register="registerForm" @submit="formSubmit">
      <template #f3="{ schema, formModel }">
        <el-input v-model="formModel['field3']" placeholder="自定义slot" />
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
const options = ref([  
  { value: 'option1', label: '选项1' },  
  { value: 'option2', label: '选项2' },  
  // 更多选项...  
]);
const schemas: FormSchema[] = [
  {
    field: 'CustomerId',
    component: 'CustomSelect',
    label: '甲方',
    colProps: {
      span: 12,
    },
    rules: [{ required: true }],
    defaultValue: 'option1',
    componentProps:{   
      options,  
    },
  },
  {
    field: 'field3',
    component: 'ElInput',
    label: '签约人',
    colProps: {
      span: 12,
    },
    slot:"f3",
    rules: [{ required: true }],
    defaultValue: '',
  },
  {
    field: 'radio',
    component: 'CustomRadio',
    label: '选项',
    colProps: {
      span: 12,
    },
    componentProps:{   
      options:[{ value: 'option1', label: '选项1' },  
      { value: 'option2', label: '选项2' }]  ,  
    },
    rules: [{ required: true }],
    defaultValue: 'option2',
  },
  
  {
    field: 'field1',
    component: 'ElInput',
    label: '签约客户名称',
    colProps: {
      span: 12,
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
      span: 12,
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