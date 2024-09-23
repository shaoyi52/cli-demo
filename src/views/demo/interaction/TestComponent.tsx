import { defineComponent,Teleport } from 'vue';
export default defineComponent({
  setup() {
    return ()=>{
      return <Teleport to="body">
          <div  class="modal">
            <p>Hello from the modal!</p>            
          </div>
        </Teleport>
    } 


  }

})