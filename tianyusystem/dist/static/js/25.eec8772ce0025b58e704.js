webpackJsonp([25],{GXjx:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=e("mtWM"),n=e.n(i),a={data:function(){return{params:this.$route.params,historyList:[],baseURl:"http://apitest.tianyushangyi.com",token:""}},methods:{getHistoryById:function(){var t=this;this.historyVisible=!0;var s=localStorage.getItem("currentUser_token"),e=t.params.task_id;n.a.defaults.headers.get.token=s,n()({method:"post",url:t.baseURl+"/serviceorder/servicefollowing?id="+e}).then(function(s){"0"==s.data.code&&(t.historyList=s.data.data,console.log(t.historyList))})}},mounted:function(){this.getHistoryById()}},r={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"historyMain"},t._l(t.historyList,function(s,i){return e("div",{staticClass:"historyList"},[e("i",{class:0==i?"focus":"nomal"}),t._v(" "),t._l(s.msg,function(s){return""!=s?e("span",{staticClass:"historyAddress"},[t._v("\n      "+t._s(s)+"\n    ")]):t._e()}),t._v(" "),e("div",{staticClass:"historyTime"},[t._v("\n      "+t._s(s.date)+"\n    ")])],2)}))},staticRenderFns:[]};var o=e("VU/8")(a,r,!1,function(t){e("pwKs")},null,null);s.default=o.exports},pwKs:function(t,s){}});
//# sourceMappingURL=25.eec8772ce0025b58e704.js.map