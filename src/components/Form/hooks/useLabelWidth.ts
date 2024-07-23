import { computed, unref} from 'vue';
import { isNumber } from '@/utils/is';
export function useItemLabelWidth(schemaItemRef,propsRef){
  return computed(() => {
    const schemaItem = unref(schemaItemRef);
    const { labelCol = {}, wrapperCol = {}} = schemaItem.itemProps || {};
    const { labelWidth, disabledLabelWidth } = schemaItem;

    const { labelWidth: globalLabelWidth, labelCol: globalLabelCol, wrapperCol: globalWrapperCol, layout} =unref(propsRef);
  
    if((!globalLabelWidth&&!labelWidth&&!globalLabelCol) || disabledLabelWidth){
      labelCol.style ={
        textAlign:'left',
      };
      return {labelCol, wrapperCol};
    }
    let width= labelWidth || globalLabelWidth;
    const col = { ...globalLabelCol,...labelCol };
    const wrapCol = {...globalWrapperCol,...wrapperCol};

    if(width){
      width = isNumber(width)? `${width}px` : width;
    }

    return {
      labelCol:{style:{width},...col},
      wrapperCol:{
        style:{width: layout ==='vertical'?'100%':`calc(100% - ${width})`},
        ...wrapCol,
      },
    };

  });
}