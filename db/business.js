/**
 * Created by Administrator on 2017/4/17 0017.
 */
var db = require('../model');

var list = [
  {
    businessid:1001,
    businessname:'美甲店1',  //店铺名称
    description:'美甲店1描述描述，美甲店1描述描述，美甲店1描述描述，美甲店1描述描述',   //店铺简介
    state:false,        //状态（是否已满）
    address:'美甲店1地址',       //店铺地址
    imgsrc1:'/static/images/1.jpg',       //店铺图片1
    imgsrc2:'/static/images/2.jpg',       //店铺图片2
    imgsrc3:'/static/images/3.jpg',       //店铺图片3
    imgsrc4:'/static/images/4.jpg',       //店铺图片4
    imgsrc5:'/static/images/5.jpg',       //店铺图片5
    tel:'15949251092',           //店铺号码
    shopman:'张三',        //店主姓名
    password:'1001',
    mostpeople:8,
  },
  {
    businessid:1002,
    businessname:'美甲店2',
    description:'美甲店2描述描述，美甲店2描述描述',
    state:true,
    address:'美甲店2地址',
    imgsrc1:'/static/images/6.jpg',
    imgsrc2:'/static/images/7.jpg',
    imgsrc3:'/static/images/8.jpg',
    imgsrc4:'/static/images/9.jpg',
    imgsrc5:'/static/images/10.jpg',
    tel:'15665166562',
    shopman:'王子',
    password:'1002',
    mostpeople:5,
  }
];

for(var i=0;i<list.length;i++){

  var tmp = {};
  tmp.businessid = list[i].businessid;
  tmp.businessname = list[i].businessname;
  tmp.description = list[i].description;
  tmp.state = list[i].state;
  tmp.address = list[i].address;
  tmp.imgsrc1 = list[i].imgsrc1;
  tmp.imgsrc2 = list[i].imgsrc2;
  tmp.imgsrc3 = list[i].imgsrc3;
  tmp.imgsrc4 = list[i].imgsrc4;
  tmp.imgsrc5 = list[i].imgsrc5;
  tmp.tel = list[i].tel;
  tmp.shopman = list[i].shopman;
  tmp.password = list[i].password;
  tmp.mostpeople = list[i].mostpeople;
  add(tmp);
}
// console.log(tmp);

function add(info){
  db.Business.create(info, function (err) {
  })
}
