<template>
  <div :class="{'show':show}" class="header-search">
    <svg-icon class-name="search-icon" icon-class="search" @click.stop="click" />
    <el-select 
      ref="headerSearchSelectRef"
      v-model="search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="Search"
      class="header-search-select"
      @change="change"
    >
      <el-option v-for="option in options" :key="option.item.path" :value="option.item" :label="option.item.title.join(' > ')" />
    </el-select>
  </div>
</template>
  
<script setup lang='ts' name="HeaderSearchs">
  import Fuse from 'fuse.js';
  import {getNormalPath} from '@/utils/ruoyi';
  import {isHttp} from '@/utils/validate';
  import usePermissionStore from '@/store/modules/permission';
  import {RouteOption} from 'vue-router';
  import { nextTick } from 'process';

  type Router = Array<{
    path:string;
    title:string[];
  }>

  const search = ref('');
  const options = ref<any>([]);
  const searchPool = ref<Router>([]);
  const show = ref(false);
  const fuse = ref();
  const headerSearchSelectRef = ref<ElSelectInstance>();
  const router = useRouter();
  const routes = computed(()=>usePermissionStore().routes);

  const click = () =>{
    show.value = !show.value;
    if(show.value){
      headerSearchSelectRef.value && headerSearchSelectRef.value.focus();
    }
  };
  
  const  close = () => {
    headerSearchSelectRef.value && headerSearchSelectRef.value.blur();
    options.value=[];
    show.value= false;
  };

  const change = (val: any) => {
    const path = val.path;
    const query = val.query;
    if(isHttp(path)){
      const pindex = path.indexOf("http");
      window.open(path.substr(pindex,path.length),"_blank");      
    }else{
      if(query){
        router.push({path,query: JSON.parse(query)});        
      }else{
        router.push(path);
      }
    }
    search.value = '';
    options.value = [];
    nextTick(()=>{
      show.value=false;
    });
  };

  const initFuse = (list: Router) => {
    fuse.value = new Fuse(list, {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    minMatchCharLength: 1,
    keys: [{
      name: 'title',
      weight: 0.7,
    }, {
      name: 'path',
      weight: 0.3,
    }],
  });
  };

  // Filter out the outes that can be sisplayed in the sidebar 
  // And generate the internationlized title
  const generateRoutes = (routes: RouteOption[],basePath = '', perfixTitle: string[]=[]) =>{
    let res: Router = [];
    routes.forEach(r => {
      if(!r.hidden){
        const p = r.path.length > 0 && r.path[0] === '/' ? r.path: '/' + r.path;
        const data = {
          path: !isHttp(r.path) ? getNormalPath(basePath + p) : r.path,
          title: [...prefixTitle],
          query: '',
        };
      }

      if(r.query) {
        data.query = r.query;
      }

      // recurisive child routes
      if(r.children){
        const tempRoutes = generateRoutes(r.children, data.path, data.title);
        if (tempRoutes.length >= 1) {
          res = [...res, ...tempRoutes];
        }
      }
    });
    return res;
  };
  watch(show, (value) => {
    if (value) {
      document.body.addEventListener('click', close);
    } else {
      document.body.removeEventListener('click', close);
    }
  });

  watch(searchPool, (list) => {
    initFuse(list);
  });

</script>
  
<style>
  
</style>