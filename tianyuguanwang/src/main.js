// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto'
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import store from '../src/vuex/index'
import axios from 'axios'
import qs from 'qs'
import Cookies from 'js-cookie'
import elementui from 'element-ui'
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(elementui)
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
Vue.prototype.axios = axios;
Vue.prototype.qs = qs;
Vue.prototype.Cookies = Cookies;

/*router.beforeEach((to, from, next) => {
    if(from.name=='loginmax'){
      window.payTimer?window.payTimer=null:null;
      next()
    }
    next()

});*/
