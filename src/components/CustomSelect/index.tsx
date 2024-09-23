// CustomSelect.tsx  
import { defineComponent, ref, watch, PropType, EmitsOptions, onMounted } from 'vue';  
import { ElSelect, ElOption } from 'element-plus';  
  
export default defineComponent({  
  name: 'CustomSelect',  
  components: {  
    ElSelect,  
    ElOption,  
  },  
  props: {  
    value: {  
      type: [String, Number, Array],  
      required: true,  
    }, 
    // 其他 props...  
  },  
  emits: ['update:modelValue', 'change'],  
  setup(props, { emit,slots }) {  
    const localValue = ref(props.value);  
  
    watch(() => props.value, (newVal) => {  
      localValue.value = newVal;  
    });  
  
    const handleChange = (value: string | number | (string | number)[]) => {  
      emit('update:modelValue', value);  
      emit('change', value);  
    };  
  
    return () => (  
      <ElSelect  
        vModel={localValue.value}  
        onChange={handleChange}  
        class="custom-select"  
      >  
 {/*      {
        if(props.options){
          props.options?.map(option => (  
            <ElOption  
              key={option.value}  
              label={option.label}  
              value={option.value}  
            />  
          ))
        }else{
          slots.default&&slots.default()
        }
      } */}
        {!props.options&&slots.default&&slots.default()/* 插槽内容通常通过 children 或具名插槽处理，但这里我们直接使用组件 */}  
        {props.options?.map(option => (  
          <ElOption  
            key={option.value}  
            label={option.label}  
            value={option.value}  
          />  
        ))}  
        {/* 如果需要其他插槽内容，可以在这里添加 */}  
      </ElSelect>  
    );  
  },  
});