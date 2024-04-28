<template>
  <el-row :gutter="16">
    <el-col v-for="(item, index) in panelList" :key="item.title" :xs="24" :sm="12" :md="12" :lg="6">
      <el-card
        :bordered="false"
        :header="item.title"
        :class="{ 'dashboard-item': true,'dashboard-item--main-color': index == 0 }"
        :style="{ minHeight: '168px' }"
      >
        <div class="dashboard-item-top">
          <span :style="{ fontSize: `${resizeTime * 36}px` }">{{ item.number }}</span>
        </div>
        <div class="dashboard-item-left">
          <div
            v-if="index === 0"
            id="moneyContainer"
            class="dashboard-chart-container"
            :style="{ width: `${resizeTime * 120}px`, height: `${resizeTime * 66}px` }"
          />
          <div
            v-else-if="index == 1"
            id="refundContainer"
            class="dashboard-chart-container"
            :style="{ width: `${resizeTime * 120}px`, height: `${resizeTime * 42}px` }"
          />
          <span v-else-if="index == 2">
            <svg-icon style="font-size: 24px;" color="var(--el-color-primary)" icon-class="peoples" />
            <!-- <peoples-icon /> -->
          </span>
          <span v-else>
            <svg-icon style="font-size: 24px;" color="var(--el-color-primary)" icon-class="skill" />
            <!-- <peoples-icon /> -->
          </span>
        </div>
        <template #footer>
          <div class="dashboard-item-bottom">
            <div class="dashboard-item-block">
              自从上周以来
              <Trend
                class="dashboard-item-trend"
                :type="item.upTrend ? 'up' : 'down'"
                :is-reverse-color="index === 0"
                :describe="item.upTrend || item.downTrend"
              />
            </div>
            <el-icon>
              <ArrowRight />
            </el-icon>
          </div>
        </template>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { PANE_LIST } from '@/services/service-base';
import IconSelect from '@/components/iconSelect';
import { LineChart, BarChart } from 'echarts/charts';
import * as echarts from 'echarts/core';
import type * as ec from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import Trend from './trend.vue';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
} from 'echarts/components';
import { constructInitDashboardDataset } from '../index';

echarts.use([LineChart, BarChart, CanvasRenderer, TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent,
  TransformComponent]);
const panelList = ref(PANE_LIST);
const resizeTime = ref(1);
const moneyCharts = ref<ec.ECharts>();
const refundChart = ref<ec.ECharts>();
const moneyContainer = ref<HTMLElement | null>();
const refundContainer = ref<HTMLElement | null>();
onMounted(() => {
  window.addEventListener('resize', updateContainer, false);
  renderCharts();
});
const updateContainer = () => {
  console.log('updateContainer');
  if (document.documentElement.clientWidth >= 1400 && document.documentElement.clientWidth < 1920) {
    resizeTime.value = parseFloat((document.documentElement.clientWidth / 2080).toFixed(2));
  } else if (document.documentElement.clientWidth < 1080) {
    resizeTime.value = parseFloat((document.documentElement.clientWidth / 1080).toFixed(2));
  } else {
    resizeTime.value = 1;
  }
  moneyCharts.value?.resize({
    // 根据父容器的大小设置大小
    width: resizeTime.value * 120,
    height: resizeTime.value * 66,
  });

  refundContainer.value?.resize({
    // 根据父容器的大小设置大小
    width: resizeTime.value * 120,
    height: resizeTime.value * 42,
  });
};
const renderCharts = () => {
  // 收入汇总图
  if (!moneyContainer.value) moneyContainer.value = document.getElementById('moneyContainer');
  if (moneyContainer.value) {
    moneyCharts.value = echarts.init(moneyContainer.value);
    moneyCharts.value.setOption(constructInitDashboardDataset('line'));
   /*  moneyCharts.value.setOption({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        show: false,
      },

      yAxis: {
        type: 'value',
        show: false,
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
          showSymbol: true,
          symbol: 'circle',
          symbolSize: 2,
        },
      ],
    }); */
  }
  // 退款图
  if (!refundContainer.value) refundContainer.value = document.getElementById('refundContainer');
  if (refundContainer.value) {
    refundChart.value = echarts.init(refundContainer.value);
    refundChart.value.setOption(constructInitDashboardDataset('bar'));
  }

};
onBeforeUnmount(() => {
  console.log('onBeforeUnmount');
  window.removeEventListener('resize', updateContainer);
});

</script>

<style lang="scss" scoped>
.dashboard-item {
  padding: 8px;
  font-size: 14px;
  // 针对第一个卡片需要反色处理
  &--main-color {
    background: var(--el-color-primary);
    color: var(--el-color-white);
    .dashboard-item-block {
      color: var(--el-color-white);
      opacity: 0.6;
    }
  }

  ::v-deep .el-card__header {
    border-bottom: none;
  }

  ::v-deep .el-card__body {
    position: relative;
  }

  ::v-deep .el-card__footer {
    border-top: none;
  }

  &-left {
    position: absolute;
    top: 0;
    right: 32px;

    >span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      background: var(--el-color-primary-light-9);
      border-radius: 50%;
    }
  }

  &-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &-block {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 22px;
    color: var(--el-color-info-light-5)
  }
  &-trend {
    margin-left: 8px;
  }
}
</style>
