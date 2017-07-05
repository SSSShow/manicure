<template>
  <div class="container" style="margin-top: 10rem">
    <router-link to="/">
      <span style="display: block;margin: 0 auto;width: 5rem;height: 5rem;border-radius: 50%;border: 1px solid;" @click="change('商家')">
          <i  class="glyphicon glyphicon-home" style="margin-left: 0.5rem;font-size: 4rem;margin-top: 0.5rem"></i>
      </span>
    </router-link>
      <span style="float:left;height: 3rem;padding-top: 1.5rem">用户名</span>
      <input required
             type="text" v-model="username" style="float: right;width: 70%; border-top: none;border-left: none;border-right: none;">
      <div style="clear: both"></div>
      <span style="float: left;height: 3rem;padding-top: 1.5rem">密 码</span>
      <input required
             type="password" v-model="userpass" style="float:right;width: 70%; border-top: none;border-left: none;border-right: none;">
      <div style="clear: both"></div>
      <span style="float: left;height: 3rem;padding-top: 1.5rem">确认密码</span>
      <input required
             type="password" v-model="checkpass" style="float:right;width: 70%; border-top: none;border-left: none;border-right: none;">
      <div style="clear: both"></div>
      <span style="float: left;height: 3rem;padding-top: 1.5rem">手机</span>
      <input required
             type="tel" v-model="phone" style="float:right;width: 70%; border-top: none;border-left: none;border-right: none;">
      <div style="clear: both"></div>
      <button @click="register()" class="form-control btn btn-default"
             style="margin-top: 1.5rem">
        注册
      </button>

    <router-link style="float: right" to="/login">已有账号，立即登录</router-link>
  </div>



</template>

<style scoped>
  input{
    height: 3rem;
    margin-top: .8rem;
  }
  form{
    margin-bottom: 3rem;
  }
  a{
    color: #0c91e5;
  }

</style>

<script>
  export default{
      name:'Register',
      data(){
         return{
           username:'',
           userpass:'',
           checkpass:'',
           phone:''
         }
      },
      created:function () {
      },
      methods:{
          register:function () {
//              console.log(this.username)
//              console.log(this.userpass)
//              console.log(this.checkpass)
//              console.log(this.phone)
            var vm = this;
            if((this.username && this.userpass && this.checkpass && this.phone)==''){
                alert('信息不完整');
                return false;
            }
            if(this.userpass!=this.checkpass){
              alert('密码与确认密码不一致');
              return false;
            }
            if(!(/^1[34578]\d{9}$/.test(this.phone))){
              alert("手机号码有误，请重填");
              return false;
            }
            vm.$http.post('/api/user/register',[
              { username:vm.username,
                password:vm.userpass,
                tel:vm.phone,
              }
            ]).then(function(response){
//                console.log(response);
//                console.log(response.body);
              if (response.body=='success'){
                  alert('注册成功');
                vm.$router.push({path:'/login'})
              }else{
                  alert(response.body.message);
              }
            })
          },
          change:function (name) {
            this.$store.commit('change', name);
          }
      }
  }

</script>
