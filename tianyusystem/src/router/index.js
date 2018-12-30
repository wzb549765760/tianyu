import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import Home from '@/components/commen/Home.vue'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/Login'
    },
    {
      path: '/Readme/',
      name: 'Readme',
      // meta:{title:'系統首页'},
      component: resolve => require(['../components/commen/Home.vue'], resolve),
      // component:Home,
      children: [
        {
          path: '/',
          meta: {title: '首页'},
          component: resolve => require(['../components/page/Readme.vue'], resolve)
        },
        {
          path: '/catalogue',
          name: 'catalogue',
          meta: {title: '商品列表'},
          component: resolve => require(['../components/page/catalogue.vue'], resolve)//商品列表
        },
        {
          path: '/AddMerchandise',
          name: 'AddMerchandise',
          meta: {title: '添加商品'},
          component: resolve => require(['../components/page/AddMerchandise.vue'], resolve)//添加商品
        },
        {
          path: '/ServiceList',
          meta: {title: '服务列表'},
          component: resolve => require(['../components/page/ServiceList.vue'], resolve)//服务列表
        },
        {
          path: '/orderlist',
          name: 'orderlist',
          meta: {title: '订单列表'},
          component: resolve => require(['../components/page/orderlist.vue'], resolve)//订单列表
        },
        {
          path: '/AddOrder',
          meta: {title: '新增订单'},
          component: resolve => require(['../components/page/AddOrder.vue'], resolve)//新增订单
        },
        {
          path: '/ServeOrderList',
          meta: {title: '服务订单管理'},
          component: resolve => require(['../components/page/ServeOrderList.vue'], resolve)//服务订单列表
        },
        {
          path: '/ServeMakeList',
          meta: {title: '服务预约单管理'},
          name: 'ServeMakeList',
          component: resolve => require(['../components/page/ServeMakeList.vue'], resolve)//服务预约列表
        },
        {
          path: '/ServeExecuteList',
          meta: {title: '服务执行排期表'},
          component: resolve => require(['../components/page/ServeExecuteList.vue'], resolve)//服务执行排期聊表
        },
        {
          path: '/UserList',
          name: 'UserList',
          meta: {title: '用户列表'},
          component: resolve => require(['../components/page/UserList.vue'], resolve)//用户列表
        },
        {
          path: '/AddUser',
          name: 'AddUser',
          meta: {title: '新增用户'},
          component: resolve => require(['../components/page/AddUser.vue'], resolve)//新增用户
        },
        {
          path: '/dialogue',
          meta: {title: '会话'},
          component: resolve => require(['../components/page/dialogue.vue'], resolve)//会话
        },
        {
          path: '/orderlineitem',
          name: 'orderlineitem',
          meta: {title: '订单详情页面'},
          component: resolve => require(['../components/page/orderlineitem.vue'], resolve)//订单详情页面
        },
        {
          path: '/bianji',
          name: 'bianji',
          meta: {title: '用户列表_编辑'},
          component: resolve => require(['../components/page/bianji.vue'], resolve)//测试
        },
        {
          path: '/ServiceOrderDetails',
          name: 'ServiceOrderDetails',
          meta: {title: '服务订单列表_查看详情'},
          component: resolve => require(['../components/page/ServiceOrderDetails.vue'], resolve)//服务订单的详情页
        },
        {
          path: '/clientrecord',
          meta: {title: '客户档案'},
          name: 'clientrecord',
          component: resolve => require(['../components/page/clientrecord.vue'], resolve)//测试
        },
        {
          path: '/Servertracking',
          meta: {title: '服务跟踪'},
          name: 'Servertracking',
          component: resolve => require(['../components/page/Servertracking.vue'], resolve)//测试
        },
        {
          path: '/serverMakeDatails',
          meta: {title: '预约订单详情'},
          name: 'serverMakeDatails',
          component: resolve => require(['../components/page/serverMakeDatails.vue'], resolve)//测试
        },
        {
          path: '/MessageLists',
          meta: {title: '待处理事项'},
          component: resolve => require(['../components/page/MessageLists.vue'], resolve)//测试
        },
        {
          path: '/AddServerCommodityOrder',
          meta: {title: '新增服务商品订单'},
          component: resolve => require(['../components/page/AddServerCommodityOrder.vue'], resolve)//测试
        },
        {
          path: '/compilecommodity',
          meta: {title: '编辑商品'},
          name: 'compilecommodity',
          component: resolve => require(['../components/page/compilecommodity.vue'], resolve)//测试
        },
        {
          path: '/PicChange',
          meta: {title: '动图管理'},
          name: 'PicChange',
          component: resolve => require(['../components/page/PicChange.vue'], resolve)//测试
        },
        {
          path: '/DocHosManager',
          meta: {title: '医生/医院管理'},
          name: 'DocHosManager',
          component: resolve => require(['../components/page/DocHosManager.vue'], resolve)//测试
        },
      ]

    },
    {
      path: '/Login',
      name: 'Login',
      meta: {title: '天宇管理端'},
      component: resolve => require(['../components/Login/Login.vue'], resolve)
    },
  ]
});

router.beforeEach((to,from,next)=>{
  let token = localStorage.getItem('currentUser_token');
  console.log(token);
  if ((token == "" || token == null || token == undefined) && to.name != "Login"){
    next('/Login');
    document.getElementsByTagName("title")[0].innerText = "天宇管理端";
  }else {
    next();
  }
});

router.afterEach(route => {
  setTimeout(() => {
    route.meta && router.app.$store.commit('setTitle', route.meta.title);
    document.getElementsByTagName("title")[0].innerText = route.meta.title;
  }, 0)
});
export default router;
