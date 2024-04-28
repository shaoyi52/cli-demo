<template>
  <div>
    <el-form>
      <el-card shadow="hover">
        <el-form ref="queryFormRef" :model="FormData" :inline="true" label-width="68px">
          <div class="base-form-container">
            <div class="base-form-item">
              <div class="base-form-container-title">
                合同信息
              </div>
              <!-- 表单内容 -->

              <!-- 合同名称,合同类型 -->
              <el-row :gutter="15">
                <el-col :span="12">
                  <el-form-item label="合同名称" prop="noticeTitle">
                    <el-input v-model="FormData.noticeTitle" placeholder="请输入合同名称题" clearable style="width: 200px" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="合同类型" prop="contractType">
                    <el-select v-model="FormData.contractType" placeholder="请输入合同类型" clearable style="width: 200px">
                      <el-option v-for="TYPE in TYPE_OPTIONS" :key="TYPE.value" :label="TYPE.label" :value="TYPE.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 合同收付类型 -->
              <el-row :gutter="15">
                <el-col :span="16">                  
                  <el-form-item label="合同收付类型" prop="noticeTitle">
                    <el-radio-group v-model="FormData.contractPayType">
                      <el-radio key="0" label="0">
                        付款
                      </el-radio>
                      <el-radio key="1" label="1">
                        收款
                      </el-radio>
                    </el-radio-group>
                    <div>
                      <el-input v-model="FormData.pay" placeholder="请输入金额" clearable style="width: 160px" />
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="15">
                <el-col :span="24">
                  <el-form-item>
                    <el-button type="primary" icon="Search" @click="handleConfirm">
                      确认
                    </el-button>
                    <el-button icon="Refresh" @click="handleCancel">
                      取消
                    </el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </el-card>
    </el-form>
  </div>
</template>
  
<script setup lang='ts'>
  const INITIAL_DATA= {
    name: '',
    type: '',
    partyA: '',
    partyB: '',
    signDate: '',
    startDate: '',
    endDate: '',
    payment: '1',
    amount: 0,
    comment: '',
    files: [],
  };
  const FormData= ref({...INITIAL_DATA});
  const TYPE_OPTIONS= [
        { label: '类型A', value: '1' },
        { label: '类型B', value: '2' },
        { label: '类型C', value: '3' },
      ];

  const handleConfirm=()=>{

  };
  const handleCancel=()=>{
    
  };
</script>
  
<style>
  
</style>