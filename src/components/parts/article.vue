<template>
<div class="container" style="margin-top: 3.5rem">
  <h2>
    {{article.title}}{{num}}
  </h2>
  <p v-html="article.content"></p>

  <div class="article_info">
    <span class="editor" style="float: right;color: #0c91e5">By {{article.editorname}}</span>
    <div style="clear: both"></div>
    <span class="time" style="float: right;color: #0c91e5">{{cuttime(article.time)}}</span>
    <div style="clear: both"></div>
  </div>
</div>
</template>

<style scoped>
h2{
  font-weight: lighter;
  color: #1B9A59;
  border-bottom: 0.2rem dashed #e0e0e0;
  padding: 1rem;
}
  p{
    color: #3c3c3c;
    font-size: 1.6rem;
    line-height: 2.5rem;

  }
</style>

<script>
export default{
    name:'article',
    data(){
        return{
            href:'',
            _id:'',
//            article:{
//                id:1,
//                title:'标题',
//                content:'这是测试article的内容1,内容要很长才像article哦！这是测试article的内容1,内容要很长才像article哦！这是测试article的内容1,内容要很长才像article哦！这是测试article的内容1,内容要很长才像article哦！这是测试article的内容1,内容要很长才像article哦！',
//                eidtor:1301
//            }
            article:{}
        }
    },
  created:function () {
//        console.log(window.location.href);
//    this.href = window.location.href;
//    let a = this.href.indexOf('=');
//    this.num = this.href.substring(a + 1);
    this._id = this.$route.query.id;
//    console.log(this._id);
    var vm = this;
    vm.$http.post('/api/article/detail',[
      {_id : vm._id}
    ]).then(function (data) {
      vm.article = data.body.message;
    })
  },
  methods:{
    //自定义过滤器
    cuttime:function (value) {
      if (!value) { return ''}
      value = value.toString();
//    return value.charAt(0).toUpperCase() + value.slice(1)
      return value.substr(0,10);
    }
}
}
</script>
