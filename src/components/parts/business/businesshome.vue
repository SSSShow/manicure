<template>
<div style="margin-top: 3.8rem">
  <!--下方四个模块-->
  <mt-tabbar class="mytabber" v-model="selected" fixed style="z-index: 999;">
    <mt-tab-item id="本店">

      <i class="glyphicon glyphicon-home"></i>
      <span>本店</span>
    </mt-tab-item>
    <mt-tab-item id="预约">

      <i class="glyphicon glyphicon-time"></i>
      预约
    </mt-tab-item>
    <mt-tab-item id="时间">

      <i class="glyphicon glyphicon-bullhorn"></i>
      时间
    </mt-tab-item>
    <mt-tab-item id="我的">

      <i class="glyphicon glyphicon-user"></i>
      我的
    </mt-tab-item>

  </mt-tabbar>
  <!--<div style="display: block;" class=""></div>-->

  <div class="page-wrap" style="margin-bottom: 6rem;">
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="本店">
        <myshop></myshop>

      </mt-tab-container-item>
      <mt-tab-container-item id="预约">
    <businessorder></businessorder>


      </mt-tab-container-item>
      <mt-tab-container-item id="时间">
    <businesstime></businesstime>

      </mt-tab-container-item>
      <mt-tab-container-item id="我的">
        <mineinfo></mineinfo>

      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</div>
</template>


<style scoped>
  .mytabber i {
    display: block;
    font-size: 2rem;
    margin-bottom: 0.8rem;
  }

  a {
    color: #5e5e5e;
  }
</style>

<script>
import {Tabbar, TabItem} from 'mint-ui'
import myshop from './myshop.vue'
import businessorder from './businessorder.vue'
import mineinfo from './mineinfo.vue'
import businesstime from './businesstime.vue'
export default{
    name:'businesshome',
    data(){
        return{
          selected:''
        }
    },
    components:{
      myshop,
      businessorder,
      mineinfo,
      businesstime,
    },
  mounted:function () {
    this.selected = this.$store.state.businessModel;
  }

}
</script>
