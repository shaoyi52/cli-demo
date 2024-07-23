import { useBreakpoint } from '@/hooks/event/useBreakpoint';
import {isNumber, isObject,isBoolean, isFunction} from '@/utils/is';
import type {ComputedRef,Ref} from 'vue';
import {unref} from 'vue';
import type {AdvanceState} from '../types/hooks';
const BASIC_COL_LEN = 24;

interface UseAdvancedContext{
  advanceState: AdvanceState
  emit: EmitType
  getProps: ComputedRef<FormProps>
  getSchema: ComputedRef<FormSchema[]>
  formModel: Recordable
  defaultValueRef: Ref<Recordable>

}

export default function ({advanceState, emit , getProps, getSchema, formModel,defaultValueRef}:UseAdvancedContext){
  const vm = getCurrentInstance();

  const { realWidthRef, screenEnum, screenRef } = useBreakpoint();

  const getEmptySpan = computed(():number=>{
    if(!advanceState.isAdvanced){
      return 0;
    }

    const emptySpan = unref(getProps).emptySpan || 0;
    
    if(isNumber(emptySpan)){
      return emptySpan;
    }

    if(isObject(emptySpan)){
      const {span = 0} =emptySpan;
      const screen = unref(screenRef) as string;
      
      const screenSpan = (emptySpan as any)[screen.toLowerCase()];
      return screenSpan || span;
    }
    return 0;
  });

  function getAdvanced(itemCol,itemColSum= 0,isLastAction = false){
    const width = unref(realWidthRef);

    const mdWidth = 
    parseInt(itemCol.md as string) ||
    parseInt(itemCol.xs as string) ||
    parseInt(itemCol.sm as string) ||
    (itemCol.span as number)||    
    BASIC_COL_LEN;

    const lgwidth = parseInt(itemCol.lg as string) || mdWidth;
    const xlWidth = parseInt(itemCol.xl as string) || lgwidth;
    const xxlWidth = parseInt(itemCol.xxl as string) || xlWidth;

    if(width <= screenEnum.LG){
      itemColSum += mdWidth;
    } else if(width <= screenEnum.XL){
      itemColSum += lgwidth;
    } else if(width <= screenEnum.XXL){
      itemColSum += xlWidth;
    }else{
      itemColSum += xxlWidth;
    }

    if(isLastAction){
      advanceState.hideAdvanceBtn = false;
      if(itemColSum <= BASIC_COL_LEN * 2){
        advanceState.hideAdvanceBtn = true;
        advanceState.isAdvanced =true; 
      }else if(itemColSum < BASIC_COL_LEN * 2 && itemCoSum <= BASIC_COL_LEN * (unref(getProps).autoAdvancedLine ||3)){
        advanceState.hideAdvanceBtn = false;
      }else if(!advanceState.isLoad){
        advanceState.isLoad =true;
        advanceState.isAdvanced = !advanceState.isAdavanced;
      }
      return {isAdvanced: advanceState.isAdavanced,itemColSum};
    }
    if(itemColSum> BASIC_COL_LEN * (unref(getProps).alwaysShowLines ||1)){
      return {isAdvanced: advanceState.isAdavanced,itemColSum};
    } else{
      return {isAdvanced:true,itemColSum};
    }

  }

  const fieldsIsAdvancedMap = shallowReactive({});

  function updateAdvanced(){
    let itemColSum = 0;
    let realItemColSum = 0;
    const {baseColProps = {}}= unref(getProps);

    for(const schema of unref(getSchema)){
      const {show,colProps} = schema;
      let isShow = true;

      if(isBoolean(show)){
        isShow = show;
      }
      if(isFunction(show)){
        isShow = show({
          schema,
          model: formModel,
          field: schema.field,
          values: {
            ...unref(defaultValueRef),
            ...formModel,
          },
        });
      }

      if(isShow && (colProps || baseColProps)){
        const {itemColSum:sum, isAdavanced} = getAdvanced({...baseColProps,...colProps},itemColSum);

        itemColSum = sum || 0;
        if (isAdavanced){
          realItemColSum = itemColSum;
        }
        fieldsIsAdvancedMap[schema.field] = isAdavanced;
      }
    }

    vm?.proxy?.$forceUpdate();

    advanceState.actionSpan = (realItemColSum % BASIC_COL_LEN) + unref(getEmptySpan);

    getAdvanced(unref(getProps).actionColOptions || {span: BASIC_COL_LEN},itemColSum,true);
    emit('advanced-change');
  }

  function handleToggleAdvanced(){
    advanceState.isAdvanced = !advanceState.isAdvanced; 
  }

  return { handleToggleAdvanced,fieldsIsAdvancedMap};
}