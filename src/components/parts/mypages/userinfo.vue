<template>
<div style="margin-top: 5rem">
  <p class="title">
    我的个人信息
  </p>
  <div class="info">
    <span>用户名：</span>
    <span>{{userinfo.username}}</span>
    <br><br>
    <span>联系号码：</span>
    <span>{{userinfo.tel}}</span>
  </div>
</div>
</template>

<style scoped>
.title{
  border-bottom: 1px dashed #e0e0e0;
  padding: 0 0 1rem 2rem;
  margin: 0 0.5rem;
  font-size: 1.6rem;
  color: #0c91e5;
}
  .info{
    margin-top: 1rem;
    padding: 0 2.5rem;
  }

  .info span{
    font-size: 1.5rem;
  }

</style>

<script>
  export default{
      name:'userInfo',
      data(){
          return{
            userinfo:JSON.parse(localStorage.getItem("user"))
          }
      }
  }

</script>
