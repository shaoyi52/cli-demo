import { buildProp, definePropType } from "element-plus/es/utils";
import type { ExtractPropTypes } from "vue";
import type { RouteLocationRaw } from "vue-router";

export const breadcrumbItemProps = buildProps({
    to:{
        type: definePropType<RouteLocationRaw>([String,Object])
        default:'',
    },
    replace:{
        type:Boolean,
        default:false,
    }
} as const)

export type BreadcrumbItemProps=ExtractPropTypes<typeof breadcrumbItemProps>