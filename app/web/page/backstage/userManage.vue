<template>
  <div class="sale">
      <div class="title">用户管理</div>
      <div class="user-table">
            <el-table :data="userTable" style="width: 100%">
                <el-table-column label="头像" min-width="80px">
                    <template slot-scope="scope">
                        <img style="width: 50px; height: 50px; border-radius: 50%;" :src="scope.row.userAvatar" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="username" label="用户名" min-width="60px"></el-table-column>
                <el-table-column prop="phone" label="手机号" min-width="100px"></el-table-column>
                <el-table-column prop="email" label="邮箱" min-width="120px"></el-table-column>
                <el-table-column prop="name" label="姓名" min-width="60px"></el-table-column>
                <el-table-column prop="identityNo" label="身份证号" min-width="120px"></el-table-column>
                <el-table-column label="账号权限">
                    <template slot-scope="scope">
                        {{ scope.row.verify ? '管理账号' : '普通账户'}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="140px">
                    <template slot-scope="scope">
                        <a href="JavaScript:void(0)" @click="exitUser(scope.row)">编辑用户信息</a>
                        <a style="margin-left: 10px;" href="JavaScript:void(0)" @click="deleteUser(scope.row)">删除用户</a>
                    </template>
                </el-table-column>
            </el-table>
      </div>
      <el-dialog title="编辑用户信息" :visible.sync="dialogUserInfo" width="500px">
        <div style="margin-top: -20px; margin-bottom: -40px;">
            <el-form ref="changeUser" :model="changeUser" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="changeUser.username" size="small"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input disabled v-model="changeUser.phone" size="small"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="changeUser.email" size="small"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="changeUser.name" size="small"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="changeUser.identityNo" size="small"></el-input>
                </el-form-item>
                <el-form-item label="账户权限">
                    <el-switch v-model="changeUser.verify"></el-switch>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button size="mini" type="primary" @click="confirmUser">确 定</el-button>
            <el-button size="mini" @click="dialogUserInfo = false">取 消</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
export default {
    data(){
        return {
            userTable: [],
            dialogUserInfo: false,
            changeUser: {}
        }
    },
    watch:{
        dialogUserInfo:{
            handler(value){
                if(!value){
                    this.changeUser = {}
                }
            }
        }
    },
    methods:{
        deleteUser(value){
            console.log(value);
            this.$confirm('是否删除该用户?', '删除用户', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post('/deleteUser',{...value}).then(res=>{
                    if(res.data.code == 200){
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        })
                        this.getUserInfo()
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
        confirmUser(){
            this.$axios.post('/confirmUser',{...this.changeUser}).then(res=>{
                if(res.data.code == 200){
                    this.$message({
                        message: res.data.message,
                        type: 'success'
                    })
                    this.getUserInfo()
                    this.dialogUserInfo = false
                }else{
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    })
                }
            })
        },
        getUserInfo(){
            this.$axios.get('/getUserInfo').then(res=>{
                this.userTable = res.data
            })
        },
        exitUser(value){
            this.changeUser = { ...value }
            console.log(this.changeUser);
            this.dialogUserInfo = true
        }
    },
    mounted(){
        this.getUserInfo()
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
    }
</style>