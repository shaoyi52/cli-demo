<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for=" (item,index) in levelList " :key="item.path">
        <span v-if="item.redirect==='noRedirect'||levelList.length-1==index">{{item.meta.title}}</span>
        <a v-else @click.prevent="handleLink(item)">{{item.meta.title}}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { RouteLocationMatched} from 'vue-router'
const route = useRoute();
const router = useRouter();
const levelList = ref<RouteLocationMatched[]>([]);

const getBreadcrumb= () =>{
  // only show routes with meta.title
  let matched =route.matched.filter(item=>item.meta&&item.meta.title) as RouteLocationMatched[]
  const  first  = matched[0]
  // 判断是否为首页
  if(!isDashboard(first)){
    matched=([{path: '/index', meta: { title: '首页' }}] as any).concat(matched)
  }

  levelList.value=matched.filter(item=>item.meta&&item.meta.title && item.meta.breadcrumb!==false)
}

const isDashboard=(route:RouteLocationMatched)=>{
  const name = route&& route.name as string;
  if(!name){
    return false
  }
  return name.trim() === 'Index'
}

const handleLink = (item:RouteLocationMatched)=>{
  const {redirect,path}=item;
  redirect?router.push(redirect as string):router.push(path)
}

// 监听只要作用域变量有变就执行；需手动清除副作用
watchEffect(()=>{
  if(route.path.startsWith("/redirect/")) return
  getBreadcrumb();
})

onMounted(()=>{
  getBreadcrumb();
})
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
