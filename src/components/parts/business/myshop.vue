<template>
  <div style="margin-top: -1rem">
    <!--图片展示-->
    <div class="img">
      <img class="img-responsive" :src="businessinfo.imgsrc1" alt="">
      <!--店铺名信息介绍-->
      <div class="intro">
        <!--店铺名称-->
        <h4>{{businessinfo.businessname}}</h4>
        <!--店铺信息-->
        <p>{{businessinfo.description}}</p>
      </div>
    </div>
    <p style="color: #3c3c3c;text-align: center">地址：{{businessinfo.address}}</p>


    <!--商家信息展示区-->
    <div class="infoshow container" >
      <div v-for="item in service">
        <p class="servicename">{{item.servicename}}</p>
        <p class="summary">&nbsp;&nbsp;&nbsp;&nbsp;{{item.servicesummary}}</p>
        <p style="color: #00B8EC">{{item.price}}RMB&nbsp;&nbsp;&nbsp;&nbsp;预计用时：{{item.serviceduration}}分钟</p>
      </div>
      <h4 style="font-weight: lighter;color: cornflowerblue;margin-top: 1rem">效果展示</h4>
      <div>
        <img class="img-responsive img_show" :src="businessinfo.imgsrc2" alt="">
        <img class="img-responsive img_show" :src="businessinfo.imgsrc3" alt="">
        <img class="img-responsive img_show" :src="businessinfo.imgsrc4" alt="">
        <img class="img-responsive img_show" :src="businessinfo.imgsrc5" alt="">
      </div>

    </div>
    <!--客户评论展示区-->
    <div class="container">
      <h4 style="font-weight: lighter;color: cornflowerblue;margin-top: 1rem;padding-bottom: 1rem;border-bottom: 0.2rem dashed #e0e0e0">客户评价</h4>
      <div v-for="(item,index) in commentlist" style="border-bottom: 1px solid #e0e0e0;padding-bottom: 0.5rem;margin-top: 1rem;" @click="businesschange('本店')">
        <div v-if="item.length!=0">
          <div v-for="comment in item" >
            <p style="color: #0c91e5" v-if="comment.commentuserid==businessinfo.businessid">商家回复：</p>
            <p style="color: #3c3c3c">{{comment.content}}</p>
            <span class="tag" style="margin-right: .5rem;margin-bottom: .5rem" v-for="tag in comment.tag">{{tag}}</span>
            <router-link v-if="comment.commentuserid!=businessinfo.businessid" :to="{path:'/usercomment',query:{id:comment.orderid,userid:comment.commentuserid}}" >回复</router-link>
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
    name:'myshop',
    data(){
        return{
            businessinfo:JSON.parse(localStorage.getItem("business")),
            businessid:null,
            service:[],
            orderlist:[],
            commentlist:[],
        }
    },
    mounted:function () {
      this.businessid = this.businessinfo.businessid;
      var vm = this;
      //获取商家的服务信息
      vm.$http.post('/api/service/show', [
        {businessid: vm.businessid}
      ]).then(function (data) {
        vm.service = data.body.info;
//          console.log(vm.service);
      });

      //获取商家预约出去的服务
      vm.$http.post('/api/order/business',[
        {businessid:vm.businessid}
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
    businesschange:function (name) {
      this.$store.commit('businesschange', name);
    },
  }
}


</script>
