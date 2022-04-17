<template>
  <div class="sale">
      <div class="title">订单管理</div>
      <el-table :data="orderTable" style="width: 100%">
          <el-table-column prop="orderId" label="订单号"></el-table-column>
          <el-table-column prop="orderPrice" label="订单金额"></el-table-column>
          <el-table-column prop="date" label="下单时间"></el-table-column>
          <el-table-column prop="username" label="用户名"></el-table-column>
          <el-table-column prop="addressInfo.userName" label="收货人"></el-table-column>
          <el-table-column prop="addressInfo.userPhone" label="收货人手机号"></el-table-column>
          <el-table-column prop="addressInfo.userAddress" label="收货地址"></el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
    data(){
        return {
            orderTable: []
        }
    },
    methods:{
        getOrder(){
            this.$axios.get('/getOrder').then(res=>{
                for(const item of res.data){
                    item.goodsInfo = JSON.parse(item.goodsInfo)
                    item.addressInfo = JSON.parse(item.addressInfo)
                }
                this.orderTable = res.data
                console.log(this.orderTable);
            })
        }
    },
    mounted(){
        this.getOrder()
    }
}
</script>

<style lang="less" scoped>
    .sale{
        width: 100%;
        height: 100%;
        .title{
            font-size: 18px;
            font-weight: 600;
        }
        a:hover{
          color: #D0104C;
        }
    }
</style>