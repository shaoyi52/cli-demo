<template>
  <div class="step-form-container">
    <!-- 简单步骤 -->
    <el-card :bordered="false" shadow="never">
      <el-steps :active="activeForm" align-center>
        <el-step
          title="申请提交"
          description="已于12月21日提交"
        />
        <el-step title="电子发票" description="预计1～3个工作日" />
        <el-step title="发票已邮寄" description="电子发票开出后7个工作日内联系" />
        <el-step title="完成" description="" />
      </el-steps>
    </el-card>
    <!-- 分步表单1 -->
    <div v-show="activeForm === 1">
      <div class="ruleTips">
        <el-alert
          title="发票开具规则："
          type="info"     
          show-icon
        >
          <template #default>
            <p>
              1、申请开票后，电子发票在1～3个工作日内开具；增值税专用发票（纸质）如资质审核通过，将在电子发票开具后10个工作日内为您寄出；
            </p>
            <p>2、开票金额为您实际支付金额；</p>
            <p>3、如有疑问请直接联系：13300001111。</p>
          </template>
        </el-alert>
      </div>
      <el-form ref="formRef1" class="step-form-wrap" :rules="FORM_RULES" :model="FormData1" label-width="auto">
        <el-form-item label="合同名称" prop="name">          
          <el-input v-model="FormData1.name" placeholder="请输入合同名称题" clearable style="width: 480px" />
        </el-form-item>
        <el-form-item label="发票类型" prop="invoiceType">
          <el-select v-model="FormData1.invoiceType" placeholder="请输入发票类型" clearable style="width: 480px">
            <el-option v-for="TYPE in TYPE_OPTIONS" :key="TYPE.value" :label="TYPE.label" :value="TYPE.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="开票金额">
          ￥{{ FormData1.amount }}
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit(2)">
            提交申请
          </el-button>         
        </el-form-item>
      </el-form>
    </div>
    <!-- 分布表单2 -->
    <div v-show="activeForm === 2">
      <el-form ref="formRef2" :model="FormData2" :rules="FORM_RULES" label-width="auto">
        <el-form-item label="发票抬头" prop="title">
          <el-input v-model="FormData2.title" placeholder="请输入发票抬头" clearable style="width: 480px" />
        </el-form-item>
        <el-form-item label="纳税人识别号" prop="taxNum">
          <el-input v-model="FormData2.taxNum" placeholder="请输入纳税人识别号" clearable style="width: 480px" />
        </el-form-item>

        <el-form-item label="单位地址" prop="address">
          <el-input v-model="FormData2.address" placeholder="请输入单位地址" clearable style="width: 480px" />
        </el-form-item>
        <el-form-item label="开户行" prop="bank">
          <el-input v-model="FormData2.bank" placeholder="请输入开户行" clearable style="width: 480px" />
        </el-form-item>
        <el-form-item label="银行账号" prop="bankAccount">
          <el-input v-model="FormData2.bankAccount" placeholder="请输入银行账号" clearable style="width: 480px" />
        </el-form-item>
        <el-form-item label="通知邮箱" prop="email">
          <el-input v-model="FormData2.email" placeholder="请输入通知邮箱" clearable style="width: 480px" />
        </el-form-item>        
        <el-form-item label="通知手机" prop="tel">
          <el-input v-model="FormData2.tel" placeholder="请输入通知手机" clearable style="width: 480px" />
        </el-form-item>        
        <el-form-item>
          <el-button type="primary" @click="handleReback(1)">
            上一步
          </el-button>    
          <el-button type="primary" @click="handleSubmit(3)">
            下一步
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 分布表单3 -->
    <div v-show="activeForm === 3">
      <el-form ref="formRef3" :model="FormData3" :rules="FORM_RULES" label-width="auto">
        <el-form-item label="收货人" prop="consignee">
          <el-input v-model="FormData3.consignee" placeholder="请输入收货人" clearable style="width: 480px" />
        </el-form-item>
        <el-form-item label="手机号码" prop="mobileNum">
          <el-input v-model="FormData3.mobileNum" placeholder="请输入手机号码" clearable style="width: 480px" />
        </el-form-item>
        <el-form-item label="收货地址" prop="deliveryAddress">
          <el-select v-model="FormData3.deliveryAddress" placeholder="请输入收货地址" clearable style="width: 480px">
            <el-option v-for="(item, index) in ADDRESS_OPTIONS" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" prop="fullAddress">
          <el-input v-model="FormData3.fullAddress" type="textarea" :height="124" style="width: 480px" placeholder="请输入详细地址" />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="handleReback(2)">
            上一步
          </el-button>    
          <el-button type="primary" @click="handleSubmit(4)">
            下一步
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 分布表单4 -->
    <div v-show="activeForm === 4" class="step-form-complete">
      <el-space wrap size="24" direction="vertical">
        <el-icon :size="32" style="color:var(--el-color-success)">
          <CircleCheckFilled />
        </el-icon>
        <p class="text">
          完成开票申请
        </p>
        <p class="tips">
          预计1～3个工作日会将电子发票发至邮箱，发票邮寄请耐心等待
        </p>
        <div class="button-group">
          <el-button type="primary" @click="handleReback(1)">
            再次申请
          </el-button>
          <el-button @click="complete">
            查看进度
          </el-button>
        </div>
      </el-space>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import {ref} from 'vue';
import { 
  ADDRESS_OPTIONS,
  INITIAL_DATA1,
  INITIAL_DATA2,
  INITIAL_DATA3,
  NAME_OPTIONS,
  FORM_RULES,
  TYPE_OPTIONS} from './constants';

  const activeForm=ref(1);
  const formRef1=ref();
  const formRef2=ref();
  const formRef3=ref();

  const FormData1= ref({...INITIAL_DATA1});
  const FormData2= ref({...INITIAL_DATA2});
  const FormData3= ref({...INITIAL_DATA3});

  const handleSubmit=(val)=>{    
      val==2&&formRef1.value.validate((valid) => {
        if (valid) {
          activeForm.value=val;
        } else {
          console.log('error submit!');
          return false;
        } 
      });
      val==3&&formRef2.value.validate((valid) => {
        if (valid) {
          activeForm.value=val;
        } else {
          console.log('error submit!');
          return false;
        } 
      });
      val==4&&formRef3.value.validate((valid) => {
        if (valid) {
          activeForm.value=val;
        } else {
          console.log('error submit!');
          return false;
        } 
      });
    
  };
  const handleReback=(val)=>{
    activeForm.value=val;
  };
  const handleConfirm=()=>{

  };
  const handleCancel=()=>{
    
  };
</script>
  
<style lang="scss" scoped>
  .step-form{
    &-container{
      padding: 24px;
      :deep(.el-card){
        border: none;
      }
    }
    &-wrap{
      padding: 24px 0;
    }
    &-complete{
      padding: 24px 0;
      text-align: center;     
    }
  }
</style>