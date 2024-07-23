declare type EmitType =(event: any, ...args:any[])=>void
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}
