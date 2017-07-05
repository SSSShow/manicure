<template>
<div style="margin-top: 5rem" class="container">
  <div class="social_top">
    <p class="social" style="border-bottom: 0.2rem dashed #e0e0e0;">我的评价</p>
  </div>

  <div style="border-bottom: 0.1rem dashed #e0e0e0;padding:0 1rem 1rem 1rem" v-for="item in commentlist">
    <p>{{settime(item.time)}}</p>
    <router-link :to="{path:'/detailinfo',query:{id:item.commenteduserid}}">评论给{{item.commentedusername}}</router-link>
    <p style="color: #1B9A59">评论内容：</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;{{item.content}}</p>
    <p style="color: #1B9A59">标签:</p>
    <span class="tag" style="margin-right: .5rem;margin-bottom: .5rem" v-for="tag in item.tag">{{tag}}</span>

  </div>


</div>
</template>

<style scoped>
  .social_top{
    padding: 1rem 0;
  }
  .social{
    font-size: 18px;
    color: #7e7e7e;
    font-weight: lighter;
    padding-bottom: 1rem;
  }
  .tag{
    border: .1rem solid #7f8c8d;
    display: inline-block;
    padding: 0.5rem;
    border-radius: .3rem;
  }
</style>

<script>
export default{
    name:'myComment',
    data(){
       return{
         userinfo:JSON.parse(localStorage.getItem("user")),
         commentlist:[],
       }
    },
    mounted:function () {
      var vm = this;
      vm.$http.post('/api/comment/mine',[
        {userid:vm.userinfo._id}
      ]).then(function (data) {
//          console.log(data.body.success);
        if(data.body.success){
//            console.log(data.body.info);
          vm.commentlist = data.body.info;
        }
      })

    },
    methods:{
      settime:function (value) {
        if (!value) { return ''}
        value = value.toString();
        var a = value.substr(0,10);
        var b = value.substr(11,2);
        var c = value.substr(13,6);
        b = Number(b)+8;
        value = a+" "+b+c;
        return value
      }
    }
}
</script>
