<template>
  <!-- 左侧菜单栏 -->
  <aside class="main-sidebar">
    <user-panel />
    <el-scrollbar :class="sideTheme" wrap-class="scrollbar-wrapper">
      <transition :enter-active-class="proxy?.animate.menuSearchAnimate.enter" mode="out-in">
        <el-menu
          :default-active="activeMenu"
          :collapse-transition="false"
          mode="vertical"
        >
          <sidebar-item v-for="(route, index) in sidebarRouters" :key="route.path + index" :item="route" :base-path="route.path" />
        </el-menu>
      </transition>
    </el-scrollbar>
  </aside>
</template>
  
<script setup lang='ts' name="Sider">
  import usePermissionStore from '@/store/modules/permission';
  import SidebarItem from './SidebarItem.vue';
  import UserPanel from './userPanel.vue';

  const route = useRoute();
  const permissionStore = usePermissionStore();
  const sidebarRouters =  computed<RouteOption[]>(() => permissionStore.sidebarRouters);
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;

  const activeMenu = computed(() => {
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
          return meta.activeMenu;
      }
      return path;
  });
</script>
  
<style scoped lang="scss">
.main-sidebar{
  position: fixed;
  width: 200px;
  top: 0;
  left: 0;
  padding-top: 60px;
  height: 100%;
  z-index:9;
  background: #fff;

  :deep(.el-scrollbar){
    height: calc(100vh - 135px) ;
  }
  
  :deep(.el-menu) {
    //height:30px;
    border-right: 0px;
  }
 
}

aside{
    background: #fff; 
  }
  
</style>