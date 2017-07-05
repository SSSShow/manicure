<template>
  <div>
    <!--顶部搜索区域-->
    <form action="" style="position: fixed;top:3.3rem;z-index: 999999">
      <div class="input-group">
        <input v-model="keyword" type="text" class="form-control"><span @click="search()" class="input-group-addon btn btn-default"><i class="glyphicon glyphicon-search"></i></span>
      </div>
    </form>
    <!--顶部搜索区域-->

    <!--轮播图-->
    <div class="swipearea" style="margin-top: 6.2rem">
      <mt-swipe :auto="4000">
        <mt-swipe-item style='background: darkseagreen'><img class="img-responsive" src="/static/images/2.jpg"></mt-swipe-item>
        <mt-swipe-item style='background: pink'><img class="img-responsive" src="/static/images/6.jpg"></mt-swipe-item>
        <mt-swipe-item style='background: cornflowerblue'><img class="img-responsive" src="/static/images/7.jpg"></mt-swipe-item>
      </mt-swipe>
    </div>
    <!--轮播图结束-->
    <mt-cell title="商家" label="商家详情" is-link></mt-cell>


      <div class="info" @click="change('商家')" v-for="(item,index) in info"
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
  .input-group-addon{

    background-color:#ffffff;

  }
  .form-control{
    border-right: 0 ;
  }
  .swipearea {
    height: 18rem;
  }

  img {
    display: inline-block;
    margin: 0.6rem;
  }
  .swipearea img{
    margin: 0;
  }

  .info {
    border: none;
    border-bottom: 1px solid #d9d9d9;
  }

  .topline {
    border-top: 1px solid #d9d9d9;
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
  import {Swipe, SwipeItem} from 'mint-ui';
  import {Cell} from 'mint-ui';
  export default{
    name: 'business',
    data(){
      return {
        info: [],
        keyword:''
      }

    },
    methods:{
      change:function (name) {
        this.$store.commit('change', name);
      },
      search:function () {
        var vm = this;
        vm.$http.post('/api/business/search',[{
          keyword:vm.keyword,
        }]).then(function (data) {
          if(data.body.success){
              vm.info = data.body.info;
          }else{
              console.log('error')
          }
        })
      }

    },
    mounted:function(){
//          console.log(this.$store.state.user);
//          var user_text = this.$store.state.user;
//          console.log(user_text.name)
      var vm = this;
      vm.$http.post('/api/business/show').then((data)=>
        {
//            console.log(data.body.message);
            vm.info = data.body.message;
//            console.log(vm.info);
//            console.log(vm.info[0].businessid)
        }
      )



    }

  }

</script>
