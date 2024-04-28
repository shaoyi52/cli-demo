<template>
  <span :class="ns.e('item')">
    <span ref="link" :class="[ns.e('inner'),ns.is('link',!!to)]"></span>
  </span>
</template>

<script setup lang="ts">
import { breadcrumbKey, useNamespace } from 'element-plus';
import { breadcrumbItemProps } from './breadcrumb-item';
import { getCurrentInstance,inject,ref } from 'vue';
import { Router } from 'vue-router';

defineOptions({
    name:'ElBreadcrumbItem',
})

const props = defineProps(breadcrumbItemProps)
const instance =getCurrentInstance()!
const breadcrumbContext = inject(breadcrumbKey,undefined)
const ns =useNamespace("breadcrumb")
const router = instance.appContext.config.globalProperties.$router as Router

const link = ref<HTMLSpanElement>()

const onClick = () =>{
    if(!props.to||!router) return
    props.replace?router.replace(props.to):router.push(props.to)
}
</script>

<style></style>
