<template>
  <div class="sale">
      <div class="title">商品管理</div>
      <el-button type="primary" size="small" style="margin: 10px 0px;" @click="addGoods">添加商品信息</el-button>
      <div class="user-table">
            <el-table :data="goodsTable" style="width: 100%">
                <el-table-column prop="goodsId" label="商品ID" min-width="40px"></el-table-column>
                <el-table-column prop="goodsId" label="商品图片">
                    <template slot-scope="scope">
                        <img :src="scope.row.imageList" style="width: 100px; height: 50px;" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="goodsTitle" label="商品名" min-width="80px"></el-table-column>
                <el-table-column prop="categoryId" label="商品类型" min-width="80px">
                    <template slot-scope="scope">
                        {{ scope.row.categoryId | categoryFilter }}
                    </template>
                </el-table-column>
                <el-table-column prop="goodsStatus" label="商品标签" min-width="60px"></el-table-column>
                <el-table-column prop="goodsTag" label="商品简介" min-width="120px"></el-table-column>
                <el-table-column prop="goodsPrice" label="商品价格（元）" min-width="80px"></el-table-column>
                <el-table-column prop="goodsStock" label="商品库存" min-width="60px"></el-table-column>
                <el-table-column label="操作" min-width="140px">
                    <template slot-scope="scope">
                        <a href="JavaScript:void(0)" @click="exitGoods(scope.row)">编辑商品信息</a>
                        <a style="margin-left: 10px;" href="JavaScript:void(0)" @click="deleteGoods(scope.row)">删除商品</a>
                    </template>
                </el-table-column>
            </el-table>
      </div>
      <el-dialog :title="changeTitle" :visible.sync="dialogGoodsInfo" width="500px">
        <div style="margin-top: -20px; margin-bottom: -40px;">
            <el-form ref="changeGoods" :model="changeGoods" label-width="100px">
                <el-form-item label="商品名">
                    <el-input v-model="changeGoods.goodsTitle" size="small"></el-input>
                </el-form-item>
                <el-form-item label="商品类型" >
                    <el-select size="small" style="width: 100%;" v-model="changeGoods.categoryId" placeholder="请选择商品类型">
                        <el-option :value="1" label="儿童床"></el-option>
                        <el-option :value="2" label="儿童书桌"></el-option>
                        <el-option :value="3" label="儿童灯具"></el-option>
                        <el-option :value="4" label="儿童饰品"></el-option>
                        <el-option :value="5" label="儿童椅"></el-option>
                        <el-option :value="6" label="儿童沙发"></el-option>
                        <el-option :value="7" label="儿童柜"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品标签">
                    <el-input v-model="changeGoods.goodsStatus" size="small"></el-input>
                </el-form-item>
                <el-form-item label="商品简介">
                    <el-input v-model="changeGoods.goodsTag" size="small"></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input v-model="changeGoods.goodsPrice" size="small"></el-input>
                </el-form-item>
                <el-form-item label="库存">
                    <el-input v-model="changeGoods.goodsStock" size="small"></el-input>
                </el-form-item>
                <el-form-item label="商品图片路径">
                    <el-input v-model="changeGoods.imageList" size="small"></el-input>
                </el-form-item>
                <el-form-item label="商品材质">
                    <el-input v-model="changeGoods.texture" size="small"></el-input>
                </el-form-item>
                <el-form-item label="商品颜色">
                    <el-input v-model="changeGoods.color" size="small"></el-input>
                </el-form-item>
                <el-form-item label="商品规格">
                    <el-input v-model="changeGoods.size" size="small"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button size="mini" type="primary" @click="confirmGoods">确 定</el-button>
            <el-button size="mini" @click="dialogGoodsInfo = false">取 消</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
export default {
    filters:{
        categoryFilter(value){
            switch(value){
                case 1: return '儿童床'
                case 2: return '儿童书桌'
                case 3: return '儿童灯具'
                case 4: return '儿童饰品'
                case 5: return '儿童椅'
                case 6: return '儿童沙发'
                case 7: return '儿童柜'
            }
        }
    },
    data(){
        return {
            goodsTable: [],
            dialogGoodsInfo: false,
            changeTitle: '添加商品信息',
            changeGoods: {},
            changeIndex: 0
        }
    },
    watch:{
        dialogGoodsInfo:{
            handler(value){
                if(!value){
                    this.changeGoods = {}
                    this.changeTitle = '添加商品信息'
                    this.changeIndex = 0
                }
            }
        }
    },
    methods:{
        deleteGoods(value){
            this.$confirm('是否删除该商品?', '删除商品', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post('/deleteGoods',{goodsId: value.goodsId}).then(res=>{
                    if(res.data.code == 200){
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        })
                        this.getGoodsInfo()
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
        addGoods(){
            this.changeTitle = '添加商品信息'
            this.dialogGoodsInfo = true;
        },
        confirmGoods(){
            if(this.changeIndex == 1){
                this.$axios.post('/confirmGoods',{...this.changeGoods}).then(res=>{
                    if(res.data.code == 200){
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        })
                        this.getGoodsInfo()
                        this.dialogGoodsInfo = false
                    }else{
                        this.$message({
                            message: res.data.message,
                            type: 'error'
                        })
                    }
                })
            }else{
                this.$axios.post('/addGoods',{...this.changeGoods}).then(res=>{
                    if(res.data.code == 200){
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        })
                        this.getGoodsInfo()
                        this.dialogGoodsInfo = false
                    }else{
                        this.$message({
                            message: res.data.message,
                            type: 'error'
                        })
                    }
                })
            }
        },
        exitGoods(value){
            this.changeTitle = '编辑商品信息'
            this.changeIndex = 1
            this.changeGoods = { ...value }
            this.dialogGoodsInfo = true;
        },
        getGoodsInfo(){
            this.$axios.get('/getGoodsInfo').then(res=>{
                this.goodsTable = res.data
            })
        },
    },
    mounted(){
        this.getGoodsInfo()
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