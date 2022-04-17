<template>
  <layout title="儿童家具商城管理后台" description="Kids FURNITURE儿童家具商城管理后台">
      <div class="backstage">
        <div class="backstage-header">
          <div class="header-title">
            <span style="font-family: Georgia;">Kids FURNITURE管理后台</span>
          </div>
          <div class="header-exit">
            <a href="JavaScript:void(0)" @click="exitLogin">退出登录</a>
          </div>
        </div>
        <div class="backstage-content">
          <div class="content-menu">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="vertical" @select="handleSelect">
              <el-menu-item index="0">
                <template slot="title">
                  <i class="el-icon-s-data"></i>
                  <span>商城销售数据</span>
                </template>
              </el-menu-item>
              <el-menu-item index="1">
                <template slot="title">
                  <i class="el-icon-s-custom"></i>
                  <span>用户管理</span>
                </template>
              </el-menu-item>
              <el-menu-item index="2">
                <template slot="title">
                  <i class="el-icon-shopping-bag-1"></i>
                  <span>商品管理</span>
                </template>
              </el-menu-item>
              <el-menu-item index="3">
                <template slot="title">
                  <i class="el-icon-shopping-cart-2"></i>
                  <span>订单管理</span>
                </template>
              </el-menu-item>
              <el-menu-item index="4">
                <template slot="title">
                  <i class="el-icon-collection"></i>
                  <span>评价管理</span>
                </template>
              </el-menu-item>
            </el-menu>
          </div>
          <div class="content-info">
            <saleData v-if="activeIndex == '0'"></saleData>
            <userManage v-if="activeIndex == '1'"></userManage>
            <goodsManage v-if="activeIndex == '2'"></goodsManage>
            <orderManage v-if="activeIndex == '3'"></orderManage>
            <evaluateManage v-if="activeIndex == '4'"></evaluateManage>
          </div>
        </div>
      </div>
  </layout>
</template>

<script>
const saleData = () => import('./saleData.vue')
const userManage = () => import('./userManage.vue')
const goodsManage = () => import('./goodsManage.vue')
const orderManage = () => import('./orderManage.vue')
const evaluateManage = () => import('./evaluateManage.vue')
export default {
  components: { saleData,userManage,goodsManage,orderManage,evaluateManage },
  data(){
    return {
      username: '',
      activeIndex: '0'
    }
  },
  methods:{
    exitLogin(){
      window.sessionStorage.removeItem('username');
      window.location.href = '/'
    },
    handleSelect(key) {
      this.activeIndex = key
    }
  },
  mounted(){
    this.window = window;
    this.username = window.sessionStorage.getItem('username');
    if(!this.username){
      window.location.href = '/'
    }
  }
}
</script>

<style lang="less" scoped>
  .backstage{
    .backstage-header{
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0px 60px 0px 20px;
      width: 100%;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid rgba(0,0,0,0.2);
      .header-title{
        font-size: 18px;
        letter-spacing: 2px;
      }
      .header-exit{
        font-size: 16px;
        a:hover{
          color: #D0104C;
        }
      }
    }
    .backstage-content{
      display: flex;
      .content-menu{
        width: 14%;
      }
      .content-info{
        box-sizing: border-box;
        width: 100%;
        height: calc(100vh - 50px);
        padding: 20px;
      }
      /deep/.el-menu{
        height: calc(100vh - 50px);
      }
    }
  }
</style>