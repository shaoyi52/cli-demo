<template>
  <div class="p-2">
    <v-form-render :form-json="formJson" :form-data="formData" :option-data="optionData" ref="vFormRef"> </v-form-render>
  </div>
</template>
<script setup name="dyanmicTable" lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { list } from "@/api/system/view";

let formJson = ref({
  "widgetList": [],
  "formConfig": {}
});
const vFormRef = ref();
let formData = reactive({});
const optionData = reactive({});
const getList = () => {
  //const id = route.query && route.query.id;
  console.log('vFormRef', vFormRef)
  list({ id: 1 }).then(res => {
    if (res?.componentCfg) {
      let componentCfg = JSON.parse(JSON.parse(res.componentCfg));
      console.log(componentCfg)
      formJson.value.widgetList = [
        {
          "key": 56786,
          "type": "input",
          "icon": "text-field",
          "formItemFlag": true,
          "options": {
            "name": "input99742",
            "label": "input",
            "labelAlign": "",
            "type": "text",
            "defaultValue": "",
            "placeholder": "",
            "columnWidth": "200px",
            "size": "",
            "labelWidth": null,
            "labelHidden": false,
            "readonly": false,
            "disabled": false,
            "hidden": false,
            "clearable": true,
            "showPassword": false,
            "required": false,
            "requiredHint": "",
            "validation": "",
            "validationHint": "",
            "customClass": [],
            "labelIconClass": null,
            "labelIconPosition": "rear",
            "labelTooltip": null,
            "minLength": null,
            "maxLength": null,
            "showWordLimit": false,
            "prefixIcon": "",
            "suffixIcon": "",
            "appendButton": false,
            "appendButtonDisabled": false,
            "buttonIcon": "custom-search",
            "onCreated": "",
            "onMounted": "",
            "onInput": "",
            "onChange": "",
            "onFocus": "",
            "onBlur": "",
            "onValidate": ""
          },
          "id": "input99742"
        },
        {
          "key": 18874,
          "type": "textarea",
          "icon": "textarea-field",
          "formItemFlag": true,
          "options": {
            "name": "textarea99679",
            "label": "textarea",
            "labelAlign": "",
            "rows": 3,
            "defaultValue": "",
            "placeholder": "",
            "columnWidth": "200px",
            "size": "",
            "labelWidth": null,
            "labelHidden": false,
            "readonly": false,
            "disabled": false,
            "hidden": false,
            "required": false,
            "requiredHint": "",
            "validation": "",
            "validationHint": "",
            "customClass": "",
            "labelIconClass": null,
            "labelIconPosition": "rear",
            "labelTooltip": null,
            "minLength": null,
            "maxLength": null,
            "showWordLimit": false,
            "onCreated": "",
            "onMounted": "",
            "onInput": "",
            "onChange": "",
            "onFocus": "",
            "onBlur": "",
            "onValidate": ""
          },
          "id": "textarea99679"
        },

      ],
        formJson.value.formConfig = {
          "modelName": "formData",
          "refName": "vForm",
          "rulesName": "rules",
          "labelWidth": 80,
          "labelPosition": "left",
          "size": "",
          "labelAlign": "label-left-align",
          "cssCode": "",
          "customClass": [],
          "functions": "",
          "layoutType": "PC",
          "jsonVersion": 3,
          "dataSources": [],
          "onFormCreated": "",
          "onFormMounted": "",
          "onFormDataChange": "",
          "onFormValidate": ""
        }

      vFormRef.value.$forceUpdate()

    }
    console.log("res", res)

  });
}
onMounted(() => {
  getList()
})
</script>
