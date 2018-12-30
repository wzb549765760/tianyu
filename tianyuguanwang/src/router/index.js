import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  /*mode:"history",*/
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: resolve => require(["../components/HelloWorld"],resolve)
    },
    {
      path: '/mainTable',
      name: 'mainTable',
      component: resolve => require(["../components/mainTable"],resolve),
      redirect:"/mainhome",
      children:[
        {
          path: '/mainhome',
          name: 'mainhome',
          component: resolve => require(["../components/mainhome"],resolve),
        },
        {
          path: '/products',
          name: 'products',
          component: resolve => require(["../components/products"],resolve),
        },
        {
          path: '/sources',
          name: 'sources',
          component: resolve => require(["../components/sources"],resolve),
        },
        {
          path: '/content',
          name: 'content',
          component: resolve => require(["../components/content"],resolve),
        },
        {
          path: '/productDesc',
          name: 'productDesc',
          component: resolve => {
            return require(["../components/productDesc"],resolve)},
          meta:{keepAlive:false}
        },
        {
          path: '/login',
          name: 'login',
          component: resolve => require(["../components/login"],resolve),
        },
        {
          path: '/register',
          name: 'register',
          component: resolve => require(["../components/register"],resolve),
          meta:{keepAlive:false},
        },
        {
          path: '/agreement',
          name: 'agreement',
          component: resolve => require(["../components/Agreement"],resolve),
        },
        {
          path: '/forget',
          name: 'forget',
          component: resolve => require(["../components/forget"],resolve),
        },
        {
          path: '/orders',
          name: 'orders',
          component: resolve => require(["../components/orders"],resolve),
          meta:{keepAlive:false}
        },
        {
          path: '/orders2',
          name: 'orders2',
          component: resolve => require(["../components/orders2"],resolve),
          meta:{keepAlive:false}
        },
        {
          path: '/pay',
          name: 'pay',
          component: resolve => require(["../components/pay"],resolve),
          meta:{keepAlive:false}
        },
        {
          path: '/paySuccess',
          name: 'paySuccess',
          component: resolve => require(["../components/paySuccess"],resolve),
          meta:{keepAlive:false}
        },
        {
          path: '/transfer',
          name: 'transfer',
          component: resolve => require(["../components/transfer"],resolve),
          meta:{keepAlive:false}
        },
        {
          path: '/talk',
          name: 'talk',
          component: resolve => require(["../components/talk"],resolve),
        },
        {
          path: '/loginmax',
          name: 'loginmax',
          redirect:"/myserves",
          component: resolve => require(["../components/loginmax"],resolve),
          children:[
            {
              path: '/myserves',
              name: 'myserves',
              component: resolve => require(["../components/myserves"],resolve),
            },
            {
              path: '/myfile',
              name: 'myfile',
              component: resolve => require(["../components/myfile"],resolve),
            },
            {
              path: '/servesMan',
              name: 'servesMan',
              component: resolve => require(["../components/servesMan"],resolve),
            },
            {
              path: '/account',
              name: 'account',
              component: resolve => require(["../components/account"],resolve),
            },
            {
              path: '/money',
              name: 'money',
              component: resolve => require(["../components/momney"],resolve),
            },
            {
              path: '/orderInfo',
              name: 'orderInfo',
              component: resolve => require(["../components/info"],resolve),
            },
            {
              path: '/pay2',
              name: 'pay2',
              component: resolve => require(["../components/pay"],resolve),
            },
          ]
        }
      ]
    },
    {
      path:'/',
      redirect:'/mainTable',
    },
  ]
})
