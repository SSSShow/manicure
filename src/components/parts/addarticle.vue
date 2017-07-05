<template>
<div style="margin-top: 5rem" class="container">
  <el-form ref="form" :model="form">
    <el-form-item label="标题">
      <el-input v-model="atc_title"></el-input>
    </el-form-item>
    <el-form-item label="内容">
      <el-input type="textarea" v-model="atc_content"></el-input>
    </el-form-item>

    <el-button @click="add()" style="float: right">发布</el-button>
  </el-form>
</div>
</template>

<style scoped>
label{
  color: #48576a !important;
}
</style>

<script>
  export default{
      name:'addArticle',
      data(){
          return{
            userinfo:JSON.parse(localStorage.getItem("user")),
            atc_title:'',
            atc_content:''
          }
      },
      methods:{
          add:function () {
            var vm = this;
              if(vm.atc_title&&vm.atc_content){
//                console.log(this.userinfo.username);
//                console.log(this.atc_title);
//                console.log(this.atc_content);
                vm.$http.post('/api/article/add',[
                  { title:vm.atc_title,
                    content:vm.atc_content,
                    editorname:vm.userinfo.username,
                    editorid:vm.userinfo._id}
                ]).then(function (data) {
                  alert(data.body.message);
                  this.$store.commit('change', '社区');
                  vm.$router.push({path:'/'})
                })

              }else{
                  alert('要有内容才能提交哦')
              }

          }
      }
  }

</script>
