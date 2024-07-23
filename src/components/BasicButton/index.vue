<template>
  <el-button v-bind="getBindValue" :calss="getButtonClass" @click="onClick">
    <template #default="data">
      <svg-icon v-if="preIcon" icon-class="message" />
      <slot v-bind="data||{}" />
      <svg-icon v-if="postIcon" icon-class="message" />
    </template>
  </el-button>
</template>
  
<script setup lang='ts'>
import { computed, unref } from 'vue';
import { useAttrs } from '@/hooks/core/useAttrs';
import { debounce } from 'lodash';
const emit = defineEmits(['click']);

const props = defineProps({
  color: {
    type: String,
    default: '',
  },
  loading: { type: Boolean },
  disabled: { type: Boolean },
  /**
   * Text before icon.
   */
  preIcon: { type: String },
  /**
   * Text after icon.
   */
  postIcon: { type: String },
  /**
   * preIcon and postIcon icon size.
   * @default: 14
   */
  iconSize: { type: Number, default: 14 },
  onClick: { type: Function , default: null },
});
const attrs = useAttrs({ excludeDefaultKeys: false});
const getButtonClass = computed(()=>{
  const { color, disabled } =props;
  return [{
      [`btn-${color}`]:!!color,
      [`is-disabled`]:disabled,
  }];
});

const getBindValue = computed(()=>({...unref(attrs),...props}));
</script>
  
<style>
  
</style>