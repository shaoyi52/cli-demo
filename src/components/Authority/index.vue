  
<script  lang='ts'>
import { defineComponent,Slots } from 'vue';

export default defineComponent({
  name:'Authority',
  props: {
    value:{
      type:[ Number, Array, String ],
      default: '',
    },
  },
  setup(props, { slots }) {
    function hasPermissin(value:string|number|(string | number)[]){
      if(typeof value=='string' ){
        return ['admin','administrator','guest'].indexOf(value)>-1;
      }
      return false;
    }
    function getSlot(slots: Slots, slot = 'default', data?: any) {
      if (!slots || !Reflect.has(slots, slot)) {
        return null;
      }
      if (typeof slots[slot] !=='function') {
        console.error(`${slot} is not a function!`);
        return null;
      }
      const slotFn = slots[slot];
      if (!slotFn) return null;
      return slotFn(data);
    }
    function renderAUTH(){
      const { value } =props;     
      if(!value){
        return getSlot(slots); 
      }
      return hasPermissin(value)? getSlot(slots): null;
    }
    return ()=>{
      return renderAUTH();
    };
  },
});
</script>
  
<style>
  
</style>