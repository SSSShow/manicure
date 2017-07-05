<template>
<div style="margin-top: 5rem" class="container">
<p>本店一小时内的最大服务人数为{{businfo.mostpeople}}人</p>
 <div v-for="item in datelist">
   <h4>{{item.date}}</h4>
   <div v-for="timestr in item.time">
     <span>{{timestr.show}}</span>
       <span>已有<em v-bind:class="timestr.people>=businfo.mostpeople?'busy':'free'">{{timestr.people}}</em>人在此时段预约</span>
     <span v-if="timestr.people<businfo.mostpeople" @click="choose(item.date,timestr.id)">选择</span>
     <br>
   </div>
 </div>


</div>
</template>


<style scoped>
.busy{
    color: red;
}
    .free{
        color: #00B8EC;
    }
</style>

<script>
export default{
    name:'timetable',
    data(){
        return{
          businessid:null,
          orderlist:[],
          datelist:[],
          servicetime: [
            {id: 9, show: '09:00-10:00',people:0},
            {id: 10, show: '10:00-11:00',people:0},
            {id: 11, show: '11:00-12:00',people:0},
            {id: 12, show: '12:00-13:00',people:0},
            {id: 13, show: '13:00-14:00',people:0},
            {id: 14, show: '14:00-15:00',people:0},
            {id: 15, show: '15:00-16:00',people:0},
            {id: 16, show: '16:00-17:00',people:0},
            {id: 17, show: '17:00-18:00',people:0},
            {id: 18, show: '18:00-19:00',people:0},
            {id: 19, show: '19:00-20:00',people:0},
            {id: 20, show: '20:00-21:00',people:0}
          ],
          chosendate:{},
          orderdate:[],
          businfo:{}
        }

    },
    mounted:function () {
      var vm = this;

      var getId = function (time) {
        switch(time){
          case "9:00":return 9;
          case "10:00":return 10;
          case "11:00":return 11;
          case "12:00":return 12;
          case "13:00":return 13;
          case "14:00":return 14;
          case "15:00":return 15;
          case "16:00":return 16;
          case "17:00":return 17;
          case "18:00":return 18;
          case "19:00":return 19;
          case "20:00":return 20;

        }

      };

      var settime =function (value) {
        if (!value) { return ''}
        value = value.toString();
        var a = value.substr(0,10);
        var b = value.substr(11,2);
        b = Number(b)+8;
        value = a+" "+b+":00";
        return value
      };
      vm.businessid = vm.$route.query.id;
      vm.$http.post('/api/order/business',[{
          businessid:vm.businessid,success:1
      }]).then(function (data) {
        if(data.body.success){
            vm.orderlist = data.body.info;
            console.log(vm.datelist);
            for(let i=0;i<vm.orderlist.length;i++){
                vm.orderlist[i].starttime = settime( vm.orderlist[i].starttime);
                console.log(vm.orderlist[i].starttime);
                var time_arr = vm.orderlist[i].starttime.split(" ");
                console.log(time_arr);

                for(let j=0;j<7;j++){
                    if(vm.datelist[j].date == time_arr[0]){
                        console.log(vm.datelist[j].date,time_arr[0]);
//                        for(timetable[i].time  j)
                      for(let k=0;k<vm.datelist[j].time.length;k++)
                        {
                            if(vm.datelist[j].time[k].id ==  getId(time_arr[1])){
                                console.log("==========================");
                              vm.datelist[j].time[k].people = vm.datelist[j].time[k].people + 1;
                            }
                        }

                    }

                }

            }
            console.log(vm.datelist);



        }
      });

      var GetDateStr = function (AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = dd.getMonth()+1;//获取当前月份的日期
        m<10?m="0"+m:m;
        var d = dd.getDate();
        d<10?d="0"+d:d;
        return y+"-"+m+"-"+d;
      };
      for(var i=0;i<7;i++){
          vm.datelist.push({date:GetDateStr(i),time:[
            {id: 9, show: '09:00-10:00',people:0},
            {id: 10, show: '10:00-11:00',people:0},
            {id: 11, show: '11:00-12:00',people:0},
            {id: 12, show: '12:00-13:00',people:0},
            {id: 13, show: '13:00-14:00',people:0},
            {id: 14, show: '14:00-15:00',people:0},
            {id: 15, show: '15:00-16:00',people:0},
            {id: 16, show: '16:00-17:00',people:0},
            {id: 17, show: '17:00-18:00',people:0},
            {id: 18, show: '18:00-19:00',people:0},
            {id: 19, show: '19:00-20:00',people:0},
            {id: 20, show: '20:00-21:00',people:0}
          ]});
      }
      console.log(vm.datelist);

        vm.$http.post('/api/business/detail',[
            {
                businessid:vm.businessid
            }
        ]).then(function (data) {
            if(data.body.success){
                vm.businfo = data.body.message;
            }
        })

    },
  methods:{
        choose:function (a,b) {
//          console.log(a);
//          console.log(b);
          //将上述两个值存入vuex的时间对象
          this.chosendate = {servicedate:a,chosentime:b};
//          console.log(this.chosendate);
          this.$store.commit('choosedate', this.chosendate);
           console.log(this.$store.state.datenum);
           this.$router.push({path:'/detailinfo',query:{id:this.businessid}})
        }
  }


}
</script>
