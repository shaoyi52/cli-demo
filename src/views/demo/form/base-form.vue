<template>
  <div>
      <el-card shadow="hover">
        <el-form ref="formRef" label-position="top" :model="FormData" label-width="68px" :rules="FORM_RULES">
          <div class="form-base-container">
            <div class="form-base-item">
              <div class="form-base-container-title">
                合同信息
              </div>
              <!-- 表单内容 -->

              <!-- 合同名称,合同类型 -->
              <el-row :gutter="15">
                <el-col :span="12">
                  <el-form-item label="合同名称" prop="name">
                    <el-input v-model="FormData.name" placeholder="请输入合同名称题" clearable style="width: 322px" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="合同类型" prop="type">
                    <el-select v-model="FormData.type" placeholder="请输入合同类型" clearable style="width: 322px">
                      <el-option v-for="TYPE in TYPE_OPTIONS" :key="TYPE.value" :label="TYPE.label" :value="TYPE.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 合同收付类型 -->
              <el-row :gutter="15">
                <el-col :span="16">                  
                  <el-form-item label="合同收付类型" prop="payment">
                    <el-space wrap size="24">
                      <el-radio-group v-model="FormData.payment">
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
                    </el-space>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="15">
                <el-col :span="12">
                  <el-form-item label="甲方" prop="partyA">
                    <el-select v-model="FormData.partyA" placeholder="请输入合同类型" clearable style="width: 322px">
                      <el-option v-for="TYPE in TYPE_OPTIONS" :key="TYPE.value" :label="TYPE.label" :value="TYPE.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="乙方" prop="partyB">
                    <el-select v-model="FormData.partyB" placeholder="请输入合同类型" clearable style="width: 322px">
                      <el-option v-for="TYPE in TYPE_OPTIONS" :key="TYPE.value" :label="TYPE.label" :value="TYPE.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="15">
                <el-col :span="12">
                  <el-form-item label="合同签订日期" prop="signDate">
                    <el-select v-model="FormData.signDate" placeholder="请输入合同类型" clearable style="width: 322px">
                      <el-option v-for="TYPE in TYPE_OPTIONS" :key="TYPE.value" :label="TYPE.label" :value="TYPE.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="合同起效日期" prop="startDate">
                    <el-select v-model="FormData.startDate" placeholder="请输入合同类型" clearable style="width: 322px">
                      <el-option v-for="TYPE in TYPE_OPTIONS" :key="TYPE.value" :label="TYPE.label" :value="TYPE.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="15">
                <el-col :span="12">
                  <el-form-item label="合同结束日期" prop="endDate">
                    <el-select v-model="FormData.endDate" placeholder="请输入合同类型" clearable style="width: 322px">
                      <el-option v-for="TYPE in TYPE_OPTIONS" :key="TYPE.value" :label="TYPE.label" :value="TYPE.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="" prop="files">
                    <el-upload
                      ref="uploadRef"
                      class="upload-demo"
                      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                      :auto-upload="false"
                    >
                      <template #trigger>
                        <el-button type="primary">
                          上传合同文件
                        </el-button>
                      </template>

                      <template #tip>
                        <div class="el-upload__tip">
                          jpg/png files with a size less than 500kb
                        </div>
                      </template>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="form-base-container-title form-title-gap">
                其它信息
              </div>

              <el-form-item label="备注" name="comment">
                <el-input v-model="FormData.comment" type="textarea" :height="124" placeholder="请输入备注" />
              </el-form-item>
              <el-row :gutter="15">
                <el-col :span="24">
                  <el-form-item>
                    <el-button type="primary" icon="Search" @click="handleConfirm(formRef)">
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
  </div>
</template>
  
<script setup lang='ts'>
  import { ref } from 'vue';
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
  const FORM_RULES = {
    name: [{ required: true, trigger: "blur", message: "请输入合同名称" }],  
  type: [{ required: true, message: '请选择合同类型',trigger: 'blur'  }],
  payment: [{ required: true, message: '请选择合同收付类型',trigger: 'blur'  }],
  amount: [{ required: true, message: '请输入合同金额',trigger: 'blur'  }],
  partyA: [{ required: true, message: '请选择甲方',trigger: 'blur'  }],
  partyB: [{ required: true, message: '请选择乙方', trigger: 'blur' }],
  signDate: [{ required: true, message: '请选择日期', trigger: 'blur' }],
  startDate: [{ required: true, message: '请选择日期',trigger: 'blur'  }],
  endDate: [{ required: true, message: '请选择日期',trigger: 'blur'  }],
};
  const formRef=ref();
  const FormData= ref({...INITIAL_DATA});
  const TYPE_OPTIONS= [
        { label: '类型A', value: '1' },
        { label: '类型B', value: '2' },
        { label: '类型C', value: '3' },
      ];

  const handleConfirm=(formEl)=>{
    if (!formEl) return;
    formEl.validate((valid) => {
      if (valid) {
        console.log('submit!');
      } else {
        console.log('error submit!');
        return false;
      }
    });
  };
  const handleCancel=()=>{
    
  };
</script>
  
<style lang="scss" scoped>
  .form-base{
    &-container{
      margin: 0 auto;
      &-title{
        font-size: 20px;
        line-height: 24px;
        color:var(--el-text-color-primary);
        margin:56px 0 32px;
      }
    }
  }
</style>