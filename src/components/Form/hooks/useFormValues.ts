import { unref } from "vue";
import {  isFunction, isObject,isString,isNullOrUnDef,isArray} from "@/utils/is";
import { cloneDeep,set } from 'lodash-es'; 

function tryDeconstructArray(key,value,target){
  const pattern = /^\[(.+)\]$/;
  if(pattern.test(key)){
    const match=key.match(pattern);
    if(match && match[1]){
      const keys= match[1].split(',');
      value = Array.isArray(value) ? value : [value];
      keys.forEach((k,index) => {
        set(target,k.trim(),value[index]);
      });
      return true;
    }
  }
}

function tryDeconstructObject(key,value,target){
  const pattern = /^\{(.+)\}$/;
  if(pattern.test(key)){
    const match=key.match(pattern);
    if(match&&match[1]){
      const keys=match[1].split(',');
      value = isObject(value)?value:{};
      keys.forEach(k=>{
        set(target,k.trim(),value[k.trim()]);
      });
      return true;
    }
  }
}

export function useFormValues({defaultValueRef,getSchema,formModel,getProps}){
  function handleFormValues(values){
    if(!isObject(values)){
      return {};
    }
  
    const res={};
    for (const item of Object.entries(values)){
      let [,value] = item;
      const [key]=item;
      if(!key || (isArray(value) && value.length === 0)||isFunction(value)){
        continue;
      }
      const transformDateFunc = unref(getProps).transformDateFunc;
      if(isObject(value)){
        value = transformDateFunc?.(value);
      }

      if(isArray(value)&& value[0]?.format && value[1]?.format){
        value = value.map(item=>transformDateFunc?.(item));
      }

      // Remove spaces 
      if (isString(value)){
        if(value === ''){
          value = undefined;
        }else{
          value= value.trim();
        }        
      }
      if(!tryDeconstructArray(key,value,res) && !tryDeconstructObject(key,value,res)){
        // 没有解构成功的，按原样赋值
        set(res,key,value);
      }

      
    }
    return handleRangeTimeValue(res);
    
  }

  function handleRangeTimeValue(values){
    const fieldMapToTime = unref(getProps).fieldMapToTime;

    if(!fieldMapToTime ||!Array.isArray(fieldMapToTime)){
      return values;
    }

    for( const [field,[startTimeKey,endTimeKey],format = 'YYYY-MM-DD'] of fieldMapToTime){
      if(!field||!startTimeKey || !endTimeKey){
        continue;
      }
      if(!values[field]){
        Reflect.deleteProperty(values,field);
        continue;
      }

      const [startTime,endTime]= values[field];
      
      const [startTimeFormat,endTimeFormat]=Array.isArray(format)?format:[format,format];

      values[startTimeKey] = dateUtil(startTime).format(startTimeFormat);
      values[endTimeKey] = dateUtil(endTime).format(endTimeFormat);
      Reflect.deleteProperty(values,field);
    }
    return values;
  }

  function initDefault(){
    const schemas = unref(getSchema);
    const obj = {};
    console.log('initDefault',schemas);
    schemas.forEach(item=>{
      const { defaultValue } = item;
      if(!isNullOrUnDef(defaultValue)){
        obj[item.field] = defaultValue;

        if(formModel[item.field] === undefined){
          formModel[item.field]=defaultValue;
        }

      }
    });
    defaultValueRef.value = cloneDeep(obj);
  }

  return {handleFormValues,initDefault };
}