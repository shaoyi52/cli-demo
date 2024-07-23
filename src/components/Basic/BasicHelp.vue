

<script lang="tsx">
  import { defineComponent } from 'vue';
  import { ElTooltip } from 'element-plus';
  import { InfoFilled } from '@element-plus/icons-vue';
  import {isString, isArray} from '@/utils/is'

  const props = {
    maxWidth: {type: String, default:'600px'},
    showIndex:{ type: Boolean},
    text:{type:[String,Array],default:''},
    placement:{type:String,default:'top'}
  };
  export default defineComponent({
    name:'BasicHelp',
    components:{ElTooltip},
    props,
    setup(props,{slots}){      
      function renderTitle(){
        const textList = props.text
        if(isString(textList)){
          return <p>{textList}</p>
        }
        if (isArray(textList)) {
          return textList.map((text, index) => {
            return (
              <p key={text}>
                <>
                  {props.showIndex ? `${index + 1}. ` : ''}
                  {text}
                </>
              </p>
            )
          })
        }
        return null
      }
      return ()=>{
        return (
        <ElTooltip          
          placement={props.placement}
          v-slots={{
                content: scope => renderTitle()                
            }}         
        >
        <span>  <InfoFilled style="width: 1em; height:1em; margin-right:8px"/></span>
        </ElTooltip>
        )
      }
    },

  });
</script>