<template>
  <div class="container" style="margin-top: 13rem">
    <router-link to="/">
      <span style="display: block;margin: 0 auto;width: 5rem;height: 5rem;border-radius: 50%;border: 1px solid;" @click="change('商家')">
          <i  class="glyphicon glyphicon-home" style="margin-left: 0.5rem;font-size: 4rem;margin-top: 0.5rem"></i>
      </span>
    </router-link>

    <div style="margin-top: 1rem;text-align: center;">
      <button class="btn btn-default"  @click="changeuser()">{{btn_tip}}</button>
    </div>

    <!--用户登录区域-->
    <div v-if="user_login">
      <span style="float:left;height: 3rem;padding-top: 1.5rem">手机号</span>
      <input type="text" v-model="phone" style="float: right;width: 70%; border-top: none;border-left: none;border-right: none;">
      <div style="clear: both"></div>
      <span style="float: left;height: 3rem;padding-top: 1.5rem">密 码</span>
      <input type="password" v-model="password" style="float:right;width: 70%; border-top: none;border-left: none;border-right: none;">
      <div style="clear: both"></div>
      <button  @click="login()" class="form-control btn btn-default"
               style="margin-top: 1.5rem">
        登录
      </button>

      <router-link style="float: right" to="/register">立即注册</router-link>
    </div>

    <!--商家登录区域-->
    <div v-if="!user_login">
      <span style="float:left;height: 3rem;padding-top: 1.5rem">商家id</span>
      <input type="text" v-model="businessid" style="float: right;width: 70%; border-top: none;border-left: none;border-right: none;">
      <div style="clear: both"></div>
      <span style="float: left;height: 3rem;padding-top: 1.5rem">密 码</span>
      <input type="password" v-model="businesspass" style="float:right;width: 70%; border-top: none;border-left: none;border-right: none;">
      <div style="clear: both"></div>
      <button  @click="business_login()" class="form-control btn btn-default"
               style="margin-top: 1.5rem">
        登录
      </button>

    </div>

  </div>

</template>

<style scoped>
  input{
    height:3rem;
    margin-top: .8rem;
  }
  form{

  }
  a{
    margin-top: 3rem;
    color: #0c91e5;
  }
</style>

<script>
export default{
    name:'login',
    data(){
        return{
          phone:'',
          password:'',
          user_info:{},
          user_login:true,
          btn_tip:'切换为商家登录',
          businessid:null,
          businesspass:null,
          business_info:{}


        }
    },
    methods:{
        login:function () {
          if(!this.phone){
              alert('请输入手机号');
            return false;
          }
          if(!this.password){
              alert('请输入密码');
              return false;
          }
          var vm = this;
          vm.$http.post('api/user/login',[
            { tel:vm.phone,
              password:vm.password,
            }
          ]).then(function (data) {
              console.log(data.body.success);
            if(data.body.success==true)
            {
                localStorage.setItem("user",JSON.stringify(data.body.info));
                //用户信息存入localstorage
                vm.user_info = JSON.parse(localStorage.getItem("user"));
                vm.$router.push({path:'/'})

            }else{
                alert(data.body.message)
            }
          })
        },
      business_login:function () {
            var vm = this;
        if(this.businessid&&this.businesspass){
            vm.$http.post('/api/business/login',[{
                businessid:vm.businessid,
                password:vm.businesspass,
            }]).then(function (data) {
              if (data.body.success){
                localStorage.setItem("business",JSON.stringify(data.body.info));
                //用户信息存入localstorage
                vm.business_info = JSON.parse(localStorage.getItem("business"));
                console.log('登录成功');
                vm.$router.push({path:'/businesshome'})
              }else{
                  alert(data.body.message);
              }
            })



        }else{
            alert('信息不完整')
        }
      },
        change:function (name) {
          this.$store.commit('change', name);
        },
      changeuser:function () {
        this.user_login = !this.user_login;
        if(this.user_login){
            this.btn_tip = '切换为商家登录'
        }else{
            this.btn_tip='切换为用户登录'
        }
      }
    }
}
</script>
