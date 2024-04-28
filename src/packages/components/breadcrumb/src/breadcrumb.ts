import { buildProps, iconPropType } from '@element-plus/utils';
import type { ExtractPropTypes } from 'vue';

export const breadcrumbProps = buildProps({
  separator: {
    type: String,
    default: '/'
  },
  separatorIcon: {
    type: iconPropType
  }
} as const);
// 从props 选项对象中提取 props 类型  https://blog.csdn.net/mChales_Liu/article/details/135431824
export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>;
