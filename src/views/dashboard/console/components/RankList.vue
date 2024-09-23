<template>
  <el-row gutter="15">
    <el-col :xs="24" :md="12">
      <el-card title="销售订单排名">
        <template #header>
          <card-header title="销售订单排名">
            <template #actions>
              <el-radio-group v-model="saleDate" size="large">
                <el-radio-button label="本周" value="dateVal" />
                <el-radio-button label="近三个月" value="monthVal" />
              </el-radio-group>
            </template>
          </card-header>
        </template>
        <el-table :data="SALE_TEND_LIST" style="width: 100%" height="250">
          <el-table-column fixed type="index" label="排序" width="80">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span :class="getRankClass(scope.$index)" style="margin-left: 10px">{{ scope.$index+1 }}</span>
              </div>
            </template>
          </el-table-column>  
          <el-table-column label="客户名称" width="180">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span>{{ scope.row.productName }}</span>
              </div>
            </template>
          </el-table-column>  
          <el-table-column label="较上周" width="180">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span>{{ scope.row.growUp }}</span>
              </div>
            </template>
          </el-table-column>  
          <el-table-column label="订单量" width="180">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span>{{ scope.row.count }}</span>
              </div>
            </template>
          </el-table-column>  
          <el-table-column label="合同签订日期" width="180">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span>{{ scope.row.date }}</span>
              </div>
            </template>
          </el-table-column>  
          <el-table-column fixed="right" label="操作" width="180">
            <template #default="scope">
              <a class="link" @click="rehandleClickOp(scope.row)">详情</a>
            </template>
          </el-table-column>  

          <!-- <el-table-column prop="name" label="Name" width="120" />
          <el-table-column prop="state" label="State" width="120" />
          <el-table-column prop="city" label="City" width="320" />
          <el-table-column prop="address" label="Address" width="600" />
          <el-table-column prop="zip" label="Zip" width="120" /> -->
        </el-table>
      </el-card>
    </el-col>
    <el-col :xs="24" :md="12">
      <el-card title="采购订单排名">
        <template #header>
          <card-header title="销售订单排名">
            <template #actions>
              <el-radio-group v-model="saleDate" size="large">
                <el-radio-button label="本周" value="dateVal" />
                <el-radio-button label="近三个月" value="monthVal" />
              </el-radio-group>
            </template>
          </card-header>
        
          <!-- <template #actions>
          <el-radio-group default-value="dateVal">
            <t-radio-button value="dateVal">本周</t-radio-button>
            <t-radio-button value="monthVal">近三个月</t-radio-button>
          </t-radio-group>
        </template> -->
        </template>
        <el-table :data="BUY_TEND_LIST" style="width: 100%" height="250">
          <el-table-column fixed type="index" label="排序" width="80">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span :class="getRankClass(scope.$index)">{{ scope.$index+1 }}</span>
              </div>
            </template>
          </el-table-column>  
          <el-table-column label="供应商名称" width="180">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span>{{ scope.row.productName }}</span>
              </div>
            </template>
          </el-table-column>  
          <el-table-column label="较上周" width="180">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span>{{ scope.row.growUp }}</span>
              </div>
            </template>
          </el-table-column>  
          <el-table-column label="订单量" width="180">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span>{{ scope.row.count }}</span>
              </div>
            </template>
          </el-table-column>  
          <el-table-column label="合同签订日期" width="180">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span>{{ scope.row.date }}</span>
              </div>
            </template>
          </el-table-column>  
          <el-table-column fixed="right" label="操作" width="180">
            <template #default="scope">
              <a class="link" @click="rehandleClickOp(scope.row)">详情</a>
            </template>
          </el-table-column>  

          <!-- <el-table-column prop="name" label="Name" width="120" />
          <el-table-column prop="state" label="State" width="120" />
          <el-table-column prop="city" label="City" width="320" />
          <el-table-column prop="address" label="Address" width="600" />
          <el-table-column prop="zip" label="Zip" width="120" /> -->
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>
  
<script setup lang='ts' name="RankList">
import CardHeader from './CardHeader.vue';
import { SALE_TEND_LIST, BUY_TEND_LIST } from '@/services/service-base';

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
];
const getRankClass=(index)=>{
  return ['dashboard-rank__cell', { 'dashboard-rank__cell--top': index < 3 }];

};
const rehandleClickOp=(val)=> {
      console.log(val);
    };
</script>
  
<style lang="scss" scoped>
.dashboard-rank__cell{
  display:inline-flex;
  width:24px;
  height:24px;
  border-radius:50%;
  color:white;
  font-size:14px;
  justify-content: center;
  background-color:#9eacbe;
  &--top{
    background-color:var(--el-color-primary) ;
  }
}  
</style>