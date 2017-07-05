<template>
  <div style="margin-top: 5rem">
    <!--用户头像区-->
    <!--用户未登录-->
    <div v-if="!islogin" class="container vert" @click="change('我的')" >
      <router-link to="/login">您还未登录，立即登录~</router-link>
      <br>
      <router-link to="/register">没有账号？立即注册~</router-link>


    </div>

    <!--用户已登录-->
    <div v-if="islogin" class="container">
      <!--头像，用户名显示-->
      <div class="userinfo">
        <img src="/static/images/tx.jpg">
        <div @click="change('我的')">
          <p>{{userinfo.username}}</p>
          <router-link  to="/userinfo"  >
            个人信息 >
          </router-link>
        </div>


      </div>
      <div style="clear: both"></div>

      <div class="my_show" @click="change('我的')">
        <router-link to="/mycomment" class="myinfo">我的评论</router-link>
        <router-link to="/myarticle" class="myinfo">我的文章</router-link>
        <router-link to="/mycollection" class="myinfo">我的收藏</router-link>
        <router-link to="/mynews" class="myinfo">我的消息</router-link>
      </div>


      <el-button style="margin-top: 2rem;float: right;" type="primary" @click="log_off()">退出登录</el-button>


    </div>

    <!--<div class="test">-->
      <!--<ul>-->
        <!--<li v-for="item in list">-->
          <!--{{item.name}}-->
        <!--</li>-->
      <!--</ul>-->
    <!--</div>-->

  </div>

</template>

<style scoped>

a{
  display: block;
  text-align: center;
  color:#0c91e5;
}
  .userinfo img{
    float: left;
    width: 20%;
    margin-right: 2rem;
    border: 0.2rem solid gray;
    border-radius: 50%
  }
  .userinfo div{
    float: left;
  }
  .userinfo div p{
    margin: 0.5rem 0;
  }
  .my_show{
    margin-top: 1rem;
    border-top:1px solid #9e9e9e;
  }
  .myinfo{
    color: #3c3c3c;
    padding: 1rem 0;
    border-bottom: 1px dashed #7f8c8d;
    margin-bottom: 0;
    text-align: left;
  }
.vert{
  margin-top: 70%;

}

</style>

<script>
  export default{
    name: 'mine',
    data(){
      return {
//        islogin:this.$store.state.islogin,//vuex中存储的登录状态

//        userinfo:this.$store.state.user,//vuex中存储的用户信息
        islogin:localStorage.getItem("user")?true:false,
        userinfo:JSON.parse(localStorage.getItem("user"))
      }
    },
    computed:function () {
//      console.log(this.islogin);
    },
    watch:{

    },
    methods:{
      change:function (name) {
        this.$store.commit('change', name);
      },
      log_off:function () {
          //退出登录  清空vuex中的用户信息，是登录状态变为否
//        this.$store.commit('chooseuser',null);
//        this.$store.commit('islogin',false);
        localStorage.clear();
        //路由跳转到登录页
        this.$router.push({path:'/login'})
      }
    }
  }

</script>
