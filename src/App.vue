<template>
  <div id="app">

    <!--头部-->
    <mt-header fixed title="Manicure Reservation">
        <a onclick="window.history.go(-1)" slot="left">
          <mt-button icon="back">返回</mt-button>
        </a>
      <mt-button icon="more" slot="right" @click="popupVisible=!popupVisible"></mt-button>
    </mt-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import { Header } from 'mint-ui';
  import { Popup } from 'mint-ui';
  import hello from './components/Hello.vue'
export default {
  name: 'app',
  components:{
      hello
  },
  data(){
    return{
      popupVisible:false
    }
  }
}
</script>

<style scoped>
  a:hover,a:focus{
    text-decoration: none!important;
  }
  label{
    font-weight: 100;
  }


</style>
