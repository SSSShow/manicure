<template>
<div style="margin-top: 5rem" >
  <p class="social">我的收藏</p>

  <div class="info" v-for="(item,index) in info"
       v-bind:class="index==0?'topline':''">
    <router-link :to="{path:'/detailinfo',query:{id:item.businessid}}" >
      <img :src="item.imgsrc1" width="80" height="80"/>
      <dl class="title">
        <dt style="font-weight: normal;">{{item.businessname}}</dt>
        <dd style="text-overflow: ellipsis">{{item.description}}</dd>
      </dl>
    </router-link>
  </div>

</div>
</template>

<style scoped>
  .social{
    padding-left: 1.5rem;
    font-size: 18px;
    color: #7e7e7e;
    font-weight: lighter;
    width: 70%;
  }
  .info {
    border: none;
    border-bottom:1px solid  #d9d9d9;
  }
  .topline {
    border-top: 0.2rem dashed #d9d9d9;
  }
  img {
    display: inline-block;
    margin: 0.6rem;
  }

  .title {
    display: inline-block;
    vertical-align: top;
    margin-top: 0.6rem;
    color: #3c3c3c;
    width: 60%;
  }
  dl{
    margin-bottom: 10px;
  }

  dt{
    color: #00B8EC;
    /*margin-bottom: 0.5rem;*/
  }
  dd{
    color: #3c3c3c;
  }
</style>

<script>
export default{
    name:'myCollection',
    data(){
        return{
          islogin:localStorage.getItem("user")?true:false,
          userinfo:JSON.parse(localStorage.getItem("user")),
          info:[],
          collection:[]
        }
    },
    created:function () {
      var vm = this;
      if(vm.islogin==true){
          //用户登录的状态下去查询该用户的收藏信息
        vm.$http.post('/api/collect/mine',[
          {userid:vm.userinfo._id}
        ]).then(function (data) {
          if(data.body.success == true){
              //找到对应的信息去查找商家信息
              console.log(data.body.info);
              vm.collection = data.body.info;
              vm.$http.post('/api/business/collect',vm.collection).then(function (data)
              {
//                console.log(data.body.message);
                if(data.body.success ==true){
//                    console.log(data.body.message);
                    vm.info = data.body.message;
                }
              })



          }
        })


      }
      }

}
</script>
