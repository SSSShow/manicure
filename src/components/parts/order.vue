<template>
<div class="container" style="margin-top: 5rem" >
  <div v-if="!islogin">
    <p>登录后才能查看预约哦</p>
  </div>

  <div v-if="islogin">
    <h4 style="margin-bottom:0;border-bottom:0.2rem dashed #e0e0e0;padding-bottom: 1rem">我的预约</h4>

    <!--预约状态为空的时候显示没有预约-->
    <div v-if="!orderStatus">
      <p>
        {{tip}}
      </p>
    </div>
    <!--有预约的时候显示列表-->
    <div v-for="item in orderlist" @click="change('预约')" style="border-bottom: 1px dashed #7f8c8d;padding-bottom: 1rem">
      <span class="key_name">预约商家</span>
      <span class="value_name">{{item.businessname}}</span>
      <br>
      <span class="key_name">预约时间</span>
      <span class="value_name">{{settime(item.starttime)}}</span>
      <br>
      <span class="key_name">预约服务</span>
      <span class="value_name">{{item.servicename}}</span>
      <br>
      <span class="key_name">预计时长</span>
      <span class="value_name">{{item.duration}}分钟</span>
      <br>
      <p style="color: #1B9A59;" class="res" v-if="item.success==1">
        预约成功
      </p>
      <p class="res" style="color: darkorange" v-if="item.success==2">
        等待商家回复
      </p>
      <p class="res" style="color: indianred" v-if="item.success==0">
        预约未成功
      </p>
      <p class="res" style="color: indianred" v-if="item.success==2&&item.state==1">
        预约未成功
      </p>
      <p>{{item.tip}}</p>
      <p v-if="item.success==1&&item.state==0">订单状态：未完成</p>
      <router-link :to="{path:'/comment',query:{orderid:item._id}}"
                   v-if="item.success==1&&item.state==1&&item.commented==0">订单状态：已完成，去评价</router-link>
      <p v-if="item.success==1&&item.state==1&&item.commented==1">您已完成该次预约服务，且已完成评价</p>
    </div>
  </div>

</div>
</template>

<style scoped>
p{
  text-align: center;
}
  .key_name{
    display: inline-block;
    width: 30%;
    line-height: 2.5rem;
    color: #0c91e5;
  }
  .value_name{
    display: inline-block;
    width: 68%;
    line-height: 2.5rem;
  }
  .res{
    line-height: 3rem;
    margin: 0;
  }
</style>

<script>
  export default{
      name:'order',
      data(){
         return{
             isordered:false,
             islogin:localStorage.getItem("user")?true:false,
             userinfo:JSON.parse(localStorage.getItem("user")),
             tip:'',
             orderlist:[],
             orderStatus:null,
         }
      },
    methods:{
      change:function (name) {
        this.$store.commit('change', name);
      },
      settime:function (value) {
        if (!value) { return ''}
        value = value.toString();
        var a = value.substr(0,10);
        var b = value.substr(11,2);
        b = Number(b)+8;
        value = a+" "+b+":00";
        return value
      }

    },
    mounted:function () {
          var vm = this;
          //获取当前时间
          var today = new Date();
//          console.log(today);
//          console.log(Date.parse(today));
//          console.log("现在"+Date.parse(today));
          //登录后才去数据库查找是否有预约
          if(this.islogin==true){
              vm.$http.post('/api/order/show',[
                {userid:vm.userinfo._id}
              ]).then(function (data) {
                if(data.body.success==false){
                    //预约状态为无
                    vm.orderStatus = false;
                    vm.tip='您暂时还没有预约哦，去主页看看吧'
                }else{
                    //有预约数据
                    vm.orderStatus = true;
                    vm.orderlist = data.body.info;
//                    console.log(vm.orderlist);

                    //服务结束的时间比当前时间小，就把状态变为已完成
                    for(var i=0;i<vm.orderlist.length;i++){
//                        console.log(Date.parse(vm.orderlist[i].starttime));
//                      console.log(vm.orderlist[i].starttime);
//                      console.log(Date.parse(vm.orderlist[i].starttime));
                      if(Date.parse(today)-Date.parse(vm.orderlist[i].starttime)>=3600000)
                      {
                        vm.orderlist[i].state = 1;
                        //并把更改数据库的状态值
                        vm.$http.post('/api/order/editstate',[{
                            id:vm.orderlist[i]._id,
                            state:1,
                        }]).then(function (data) {
                          console.log(data.body.success);
                        });


                    }




                    }
                }
              })
          }

    }
  }

</script>
