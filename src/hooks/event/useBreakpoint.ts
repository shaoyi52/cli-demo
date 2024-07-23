import type {ComputedRef} from 'vue';
import {ref,unref,computed} from 'vue';
import { screenMap,screenEnum ,sizeEnum} from "@/enums/breakpointEnum";
import {useEventListener} from '@/hooks/event/useEventListener';

let globalScreenRef: ComputedRef<sizeEnum|undefined>;
let globalWidthRef: ComputedRef<number>;
let globalRealWidthRef: ComputedRef<number>;

export interface CreateCallbackParams{
  screen: ComputedRef<sizeEnum | undefined>
  width: ComputedRef<number>
  realWidth:ComputedRef<number>
  screenEnum:typeof screenEnum
  screenMap: Map<sizeEnum,number>
  sizeEnum: typeof sizeEnum
}

export function useBreakpoint(){
  return {
    screenRef:computed(()=> unref(globalScreenRef)),
    widthRef: globalWidthRef,
    screenEnum,
    realWidthRef: globalRealWidthRef,    
  };
}

export function createBreakpointListen(fn?:(opt:CreateCallbackParams)=>void){
  const screenRef = ref<sizeEnum>(sizeEnum.XL);
  const realWidthRef = ref(window.innerWidth);

  function getWindowWidth(){
    const width = document.body.clientWidth;
    const xs = screenMap.get(sizeEnum.XS)!; //表达式后面加上 ! 是非空断言操作符
    const sm = screenMap.get(sizeEnum.SM)!;
    const md = screenMap.get(sizeEnum.MD)!;
    const lg = screenMap.get(sizeEnum.LG)!;
    const xl = screenMap.get(sizeEnum.XL)!;
    if (width < xs){
      screenRef.value = sizeEnum.XS;
    } else if(width < sm){
      screenRef.value =sizeEnum.SM;
    } else if(width < md){
      screenRef.value = sizeEnum.MD;
    } else if(width < lg){
      screenRef.value = sizeEnum.LG;
    } else if(width < xl){
      screenRef.value = sizeEnum.XL;
    }else{
      screenRef.value = sizeEnum.XXL;
    }
    realWidthRef.value =width;
  }

  useEventListener({
    el: window,
    name:'resize',
    listener:()=>{
      getWindowWidth();
      resizeFn();
    },
  });
  
  getWindowWidth();

  globalScreenRef = computed(()=> unref(screenRef));
  globalWidthRef = computed(():number => screenMap.get(unref(screenRef)!)!);
  globalRealWidthRef = computed(()=>unref(realWidthRef));

  function resizeFn(){
    fn?.({
      screen: globalScreenRef,
      width: globalWidthRef,
      realWidth: globalRealWidthRef,
      screenEnum,
      screenMap,
      sizeEnum,
    });
  }

  resizeFn();
  return {
    screenRef: globalScreenRef,
    screenEnum,
    widthRef:globalWidthRef,
    realWidthRef:globalRealWidthRef,

  };
}