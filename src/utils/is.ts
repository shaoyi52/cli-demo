export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}
export function isDef(val: any): boolean {
  return typeof val !=='undefined';
}
export function isUnDef(val){
  return !isDef(val);
}

export function isObject(val){
  return val !== null && is(val,'Object');
}

export function isNull(val:unknown):boolean{
  return val===null;
}

export function isNullAndUnDef(val:unknown):boolean{
  return isUnDef(val) && isNull(val);
}

export function isNullOrUnDef(val:unknown):boolean{
  return isUnDef(val) || isNull(val);
}

export function isFunction(val:unknown):boolean{
  return typeof val === 'function';
}

export function isString(val: unknown): boolean {
  return is(val, 'String');
}

export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}


export function isBoolean(val: any): boolean {
  return is(val, 'Boolean');
}

export function isNumber(val:any):boolean{
  return is(val,'Number');
}

export function isEmpty(val:any):boolean{
  if(isArray(val) || isString(val)){
    return val.length ===0;
  }

  if(val instanceof Map || val instanceof Set){
    return val.size ===0;
  }
  
  if(isObject(val)){
    return Object.keys(val).length ===0;
  }

  return false;
}
