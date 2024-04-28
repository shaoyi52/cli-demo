import type { PropType,SlotsType} from 'vue';

export const tuple = <T extends string[]>(...args:T)=>args;

export const tupleNum = <T extends number[]>(...args:T)=>args;

export type Data = Record<string,unknown>;

export type Key = string|number;

export type DefaultFactory<T> =(props:Data)=>T|null|undefined;

export  function booleanType(defaultVal?:boolean){
  return {type:Boolean,default: defaultVal as boolean };
}

export function anyType<T = any >(defaultVal?:T,required?:boolean){
  return required
  ?( type as {
    type:PropType<T>;
    default:T;
    required:true
  })
  :(type as {
    type:PropType<T>;
    default:T;
  });
}

export function stringType<T extends string = string>(defaultVal?:T){
  return {type:String as unknown as PropType<T>,default:defaultVal as T};
}

export function someType<T>(types?:any[],defaultVal?:T){
  return types?{type:types as PropType<T>,default: defaultVal as T} :anyType<T>(defaultVal);
}

export type CustomSlotsType<T>=SlotsType<T>;

export type AnyObject=Record<PropertyKey,any>
