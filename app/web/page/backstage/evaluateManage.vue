<template>
  <div class="sale">
      <div class="title">评价管理</div>
      <el-table :data="evaluateTable" style="width: 100%">
          <el-table-column label="商品图片">
              <template slot-scope="scope">
                  <img :src="scope.row.imageList" style="width: 100px; height: 50px;">
              </template>
          </el-table-column>
          <el-table-column prop="goodsTitle" label="评论商品"></el-table-column>
          <el-table-column prop="username" label="评价用户"></el-table-column>
          <el-table-column prop="evaluateInfo" label="评价内容"></el-table-column>
          <el-table-column prop="date" label="评价时间"></el-table-column>
          <el-table-column label="操作">
              <template slot-scope="scope">
                  <a href="JavaScript:void(0)" @click="deleteEvaluate(scope.row)">删除评论</a>
              </template>
          </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
    data(){
        return {
            evaluateTable: []
        }
    },
    methods:{
        deleteEvaluate(value){
             this.$confirm('是否删除该评论?', '删除评论', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post('/deleteEvaluate',{evaluateId: value.evaluateId}).then(res=>{
                    if(res.data.code == 200){
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        })
                        this.getEvaluate()
                    }else{
                        this.$message({
                            message: res.data.message,
                            type: 'error'
                        })
                    }
                })
            }).catch(() => {
                         
            });
        },
        getEvaluate(){
            this.$axios.get('/getEvaluate').then(res=>{
                this.evaluateTable = res.data
            })
        }
    },
    mounted(){
        this.getEvaluate()
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