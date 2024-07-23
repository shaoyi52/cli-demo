<template>
  <Teleport to="body">
    <transition name="zoom-fade" mode="out-in">
      <div v-if="visible" class="app-search-modal">
        <div class="app-search-modal-content">
          <div :class="`app-search-modal-input__wrapper`">
            <el-input ref="inputRef" placeholder="搜索" @chang="handleSearch">
              <template #prefix>
                <el-icon class="el-input__icon">
                  <search />
                </el-icon>
              </template>
            </el-input>
            <span :class="`app-search-modal-cancel`" @click="handleClose">取消</span>
          </div>
          <div v-show="getIsNotData" :class="`app-search-modal-not-data`" class="not-data">
            暂无相关数据
          </div>

          <ul v-show="!getIsNotData" :class="`app-search-modal-list`" class="list">
            <li
              v-for="(item,index) in searchResult"
              :ref="setRefs(index)" 
              :key="item.path"
              :data-index="index"
              :class="[
                `app-search-modal-list__item`,
                {[`app-search-modal-list__item-acitive`]: activeIndex=== index}
              ]"
              @mouseenter="handleMouseenter"
              @click="handleEnter"
            >
              <div>{{ item.name }}</div>
            </li>
          </ul>
        </div>
      </div>        
    </transition>
  </Teleport>
</template>
  
<script setup lang='ts'>
import { Search } from '@element-plus/icons-vue';
import { ref, watch,nextTick,unref, computed} from 'vue';
import { useRefs } from '@/hooks/core/useRefs';
import {useMenuSearch} from './useMenuSearch';
const inputRef = ref();
const props = defineProps({
  visible: { type: Boolean },
});
const emit = defineEmits(['close']);
const scrollWrap = ref(null);
const [refs, setRefs] = useRefs();

const {handleSearch, searchResult, keyword, activeIndex, handleMouseenter, handleEnter}=useMenuSearch(refs, scrollWrap, emit);
const getIsNotData= computed(()=> !keyword || unref(searchResult).length===0);

watch(()=>props.visible,(visible)=>{
  visible&&nextTick(()=>{
    unref(inputRef)?.focus();
  });
});

function handleClose() {
  searchResult.value = [];
  emit('close');
}
</script>
  
<style lang="scss" scoped>
.app-search-modal{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 800;
  display: flex;
  width: 100%;
  height: 100%;
  padding-top: 50px;
  background-color: rgb(0 0 0 / 25%);
  justify-content: center;

  &-content{
    position: relative;
    width: 632px;
    margin: 0 auto auto;
    background-color: #fff;
    border-radius: 16px;
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 25%);
    flex-direction: column;
  }

  &-input__wrapper {
    display: flex;
    padding: 14px 14px 0;
    justify-content: space-between;
    align-items: center;
  }

  &-input {
    width: 100%;
    height: 48px;
    font-size: 1.5em;
    color: #1c1e21;
    border-radius: 6px;

    span[role='img'] {
      color: #999;
    }
  }

  &-cancel {
    display: none;
    font-size: 1em;
    color: #666;
  }

  &-not-data {
    display: flex;
    width: 100%;
    height: 100px;
    font-size: 0.9;
    color: rgb(150 159 175);
    align-items: center;
    justify-content: center;
  }

  &-list {
    max-height: 472px;
    padding: 0 14px;
    padding-bottom: 20px;
    margin: 0 auto;
    margin-top: 14px;
    overflow: auto;

    &__item {
      position: relative;
      display: flex;
      width: 100%;
      height: 56px;
      padding-bottom: 4px;
      padding-left: 14px;
      margin-top: 8px;
      font-size: 14px;
      color: #030303;
      cursor: pointer;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 1px 3px 0 #d4d9e1;
      align-items: center;

      > div:first-child,
      > div:last-child {
        display: flex;
        align-items: center;
      }

      &--active {
        color: #fff;
        background-color: #2c74e0;

        .app-search-modal-list__item-enter {
          opacity: 1;
        }
      }

      &-icon {
        width: 30px;
      }

      &-text {
        flex: 1;
      }

      &-enter {
        width: 30px;
        opacity: 0;
      }
    }
  }
}
  
</style>