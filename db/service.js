/**
 * Created by Administrator on 2017/4/20 0020.
 */
var db = require('../model');

var list = [
  {
    serviceid:1,         //服务id
    businessid:1001,        //服务所属商家id
    servicename:'手部护理',       //服务名称
    serviceduration:20,   //服务时长
    servicesummary:'手膜，打磨指甲，去死皮，抛光等一系列服务，让你的手部焕然一新',    //服务简介
    price:30,             //服务价格
  },
  {
    serviceid:2,
    businessid:1001,
    servicename:'纯色美甲',
    serviceduration:30,
    servicesummary:'纯色美甲，单纯不做作，和外面那些妖艳贱货不一样！',
    price:50
  },{
    serviceid:3,
    businessid:1001,
    servicename:'法式美甲',
    serviceduration:30,
    servicesummary:'法式美甲，就是法式美甲，高大上的那种',
    price:50
  },{
    serviceid:4,
    businessid:1001,
    servicename:'渐变美甲',
    serviceduration:30,
    servicesummary:'渐变美甲，是渐变不是突变',
    price:50
  },{
    serviceid:5,
    businessid:1001,
    servicename:'基础美甲+特色点缀',
    serviceduration:40,
    servicesummary:'纯色，法式，渐变任选1+跳色，贴花，贴钻，格子，画花任选1',
    price:80
  },{
    serviceid:6,
    businessid:1001,
    servicename:'手部护理+基础美甲+特色点缀',
    serviceduration:60,
    servicesummary:'手部护理+纯色，法式，渐变任选1+跳色，贴花，贴钻，格子，画花任选1',
    price:100
  },{
    serviceid:7,
    businessid:1002,
    servicename:'手部护理',
    serviceduration:20,
    servicesummary:'手膜，打磨指甲，去死皮，抛光等一系列服务，让你的手部焕然一新',    //服务简介
    price:30,
  },{
    serviceid:8,
    businessid:1002,
    servicename:'基础美甲',
    serviceduration:30,
    servicesummary:'基础美甲包括纯色，法式，渐变三选一',
    price:50,
  },

];


for(var i=0;i<list.length;i++){
  var tmp = {};
  tmp.serviceid = list[i].serviceid;
  tmp.businessid = list[i].businessid;
  tmp.servicename = list[i].servicename;
  tmp.serviceduration = list[i].serviceduration;
  tmp.servicesummary = list[i].servicesummary;
  tmp.price = list[i].price;

  add(tmp);
}


function add(info){
  db.Service.create(info, function (err) {
  })
}
