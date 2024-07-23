import type { VNode} from 'vue';
import type {ButtonProps as elButtonProps} from '@/components/Button';
import type { FormInstance, RowProps } from 'element-plus';
import type { ColEx,ComponentType} from './index';

export interface RenderCallbackParams {
  schema: FormSchema
  values: Recordable
  model: Recordable
  filed: string
}

export interface ButtonProps extends elButtonProps{
  text?:string
}
type NamePath = string | number | (string | number)[]

export interface FormActionType {
  submit: ()=> Promise<void>
  setFieldsValue:(values: Recordable) => Promise<void>
  resetFields: ()=> Promise<void>
  getFieldsValue: ()=> Recordable
  clearValidate: (name?:string|string[]) => Promise<void>
  updateSchema: (data: Partial<FormSchema> | Partial<FormSchema>) => Promise<void>
  resetSchema: (data: Partial<FormSchema> | Partial<FormSchema>) => Promise<void>
  setProps: (formProps: Partial<FormProps>) => Promise<void>
  removeSchemaByField: (field: string | string[]) => Promise<void>
  appendSchemaByField: (schema: FormSchema | FormSchema[], prefixField: string | undefined, first?: boolean | undefined) => Promise<void>
  validateFields:(namelist?:NamePath[])=>Promise<any>
  validate:(nameList?: NamePath[]) => Promise<any>
  scrollToField:(name: NamePath, options?:ScrollOptions) =>Promise<void>
}
export interface FormProps {
  name?: string
  // eslint-disable-next-line no-undef
  model?: Recordable
  layout?:'vertical' | 'inline' | 'horizontal'
  labelWidth?: number | string
  labelAlign?: 'left' | 'right'
  rowProps?: RowProps
  submitOnRest?: boolean
  submitOnChange?: boolean
  labelCol?: Partial<ColEx>
  showAdvancedButton?:boolean
  // Form configuration rules
  schemas?: FormSchema[]

}
export interface FormSchema{
  // Field Name
  field: string
  // Event name triggered by internal value chang ,default change
  changeEvent?: string
  // variable name bound to v-model Default value
  valueField?: string
  // Label name
  label: string | VNode
  // Auxiliary text
  subLabel?: string
  // Help text on the right side of the text
  helpMessage?: string | string[] | ((renderCallbackParams:RenderCallbackParams) => string | string[])
  // render component
  component:ComponentType

  required?: boolean
  // 默认值
  defaultValue?: any

   // 是否自动处理与时间相关组件的默认值
   isHandleDateDefaultValue?: boolean
}

export interface AdvanceState{
  isAdvanced: boolean
  hideAdvanceBtn:boolean
  isLoad:boolean
  actionSpan:number
}

export type RegisterFn =(formInstance:FormActionType)=>void

export type UseFormReturnType=[RegisterFn,FormActionType]