<template>
  <div class="container" style="margin-top: 3.5rem">
    <div class="social_top">
      <p class="social">我的文章</p>
    </div>


    <!--<div v-if="!myarticles">-->
      <!--您还没有发布过文章哦-->
    <!--</div>-->
    <!--<div v-if="myarticles">-->
      <div class="article" v-for="(item,index) in myarticles" :class="index==0?'first':''">

          <h4 style="display: inline-block;float: left" >{{item.title}}</h4>
          <el-button style="float: right;margin-top: 1rem" size="mini"  type="primary" icon="delete" @click="deleteAtc(item._id)"></el-button>
          <div style="clear: both"></div>
          <router-link :to="{path:'/article',query:{id:item._id}}">
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
    <!--</div>-->

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
    width: 70%;
  }
</style>

<script>
export default{
    name:'myArticle',
    data(){
          return{
            myarticles:[],
            userinfo:JSON.parse(localStorage.getItem("user"))
          }
    },
    mounted:function () {
      var vm = this;
      console.log(vm.userinfo._id);
      vm.$http.post('/api/article/mine',[
        {editorid:vm.userinfo._id}
      ]).then(function (data) {
        vm.myarticles = data.body.info;
        console.log(data.body.success);
        console.log(vm.myarticles);
//        location.reload([true])
      })
    }, methods:{
    //自定义过滤器
    cuttime:function (value) {
      if (!value) { return ''}
      value = value.toString();
//    return value.charAt(0).toUpperCase() + value.slice(1)
      return value.substr(0,10);
    },
    deleteAtc:function (id) {
      var vm = this;
      console.log(id);
      vm.$http.post('/api/article/delete',[
        {id:id}
      ]).then(function (data) {
//       console.log(data.body.success);
//        vm.$router.push({path:'/myarticle'})
        if(data.body.success==true){
          location.reload([true]);
        }

        //删除成功后刷新页面
      })
    }
  }


}
</script>
