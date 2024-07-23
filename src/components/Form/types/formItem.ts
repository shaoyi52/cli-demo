import type { ColProps } from "element-plus";
import type { HtmlHTMLAttributes, VNodeChild } from "vue";
import type { JSX } from "vue/jsx-runtime";
import type { NamePath} from './form';

export interface FormItem{
  /**
   * Used with label, whether to display
   * @default true
   * @type boolean
   */
  colon?: boolean

  /**
   * The extra prompt message.
   * @type any(string|slot)
   */
  extra?: string| VNodeChild |JSX.Element

  hasFeedback?:boolean

  help?: string | VNodeChild |JSX.Element

  label?: string | VNodeChild | JSX.Element

  labelCol?: HtmlHTMLAttributes

  required?: boolean

  validateStatus?:'' | 'success' | 'warning' | 'error' | 'validating'

  wrapperCol?:ColProps

  htmlFor? :string

  labelAlign?: 'left' | 'right'

  name?: NamePath

  rules?: Object | object[]

  autoLink?: boolean

  validateFirst?:boolean

  validateTrigger?: string | string[] | false

}