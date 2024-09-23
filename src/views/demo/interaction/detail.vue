<template>
  <div class="detail-container">
    <el-card header="基本信息">
      <el-button plain @click="centerDialogVisible = true">
        Click to open the Dialog
      </el-button>
      <el-button plain @click="centerDialogVisible = true">
        Click to open the Dialog
      </el-button>
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
          No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <Flex justify="flex-start" align="center" gap="20">
      <div>左对齐内容</div>
      <div>中间对齐内容</div>
      <div>右对齐内容</div>
    </Flex>
    <CountTo />
    <Authority value="admin1">
      <div>test1</div>
    </Authority>

    <el-dialog v-model="centerDialogVisible" title="Warning" width="500" center>
      <span>
        It should be noted that the content will not be aligned in center by
        default
      </span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible = false">
            Cancel
          </el-button>
          <el-button type="primary" @click="centerDialogVisible = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { createVNode, render as vueRender,Teleport,ref  } from 'vue';
import TestComponent from './TestComponent.tsx';
let centerDialogVisible=ref(false);

let confirmDialogInstance=null;
const container = document.createDocumentFragment();
let render=()=> {
    const vm = createVNode(TestComponent);
    vueRender(vm, container );
    return vm;
  };
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
