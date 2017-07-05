<template>
<div style="margin-top: 5rem" class="container">
  <h4 style="margin-bottom:0;border-bottom:0.2rem dashed #e0e0e0;padding-bottom: 1rem">预约详情</h4>

  <!--详情展示-->
  <span class="key_name">预约客户姓名</span>
  <span class="value_name">{{orderdetail.username}}</span>
  <br>
  <span class="key_name">预约客户号码</span>
  <span class="value_name">{{orderdetail.tel}}</span>
  <br>
  <span class="key_name">预约时间</span>
  <span class="value_name">{{settime(orderdetail.starttime)}}</span>
  <br>
  <span class="key_name">预约服务</span>
  <span class="value_name">{{orderdetail.servicename}}</span>
  <br>
  <span class="key_name">预计时长</span>
  <span class="value_name">{{orderdetail.duration}}分钟</span>
  <br>
  <span class="key_name">下单时间</span>
  <span class="value_name">{{settime2(orderdetail.ordertime)}}</span>
  <br>
  <el-time-select  v-if="orderdetail.success==2&&orderdetail.state==0"
                   v-model="timetip"
                   :picker-options="{
        start:choosetime1(orderdetail.starttime),
        step: '00:05',
        end: choosetime2(orderdetail.starttime),
      }"
                   placeholder="选择时间">
  </el-time-select>
  <br>
  <button style="margin-top: 1rem"  v-if="orderdetail.success==2&&orderdetail.state==0" class="btn btn-default" @click="ordersuccess(orderdetail._id)">
    接受预约
  </button>
  <button style="margin-top: 1rem"  v-if="orderdetail.success==2&&orderdetail.state==0" class="btn btn-default" @click="ordercancel(orderdetail._id)">
    取消预约
  </button>
  <p style="margin-top: 1rem"  v-if="orderdetail.success==1&&orderdetail.state==0">
    已接受预约，等待顾客上门服务
  </p>
  <p style="margin-top: 1rem" v-if="orderdetail.success==1&&orderdetail.state==0">
    {{orderdetail.tip}}
  </p>
  <p style="margin-top: 1rem"  v-if="orderdetail.success==1&&orderdetail.state==1">
    已完成该预约服务
  </p>
  <p style="margin-top: 1rem"  v-if="orderdetail.success==2&&orderdetail.state==1">
    预约已失效
  </p>
  <p style="margin-top: 1rem" v-if="orderdetail.success==0">
    已取消该订单
  </p>


</div>
</template>


<style scoped>
  .key_name{
    display: inline-block;
    width: 35%;
    line-height: 2.5rem;
    color: #0c91e5;
  }
  .value_name{
    display: inline-block;
    padding-left: 1rem;
    width: 64%;
    line-height: 2.5rem;
  }

</style>

<script>
  export default{
      name:'orderdetail',
      data(){
          return{
              orderid:null,
              orderdetail:{},
            timetip:''

          }
      },
      mounted:function () {
        this.orderid = this.$route.query.id;
        var vm = this;
        vm.$http.post('/api/order/find',[
          {
              orderid:vm.orderid
          }
        ]).then(function (data) {
          if(data.body.success){
            vm.orderdetail = data.body.info;
            console.log(vm.orderdetail);
          }
        })


      },
    methods:{
      settime:function (value) {
        if (!value) { return ''}
        value = value.toString();
        var a = value.substr(0,10);
        var b = value.substr(11,2);
        b = Number(b)+8;
        value = a+" "+b+":00";
        return value
      },
      settime2:function (value) {
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
        }else {
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
    }
  }

</script>
