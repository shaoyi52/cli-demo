<template>
  <Component
    :is="component"
    :class="[attrs.class, mergedCls]"
    :style="[attrs.style,mergedStyle]"
  >
    <slot />
  </Component>
</template>
  
<script name="Flex" setup lang='ts'>
import { computed, inject,useAttrs } from 'vue';
import type { CSSProperties } from 'vue';
import createFlexClassNames from './utils';
import {isPresetSize} from '../_util/gapSize';
// 使用 useAttrs 获取剩余的属性
  const attrs = useAttrs();
//import type { PropType} from 'vue';
  const defaultIconPrefixCls = 'anticon';
  const configProviderKey=Symbol('configProvider');
  const defaultConfigProvider={
    getPrefixCls:(suffixCls,customizePrefixCls)=>{
      if(customizePrefixCls) return customizePrefixCls;
      return suffixCls?`ant-${suffixCls}`:'ant';
    },
    iconPrefixCls:computed(()=> defaultIconPrefixCls ),
    getPopupContainer:computed(()=>document.body),
    direction:computed(()=>'ltr'),
  };
  const props=defineProps({   
    prefixCls:{
      type:String,
      default:'ant-flex',
    },
    direction:{
      type:String,
      default:'',
    },
    vertical:{
      type:String,
    },
    wrap:{
      type:String,
    },
    justify:{
      type:String,
      default:'justify-content',
    },
    align:{
      type:String,
      default:'align-items',
    },
    /* flex:{
      type:[Number,String],      
    },  */   
    gap:{
      type:[Number,String],
    },  
    component:  {
      type:[String],
      default:'div',
    },  
    /* component:{
      type:type as PropType<any>,
    }, */
  });

  const useConfigContextInject=()=>{
    return inject(configProviderKey,defaultConfigProvider);
  };
  const mergedCls = computed(()=>[
  props.prefixCls,
  createFlexClassNames(props.prefixCls, props),
  {
    [`${props.prefixCls}-rtl`]:props.direction==='rtl',
    [`${props.prefixCls}-gap-${props.gap}`]:['small', 'middle', 'large'].includes(props.gap?.toString()||''),
    [`${props.prefixCls}-vertical`]:props.vertical??false,
  },
  ]);
  let mergedStyle:CSSProperties={};
  if (props.gap && !isPresetSize(props.gap)) {
        mergedStyle.gap = `${props.gap}px`;
      }
  //console.log('flex, direction',flex, direction);

</script>
  
<style lang="scss" scoped>
 .ant-flex{
  display: flex;
  &-vertical{
    flex-direction:'column'
  }
  &-rtl{
    direction: 'rtl'
  }
  &:empty{
    display: 'none';
  }

  &-gap-small{
    gap:10px
  }
  &-gap-midddle{
    gap:20px
  }
  &-gap-large{
    gap:30px
  }

  &-wrap-nowrap{
    flex-wrap:nowrap
  }
  &-wrap-wrap{
    flex-wrap:wrap
  }
  &-wrap-wrap-reverse{
    flex-wrap:wrap-reverse
  }

  &-align-stretch{
    align-items:stretch
  }
  &-align-flex-start{
    align-items:flex-start
  }
  &-align-flex-end{
    align-items:flex-end
  }
  &-align-center{
    align-items:center
  }
  &-align-flex-baseline{
    align-items:baseline
  }

  &-justify-flex-start{
    justify-content:flex-start
  }
  &-justify-flex-end{
    justify-content:flex-end
  }
  &-justify-center{
    justify-content:center
  }
  &-justify-space-between{
    justify-content:space-between
  }
  &-justify-space-around{
    justify-content:space-around
  }
  &-justify-space-evenly{
    justify-content:space-evenly
  }
 }
  
</style>