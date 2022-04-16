<template>
   <div class='main'>
     <LayoutContent>
       <div slot='content'><slot name='main'></slot></div>
     </LayoutContent>
   </div>
</template>

<script type='babel'>
  import  'asset/css/common.less'
  import 'asset/fonts/iconfont.css'
  import LayoutContent from './content/content';
  export default {
    components: {
      LayoutContent,
    }
  };
</script>

<style lang="less" scoped>
  .main{
    min-width: 1200px;
  }
  .footer{
    margin-top: 40px;
  }
</style>