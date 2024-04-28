<template>
  <!-- 头部区域 -->
  <div class="main-header">    
    <a class="logo">Frame Logo</a>    
    <nav v-if="routeList&&routeList.length>0" class="nav-bar">
      <el-menu
        background-color=""
        text-color="#fff"
        active-text-color="#fff"
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
      >
        <el-menu-item v-for="(item) in routeList" :key="item.key" :index="item.key">
          {{ item.title }}
        </el-menu-item>
      </el-menu>
    </nav>
    <Navbar />
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import usePermissionStore from '@/store/modules/permission';
import Navbar from '../Navbar.vue';

const permissionStore = usePermissionStore();
const routeList =  computed<RouteOption[]>(() => permissionStore.routeList);

//const filterSideRouter =  computed<RouteOption[]>(() => permissionStore.routeList);

const props = defineProps({
  logo:{
    type: String,
    default:"Frame Logo",
  },
  
});
const activeIndex=ref(routeList[0]?.key||"");

const menuList=[{
 title:"平台首页",
 key:'home'},{
 title:"商户管理",
 key:'manage'},{
 title:"微信公众号",
 key:'wexinCode'},{
 title:"微分销",
 key:'weixinsale'},{
 title:"微商城",
 key:'weixinshop'},{
 title:"微客服",
 key:'custom'},{
 title:"系统管理",
 key:'system'},{
 title:"应用中心",
 key:'app'}];
 
const handleSelect = (type) =>{
  permissionStore.filterSideRouter(type);
  activeIndex.value=type;
};
</script>

<style scoped lang="scss">
.main-header{
  max-height: 100px;
  color:#fff;
  background-color:var(--el-color-primary);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  .logo{
    display: inline-block;
    width: 200px;
    height: 45px;
    line-height: 45px;
    padding: 0 15px;

  }
  .el-menu{
    background-color:var(--el-color-primary);
  }
  .el-menu--horizontal>.el-menu-item{
    border-bottom:none;
  }
  .el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover{
    background-color: #2881db;
  }
  .el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: none;
    color: var(--el-menu-active-color)!important;
    background-color: #2881db;
}
  .nav-bar{
    display: inline-block;
  }
}
</style>
