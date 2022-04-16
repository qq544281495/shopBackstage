<template>
  <layout title="儿童家具商城管理后台" description="Kids FURNITURE儿童家具商城管理后台">
      {{ username }}
  </layout>
</template>

<script>
export default {
  data(){
    return {
      username: ''
    }
  },
  methods:{

  },
  mounted(){
    this.window = window;
    this.username = window.sessionStorage.getItem('username');
  }
}
</script>

<style>

</style>