<template>
  <div class="container" style="margin-top: 3.5rem">
    <div class="social_top" @click="change('社区')">
      <p class="social">社区分享</p>
      <el-button style="float: right" type="primary" icon="edit" size="mini" @click="addarticle()"></el-button>
      <div style="clear: both"></div>
    </div>


    <div class="article" v-for="(item,index) in articles" @click="change('社区')" :class="index==0?'first':''">
      <router-link :to="{path:'/article',query:{id:item._id}}">
        <h4>{{item.title}}</h4>
        <p style="text-overflow: ellipsis" v-html="item.content"></p>
       <!--<div class="content" v-html="item.content"></div>-->
        <div class="article_info">
          <span class="editor" style="float: right;color: #0c91e5">By {{item.editorname}}</span>
          <div style="clear: both"></div>
          <span class="time" style="float: right;color: #0c91e5">{{cuttime(item.time)}}</span>
          <div style="clear: both"></div>
        </div>
      </router-link>
   </div>
  </div>

</template>

<style scoped>

p{
  white-space:nowrap;
  width:100%;
  overflow:hidden;
  /*border:1px solid #000000;*/
  text-overflow: ellipsis;
  margin-bottom: 0;
}

  .article{
    padding: 0 1rem 1rem 1rem;
    border-bottom: 0.2rem dashed #e0e0e0;
    margin-bottom: 1rem;
  }

  .article h4{
   color: #1B9A59;

  }
  .article p{
    color: #3c3c3c;
  }
  .first{
    border-top:0.2rem dashed #e0e0e0;
  }
  .social_top{
    padding: 1rem 0;
  }
  .social{
    font-size: 18px;
    color: #7e7e7e;
    font-weight: lighter;
    /*margin: 1rem 0;*/
    float: left;
    width: 70%;

  }

</style>

<script>


  export default{
      name:'community',
      data(){
            return{
//              userinfo:this.$store.state.user,
              //用户信息
//              islogin:this.$store.state.islogin,
              //登录状态 判定是否能够发表文章
              islogin:localStorage.getItem("user")?true:false,
              userinfo:JSON.parse(localStorage.getItem("user")),

              articles:[]

            }
    },
    methods:{
         change:function (name) {
           this.$store.commit('change', name);
         },
      //自定义过滤器
        cuttime:function (value) {
          if (!value) { return ''}
          value = value.toString();
//    return value.charAt(0).toUpperCase() + value.slice(1)
          return value.substr(0,10);
        },

      //写文章
      addarticle:function () {
        if(this.islogin==false){
            alert('登录后才可以发表社区动态哦！')
        }else{
            this.$router.push({path:'/addarticle'})
        }
      }
    },
    mounted:function (){
      var vm = this;
      vm.$http.post('/api/article/show').then((data) => {
          vm.articles = data.body.message;
//          console.log(vm.articles);
      })
    }

  }

</script>
