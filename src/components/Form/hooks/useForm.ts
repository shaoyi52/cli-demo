import type { FormActionType, FormSchema,FormProps,UseFormReturnType } from "../types/form";
import {ref, onUnmounted,unref,nextTick,watch} from 'vue';
import {error} from '@/utils/log';
import {getDynamicProps} from "@/utils/index";
export function useForm(props:Partial<FormProps>):UseFormReturnType{
  const formRef = ref<Nullable<FormActionType>>(null);
  const loadedRef = ref<Nullable<boolean>>(null);

  async function getForm(){
    const form = unref(formRef);
    if(!form){
      error('The form instance has not been obtained,please make sure that the form had been rendered when performing the form operation');
    }
    await nextTick();
    return form as FormActionType;
  }

  function register(instance:FormActionType){
    onUnmounted(()=>{
      formRef.value = null;
      loadedRef.value=null;
    });
    if(unref(loadedRef)&&instance === unref(formRef)) return;

    formRef.value = instance;
    loadedRef.value = true;

    watch(()=>props,()=>{
      props && instance.setProps(getDynamicProps(props));
    },{
      immediate:true,
      deep:true,
    });
  }

  const methods:FormActionType ={
    scrollToField: async( name,options)=>{
      const form = await getForm();
      form.scrollToField(name,options);
    },

    setProps: async(formProps)=>{
      const form = await getForm();
      form.setProps(formProps);
    },
    
    updateSchema: async(data)=>{
      const form = await getForm();
      form.updateSchema(data);
    },

    resetSchema: async(data)=>{
      const form = await getForm();
      form.resetSchema(data);
    },

    clearValidate:async(name)=>{
      const form = await getForm();
      form.clearValidate(name);
    },

    resetFields: async()=>{
      getForm().then(async(form)=>{
        await form.resetFields();
      });
    },

    removeSchemaByField: async(field:string|string[])=>{
      unref(formRef)?.removeSchemaByField(field);
    },

    getFieldsValue:<T>()=>{
      return unref(formRef)?.getFieldsValue() as T;
    },

    setFieldsValue: async (values:Recordable)=>{
      const form = await getForm();
      form.setFieldsValue(values);
    },

    appendSchemaByField: async(schema:FormSchema | FormSchema[],prefixField:string|undefined,first?:boolean)=>{
      const form = await getForm();
      form.appendSchemaByField(schema,prefixField,first);
    },

    submit: async():Promise<any>=>{
      const form = await getForm();
      return form.submit();
    },

    validate: async()=>{
      const form = await getForm();
      return form.validate();
    },

    validateFields:async(nameList)=> {
      const form = await getForm();
      return form.validateFields(nameList);
    },

  };

  return [register,methods];

}