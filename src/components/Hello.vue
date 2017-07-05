<template>
  <div>



    <!--下方四个模块-->
    <mt-tabbar class="mytabber" v-model="selected" fixed style="z-index: 999;">
      <mt-tab-item id="商家">
        <!--<img slot="icon" src="../assets/100.png">-->
        <i class="glyphicon glyphicon-home"></i>
        <span>商家</span>
      </mt-tab-item>
      <mt-tab-item id="预约">
        <!--<img slot="icon" src="../assets/100.png">-->
        <i class="glyphicon glyphicon-time"></i>
        预约
      </mt-tab-item>
      <mt-tab-item id="社区">
        <!--<img slot="icon" src="../assets/100.png">-->
        <i class="glyphicon glyphicon-bullhorn"></i>
        社区
      </mt-tab-item>
      <mt-tab-item id="我的">
        <!--<img slot="icon" src="../assets/100.png">-->
        <i class="glyphicon glyphicon-user"></i>
        我的
      </mt-tab-item>

    </mt-tabbar>
    <!--<div style="display: block;" class=""></div>-->

    <div class="page-wrap" style="margin-bottom: 6rem;">
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="商家">
          <business></business>

        </mt-tab-container-item>
        <mt-tab-container-item id="预约">
          <order></order>


        </mt-tab-container-item>
        <mt-tab-container-item id="社区">
          <community></community>

        </mt-tab-container-item>
        <mt-tab-container-item id="我的">
          <mine></mine>

        </mt-tab-container-item>
      </mt-tab-container>
    </div>

  </div>


</template>

<script>
  import {Tabbar, TabItem} from 'mint-ui'
  import business from './parts/business.vue'
  import mine from './parts/mine.vue'
  import {Search} from 'mint-ui';
  import community from './parts/community.vue'
  import order from './parts/order.vue'

  export default {
    name: 'hello',
    data(){
      return {
        value: '',
        selected:''

      }
    },
    components: {
      business,
      mine,
      community,
      order

    },
    methods: {
    },
    mounted:function () {


//            this.selected = store.state;
//            console.log(this.store)
//            console.log(store.state)
//          console.log(this.$store.state.chooseModel);
          this.selected = this.$store.state.chooseModel

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
