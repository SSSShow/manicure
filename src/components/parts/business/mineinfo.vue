<template>
  <div class="container" style="padding-top: 5rem">
    <span style="margin-left: 6rem">商家id</span>
    <span>{{businessinfo.businessid}}</span>
    <br>
    <span style="margin-left: 6rem">商铺名</span>
    <span>{{businessinfo.businessname}}</span>
    <br>
    <br>


    <el-button style="margin-left: 6rem;margin-top: 2rem;" type="primary" @click="logout()">退出登录</el-button>




  </div>

</template>


<style scoped>
.container p{
  line-height: 3rem;
}
</style>

<script>
export default{
    name:'mineinfo',
    data(){
        return{
          businessinfo:JSON.parse(localStorage.getItem("business")),
        }
    },
  methods:{
        logout:function () {
          localStorage.clear();
          //路由跳转到登录页
          this.$router.push({path:'/login'})
        }
  }
}
</script>
