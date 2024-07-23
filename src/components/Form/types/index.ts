type ColSpanType = number | string
export interface ColEx {
  style?: any
  span?: ColSpanType

  order?: ColSpanType

  flex?: ColSpanType
}

export type ComponentType ='ElDivider'|'ElInput'