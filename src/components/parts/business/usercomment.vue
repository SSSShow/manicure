<template>
<div class="container" style="margin-top: 5rem">
  <el-input
    type="textarea"
    :rows="2"
    placeholder="请输入评论内容"
    v-model="comment">
  </el-input>
  <el-button @click="sendcomment()" type="primary" style="float: right">发布</el-button>
</div>
</template>


<style scoped>

</style>

<script>
  export default{
      name:'usercomment',
      data(){
          return{
              orderid:null,
              businessinfo:JSON.parse(localStorage.getItem("business")),
              comment:'',
            commenteduserid:null,
          }
      },
    mounted:function () {
      this.orderid = this.$route.query.id;
      this.commenteduserid = this.$route.query.userid;


    },
    methods:{
      sendcomment:function () {
        var vm = this;
        if(vm.comment){
          vm.$http.post('/api/comment/add',[{
            commentuserid:vm.businessinfo.businessid,
            commentusername:vm.businessinfo.businessname,
            commenteduserid:vm.commenteduserid,
            content:vm.comment,
            orderid:vm.orderid,
          }]).then(function (data) {
            if(data.body.success){
              console.log('评论成功');
              vm.$router.push({path:'/businesshome'});
            }
          })
        }else{
          alert('评论内容不能为空')
        }
      }
    }
  }

</script>
