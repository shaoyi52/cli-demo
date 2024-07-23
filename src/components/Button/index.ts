import type { ExtractPropTypes } from 'vue';
const validColors = ['primary','error','warning','success',''] as const; 
type ButtonColorType = (typeof validColors)[number]

export const buttonProps = {
  color:{
    // eslint-disable-next-line no-undef
    type:String as PropType<ButtonColorType>,
  },
  loading: {type: Boolean},
  disabled: {type: Boolean},
  // text before icon
  preIcon: {type: String},
  // text after icon
  postIcon: {type: String},

  /**
   * preIcon and post Icon icon size.
   * @default: 14
   */
  iconSize: { type: Number, default: 14},
  // eslint-disable-next-line no-undef
  onClick: {type: Function as PropType<(...args:any[]) => any>,default : null},
};
export declare type ButtonProps =  Partial<ExtractPropTypes<typeof buttonProps>>
