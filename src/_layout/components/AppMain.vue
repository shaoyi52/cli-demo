<template>
  <section class="app-main">
    <div class="app-container-wrap">    
      <router-view v-slot="{ Component, route }">
        <transition :enter-active-class="animante">
          <keep-alive :include="tagsViewStore.cachedViews">
            <component :is="Component" v-if="!route.meta.link" :key="route.path" />
          </keep-alive>
        </transition>
      </router-view>
      <iframe-toggle />
    </div>
  </section>
</template>

<script setup name="AppMain" lang="ts">
import useTagsViewStore from '@/store/modules/tagsView';
import useSettingsStore from '@/store/modules/settings';
import IframeToggle  from './IframeToggle/index.vue';
import { ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const tagsViewStore = useTagsViewStore();

// 随机动画集合
const animante = ref<string>('');
const animationEnable = ref(useSettingsStore().animationEnable);
watch(()=> useSettingsStore().animationEnable, (val) => {
    animationEnable.value = val;
    if (val) {
        animante.value = proxy?.animate.animateList[Math.round(Math.random() * proxy?.animate.animateList.length)] as string;
    } else {
        animante.value = proxy?.animate.defaultAnimate as string;
    }
}, { immediate: true });
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  width: 100%;
  position: relative;
  overflow: hidden;
  background: #e0e0e0;
  .app-container-wrap{
    margin: 15px;
    width:auto;
    background:#fff;
    height: calc( 100vh - 145px );
    overflow-y: scroll;
  }
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    // min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>
<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 6px;
  }
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background-color: #c0c0c0;
  border-radius: 3px;
}
</style>
