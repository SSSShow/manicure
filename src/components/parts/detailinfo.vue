<template>
  <div style="margin-top: 3.3rem">
    <!--图片展示-->
    <div class="img">
      <img class="img-responsive" :src="business.imgsrc1" alt="">
      <!--店铺名信息介绍-->
      <div class="intro">
        <!--店铺名称-->
        <h4>{{business.businessname}}</h4>
        <!--店铺信息-->
        <p>{{business.description}}</p>
      </div>
    </div>

    <p style="color: #3c3c3c;text-align: center">地址：{{business.address}}</p>

    <!--服务选择区-->
    <div class="chooseserv">
      <!--<form role="form" action="" method="post" onsubmit="javascript:return confirm('是否确认预约');">-->
        <!--服务选择-->
        <select class="form-control" name="servicename" v-model="servicename">
          <option value="">请选择需要预约的服务</option>
          <option v-for="item in service" v-bind:value="item">
            {{item.servicename}} (￥{{item.price}} 时长{{item.serviceduration}}分钟)
          </option>
        </select>
        <input type="date" class="form-control" v-model="servicedate" placeholder="请选择预约日期">
        <select name="servicetime" v-model="chosentime" class="form-control">
          <option value="">请选择预约服务的时间</option>
          <option v-for="item in servicetime"
                  v-bind:value="item.id">
            {{item.show}}
          </option>
        </select>
        <input style="float: left;margin:0 1rem;" @click="order()" class="btn btn-default" type="submit" name="Submit" value="预约"/>

        <router-link  style="line-height: 3rem;"  :to="{path:'/timetable',query:{id:businessid}}">商家时间表</router-link>
      <el-button style="float: right;margin-right: 1rem" v-if="!collected" @click="collect()" type="warning" size="small"  icon="star-off"></el-button>
      <!--未收藏-->
      <el-button style="float: right;margin-right: 1rem" v-if="collected" @click="cancel()" type="warning" size="small" icon="star-on"></el-button>
      <!--已收藏-->

      <div style="clear: both"></div>

      <!--商家联系方式-->
      <div class="container">
        <h4 style="font-weight: lighter;color: #9e9e9e;margin-top: 1rem">联系方式</h4>
        <span>店主:</span>
        <span>{{business.shopman}}</span>
        <br>
        <span>号码:</span>
        <span>{{business.tel}}</span>
      </div>

      <!--商家信息展示区-->
      <div class="infoshow container" >
        <div v-for="item in service">
          <p class="servicename">{{item.servicename}}</p>
          <p class="summary">&nbsp;&nbsp;&nbsp;&nbsp;{{item.servicesummary}}</p>
          <p style="color: #00B8EC">{{item.price}}RMB&nbsp;&nbsp;&nbsp;&nbsp;预计用时：{{item.serviceduration}}分钟</p>
        </div>
        <h4 style="font-weight: lighter;color: cornflowerblue;margin-top: 1rem">效果展示</h4>
        <div>
          <img class="img-responsive img_show" :src="business.imgsrc2" alt="">
          <img class="img-responsive img_show" :src="business.imgsrc3" alt="">
          <img class="img-responsive img_show" :src="business.imgsrc4" alt="">
          <img class="img-responsive img_show" :src="business.imgsrc5" alt="">
        </div>

      </div>

      <!--客户评论展示区-->
      <div class="container">
        <h4 style="font-weight: lighter;color: cornflowerblue;margin-top: 1rem;padding-bottom: 1rem;border-bottom: 0.2rem dashed #e0e0e0">客户评价</h4>
        <div v-for="(item,index) in commentlist" style="border-bottom: 1px solid #e0e0e0;padding-bottom: 0.5rem;margin-top: 1rem;">
          <div v-if="item.length!=0">
            <div v-for="comment in item" >
              <p style="color: #0c91e5" v-if="comment.commentuserid==businessid">商家回复：</p>
              <p style="color: #3c3c3c">{{comment.content}}</p>
              <span class="tag" style="margin-right: .5rem;margin-bottom: .5rem" v-for="tag in comment.tag">{{tag}}</span>
              <p style="float: right;color: cadetblue">{{settime(comment.time)}}</p>
              <div style="clear:both"></div>
            </div>
          </div>
          <div v-if="item.length==0">
            用户暂未评价
          </div>



        </div>
      </div>



    </div>
  </div>
</template>

<style scoped>
  * {
    margin: 0;
  }

  .img {
    position: relative;
    width: 100%;
    /*height: 16rem;*/
    /*border:1px solid blue;*/
  }

  .intro {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-image: url("/static/images/shadow_blk1.png");
    height: 6rem;
    padding-left: 1rem;
    padding-top: 0.8rem;
    padding-bottom: 0.5rem;

  }

  .intro h4, p {
    color: #fff;
  }

  .intro h4 {
    margin-bottom: 0.1rem;
  }

  .chooseserv select, input {
    margin-bottom: 0.5rem;
  }

  .servicename{
    color: hotpink;
    font-weight: bold;
  }
  .summary{
    color: #3c3c3c;
  }
  .img_show{
    margin-bottom: 1rem;
  }
  .tag{
    border: .1rem solid lightblue;
    display: inline-block;
    padding: 0.2rem 0.5rem;
    border-radius: .3rem;
  }

</style>

<script>
  export default{
    name: 'Detailinfo',
    data(){
      return {
        businessid: null,
        business: {},
        service: [],
        servicename: '',
        chosentime:this.$store.state.datenum.chosentime,
        servicetime: [
          {id: 9, show: '09:00-10:00'},
          {id: 10, show: '10:00-11:00'},
          {id: 11, show: '11:00-12:00'},
          {id: 12, show: '12:00-13:00'},
          {id: 13, show: '13:00-14:00'},
          {id: 14, show: '14:00-15:00'},
          {id: 15, show: '15:00-16:00'},
          {id: 16, show: '16:00-17:00'},
          {id: 17, show: '17:00-18:00'},
          {id: 18, show: '18:00-19:00'},
          {id: 19, show: '19:00-20:00'},
          {id: 20, show: '20:00-21:00'}
        ],
        servicedate:this.$store.state.datenum.servicedate,
        islogin:localStorage.getItem("user")?true:false,
        userinfo:JSON.parse(localStorage.getItem("user")),
        collected:null,
        collectid:null,
        orderlist:[],
        commentlist:[],



      }
    },
    created: function () {
//        console.log(this.$route.query.id);
      this.businessid = this.$route.query.id;
      console.log(this.$store.state.datenum);
      var vm = this;
      //获取商家信息
      vm.$http.post('/api/business/detail', [
        {businessid: vm.businessid}
      ]).then(function (data) {
//          console.log(data.body.message);
        vm.business = data.body.message;
      });


      //获取商家的服务信息
      vm.$http.post('/api/service/show', [
        {businessid: vm.businessid}
      ]).then(function (data) {
        vm.service = data.body.info;
//          console.log(vm.service);
      });
      //如果用户未登录，则显示没有收藏
      if(vm.islogin==false){
        vm.collected = false;
      }else{
        //用户登录的情况下
        //获取用户是否收藏了商家的信息
        vm.$http.post('/api/collect/show',[
          {userid:vm.userinfo._id,
          businessid:vm.businessid}
        ]).then(function (data) {
          if(data.body.success==true){
//              console.log(data.body);
//              console.log(data.body.success);
            vm.collectid = data.body.info._id;
              vm.collected = true;
          }
        })
      }

      //获取商家预约出去的服务
      vm.$http.post('/api/order/business',[
        {businessid:vm.businessid,success:1,state:1}
      ]).then(function (data) {
        if (data.body.success) {
//            console.log('=========');
//            console.log(data.body.info)
          //查找到的所有预约
          vm.orderlist = data.body.info;
          for (let i = 0; i < vm.orderlist.length; i++) {
            vm.$http.post('/api/comment/orderid',
              [{orderid: vm.orderlist[i]._id}
              ]).then(function (data) {
              if (data.body.success) {
                vm.commentlist.push(data.body.info);
              }

            })
          }
          console.log(vm.commentlist);
        }
    })
    },


    methods: {
      order:function () {
          var vm = this;
        var a = this.servicedate.split('-');
//        console.log(a);
        var b = [];
        for(var i =0;i<a.length;i++){b.push(parseInt(a[i]));}
//        console.log(b)
        var d = b.join("/");
//        console.log(d);
        var changetime = d+" "+this.chosentime+":00:00";
        changetime = changetime.toLocaleString();
        console.log(changetime);
        var today = new Date();
//        console.log(today);
//        console.log(Date.parse(changetime));
//        console.log(Date.parse(today));

        //首先判断登录状态
        //如果没有登录直接弹框
        if(this.islogin==false){
            alert('登录后才可以预约哦')
        }else{
            //登录后判断值是否为空
          if(this.servicename&&this.servicedate&&this.chosentime){
              //登录且值不为空判断预约时间
            //预约时间不应小于当前时间
            if(Date.parse(changetime)<Date.parse(today)){
              alert('不能预约比今天早的时间哦')
            }else if (Date.parse(changetime)-Date.parse(today)>604800000){
              alert('只能预约一周以内的时间哦')
            }
            else{
//            console.log('服务时间大于今天')
              //全部符合条件的时候就提交预约信息
              vm.$http.post('/api/order/add',[
                {
                    userid:vm.userinfo._id,
                    businessid:vm.businessid,
                    businessname:vm.business.businessname,
                    starttime:changetime,
                    duration:vm.servicename.serviceduration,
                    servicename:vm.servicename.servicename,
                    success:2,    //状态待审核
                    state:0,      //订单未完成
                    commented:0,   //未评论过该预约
                    username:vm.userinfo.username,
                    tel:vm.userinfo.tel,
                    tip:''
                }
              ]).then(function (data) {
                if(data.body.success==true){
                    alert('预约已成功提交');
                }else{
                    alert(data.body.message);
                }
              });
              console.log('可以提交');
            }
          }else{
              //值为空时直接弹框
            alert('信息不完善')
          }
        }

      },

      collect:function () {
        var vm = this;
        if(vm.islogin==true){
            //用户登录后才能进行收藏操作
          vm.$http.post('/api/collect/add',[
            {userid:vm.userinfo._id,
              businessid:vm.businessid}
          ]).then(function (data) {
            if(data.body.success==true){
                vm.collected = true;
                //收藏后再次查询一遍collectid
              vm.$http.post('/api/collect/show',[
                {userid:vm.userinfo._id,
                  businessid:vm.businessid}
              ]).then(function (data) {
                if(data.body.success==true){
                  vm.collectid = data.body.info._id;
//                  vm.collected = true;
                }
              })
            }
          })
        }else{
            alert('要登录后才能收藏本店哦')
        }

      },

      cancel:function () {
          var vm = this;
          console.log(vm.collectid);
        vm.$http.post('/api/collect/cancel',[
          {id:vm.collectid}
        ]).then(function (data) {
            console.log(data.body.success);
          if(data.body.success==true){
              vm.collected = false;
          }
        })
      },
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
