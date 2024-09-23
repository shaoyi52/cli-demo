<template>
  <div>
    <!-- 数据统计 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card style="width: 100%">
          <template #header>
            <div class="card-header">
              <Flex justify="space-between" align="center" gap="20">
                <span>访问量</span>
                <el-tag type="primary">
                  日
                </el-tag>
              </Flex>
            </div>
          </template>
          <Flex justify="space-between" align="flex-end" gap="20">
            <div>
              <el-statistic value="693700">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    Monthly Active Users
                    <el-tooltip
                      effect="dark"
                      content="Number of users who logged into the product in one month"
                      placement="top"
                    >
                      <el-icon style="margin-left: 4px" :size="12">
                        <Warning />
                      </el-icon>
                    </el-tooltip>
                  </div>
                </template>
              </el-statistic>
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>日同比</span>
                  <span class="red">
                    24%
                    <el-icon>
                      <CaretTop />
                    </el-icon>
                  </span>
                </div>
              </div>
            </div>
            <div>            
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>周同比 </span>
                  <span class="green">
                    12%
                    <el-icon>
                      <CaretBottom />
                    </el-icon>
                  </span>
                </div>
              </div>
            </div>
          </Flex>
        
          <template #footer>
            <Flex justify="space-between" align="center" gap="20">
              <span>总访问量</span>
              <span>866,821</span>
            </Flex>
          </template>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="width: 100%">
          <template #header>
            <div class="card-header">
              <Flex justify="space-between" align="center" gap="20">
                <span>销售额</span>
                <el-tag type="primary">
                  周
                </el-tag>
              </Flex>
            </div>
          </template>
          <Flex justify="space-between" align="flex-end" gap="20">
            <div>
              <el-statistic value="693700">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    Monthly Active Users
                    <el-tooltip
                      effect="dark"
                      content="Number of users who logged into the product in one month"
                      placement="top"
                    >
                      <el-icon style="margin-left: 4px" :size="12">
                        <Warning />
                      </el-icon>
                    </el-tooltip>
                  </div>
                </template>
              </el-statistic>
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>日同比</span>
                  <span class="red">
                    24%
                    <el-icon>
                      <CaretTop />
                    </el-icon>
                  </span>
                </div>
              </div>
            </div>
            <div>            
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>周同比 </span>
                  <span class="green">
                    12%
                    <el-icon>
                      <CaretBottom />
                    </el-icon>
                  </span>
                </div>
              </div>
            </div>
          </Flex>
        
          <template #footer>
            <Flex justify="space-between" align="center" gap="20">
              <span>总销售额</span>
              <span>￥866,821</span>
            </Flex>
          </template>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="width: 100%">
          <template #header>
            <div class="card-header">
              <Flex justify="space-between" align="center" gap="20">
                <span>订单量</span>
                <el-tag type="primary">
                  周
                </el-tag>
              </Flex>
            </div>
          </template>
          <Flex justify="space-between" align="flex-end" gap="20">
            <div>
              <el-statistic value="14,397">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    Monthly Active Users
                    <el-tooltip
                      effect="dark"
                      content="Number of users who logged into the product in one month"
                      placement="top"
                    >
                      <el-icon style="margin-left: 4px" :size="12">
                        <Warning />
                      </el-icon>
                    </el-tooltip>
                  </div>
                </template>
              </el-statistic>
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>日同比</span>
                  <span class="red">
                    24%
                    <el-icon>
                      <CaretTop />
                    </el-icon>
                  </span>
                </div>
              </div>
            </div>
            <div>            
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>周同比 </span>
                  <span class="green">
                    12%
                    <el-icon>
                      <CaretBottom />
                    </el-icon>
                  </span>
                </div>
              </div>
            </div>
          </Flex>
        
          <template #footer>
            <Flex justify="space-between" align="center" gap="20">
              <span>转化率</span>
              <span>511,550%</span>
            </Flex>
          </template>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="width: 100%">
          <template #header>
            <div class="card-header">
              <Flex justify="space-between" align="center" gap="20">
                <span>成交额
                </span>
                <el-tag type="primary">
                  周
                </el-tag>
              </Flex>
            </div>
          </template>
          <Flex justify="space-between" align="flex-end" gap="20">
            <div>
              <el-statistic value="693700">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    Monthly Active Users
                    <el-tooltip
                      effect="dark"
                      content="Number of users who logged into the product in one month"
                      placement="top"
                    >
                      <el-icon style="margin-left: 4px" :size="12">
                        <Warning />
                      </el-icon>
                    </el-tooltip>
                  </div>
                </template>
              </el-statistic>
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>日同比</span>
                  <span class="red">
                    24%
                    <el-icon>
                      <CaretTop />
                    </el-icon>
                  </span>
                </div>
              </div>
            </div>
            <div>            
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>周同比 </span>
                  <span class="green">
                    12%
                    <el-icon>
                      <CaretBottom />
                    </el-icon>
                  </span>
                </div>
              </div>
            </div>
          </Flex>
        
          <template #footer>
            <Flex justify="space-between" align="center" gap="20">
              <span>总成交额</span>
              <span>￥866,821</span>
            </Flex>
          </template>
        </el-card>
      </el-col>
    </el-row>

    <!-- 快捷方式 -->
    <el-row>
      <el-col :span="3">
        <Flex
          style="background: rgb(255, 255, 255);justify-content: center; padding: 20px 0;"
          justify="space-between"
          align="center"
          gap="20"
          vertical
        >
          <el-icon><Odometer /></el-icon>
          <span>分析</span>
        </Flex>
      </el-col>
    </el-row>
  </div>
</template>

  
<script setup lang='ts'>
 import {
  ArrowRight,
  CaretBottom,
  CaretTop,
  Warning,
  Odometer,
  
} from '@element-plus/icons-vue';
</script>
  
<style scoped>
  :global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}
</style>