<template>
  <div class="p-2">
    <v-form-render ref="vFormRef" :form-json="formJson" :form-data="formData" :option-data="optionData" />
    <el-button type="primary" @click="add">
      add
    </el-button>
    <el-button type="default" @click="get">
      get
    </el-button>
  </div>
</template>
<script setup name="dyanmicTable" lang="ts">
import {  reactive, ref,onMounted } from 'vue';
import { list } from "@/api/dynamic";
let formJson = ref({
  "widgetList": [],
  "formConfig": {},
});
const vFormRef = ref();
let formData = reactive({
    "createDept": 103,
    "createBy": 1,
    "createTime": "2024-04-25 09:18:18",
    "updateBy": 1,
    "updateTime": "2024-04-25 09:24:49",
    "tenantId": "000000",
    "id": "1783304495000866818",
    "no": "edf97b7eb2804c8d926d966bd85c1fff",
    "appointmentId": null,
    "customerType": "1",
    "customerId": null,
    "customerName": "李朋",
    "customerMobile": "13800313800",
    "guaranteeType": "1",
    "productId": "1783153198800142338",
    "carType": "1",
    "carBrandId": "1783151054449639425",
    "carBrandName": "瑞驰新能源",
    "carSerialId": "1783151573993881602",
    "carSerialName": "瑞驰新能源ED71",
    "carModelId": "1783152595986382850",
    "carModelName": "ED71仓栅 中航56.67Kwh",
    "periods": "8",
    "dueDate": "5",
    "quantity": "1",
    "deposit": "123.00",
    "downPayment": "123.00",
    "amount": "3000.00",
    "totalAmount": null,
    "outletId": "1783148209348378626",
    "remarks": null,
    "contractNo": null,
    "contractStatus": null,
    "isValid": "true",
    "isDraft": "true",
    "delFlag": "0",
    "bizUserId": "123456789",
    "bizUserName": null,
    "channelId": "1783164854616010754",
    "channelName": null,
    "address":"地址信息",

});
const optionData = reactive({});

const getList = () => {
  //const id = route.query && route.query.id;
  const pathname=window.location.pathname;
  const name=pathname.split("/").pop()||"";
  let res={
  "widgetList": [
    {
      "key": 57672,
      "type": "tab",
      "category": "container",
      "icon": "tab",
      "displayType": "border-card",
      "tabs": [
        {
          "type": "tab-pane",
          "category": "container",
          "icon": "tab-pane",
          "internal": true,
          "widgetList": [
            {
              "key": 31188,
              "type": "card",
              "category": "container",
              "icon": "card",
              "widgetList": [
                {
                  "key": 24860,
                  "type": "grid",
                  "category": "container",
                  "icon": "grid",
                  "cols": [
                    {
                      "type": "grid-col",
                      "category": "container",
                      "icon": "grid-col",
                      "internal": true,
                      "widgetList": [
                        {
                          "key": 74625,
                          "type": "input",
                          "icon": "text-field",
                          "formItemFlag": true,
                          "options": {
                            "name": "carBrandName",
                            "label": "车品名",
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
                            "onValidate": "",
                          },
                          "id": "input49842",
                        },
                      ],
                      "options": {
                        "name": "gridCol76075",
                        "hidden": false,
                        "span": 12,
                        "offset": 0,
                        "push": 0,
                        "pull": 0,
                        "responsive": false,
                        "md": 12,
                        "sm": 12,
                        "xs": 12,
                        "customClass": [],
                      },
                      "id": "grid-col-76075",
                    },
                    {
                      "type": "grid-col",
                      "category": "container",
                      "icon": "grid-col",
                      "internal": true,
                      "widgetList": [
                        {
                          "key": 93809,
                          "type": "input",
                          "icon": "text-field",
                          "formItemFlag": true,
                          "options": {
                            "name": "amount",
                            "label": "金额",
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
                            "onValidate": "",
                          },
                          "id": "input100112",
                        },
                      ],
                      "options": {
                        "name": "gridCol84403",
                        "hidden": false,
                        "span": 12,
                        "offset": 0,
                        "push": 0,
                        "pull": 0,
                        "responsive": false,
                        "md": 12,
                        "sm": 12,
                        "xs": 12,
                        "customClass": [],
                      },
                      "id": "grid-col-84403",
                    },
                  ],
                  "options": {
                    "name": "grid99215",
                    "hidden": false,
                    "gutter": 12,
                    "colHeight": null,
                    "customClass": [],
                  },
                  "id": "grid99215",
                },
              ],
              "options": {
                "name": "card66864",
                "label": "订单详情",
                "hidden": false,
                "folded": false,
                "showFold": true,
                "cardWidth": "100%",
                "shadow": "never",
                "customClass": [],
                "showBorder": false,
              },
              "id": "card66864",
            },
            {
              "key": 32228,
              "type": "card",
              "category": "container",
              "icon": "card",
              "widgetList": [
                {
                  "key": 86763,
                  "type": "grid",
                  "category": "container",
                  "icon": "grid",
                  "cols": [
                    {
                      "type": "grid-col",
                      "category": "container",
                      "icon": "grid-col",
                      "internal": true,
                      "widgetList": [
                        {
                          "key": 92019,
                          "type": "input",
                          "icon": "text-field",
                          "formItemFlag": true,
                          "options": {
                            "name": "customerName",
                            "label": "客户名",
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
                            "onValidate": "",
                          },
                          "id": "input41087",
                        },
                      ],
                      "options": {
                        "name": "gridCol18027",
                        "hidden": false,
                        "span": 12,
                        "offset": 0,
                        "push": 0,
                        "pull": 0,
                        "responsive": false,
                        "md": 12,
                        "sm": 12,
                        "xs": 12,
                        "customClass": "",
                      },
                      "id": "grid-col-18027",
                    },
                    {
                      "type": "grid-col",
                      "category": "container",
                      "icon": "grid-col",
                      "internal": true,
                      "widgetList": [
                        {
                          "key": 107153,
                          "type": "input",
                          "icon": "text-field",
                          "formItemFlag": true,
                          "options": {
                            "name": "address",
                            "label": "地址",
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
                            "onValidate": "",
                          },
                          "id": "input45715",
                        },
                      ],
                      "options": {
                        "name": "gridCol104575",
                        "hidden": false,
                        "span": 12,
                        "offset": 0,
                        "push": 0,
                        "pull": 0,
                        "responsive": false,
                        "md": 12,
                        "sm": 12,
                        "xs": 12,
                        "customClass": [],
                      },
                      "id": "grid-col-104575",
                    },
                  ],
                  "options": {
                    "name": "grid62968",
                    "hidden": false,
                    "gutter": 12,
                    "colHeight": null,
                    "customClass": "",
                  },
                  "id": "grid62968",
                },
              ],
              "options": {
                "name": "card105385",
                "label": "客户基本信息",
                "hidden": false,
                "folded": false,
                "showFold": true,
                "cardWidth": "100%",
                "shadow": "never",
                "customClass": [
                  "mt15",
                ],
                "showBorder": false,
              },
              "id": "card105385",
            },
          ],
          "options": {
            "name": "tab1",
            "label": "订单详情",
            "hidden": false,
            "active": false,
            "disabled": false,
            "customClass": "",
          },
          "id": "tab-pane-89490",
        },
      ],
      "options": {
        "name": "tab96362",
        "hidden": false,
        "customClass": [],
      },
      "id": "tab96362",
    },
  ],
  "formConfig": {
    "modelName": "formData",
    "refName": "vForm",
    "rulesName": "rules",
    "labelWidth": 80,
    "labelPosition": "left",
    "size": "",
    "labelAlign": "label-left-align",
    "cssCode": ".p10{padding:0 10px}\n.textAlignR{text-align:right}\n.mt15{margin-top:15px}",
    "customClass": [],
    "functions": "",
    "layoutType": "PC",
    "jsonVersion": 3,
    "dataSources": [
      {
        "dataSourceId": "ds12453",
        "uniqueName": "5555",
        "requestURL": "https://findinfo.love/api/tag/list",
        "requestURLType": "String",
        "requestMethod": "get",
        "description": "",
        "headers": [],
        "params": [],
        "data": [],
        "configHandlerCode": "  return config",
        "dataHandlerCode": "  return result.data.result.tag;",
        "errorHandlerCode": "  $message.error(error.message);",
      },
    ],
    "onFormCreated": "",
    "onFormMounted": "",
    "onFormDataChange": "",
    "onFormValidate": "",
  }};


formJson.value.widgetList =res.widgetList,
formJson.value.formConfig =res.formConfig;
//const {setFormData}=vFormRef.value;
//setFormData(formData.value);
  console.log('vFormRef', vFormRef);
  /* list({ name }).then(res => {
    if (res?.componentCfg) {
      let {widgetList,formConfig}=JSON.parse(JSON.parse(res.componentCfg));

      formJson.value.widgetList = widgetList,
        formJson.value.formConfig =formConfig;

      vFormRef.value.$forceUpdate();
      console.log("insertCustomStyleAndScriptNode",vFormRef.value);
      //创建全局样式
      vFormRef.value.insertCustomStyleAndScriptNode();
    }
    console.log("res", res);

  }); */
};
onMounted(()=>{
  const {setFormData}=vFormRef.value;
   //setFormData(formData.value);
});
const get=async()=>{
  let {getFormData}=vFormRef.value;
  let formData=await getFormData();
  console.log('formData',formData);
};
const add=()=>{
  const {setFormData}=vFormRef.value;
   setFormData(formData.value);
};
getList();
</script>
