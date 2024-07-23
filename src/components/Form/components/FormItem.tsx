import { defineComponent, ref,toRefs,computed,unref  } from 'vue';
import { ElCol,ElDivider,ElFormItem,FormItemRule} from 'element-plus';
import { componentMap } from './componentMap'
import {getSlot} from '@/utils/helper/tsxHelper'
import { isFunction,isBoolean,isNullOrUnDef} from '@/utils/is';
import BasicHelp from '@/components/Basic/BasicHelp.vue'
import {cloneDeep, upperFirst} from 'lodash-es'
export default defineComponent({
  name: 'BasicFormItem',
  inheritAttrs: false,
  props: {
    schema: {
      type: Object ,
      default: () => ({})
    },
    formProps: {
      type: Object ,
      default: () => ({})
    },
    formModel:{
      type:Object,
      default:()=>{}
    },
    setFormModel:{
      type:Function,
      default:null
    }


  },
  setup(props, { slots }) {
    const { schema} = toRefs(props)

    const getValues = computed(()=>{
      const { schema } = props
      return {
        field:schema.field,
        schema: schema
      }
    })

    const getComponentsProps = computed(()=>{
      const { schema } = props;
      let { componentProps= {} } = schema;
      if (schema.component === 'ElDivider'){
        componentProps = Object.assign(
          { direction: 'horizontal',
            'border-style': 'solid',
            'content-position':'center'
          },
          componentProps
        )
      }
      return componentProps
    })

    //获取禁用状态
   const getDisable =computed(()=>{
    const {disabled: globDisabled}= props.formProps;
    const {dynamicDisabled} =props.schema;
    const {disabled: itemDisabled = false}= unref(getComponentsProps)
    let disabled = !!globDisabled||itemDisabled
    if(isBoolean(dynamicDisabled)){
      disabled=dynamicDisabled
    }
    if(isFunction(dynamicDisabled)){
      disabled=dynamicDisabled(unref(getValues))
    }
    return disabled
  })

    function handleRules():FormItemRule[]{
      const { rules: defRules = [],dynamicRules,rulesMessageJoinLabel,label,required} = props.schema;
      if(isFunction(dynamicRules)){
        return dynamicRules(unref(getValues)) as FormItemRule[]
      }
      let rules= cloneDeep(defRules) as FormItemRule[]
      const {rulesMessageJoinLable: globalRulesMessageJoinLabel}= props.formProps;
      
      const joinLabel = Reflect.has(props.schema,'rulesMessageJoinLabel')?rulesMessageJoinLabel:globalRulesMessageJoinLabel
      const defaultMsg= "请输入"+`${joinLabel? label : ''}`

      const getRequired = isFunction(required)? required(unref(getValues)):required
       function validator(rule:any,value:any,callback:any){
        const msg = rule.message || defaultMsg
        if(isNullOrUnDef(value)){
          //return Promise.reject(msg);
          callback(new Error(msg))
        } else if(Array.isArray(value)&& value.length ===0){
          // 数组类型
          callback(new Error(msg))
        } else if(typeof value ==='string' && value.trim() ===''){
          // 空字符串
          callback(new Error(msg))
        } else if(typeof value ==='object'&&
          Reflect.has(value,'checked')&&
          Array.isArray(value.checked) &&
          Array.isArray(value.halfChecked) &&
          value.checked.length === 0 &&
          value.halfChecked.length === 0
        ){
          callback(new Error(msg))
        }else{
          return Promise.resolve();
        }

      }
      console.log("getRequired",getRequired)
      if(getRequired){
       
        if(!rules||rules.length ===0){
          rules= [{required:getRequired,validator,trigger:'blur' }]
        }else{
          const requiredIndex:number = rules.findIndex(rule=>Reflect.has(rule,'required'))
          if(requiredIndex===-1){
            rules.push({required:getRequired,validator,trigger:'blur'})
          }
        }
      }

      return rules
    }

    function renderComponent(){
      const { component, field,valueField,changeEvent = 'update:modelValue' } = props.schema
      const isCheck = component&&['ElSwitch', 'ElCheckbox'].includes(component)
      const eventKey = `on${upperFirst(changeEvent)}`
      const { size } = props.formProps
      const propsData={
        allowClear:true,
        getPopupContainer:(trigger:Element)=>trigger.parentNode,
        size,
        ...unref(getComponentsProps),
        disabled: unref(getDisable)
      }
      const on ={
        [eventKey]:(...args) => {
          const [e]=args;
          console.log('args',args)
          if (propsData[eventKey]){
            propsData[eventKey](...args)
          }
          const target = e ? e.target:null
          const value= target?(isCheck ? target.checked : target.value) : e
          props.setFormModel(field,value,props.schema)
        }
      }
      const bindValue={
        [valueField||(isCheck ? 'checked' : 'modelValue')]:props.formModel[field]
      }
      const compAttr={...on,...bindValue}
      const Comp=componentMap.get(component)
        
        return <Comp {...compAttr}></Comp> 
    }

    function renderLabelHelpMessage(){
      const { label, subLabel,helpMessage,helpComponentProps } = props.schema
      const renderLabel= subLabel?(
        <span>
          {label}<span class="text-secondary">{subLabel}</span>
        </span>
      ):(label)
      const getHelpMessage = isFunction(helpMessage)?renderLabelHelpMessage(unref(getValues)):helpMessage

      if(!getHelpMessage ||(Array.isArray(getHelpMessage) && getHelpMessage.length === 0)){
        return renderLabel;
      }
      return (
        <span>
          {renderLabel}
          <BasicHelp placement="top" class="mx-1" text={getHelpMessage} {...helpComponentProps} />
        </span>
      )
    }

    function renderItem(){
      const {  label, slot, suffix,component,field,colProps={}} = props.schema
      const { colon } = props.formProps;

      if (component === 'ElDivider'){
        return (
        <ElCol {...colProps}>
          <ElDivider {...unref(getComponentsProps)}>{renderLabelHelpMessage()}</ElDivider>
        </ElCol>)  
      }
      const showSuffix = !!suffix
      const getContent=()=>{     
        return slot?getSlot(slots, slot, unref(getValues)):renderComponent()
      }
      return (
      <ElFormItem
        label={label}
        rules={handleRules()}
        prop={field}  
         
      >
      <div style="display:flex">
        <div style="flex:1;">{getContent()}</div>
        {showSuffix && <span class="suffix">{getSuffix}</span>}
      </div>
      </ElFormItem>
      )
    }

    // 返回一个渲染函数
    return () =>{
      const {colProps} =props.schema;

      return (
      <ElCol {...colProps}>
        {renderItem()} 
      </ElCol>)
    }
         
    
  },
});