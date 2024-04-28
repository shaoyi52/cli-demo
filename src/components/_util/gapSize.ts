export function isPresetSize(size?:any):boolean{
 return ['small','middle','large'].includes(size);
}

export function isValidGapNumber(size:string|number):size is number{
  if(!size){
    return false;
  }
  return typeof size ==='number' && !Number.isNaN(size);
}