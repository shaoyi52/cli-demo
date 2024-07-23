<template>
  <div>
    <el-form ref="formElRef" v-bind="getBindValue" :model="formModel">
      <el-row>       
        <template v-for="schema in getSchema" :key="schema.field">
          <FormItem 
            :schema="schema" 
            :form-props="getProps" 
            :form-model="formModel"
            :set-form-model="setFormModel"
            :all-default-values="defaultValueRef"
          >
            <template v-for="item in Object.keys(slots)" #[item]="data">
              <slot :name="item" v-bind="data || {}" />
            </template>             
          </FormItem>
        </template>
      </el-row>
    </el-form>
  </div>
</template>
  
<script setup lang='ts'>
import {computed,useSlots,defineEmits,onMounted,ref,unref,useAttrs,Ref} from 'vue';
import FormItem from "./components/FormItem.tsx";
import dayjs from 'dayjs';
import  {dateItemType} from '@/utils/helper';
import { cloneDeep } from 'lodash-es';
import { useFormValues } from './hooks/useFormValues';
import { useFormEvents } from './hooks/useFormEvents';
import useAdvanced from './hooks/useAdvanced';
import { FormActionType, FormSchema,AdvanceState,FormProps } from './types/form';
import {basicProps} from './props';
import { deepMerge } from '@/utils';

const schemaRef = ref<Nullable<FormSchema[]>>(null);
const formElRef = ref<Nullable<FormActionType>>(null); 
const IsIniteDefaultRef=ref<boolean>(false);
const propsRef = ref<Partial<FormProps>>({});
const defaultValueRef = ref<Recordable>({});
const slots = useSlots();
const emit=defineEmits(['register','field-value-change','submit']);
const formModel = reactive<Recordable>({filename:"测试文件名"});

const advanceState = reactive<AdvanceState>({
  isAdvanced: true,
  hideAdvanceBtn:false,
  isLoad:false,
  actionSpan:6,
}); 


const props= defineProps(basicProps);
const attrs = useAttrs();

const getProps=computed(():FormProps=>{
  return {...props,...unref(propsRef)} as FormProps;
});


const getRow = computed(()=>{
  const {baseRowStyle = {},rowProps} = unref(getProps);
  return {
    style:baseRowStyle,
    ...rowProps,
  };
});

const getBindValue = computed(()=>({
...attrs,
...props,
...unref(getProps),
} as Recordable));

const getSchema = computed(():FormSchema[]=>{
  const schemas:FormSchema[] = unref(schemaRef)||(unref(getProps).schemas as any);
  console.log('getSchema:schemas',schemas);
  for(const schema of schemas){
    const {defaultValue,component,isHandleDateDefaultValue= true}=schema;
    // handle date type
    if(isHandleDateDefaultValue && defaultValue && dateItemType.includes(component)){
      if(!Array.isArray(defaultValue)){
        schema.defaultValue = dayjs(defaultValue);
      }else{
        const def: any[] =[];
        defaultValue.forEach(item=>{
          def.push(dayjs(item));
        });
        schema.deaultValue=def;
      }
    }

  }  
  if(unref(getProps).showAdvancedButton){
    return cloneDeep(schemas.filter((schema)=> schema.component!=='ElDivider') as FormSchema[]);
  }else {
    return cloneDeep(schemas as FormSchema[] );
  }
});
const {handleToggleAdvanced ,fieldsIsAdvancedMap} = useAdvanced({
  advanceState,
  emit,
  getProps,
  getSchema,
  formModel,
  defaultValueRef,
});

const {handleFormValues,initDefault} = useFormValues({
  getProps,
  defaultValueRef,
  getSchema,
  formModel,
});

const {
  handleSubmit,
  setFieldsValue,
  getFieldsValue,
  resetFields,  
  clearValidate,
  validate,
  validateFields, 
  updateSchema,
  resetSchema,
  appendSchemaByField,
  removeSchemaByField,
  scrollToField,
  
} = useFormEvents({
emit,
getProps,
formModel,
getSchema,
defaultValueRef,
formElRef:formElRef as Ref<FormActionType>,
schemaRef: schemaRef as Ref<FormSchema[]>,
handleFormValues,
});

watch(()=>unref(getProps).schemas,(schemas)=>{
  resetSchema(schemas??[]);
});

watch(()=>unref(getProps).model,
()=>{
  const {model}= unref(getProps);
  if(!model) return; 
  console.log("modle",model);
  setFieldsValue(model);
},{
  immediate:true,
},
);

watch(()=>unref(getSchema),(schemas)=>{
 /*  nextTick(()=>{
    //  Solve the problem of modal adaptive height calculation when the form is placed in the modal
    //modalFn?.redoModalHeight?.()
  }) */
  if(unref(IsIniteDefaultRef)){
    return; 
  }
  if(schemas?.length){
    initDefault();
    IsIniteDefaultRef.value=true;
  }

});



async function setProps(formProps:Partial<FormProps>):Promise<void>{
  console.log("formProps",formProps);
  propsRef.value = deepMerge(unref(propsRef)||{},formProps);
}

function setFormModel(key:string,value:any,schema:FormSchema){
  formModel[key]= value;
  emit('field-value-change',key,value);
}

const formActionType:Partial<FormActionType>={
 getFieldsValue,
 setFieldsValue,
 resetFields,
 updateSchema,
 resetSchema,
 setProps,
 removeSchemaByField,
 appendSchemaByField,
 clearValidate,
 validateFields,
 validate,
 submit:handleSubmit,
 scrollToField,
};
onMounted(()=>{
  initDefault();
  emit('register',formActionType);
});
</script>
  
<style>
  
</style>