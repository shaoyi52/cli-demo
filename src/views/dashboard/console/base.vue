<template>
  <div class="page">
    <!-- 顶部 card  -->
    <top-panel />
    <middle-chart />
    <rank-list />
  </div>
</template>

<script setup name="dashboradBase" lang="ts">
import TopPanel from './components/topPanel.vue';
import MiddleChart from './components/MiddleChart.vue';
import RankList from './components/RankList.vue';
</script>
<style lang="scss" scoped>

</style>
