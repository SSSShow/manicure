import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Detailinfo from '@/components/parts/detailinfo'
import Login from '@/components/parts/login'
import Register from '@/components/parts/register'
import Article from '@/components/parts/article'
import Community from '@/components/parts/community'
import myArticle from '@/components/parts/mypages/myarticle'
import myCollection from '@/components/parts/mypages/mycollection'
import myComment from '@/components/parts/mypages/mycomment'
import userInfo from '@/components/parts/mypages/userinfo'
import myNews from '@/components/parts/mypages/mynews'
import addArticle from '@/components/parts/addarticle'
import comment from '@/components/parts/comment'
import businessHome from '@/components/parts/business/businesshome'
import orderDetail from '@/components/parts/business/orderdetail'
import userComment from '@/components/parts/business/usercomment'
import timeTable from '@/components/parts/timetable'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },{
      path:'/detailinfo',
      name:'Detailinfo',
      component:Detailinfo
    },{
      path:'/login',
      name:'Login',
      component:Login
    },{
      path:'/register',
      name:'Register',
      component:Register
    },{
      path:'/article',
      name:'Article',
      component:Article
    },{
      path:'/community',
      name:'Community',
      component:Community
    },{
      path:'/mycomment',
      name:'myComment',
      component:myComment
    },{
      path:'/myarticle',
      name:'myArticle',
      component:myArticle
    },{
      path:'/mycollection',
      name:'myCollection',
      component:myCollection
    },{
      path:'/userinfo',
      name:'userInfo',
      component:userInfo
    },{
      path:'/mynews',
      name:'mynews',
      component:myNews
    },{
      path:'/addarticle',
      name:'addArticle',
      component:addArticle
    },{
      path:'/comment',
      name:'comment',
      component:comment
    },{
      path:'/businesshome',
      name:'businesshome',
      component:businessHome
    },{
      path:'/orderdetail',
      name:'orderdetail',
      component:orderDetail
    },{
      path:'/usercomment',
      name:'usercomment',
      component:userComment
    },{
      path:'/timetable',
      name:'timetable',
      component:timeTable
    },
  ]
})
