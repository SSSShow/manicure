/**
 * Created by Administrator on 2017/4/17 0017.
 */
var mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/manicure', function (err) {
  if (err)
    throw err;
  console.log('manicure connect success');
});

//创建表结构

//用户表
var userTB = new mongoose.Schema({
  userid:Number,    //用户id
  username:String,  //用户名
  password:String,  //密码
  tel:String,       //号码
  type:String,      //用户类型
  createtime:Date   //注册时间
});

//商家表
var businessTB = new mongoose.Schema({
  businessid:Number,    //店铺id
  businessname:String,  //店铺名称
  description:String,   //店铺简介
  state:Boolean,        //状态（是否已满）
  address:String,       //店铺地址
  imgsrc1:String,       //店铺图片1
  imgsrc2:String,       //店铺图片2
  imgsrc3:String,       //店铺图片3
  imgsrc4:String,       //店铺图片4
  imgsrc5:String,       //店铺图片5
  tel:String,           //店铺号码
  shopman:String,       //店主姓名
  password:String,      //密码
  mostpeople:Number     //一小时内服务的最大人数
});

//社区文章表
var articleTB = new mongoose.Schema({
  articleid:Number,   //文章id
  title:String,       //文章标题
  content:String,     //文章内容
  time:Date,          //发布时间
  editorname:String,  //发布人姓名
  editorid:String,    //发布人id
});

//商家服务表
var serviceTB = new mongoose.Schema({
  serviceid:Number,         //服务id
  businessid:Number,        //服务所属商家id
  servicename:String,       //服务名称
  serviceduration:Number,   //服务时长
  servicesummary:String,    //服务简介
  price:Number,             //服务价格
});

//预约表
var orderTB = new mongoose.Schema({
  orderid:Number,       //预约id
  userid:String,        //预约用户id
  businessid:String,    //预约商家id
  businessname:String,  //预约商家名称
  starttime:Date,       //服务开始时间
  duration:Number,      //服务时长
  servicename:String,   //服务名称
  ordertime:Date,       //预约（下单）时间
  success:Number,       //预约是否成功（0为不成功，1为成功,2为待审核）
  state:Number,         //订单状态（0为未完成，1为已完成）
  commented:Number,     //是否评论过该预约（0为没有，1为有）
  username:String,      //预约人姓名
  tel:String,           //预约人电话
  tip:String,           //预约提示
});

//收藏表
var collectTB = new mongoose.Schema({
  collectid:Number,     //收藏id
  userid:String,        //用户id（收藏人）
  businessid:String,    //商家id（被收藏的对象）
});

//评论表
var commentTB = new mongoose.Schema({
  commentuserid:String,       //评论人id
  commentusername:String,     //评论人昵称
  commenteduserid:String,     //被评论人id
  commentedusername:String ,  //被评论人昵称
  content:String,             //评论内容
  orderid:String,             //评论预约的服务
  tag:Array,                 //评论标签
  time:Date,                  //评论时间
});


//表结构和数据库表名做关联
var User = mongoose.model('user', userTB, 'users');
var Business = mongoose.model('business', businessTB, 'businesses');
var Article = mongoose.model('article',articleTB,'articles');
var Service = mongoose.model('service',serviceTB,'services');
var Order = mongoose.model('order',orderTB,'orders');
var Collect = mongoose.model('collect',collectTB,'collects');
var Comment = mongoose.model('comment',commentTB,'comments');



//导出表实体，用于其他js对数据库操作
exports.User = User;
exports.Business = Business;
exports.Article = Article;
exports.Service = Service;
exports.Order = Order;
exports.Collect = Collect;
exports.Comment = Comment;
