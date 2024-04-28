<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition :enter-active-class="animante" mode="out-in">
        <keep-alive :include="tagsViewStore.cachedViews">
          <component :is="Component" v-if="!route.meta.link" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
  <!--<div  class="app-wrapper" :style="{ '--current-color': theme }">
     <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <side-bar v-if="!sidebar.hide" class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView, sidebarHide: sidebar.hide }" class="main-container">
       <div :class="{ 'fixed-header': fixedHeader }">
        <navbar ref="navbarRef" @setLayout="setLayout" />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
       <settings ref="settingRef" /> 
    </div>
  </div> -->
</template>
  
<script setup lang='ts'>
  
</script>
  
<style lang="scss" scoped>
  .main{
    
  }
</style>