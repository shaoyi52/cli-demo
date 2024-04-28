<template>
  <div class="p-2">
    <VFormDesigner
      ref="vfr"
      :designer-config="designerConfig"
      :global-dsv="globalDsv"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, provide } from 'vue';
import {list, updateView} from "@/api/system/view";
import { useRoute} from 'vue-router';
const route = useRoute();
const designerConfig ={
  logoHeader: false,
};
const vfr = ref();
const globalDsv = {
  testApiHost: 'http://www.test.com/api',
  baseApi: 'http://t.zhengjixny.com/prod-api',
  headers: {
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiJzeXNfdXNlcjoxIiwicm5TdHIiOiJ1SHMxWDdSVVl4VmNINk9mS2FGcWVRMzlaQjQyZjhJWCIsImNsaWVudGlkIjoiZTVjZDdlNDg5MWJmOTVkMWQxOTIwNmNlMjRhN2IzMmUiLCJ0ZW5hbnRJZCI6IjAwMDAwMCIsInVzZXJJZCI6MSwiZGVwdElkIjoxMDN9.ZSwPh6jVG8a20-ULqwlxH01s-a1CJlJSs5GguaweK4Q",
    "clientid": "e5cd7e4891bf95d1d19206ce24a7b32e",
    "Content-Type": "application/json",
  },
};
onMounted(() => {
  getList();
});

const getList =() => {
const id = route.query && route.query.id;
  list({id}).then(res => {
    if(res?.componentCfg){
      vfr.value.setFormJson(JSON.parse(res.componentCfg));
    }
    console.log("res",res);

  });
};
const saveJson = async(res) => {
  console.log("ts saveJson", res);
  const id = route.query && route.query.id;

  let params={id,componentCfg:JSON.stringify(res)};
  await updateView(params);
};
provide('submitJson', saveJson);
</script>

<style></style>
