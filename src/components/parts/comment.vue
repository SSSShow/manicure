<template>
<div class="container" style="margin-top: 5rem;">
  <p>请对您在{{orderinfo.businessname}}预约的（{{orderinfo.servicename}}）服务进行评价</p>
  <el-form ref="form">
    <el-form-item label="评价内容">
      <el-input type="textarea" v-model="comment_content"></el-input>
    </el-form-item>
    <el-select v-model="tag" multiple placeholder="请选择标签">
      <el-option
        v-for="item in options"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    <el-button @click="add_comment()" style="float: right;margin-top: 2rem">发布评论</el-button>
  </el-form>
</div>
</template>


<style scoped>

</style>

<script>
export default{
    name:'comment',
    data(){
        return{
          comment_content:'',
          userinfo:JSON.parse(localStorage.getItem("user")),
          orderid:'',
          orderinfo:{},
          options: [
            {value: '服务态度好', label: '服务态度好'},
            {value: '服务质量好', label: '服务质量好'},
            {value: '效率高', label: '效率高'},
            {value: '店铺环境好', label: '店铺环境好'},
            {value: '很满意', label: '很满意'},
            {value: '服务一般', label: '服务一般'},
            {value: '商家态度差', label: '商家态度差'},
            {value: '不满意', label: '不满意'},
            ],
          tag: []


        }
    },
    mounted:function () {
      this.orderid = this.$route.query.orderid;
      var vm =this;
      vm.$http.post('/api/order/find',[{
          orderid:vm.orderid
      }]).then(function (data) {
        if(data.body.success==true){
//            console.log(data.body.info);
            vm.orderinfo = data.body.info;
        }
      })

    },
    methods:{
        //发布评论
      add_comment:function () {
        var vm = this;
//        console.log(vm.userinfo._id);
//        console.log(vm.userinfo.username);
//        console.log(vm.orderinfo.businessid);
//        console.log(vm.orderinfo.businessname);
//        console.log(vm.comment_content);
//        console.log(vm.orderid);
//        console.log(vm.tag);

        if(vm.comment_content&&vm.tag){
          vm.$http.post('/api/comment/add',[
            { commentuserid:vm.userinfo._id,
              commentusername:vm.userinfo.username,
              commenteduserid:vm.orderinfo.businessid,
              commentedusername:vm.orderinfo.businessname,
              content:vm.comment_content,
              orderid:vm.orderid,
              tag:vm.tag,
            }
          ]).then(function (data) {
            if(data.body.success){
              alert(data.body.message);
              vm.$http.post('/api/order/editcommented',[{
                id:vm.orderid,
                commented:1
              }]).then(function (data) {
                if (data.body.success){
                  console.log('状态修改成功')
                }
              })
            }
          });
        }else{
            alert('评论信息不完整，不能发布哦')
        }




      }
    }
}
</script>
