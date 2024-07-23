import type {ComputedRef,Ref} from 'vue';
import {unref,nextTick,toRaw} from 'vue';
import {cloneDeep,get,set,uniqBy} from 'lodash-es';
import { isFunction,isDef,isString,isObject,isArray,isNullOrUnDef, isEmpty} from '@/utils/is';
import dayjs from 'dayjs';
import {error} from '@/utils/log';
import {deepMerge} from '@/utils/index';
import type {FormSchema,FormProps,FormActionType, NamePath} from '../types/form';

interface UseFormActionContent{
  emit:EmitType,
  getProps:ComputedRef<FormProps>
  getSchema:ComputedRef<FormSchema[]>
  formModel:Recordable
  defaultValueRef:Ref<Recordable>
  formElRef:Ref<FormActionType>
  schemaRef:Ref<FormSchema[]>
  handleFormValues: Fn
}

export function useFormEvents({
  emit,
  getProps,
  formModel,
  getSchema,
  defaultValueRef,
  formElRef,
  schemaRef,
  handleFormValues,
}:UseFormActionContent){
  const defaultValueComponents:Array<string> = ['Input', 'InputPassword', 'InputSearch', 'InputTextArea'];
  const dateItemType=['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker','RangePicker'];
 
  async function appendSchemaByField(schema,prefixField,first = false){
    const schemaList=cloneDeep(unref(getSchema));

    const index=schemaList.find(schema=> schema.field===prefixField);
    const _schemaList=isObject(schema)?[schema]:schema;
    if(!prefixField || index===-1 ||first){
      first?schemaList.unshift(..._schemaList):schemaList.push(..._schemaList);
      schemaRef.value =schemaList;
      _setDefaultValue(schema);
      return; 
    }

    if(index !== -1){
      schemaList.splice(index+1,0,..._schemaList);
    }
    schemaRef.value =schemaList;
    _setDefaultValue(schema);
  }
  async function resetSchema(data:Partial<FormSchema>|Partial<FormSchema>[]){
    let updateData:Partial<FormSchema>[]=[];
    if(isArray(data)){
      updateData=[...data];
    }
    if(isObject(data)){
      updateData.push(data as FormSchema);
    }
    const hasField=updateData.every((item)=>item.component==='ElDivider'|| (Reflect.has(item,'field')&&item.field));
    if (!hasField) {
      error('All children of the form Schema array that need to be updated must contain the `field` field');
      return;
    }
    schemaRef.value = updateData as FormSchema[];
  }
  async function updateSchema(data){
    let updateData=[];
    if(isObject(data)){
      updateData.push(data);
    }
    if(isArray(data)){
      updateData=[...data];
    }

    const hasField = updateData.every(item=>item.component ==='Divider' || (Reflect.has(item,'field')&&item.field));
    if(!hasField){
      error('All children of the from Schema array that need to bo updated  must contain the "field" field');
    }
    const schema =[];
    unref(getSchema).forEach(val=>{
      let _val;
      updateData.forEach(item=>{
        if(item.field === val.field){
          _val=item;
        }
      });

      if(_val !== undefined && val.field ===_val.field){
        const newSchema= deepMerge(val,_val);
        schema.push(newSchema);
      }else{
        schema.push(val);
      }
    });

    _setDefaultValue(schema);

    //去重
    schemaRef.value = uniqBy(schema,'field');
  }

  async function removeSchemaByField(fields){
    const schemaList = cloneDeep(unref(getSchema));
    if(!fields){
      return;
    }
    
    const fieldList= isString[fields]?[fields]:fields;
    for(const field of fieldList){
      _removeSchemaByField(field,schemaList);
    }
    schemaRef.value=schemaList;
    
  }

  function _removeSchemaByField(field,schemaList){
    const index=schemaList.findIndex(schema=>schema.field===field);
    if(index!==-1){
      delete formModel[field];
      schemaList.splice(index,1);
    }
    
  }

  async function resetFields(){
    const {resetFunc,submitOnReset}= unref(getProps);
    resetFunc &&　isFunction(resetFunc)&&(await resetFunc());
    
    const formEl = unref(formElRef);
    if(!formEl) return;
    Object.keys(formModel).forEach((key)=>{
      const schema= unref(getSchema).find(item=>item.field===key);
      const isInput = schema?.component&& defaultValueComponents.includes(schema.component);
      const defaultValue =cloneDeep(defaultValueRef.value[key]);
      formModel[key]=isInput?defaultValue||'':defaultValue;
    });
    nextTick(()=> clearValidate());
    
    emit('reset',toRaw(formModel));
    submitOnReset && handleSubmit();
  }
  /**
   * 
   * @description: Set form value 
   */
  async function setFieldsValue(values){
    const fields = unref(getSchema)
    .map(item=> item.field)
    .filter(Boolean);

    //key 支持 a.b.c 的嵌套写法
    const delimiter = '.';
    const nestKeyArray=fields.filter(item=>String(item).indexOf(delimiter)>=0);
    
    const validKeys: string[] =[];
    fields.forEach((key)=>{
      const schema = unref(getSchema).find(item=> item.field ===key);
      const value = get(values,key);
      const hasKey = !!get(values,key);

      const {componentProps} =schema||{};
      let _props = componentProps as any;
      if(typeof componentProps === 'function'){
        _props = _props({formModel: unref(formModel)});
      }

      const constructValue = tryConstructArray(key,values) ||tryConstructObject(key,values);

      if (hasKey || !!constructValue){
        const fieldValue = constructValue||value;

        // time type
        if(itemIsDateType(key)){
          if(Array.isArray(fieldValue)){
            const arr=[];
            for(const ele of fieldValue){
              arr.push(ele?dayjs(ele):null);
            }
            unref(formModel)[key]=arr;
          }else{
            unref(formModel)[key]=fieldValue?(_props?.valueFormat? fieldValue: dayjs(fieldValue)):null;
          }
        }else{
          unref(formModel)[key]=fieldValue;
        }
        if(_props?.onChange){
          _props.onChange(fieldValue);
        }
        validKeys.push(key);
      }else{
        nestKeyArray.forEach((nestKey:string)=>{
          try{
            const value = nestKey.split('.').reduce((out,item)=>out[item],values);
            if(isDef(value)){
              unref(formModel)[nestKey] = unref(value);
              validKeys.push(value);
            }
          } catch(e){
            if(isDef(defaultValueRef.value[nestKey])){
              unref(formModel)[nestKey] = cloneDeep(unref(defaultValueRef.value[nestKey]));
            }
          }
        });
      }
    });
    validateFields(validKeys).catch((msg)=>{});
  }

  async function handleSubmit(e?:Event):Promise<void>{
    e && e.preventDefault();
    console.log('handleSubmit');
    const { submitFunc } = unref(getProps);
    if(submitFunc&& isFunction(submitFunc)){
      await submitFunc();
      return ;
    }

    const formEl = unref(formElRef);
    if(!formEl) return; 
    try {
      const values = await validate();
      if(values){
        const res = getFieldsValue();
        emit('submit',res);
      }      
    } catch (error:any){
      if(error?.outOfDate === false && error?.errorFields){
        return;
      }
      throw new Error(error);
    }
  }



  function _setDefaultValue(data){
    let schemas=[];
    if(isObject(data)){
      schemas.push(data);
    }
    if(isArray(data)){
      schemas=[...data];
    }

    const obj={};
    const currentFieldsValue = getFieldsValue();
    schemas.forEach((item)=>{
      if(
        item.component!='Divider' && 
        Reflect.has(item,'field') &&
        item.field&&
        !isNullOrUnDef(item.defaultValue)&&
        (!(item.field in currentFieldsValue))||
        isNullOrUnDef(currentFieldsValue[item.field])||
        isEmpty(currentFieldsValue[item.field])
      ){
        obj[item.field] = item.defaultValue;
      }
    });

    setFieldsValue(obj);
  }

  function getFieldsValue(){
    const formEl =unref(formElRef);
    if(!formEl) return {};
    return handleFormValues(toRaw(unref(formModel)));
  }

  async function scrollToField(name,options){
    await unref(formElRef).scrollToField(name.options);
  }
  
  async function clearValidate(name?: string | string[]| undefined){
    await unref(formElRef)?.clearValidate(name);
  }

  async function validateFields(nameList){
    return unref(formElRef)?.validateFields(nameList);
  }

  async function validate(){
     return unref(formElRef)?.validate();
  }

  // eslint-disable-next-line no-undef
  function tryConstructArray(field:string,value: Recordable ={}){
    const pattern = /^\[(.+)\]$/;
    if (pattern.test(field)){
      const match = field.match(pattern);
      if(match && match[1]){
        const keys = match[1].split(',');
        if(!keys.length){
          return undefined;
        }

        const result = [];
        keys.forEach((k,index)=>{
          set(result,index,value[k.trim()]);
        });

        return result.length ? result:undefined;
      }
    }
    return undefined;
  }

  function tryConstructObject(field: string, values){
    const pattern = /^\{(.+)\}$/;
    if(pattern.test(field)){
      const match = field.match(pattern);
      if(match && match[1]){
        const keys = match[1].split(',');
        if(!keys.length){
          return; 
        }

        const result={};
        keys.forEach(k=>{
          set(result,k.trim(),values[k.trim()]);
        });
        return Object.values(result).filter(Boolean).length?result:undefined;
      }
    }
  }

  function itemIsDateType(key){
    return unref(getSchema).some(item=>{
      return item.field ===key ? dateItemType.includes(item.component):false;
    });
  }

 
  

  return {
    handleSubmit,
    clearValidate,
    validate,
    validateFields,
    getFieldsValue,
    resetFields, 
    setFieldsValue,    
    updateSchema,
    resetSchema,
    appendSchemaByField,
    removeSchemaByField,
    scrollToField,
  };
}