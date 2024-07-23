//import type { Ref } from 'vue';
import { getCurrentInstance, reactive,shallowRef,watchEffect} from "vue";

interface Params {
  excludeListeners?: boolean
  excludeKeys?: string[]
  excludeDefaultKeys?: boolean
}

const DEFAULT_EXCLUDE_KEYS = ['class', 'style'];
const LISTENER_PREFIX = /^on[A-Z]/;


export function useAttrs(params:Params ={}){
  const instance = getCurrentInstance();
  if(!instance) return {};

  const { excludeListeners = false, excludeKeys=[], excludeDefaultKeys=false } =params;
  const attrs = shallowRef({});
  const allExcludeKeys = excludeKeys.concat(excludeDefaultKeys?DEFAULT_EXCLUDE_KEYS :[]); 
  
  instance.attrs = reactive(instance.attrs);
  watchEffect(()=>{
    const res = Object.entries(instance.attrs).reduce((acm:{[props:string]:any},[key,value])=>{ 
      if (!allExcludeKeys.includes(key) && !(excludeListeners && LISTENER_PREFIX.test(key))) {
        acm[key] = value;
      }
      return acm;    
    },{});
    attrs.value = res;  
  });

  return attrs;
}