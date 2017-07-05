<template>
<div style="margin-top: 5rem;" class="container">
  <h4 style="margin-bottom:0;border-bottom:0.2rem dashed #e0e0e0;padding-bottom: 1rem">我的消息</h4>
  <div v-for="item in newslist" class="mynews">
    <p>亲爱的{{userinfo.username}}您好:</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;{{item.businessname}}已经接受了您的预约!
      <br>&nbsp;&nbsp;&nbsp;&nbsp;
      请您在{{settime(item.starttime)}}<br>
      {{item.tip}}<br>
      享受{{item.servicename}}服务哦！</p>
  </div>





</div>
</template>

<style scoped>
.mynews{
  padding: 0.5rem 0;
  border-bottom: 1px solid #e0e0e0;
}
  .mynews p{
    color: #3c3c3c;
  }
</style>

<script>
  export default{
      name:'myNews',
      data(){
          return{
            userinfo:JSON.parse(localStorage.getItem("user")),
            newslist:[]
          }
      },
      mounted:function () {
        var vm = this;
        vm.$http.post('/api/order/news',[
          {
              userid:vm.userinfo._id,
              success:1,
              state:0
          }
        ]).then(function (data) {
          if(data.body.success){
              console.log(data.body.info);
              vm.newslist = data.body.info
          }else{
              console.log(data.body.message);
          }
        })
      },
      methods:{
        settime:function (value) {
          if (!value) { return ''}
          value = value.toString();
          var a = value.substr(0,10);
//          var b = value.substr(11,2);
//          b = Number(b)+8;
          value = a;
          return value
        }
      }
  }

</script>
