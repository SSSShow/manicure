<template>
<div>
  <h4 style="margin-bottom:0;border-bottom:0.2rem dashed #e0e0e0;padding-bottom: 1rem">本店所有预约</h4>

  <!--分类查看-->
  <div class="choise">
    <span :class="{'showact':choise=='all'}" @click="all()">全部</span>
    <span :class="{'showact':choise=='neworder'}" @click="neworder()">待处理</span>
    <span :class="{'showact':choise=='finishorder'}" @click="finishorder()">待完成</span>
    <span :class="{'showact':choise=='finishedorder'}" @click="finishedorder()">已完成</span>
  </div>



  <div v-for="item in orderlist" @click="businesschange('预约')" style="border-bottom: 1px solid #e0e0e0;padding: 0.5rem 0 0 1rem">
   <router-link :to="{path:'/orderdetail',query:{id:item._id}}" >

    <span>预约用户</span>
    <span style="color: #0c91e5">{{item.username}}</span>
    <span>预约时间</span>
    <span style="color: #0c91e5">{{settime(item.starttime)}}</span>
    <br>
    <span>预约服务</span>
   </router-link>
    <span style="color: #0c91e5">{{item.servicename}}</span>
    <!--订单待审核且未完成状态时商家可以接受订单-->
    <br>
     <el-time-select  v-if="item.success==2&&item.state==0"
       v-model="timetip"
       :picker-options="{
        start:choosetime1(item.starttime),
        step: '00:05',
        end: choosetime2(item.starttime),
      }"
       placeholder="选择时间">
     </el-time-select>

     <button v-if="item.success==2&&item.state==0" class="btn btn-default" @click="ordersuccess(item._id)">
      接受预约
    </button>
    <button v-if="item.success==2&&item.state==0" class="btn btn-default" @click="ordercancel(item._id)">
      取消预约
    </button>
   <p v-if="item.success==1&&item.state==0">
     已接受预约，等待顾客上门服务
   </p>
    <p v-if="item.success==1&&item.state==0">{{item.tip}}</p>

    <p v-if="item.success==1&&item.state==1">
      已完成该预约服务
    </p>
    <p v-if="item.success==2&&item.state==1">
      预约已失效
    </p>
    <p v-if="item.success==0">
      已取消该预约订单
    </p>


  </div>
</div>
</template>


<style scoped>
.choise span{
  display: inline-block;

  padding: 0.2rem;
  border-radius: 0.2rem;
  border:0.1rem solid #e0e0e0;

}
  .showact{
    background: lightblue;
  }
  .choise{
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
  }
  a span,p{
    color: #333;
  }
</style>

<script>
export default{
    name:'businessorder',
    data(){
        return{
          businessinfo:JSON.parse(localStorage.getItem("business")),
          businessid:null,
          orderlist:[],
          choise:'all',
          timetip:'',

        }
    },
  mounted:function () {
    //查看本店的所有预约
    var vm= this;
    vm.businessid = vm.businessinfo.businessid;
    vm.$http.post('/api/order/business',[
      {businessid:vm.businessid}
    ]).then(function (data) {
      if(data.body.success){
        vm.orderlist = data.body.info;
        console.log(vm.orderlist);
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
    },
    choosetime1:function (value) {
      if(!value){
          return ''
      }
      value=value.toString();
      var a = value.substr(11,2);
      a = Number(a)+8;
      value = a+':00';
      return value;_
    },
    choosetime2:function (value) {
      if(!value){
        return ''
      }
      value=value.toString();
      var a = value.substr(11,2);
      a = Number(a)+9;
      value = a+':00';
      return value;_
    },
    ordersuccess:function (id) {
      var vm = this;
      if(vm.timetip){
        vm.$http.post('/api/order/success',[
          {
            id:id,
            success:1,
            tip:'预约安排时间：'+vm.timetip
          }
        ]).then(function (data) {
          if(data.body.success){
            alert('接受成功');
            location.reload([true]);
          }else{
            console.log(data.body.message)
          }
        })
      }else{
          alert('请为用户安排具体的服务时间')
      }

    },
    ordercancel:function (id) {
      var vm = this;
      vm.$http.post('/api/order/success',[
        {
          id:id,
          success:0,
          tip:'实在非常抱歉，本店本时段由于业务繁忙无法接受您的预约，请重新选择一下时间吧'
        }
      ]).then(function (data) {
        if(data.body.success){
          alert('拒绝成功');
          location.reload([true]);
        }else{
          console.log(data.body.message)
        }
      })
    },
    businesschange:function (name) {
      this.$store.commit('businesschange', name);
    },
    all:function () {
      var vm= this;
      vm.choise='all'
      vm.businessid = vm.businessinfo.businessid;
      vm.$http.post('/api/order/business',[
        {businessid:vm.businessid}
      ]).then(function (data) {
        if(data.body.success){
          vm.orderlist = data.body.info;
//          console.log(vm.orderlist);
        }
      })
    },
    //待处理
    neworder:function () {
      var vm = this;
      vm.choise = 'neworder';
      vm.$http.post('/api/order/search1',[{
        businessid:vm.businessid,
        success:2,
        state:0
      }]).then(function (data) {
        if(data.body.success){
            vm.orderlist = data.body.info;
        }
      })
    },

    //待完成
    finishorder:function () {
      var vm = this;
      vm.choise = 'finishorder';
      vm.$http.post('/api/order/search1',[{
        businessid:vm.businessid,
        success:1,
        state:0
      }]).then(function (data) {
        if(data.body.success){
          vm.orderlist = data.body.info;
        }
      })
    },

    finishedorder:function () {
      var vm = this;
      vm.choise = 'finishedorder';
      vm.$http.post('/api/order/search2',[{
        businessid:vm.businessid,
        success:1,
        state:1
      }]).then(function (data) {
        if(data.body.success){
          vm.orderlist = data.body.info;
        }
      })
    }
  }
}
</script>
