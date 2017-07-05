/**
 * Created by Administrator on 2017/4/17 0017.
 */
var db = require('../model');

//所有商家展示
exports.businessShow = function (req,res) {
  db.Business.find({}, function (err, docs) {
    if(docs==null){
      res.status(200).json({success:false});
    }else{
      res.status(200).json({success:true,message:docs})
    }
  })
};



//商家详情
exports.businessDetail = function (req,res) {
  db.Business.findOne({businessid:req.body[0].businessid},
    function(err,docs){
      res.status(200).json({success:true,message:docs});
    })
};


//社区文章展示
exports.articleShow = function (req,res) {
  db.Article.find({},function (err,docs) {
    if(docs==null){
      res.status(200).json({success:false});
    }else{
      res.status(200).json({success:true,message:docs})
    }
  }).sort({time:-1})
};

//社区文章详情
exports.articleDetail = function (req,res) {
  db.Article.findOne({_id:req.body[0]._id},
    function(err,docs){
      res.status(200).json({success:true,message:docs});
    })
};

//社区文章发布
exports.articleAdd = function (req,res) {
var article = req.body[0];
article.time = new Date().toLocaleString();

db.Article.create(article,function (err) {
  if(err){
    res.status(200).json({success: false, message: err});
  }else{
    res.status(200).json({success: true, message:'发布成功'});
  }
})
};



//用户注册
exports.userRegister = function (req,res) {
//1.向数据库添加数据
  var user = req.body[0];
  user.createtime = new Date().toLocaleString();

  // console.log('注册中');
  console.log(user);

  //判断用户是否存在
  db.User.find({tel: user.tel}, function (err, docs) {
    if (docs != null && docs.length > 0) {
      // console.log('用户已存在')
      res.status(200).json({success: false, message: '用户已存在'});
    }else{
      db.User.create(user, function (err) {
        if(err){
          // console.log('失败')
          res.status(200).json({success:false,message:err});
        }else{
          // console.log('成功')
          res.send('success');
        }
      })
    }
  })
};


//用户登录
exports.userLogin = function (req,res) {
  var user = req.body[0];
  // console.log(user);
  db.User.findOne(user,function (err, doc) {
    if (err) {
      res.status(200).json({success: false, message: err});
    } else {
      if (!doc) {
        res.status(200).json({success: false, message: '账号或密码错误'});
      } else {
        res.status(200).json({success: true, info: doc});
      }
    }
  })
};

//商家登录接口
exports.businessLogin = function (req,res) {
  var business = req.body[0];
  db.Business.findOne(business,function (err,doc) {
    if (err) {
      res.status(200).json({success: false, message: err});
    } else {
      if (!doc) {
        res.status(200).json({success: false, message: 'id或密码错误'});
      } else {
        res.status(200).json({success: true, info: doc});
      }
    }
  })
};


//服务展示
exports.serviceShow = function (req,res) {
  var service = req.body[0];
  db.Service.find({businessid:service.businessid},function (err,docs) {
    if (err){
      res.status(200).json({success:false,message:err});
    }else{
      if(!docs){
        res.status(200).json({success:false,message:'暂无服务信息'})
      }else{
        res.status(200).json({success:true,info:docs})
      }
    }
  })
};


//我的文章
exports.myArticle = function (req,res) {
  var article = req.body[0];
  db.Article.find({editorid:article.editorid},function (err,docs) {
    if (err){
      res.status(200).json({success:false,message:err});
    }else{
      if(!docs){
        res.status(200).json({success:false,message:'您还没有发表过文章哦'})
      }else{
        res.status(200).json({success:true,info:docs})
      }
    }
  }).sort({time:-1})
};

//我的文章删除接口
exports.deleteArticle = function (req,res) {
  var del = req.body[0];
  db.Article.remove({_id:del.id},function(err){
    if(!err){
      res.status(200).json({success:true});
    }else{
      res.status(200).json({success:false});
    }
  })
};

//预约服务接口
exports.orderService = function (req,res) {
  var order = req.body[0];
  order.ordertime = new Date().toLocaleString();
  console.log(order.ordertime);
  db.Order.create(order,function (err) {
    if(err){
      res.status(200).json({success:false,message:err});
    }else{
      res.status(200).json({success:true,message:'预约成功'})
    }
  })
};

//(我的)预约展示接口
exports.myOrder = function (req,res) {
  var myorder = req.body[0];
  db.Order.find({userid:myorder.userid},function (err,docs) {
    if (err){
      res.status(200).json({success:false,message:err});
    }else{
      if(!docs){
        res.status(200).json({success:false,message:'您还没有预约哦'})
      }else{
        res.status(200).json({success:true,info:docs})
      }
    }
  }).sort({starttime:-1})
};

//用户添加收藏接口
exports.addCollect = function (req,res) {
  var collect = req.body[0];
  db.Collect.create(collect,function (err) {
    if(err){
      res.status(200).json({success:false,message:err});
    }else{
      res.status(200).json({success:true,message:'收藏成功'})
    }
  })
};
//用户取消收藏接口
exports.cancelCollect = function (req,res) {
  var collect = req.body[0];
  db.Collect.remove({_id:collect.id},function(err){
    if(!err){
      res.status(200).json({success:true});
    }else{
      res.status(200).json({success:false});
    }
  })
};

//查询某个店铺用户是否收藏接口
exports.showCollect = function (req,res) {
  var collect = req.body[0];
  db.Collect.findOne(collect,function (err,doc) {
    if (err){
      res.status(200).json({success:false,message:err});
    }else{
      if(!doc){
        res.status(200).json({success:false,message:'没有收藏'})
      }else{
        res.status(200).json({success:true,info:doc})
      }
    }
  })
};

//我的收藏接口
exports.myCollect = function (req,res) {
  var collect = req.body[0];
  db.Collect.find({userid:collect.userid},function (err,docs) {
    if(err){
      res.status(200).json({success:false,message:err});
    }else{
      if(!docs){
        res.status(200).json({success:false,message:'还没有收藏任何店铺'})
      }else{
        res.status(200).json({success:true,info:docs})
      }
    }
  })
};

//修改预约状态接口
exports.editOrderstate = function (req,res) {
  var order = req.body[0];
  db.Order.update({_id:order.id},{$set:{state:order.state}},function (err) {
    if (err) {
      res.status(200).json({success: false, message: err});
    } else {
      res.status(200).json({success: true});
    }
  })
};

//查找某个预约
exports.findOrder = function (req,res) {
  var order = req.body[0];
  db.Order.findOne({_id:order.orderid},function (err,doc) {
    if (err){
      res.status(200).json({success:false,message:err});
    }else{
      if(!doc){
        res.status(200).json({success:false,message:'没有预约'})
      }else{
        res.status(200).json({success:true,info:doc})
      }
    }
  })
};

//用户发布评论接口
exports.addComment = function (req,res) {
  comment = req.body[0];
  comment.time = new Date().toLocaleString();
  db.Comment.create(comment,function (err) {
    if(err){
      res.status(200).json({success:false,message:err});
    }else{
      res.status(200).json({success:true,message:'评论成功'})
    }
  })
};

//更改用户预约评论状态接口
exports.editCommented = function (req,res) {
  var order = req.body[0];
  db.Order.update({_id:order.id},{$set:{commented:order.commented}},function (err) {
    if (err) {
      res.status(200).json({success: false, message: err});
    } else {
      res.status(200).json({success: true});
    }
  })
};

//查看我的评论接口
exports.myComment = function (req,res) {
  var comment = req.body[0];
  db.Comment.find({commentuserid:comment.userid},function (err,docs) {
    if (err){
      res.status(200).json({success:false,message:err});
    }else{
      if(!docs){
        res.status(200).json({success:false,message:'还没有发布过评论'})
      }else{
        res.status(200).json({success:true,info:docs})
      }
    }
  })
};

//查看商家所预约出去的服务接口
exports.businessOrder = function (req,res) {
 var business = req.body[0];
 db.Order.find(business,function (err,docs) {
   if (err){
     res.status(200).json({success:false,message:err});
   }else{
     if(!docs){
       res.status(200).json({success:false,message:'该商店没有被预约过'})
     }else{
       res.status(200).json({success:true,info:docs})
     }
   }
 }).sort({ordertime:-1})
};

//通过商家预约出去的服务找到对应的评论接口
// exports.orderComment = function (req,res) {
// var order = req.body;
// var commentArray = [];
// for(var i=0;i<order.length;i++){
//   commentArray.push(order[i]._id)
// }
// db.Comment.find({orderid:commentArray},function (err,docs) {
//   if(err){
//     res.status(200).json({success:false,message:"======="});
//   }else{
//     res.status(200).json({success:true,message:docs});
//   }
// })

// };

//收藏商家展示接口
exports.collectBusiness = function (req,res) {
  var cb = req.body;
  var docarray = [];
  for(var i=0;i<cb.length;i++){
    docarray.push(cb[i].businessid);
  }
  db.Business.find({businessid:docarray},function (err,doc) {
    if(err){
      res.status(200).json({success:false,message:"err"});
    }else{
      res.status(200).json({success:true,message:doc});
    }
  });
};

//找每个orderid对应的所有评论接口
exports.orderidComment = function (req,res) {
  var orderid = req.body[0];
  db.Comment.find({orderid:orderid.orderid},function (err,docs) {
    if (err){
      res.status(200).json({success:false,message:err});
    }else{
      if(!docs){
        res.status(200).json({success:false,message:'没有评论'})
      }else{
        res.status(200).json({success:true,info:docs})
      }
    }
  }).sort({time:1})
};

//我的(预约)消息展示接口
exports.orderNews = function (req,res) {
  var order = req.body[0];
  db.Order.find({userid:order.userid,success:order.success,state:order.state},function (err,docs) {
    if (err){
      res.status(200).json({success:false,message:err});
    }else{
      if(!docs){
        res.status(200).json({success:false,message:'没有要提醒的消息'})
      }else{
        res.status(200).json({success:true,info:docs})
      }
    }
  })
};

//商家查找接口
exports.searchBusiness = function (req,res) {
  var business = req.body[0];
  // console.log(business);
  db.Business.find({businessname: {$regex:business.keyword}},function (err,docs) {
    if (err){
      res.status(200).json({success:false,message:err});
    }else{
      if(!docs){
        res.status(200).json({success:false,message:'没有符合条件的店铺'})
      }else{
        res.status(200).json({success:true,info:docs})
        // console.log(docs)
      }
    }
  })

};

//商家接受预约接口
exports.orderSuccess = function (req,res) {
  var order = req.body[0];
  db.Order.update({_id:order.id},{$set:{success:order.success,tip:order.tip}},function (err) {
    if (err) {
      res.status(200).json({success: false, message: err});
    } else {
      res.status(200).json({success: true});
    }
  })
};

//商家按条件查询预约接口
exports.searchOrder1 = function (req,res) {
  var order = req.body[0];
  db.Order.find({businessid:order.businessid,success:order.success,state:order.state},function (err,docs) {
    if (err){
      res.status(200).json({success:false,message:err});
    }else{
      if(!docs){
        res.status(200).json({success:false,message:'没有符合条件的预约'})
      }else{
        res.status(200).json({success:true,info:docs})
      }
    }
  }).sort({starttime:1})
};


exports.searchOrder2 = function (req,res) {
  var order = req.body[0];
  db.Order.find({businessid:order.businessid,success:order.success,state:order.state},function (err,docs) {
    if (err){
      res.status(200).json({success:false,message:err});
    }else{
      if(!docs){
        res.status(200).json({success:false,message:'没有符合条件的预约'})
      }else{
        res.status(200).json({success:true,info:docs})
      }
    }
  }).sort({starttime:-1})
};
