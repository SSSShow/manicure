var express = require('express')
  ,path = require('path')
  ,bodyParser = require('body-parser');
var route = require('./route/index');
//创建一个服务器应用
var app = express();
//给请求的json数据做处理
app.use(bodyParser.json());
//给请求的参数做处理
app.use(bodyParser.urlencoded({extended:false}));
//接口区
//商家展示接口
app.post('/api/business/show',route.businessShow);
//商家详情接口
app.post('/api/business/detail',route.businessDetail);
//社区文章展示接口
app.post('/api/article/show',route.articleShow);
//社区文章详情接口
app.post('/api/article/detail',route.articleDetail);
//社区文章发布接口
app.post('/api/article/add',route.articleAdd);
//用户注册接口
app.post('/api/user/register',route.userRegister);
//用户登录接口
app.post('/api/user/login',route.userLogin);
//商家服务展示接口
app.post('/api/service/show',route.serviceShow);
//我的文章接口
app.post('/api/article/mine',route.myArticle);
//我的文章删除接口
app.post('/api/article/delete',route.deleteArticle);
//预约服务接口
app.post('/api/order/add',route.orderService);
//(我的)预约展示接口
app.post('/api/order/show',route.myOrder);
//用户添加收藏接口
app.post('/api/collect/add',route.addCollect);
//用户取消收藏接口
app.post('/api/collect/cancel',route.cancelCollect);
//查询某个店铺用户是否收藏接口
app.post('/api/collect/show',route.showCollect);
//我的收藏接口
app.post('/api/collect/mine',route.myCollect);
//收藏商家展示接口
app.post('/api/business/collect',route.collectBusiness);
//修改预约状态接口
app.post('/api/order/editstate',route.editOrderstate);
//查找某个预约接口
app.post('/api/order/find',route.findOrder);
//用户发布评论接口
app.post('/api/comment/add',route.addComment);
//更改用户预约评论状态接口
app.post('/api/order/editcommented',route.editCommented);
//查看我的评论接口
app.post('/api/comment/mine',route.myComment);
//查看商家所预约出去的服务接口
app.post('/api/order/business',route.businessOrder);
//通过商家预约出去的服务找到对应的评论接口
// app.post('/api/comment/order',route.orderComment);
//找每个orderid对应的所有评论接口
app.post('/api/comment/orderid',route.orderidComment);
//我的(预约)消息展示接口
app.post('/api/order/news',route.orderNews);
//商家查找接口
app.post('/api/business/search',route.searchBusiness);
//商家登录接口
app.post('/api/business/login',route.businessLogin);
//商家接受预约接口
app.post('/api/order/success',route.orderSuccess);
//商家按条件查询预约接口
app.post('/api/order/search1',route.searchOrder1);
//商家按条件查询预约接口
app.post('/api/order/search2',route.searchOrder2);
//配置网站根目录
app.use(express.static(path.join(__dirname,'/dist')));
//启动服务器，监听8888端口
app.listen(8888,function (err) {
 console.log('my server is start at:8888')
});
