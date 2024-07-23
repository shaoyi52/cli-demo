
import {isFunction} from '@/utils/is'
/**
 * @description: Get slot to preevent empty error
 */

export function getSlot(slots, slot="default",data){
  if(!slots || !Reflect.has(slots,slot)){
    return null
  }
  if(!isFunction(slots[slot])){
    console.error(`${slot} is not a function!`)
    return null
  }
  const slotFn = slots[slot]
  if(!slotFn) return null
  return slotFn(data)
}