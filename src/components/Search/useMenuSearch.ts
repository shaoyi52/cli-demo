import type {Ref} from 'vue';
import {ref,unref,nextTick} from 'vue';
export interface SearchResult {
  name: string
  path: string
  icon?: string
}



export function useMenuSearch(refs:Ref<HTMLElement[]>, scrollWrap, emit){
  const searchResult = ref<SearchResult[]>([]);
  const keyword = ref ('');
  const activeIndex = ref(-1);
  let menuList=[];

  function handleMouseenter(e:any) {
    const index = e.target.dataset.index;
    activeIndex.value = Number(index);
  }

  async function handleEnter(){
    const result =unref(searchResult);
    const index= unref(activeIndex);
    if(result.length===0||index<0){
      return ;
    }
    const to = result[index];
    handleClose();
    await nextTick();
    //go(to.path)
  }

  function handleClose(){
    searchResult.value=[];
    emit('close');
  }
  const handleSearch =()=>{

  };

  return {handleSearch, searchResult, keyword, activeIndex, handleMouseenter, handleEnter};
}