<template>
  <div :class="headerCls">
    <div class="headerWrapperCls">
      <div v-if="showAvatar" class="headerAvatarCls" />
      <div>
        <div v-if="$slots.title || title" class="headerTitleCls">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <div v-if="$slots.subTitle || subTitle" class="card__subtitle">
          <slot name="subTitle">
            {{ subTitle }}
          </slot>
        </div>
        <div v-if="$slots.description || description" class="headerTitleCls">
          <slot name="description">
            {{ description }}
          </slot>
        </div>
      </div>     
    </div>
    
    <div v-if="$slots.status || status" class="actionsCls">
      <slot name="status">
        {{ status }}
      </slot>
    </div>
    <div v-if="$slots.actions || actions" class="actionsCls">
      <slot name="actions">
        {{ actions }}
      </slot>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
  //import {computed,getCurrentInstance,useSlots } from 'vue';  
  import {computed } from 'vue'; 
  //const instance=getCurrentInstance();
  //const slots = useSlots();
  const props=defineProps({
    title:{
      type:String,
      default:'',
    },
    subTitle:{
      type:String,
      default:'',
    },
    headerBorder:{
      type:Boolean,
      default:false,
    },
  });
  //const showTitle = computed(() => props.title || slots.title);

  //const showSubtitle = computed(() => props.subTitle || slots.subtitle);

/*   const showSubtitle = computed(() => instance?.props.subtitle || instance?.slots.subtitle);
  const showAvatar =computed(()=>{
    return instance?.props.avatar||instance?.slots.avatar;
  });
  const showDescription = computed(() => instance?.props.description || instance?.slots.description);
  const showStatus = computed(() => instance?.props.status || instance?.slots.status);
  const showActions = computed(() => instance?.props.actions || instance?.slots.actions); */
  const headerCls= computed(()=>{
    const defaultClass=['card__header'];
    return props.headerBorder
    ? defaultClass.concat('card__title--bordered')
    :['card__header'];
  }); 
</script>
  
<style lang="scss" scoped>
  .card__header{
    display: flex;
    justify-content: space-between;
    align-items:center;
  }
  .card__subtitle{
    font:var(--el-font-size-medium);
    color:var(--el-text-color-secondary)
  }
</style>