/**
 * Created by Administrator on 2017/4/19 0019.
 */
var db = require('../model');

var list = [
  {
    articleid:1,
    title:'文章标题1',
    content:'&nbsp;&nbsp;&nbsp;&nbsp;这是文章1的内容，文章一的内容，拉拉拉拉。这是文章1的内容，文章一的内容，拉拉拉拉。<br/>repeat重复这是文章1的内容，文章一的内容，拉拉拉拉~',
    time:'2017-04-18 02:20:47.830Z',
    editorname:'罗志祥',
    editorid:'1234567'
  },
  {
    articleid:2,
    title:'文章标题2',
    content:'&nbsp;&nbsp;&nbsp;&nbsp;这是文章2的内容，文章2的内容，拉拉拉拉。这是文章2的内容，文章一的内容，拉拉拉拉。repeat重复这是文章2的内容，文章2的内容，拉拉拉拉。</p>',
    time:'2017-04-19 02:20:47.830Z',
    editorname:'杨洋',
    editorid:'1234568'
  }
];

for (var i=0;i<list.length;i++){
  var tmp = {};
  tmp.articleid = list[i].articleid;
  tmp.title = list[i].title;
  tmp.content = list[i].content;
  tmp.time = list[i].time;
  tmp.editorname = list[i].editorname;
  tmp.editorid = list[i].editorid;
  add(tmp);
}

function add(info) {
  db.Article.create(info,function (err) {

  })
}
