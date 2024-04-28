<template>
  <div class="detail-container">
    <el-card header="基本信息">
      <el-descriptions>
        <el-descriptions-item label="Username">
          kooriookami
        </el-descriptions-item>
        <el-descriptions-item label="Telephone">
          18100000000
        </el-descriptions-item>
        <el-descriptions-item label="Place">
          Suzhou
        </el-descriptions-item>
        <el-descriptions-item label="Remarks">
          <el-tag size="small">
            School
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Address">
          No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
          Province
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card header="基本信息">
      <el-descriptions>
        <el-descriptions-item label="Username">
          kooriookami
        </el-descriptions-item>
        <el-descriptions-item label="Telephone">
          18100000000
        </el-descriptions-item>
        <el-descriptions-item label="Place">
          Suzhou
        </el-descriptions-item>
        <el-descriptions-item label="Remarks">
          <el-tag size="small">
            School
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Address">
          No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
          Province
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <Flex justify="flex-start" align="center" gap="20">
      <div>左对齐内容</div>
      <div>中间对齐内容</div>
      <div>右对齐内容</div>
    </Flex>
  </div>
</template>
  
<script setup lang='ts'>
  import Flex from '@/components/Flex';
</script>
  
<style lang="scss" scoped>
  .detail{
    &-container{
      padding: 24px;
      :deep(.el-card + .el-card ){
        margin-top: 24px;
      }
    }
  }
</style>