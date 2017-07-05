/**
 * Created by Administrator on 2017/3/30 0030.
 */
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

export default

new Vuex.Store({
  state: {
    chooseModel: '商家',
    businessModel:'预约',
    user:'',
    islogin:false,
    datenum:{
      servicedate:'',
      chosentime:''
    }
  },
  mutations: {
    change (state,name) {
      // 变更状态
      state.chooseModel = name;
    },
    businesschange(state,name){
      state.businessModel = name;
    },
    chooseuser(state,userlist){
      state.user = userlist;
    },
    islogin(state,flag){
      state.islogin = flag;
    },
    choosedate(state,datelist){
      state.datenum = datelist;
    }



  }
});
