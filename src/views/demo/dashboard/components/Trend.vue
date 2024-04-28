<template>
  <span :class="containerCls">
    <span :class="iconCls">      
      <el-icon v-if="type === 'down'"><Bottom /></el-icon>    
      <el-icon v-else><Top /></el-icon>
    </span>
    <span>{{ describe }}</span>
  </span>
</template>

<script setup lang='ts' name="Trend">
import {computed} from 'vue';
const props=defineProps({
  type: String,
  describe: [String, Number],
  isReverseColor: Boolean,
}); 
const iconCls = computed(()=>{
  return ['trend-icon-container'];
});
const containerCls = computed(()=>{
  return [
        'trend-container',
        {
          'trend-container__reverse': props.isReverseColor,
          'trend-container__up': !props.isReverseColor && props.type === 'up',
          'trend-container__down': !props.isReverseColor && props.type === 'down',
        },
      ];
});
</script>

<style lang="scss" scoped>
.trend {
  &-container {
    .trend-icon-container {
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
    }
    &__down {
      color: var(--el-color-success-dark-2);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      .trend-icon-container {
        background: var(--el-color-success-light-7);
        margin-right: 8px;
      }
    }
    &__up {
      color: var(--el-color-error);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      .trend-icon-container {
        background: var(--el-color-error-light-9);
        margin-right: 8px;
      }
    }
    &__reverse {
      color: #ffffff;
      display: inline-flex;
      align-items: center;
      justify-content: center;

      .trend-icon-container {
        background: var(--el-color-primary-light-5);
        margin-right: 8px;
      }
    }
  }
}
</style>