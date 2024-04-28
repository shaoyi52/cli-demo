<template>
  <el-row :gutter="16">
    <el-col :xs="12" :md="18" :xl="18">
      <el-card>
        <!-- <template #header>
          <div class="card-header">
            <span>Card name</span>
          </div>
        </template> -->
        <template #header>
          <card-header title="统计数据" sub-title="(万元)">
            <template #actions>
              <div class="dashboard-chart-title-container">
                dashboard actions
              </div>
            </template>
          </card-header>
        </template>
        <div id="monitorContainer" ref="monitorContainer" :style="{ width: '100%', height: `${resizeTime * 326}px` }" />
      </el-card>
    </el-col>
    <el-col :xs="12" :md="6" :xl="6">
      <el-card header="销售渠道" :subtitle="currentMonth" class="dashboard-chart-card" :bordered="false">
        <template #header>
          <card-header title="销售渠道" sub-title="2024-03 至 2024-04" />
        </template>
        <div
          id="countContainer"
          ref="countContainer"
          :style="{ width: `${resizeTime * 326}px`, height: `${resizeTime * 326}px`, margin: '0 auto' }"
        />
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang='ts' name="MiddleChart">
import { onMounted, ref,markRaw } from 'vue';
import CardHeader from './CardHeader.vue';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent, LegendComponent,
} from 'echarts/components';
import { PieChart, LineChart } from 'echarts/charts';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import type * as ec from 'echarts/core';
import { getPieChartDataSet, getLineChartDataSet } from '../index';

echarts.use([LineChart, PieChart, CanvasRenderer, TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent,
  TransformComponent]);
const monitorContainer = ref<HTMLElement>();
const countContainer = ref<HTMLElement>();
const monitorChart = ref<ec.ECharts | null>();
const countChart = ref<ec.ECharts | null>();
const resizeTime = ref(1);
onMounted(() => {
  window.addEventListener('resize', updateContainer);
  renderCharts();
});


const updateContainer = () => {
  if (document.documentElement.clientWidth >= 1400 && document.documentElement.clientWidth < 1920) {
    resizeTime.value = parseFloat((document.documentElement.clientWidth / 2080).toFixed(2));
  } else if (document.documentElement.clientWidth < 1080) {
    resizeTime.value = parseFloat((document.documentElement.clientWidth / 1080).toFixed(2));
  } else {
    resizeTime.value = 1;
  }
  console.log('monitorContainer.value?.clientWidth',monitorContainer.value?.clientWidth);
  monitorChart.value?.resize({
    // 根据父容器的大小设置大小
    width: monitorContainer.value?.clientWidth,
    height: `${resizeTime.value * 326}px`,
  });
  countChart.value?.resize({
    // 根据父容器的大小设置大小
    width: `${resizeTime.value * 326}px`,
    height: `${resizeTime.value * 326}px`,
  });
};

const renderCharts = () => {
  //资金走势
  if (!monitorContainer.value) {
    monitorContainer.value = document.getElementById('monitorContainer');
  }
  if (monitorContainer.value) {
    monitorChart.value = markRaw(echarts.init(monitorContainer.value));
    monitorChart.value.setOption(getLineChartDataSet({
      textColor: '#f00',
      placeholderColor: '#f00',
      containerColor: '#f00',
    }));
  }

  //销售合同占比
  if (!countContainer.value) {
    countContainer.value = document.getElementById('countContainer');
  }
  if (countContainer.value) {
    countChart.value = echarts.init(countContainer.value);

    const option = getPieChartDataSet({ textColor: "#f00", containerColor: "#eee" });
    countChart.value.setOption(option);
  }

};
</script>

<style></style>