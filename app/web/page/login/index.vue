<template>
  <layout title="儿童家具商城后台登录" description="Kids FURNITURE儿童家具商城管理后台">
    <div class="login">
      <div class="login-box">
        <div class="login-title">
          <div class="title-show">
            <img src="../../asset/images/login-icon.png" alt="">
            <p style="font-family: Georgia; margin: 20px 0px;">Kids FURNITURE</p>
            <p>儿童家具商城管理后台</p>
          </div>
        </div>
        <div class="login-content">
          <div class="content-box">
            <el-form :hide-required-asterisk="true" ref="loginForm" :rules="rules" :model="loginForm" label-width="80px">
              <el-form-item prop="username" label="账号：">
                <el-input v-model="loginForm.username"></el-input>
              </el-form-item>
              <el-form-item prop="password" label="密码：">
                <el-input v-model="loginForm.password" show-password></el-input>
              </el-form-item>
              <el-form-item>
                <el-button style="width: 100%;" type="primary" @click="userLogin">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
export default {
  data(){
    return {
      loginForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    userLogin(){
      this.$refs['loginForm'].validate((valid) => {
        if(valid) {
          this.$axios.post('/loginVerify',{
            username: this.loginForm.username,
            password: this.loginForm.password
          }).then(res=>{
            if(res.data.code == 200){
              this.$message({
                message: res.data.message,
                type: 'success'
              })
              window.sessionStorage.setItem('username',res.data.username);
              setTimeout(() =>{
                window.location.href = '/backstage'
              },1000)
            }else{
              this.$message({
                message: res.data.message,
                type: 'error'
              })
            }
          })
        }else{
          return false;
        }
      })
    }
  },
  mounted(){
    this.window = window;
  }
}
</script>

<style lang="less" scoped>
  /deep/.el-form-item__label{
    font-size: 18px;
  }
  .login{
    position: relative;
    width: 100%;
    height: 100vh;
    background: url('../../asset/images/banner.jpg') no-repeat center center;
    background-size: 100% auto;
    .login-box{
      display: flex;
      box-sizing: border-box;
      padding: 0px 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      width: 800px;
      height: 400px;
      box-shadow: 0px 0px 2px rgba(0,0,0,0.8);
      background: rgba(255, 255, 255, 0.2);
      .login-title{
        position: relative;
        flex: 3;
        border-right: 1px solid rgba(0, 0, 0, 0.2);
        img{
          width: 100px;
          height: 100px;
        }
        .title-show{
          position: absolute;
          top: 50%;
          transform: translateY(-60%);
          font-size: 20px;
          text-align: center;
        }
      }
      .login-content{
        position: relative;
        flex: 7;
        .content-box{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          width: 400px;
          height: 200px;
        }
      }
    }
  }
</style>