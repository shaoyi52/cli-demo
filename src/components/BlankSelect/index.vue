<!-- 
 demo:
<BlankSelect :list="list" default-value="1" @change="change" /> 
-->
<template>
  <div className="blankSelector">
    <div
      v-for=" item in list"
      :key="item.id"
      class="blankSelector-checkBox"
      :class="item.id==selectValue?'blankSelector-selected':''"

      @click="select(item)"
    >
      <span class="blankSelector-blankName">{{ item.label }}</span>
      <span class="blankSelector-blankCount">{{ item.count }}</span>
      <span class="blankSelector-bg" />
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import type { PropType } from 'vue';

type itemProp={
  lable: string,
        count:string,
        id: string
      }
const props = defineProps({
  list:{
    type:Array as PropType<itemProp[]>,
    default:()=>[],
  },
  defaultValue:{
    type:String,
    default:"",
  },
});
const emit = defineEmits(['change']);
  let selectValue= ref<string>("");
    selectValue.value=props.defaultValue;
  /* list.value=[
      {
        lable: "交通银行",
        count: "441169******0382",
        id: "1",
      },
      {
        lable: "交通银行",
        count: "441169******0382",
        id: "2",
      },
      {
        lable: "交通银行",
        count: "441169******0382",
        id: "3",
      },
    ]; */
  const select=(item:itemProp)=>{
    selectValue.value=item.id;
    emit("change", item.id);
    };
</script>
  
<style lang="scss">
  
.blankSelector {
  position: relative;
  &-checkBox {
    border: solid 1px #e0e0e0;
    border-radius: 5px;
    padding: 18px 22px;
    line-height: 42px;
    position: relative;
    cursor: pointer;
    margin-bottom: 20px;
  }
  &-blankName {
    font-size: 18px;
    font-weight: bold;
    padding-right: 60px;
  }
  &-blankCount {
    font-size: 14px;
    color: #6f6f6f;
  }
  &-bg {
    width: 40px;
    height: 40px;
    background-color: #e0e0e0;
    clip-path: polygon(0 100%, 100% 100%, 100% 0%);
    position: absolute;
    right: 0;
    bottom: 0;
    border-radius: 0 0 5px 0;
    &::after {
      width: 12px;
      height: 2px;
      left: 65%;
      top: 62%;
      transform: skew(0deg, -50deg);
      content: "";
      pointer-events: none;
      position: absolute;
      color: #fff;
      border: 2px solid;
      background-color: #fff;
    }
    &::before {
      width: 15px;
      width: 6px;
      height: 3px;
      left: 50%;
      top: 70%;
      transform: skew(0deg, 50deg);
      content: "";
      pointer-events: none;
      position: absolute;
      color: white;
      border: 2px solid;
      background-color: white;
    }
  }
  &-selected {
    border-color: #0066B3;;
    .blankSelector-bg {
      background-color: #0066B3;
    }
  }
  &-footer {
    text-align: right;
    .reset {
      display: inline-block;
      color: #0066B3;
      margin-right: 24px;
    }
  }
}

</style>