webpackJsonp([16],{ujSv:function(e,t){},yRx0:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={name:"info",data:function(){return{params:this.$route.params,url:this.$store.state.vuexs.url,orderInfo:{},token:""}},methods:{getOrderInfo:function(){var e=this;e.token=e.Cookies.get("token"),e.axios.defaults.headers.get.token=e.token,e.axios({method:"get",url:e.url+"/purchaseorder/detail?id="+e.params.id}).then(function(t){console.log(t),0==t.data.code&&(e.orderInfo=t.data.data)})},getNext:function(){this.$router.push({path:"/pay2"})}},created:function(){},mounted:function(){this.getOrderInfo(),console.log(this.orderInfo)}},s={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{key:"2"}),e._v(" "),r("div",{key:"1",staticStyle:{width:"100%"}},[r("div",{staticClass:"info-box",staticStyle:{width:"90%"}},[r("span",{staticClass:"info-status"},[e._v("当前订单状态："+e._s(e.orderInfo.orderInfo.status))]),e._v(" "),r("span",{staticClass:"info-title"},[e._v("订单信息")]),e._v(" "),r("div",{staticClass:"ddxx"},[r("table",{attrs:{cellspacing:"0"}},[e._m(0),e._v(" "),r("tr",[r("td",[e._v(e._s(e.orderInfo.orderInfo.no))]),e._v(" "),r("td",[e._v(e._s(e.orderInfo.orderInfo.mobile))]),e._v(" "),r("td",[e._v(e._s(e.orderInfo.orderInfo.createDate))]),e._v(" "),r("td",[e._v(e._s(e.orderInfo.orderInfo.status))]),e._v(" "),r("td",[e._v(e._s(e.orderInfo.orderInfo.totalPrice))])])])]),e._v(" "),r("span",{staticClass:"info-title"},[e._v("服务信息")]),e._v(" "),r("div",{staticClass:"ddxx"},[r("table",{attrs:{cellspacing:"0"}},[e._m(1),e._v(" "),r("tr",[r("td",[e._v(e._s(e.orderInfo.purchaseInfo.specificationDetail.spec2prod[0].no))]),e._v(" "),r("td",[r("img",{staticStyle:{width:"120px",height:"80px"},attrs:{src:e.orderInfo.purchaseInfo.picPath,alt:""}})]),e._v(" "),r("td",[e._v(e._s(e.orderInfo.purchaseInfo.commodityName))]),e._v(" "),r("td",[e._v(e._s(e.orderInfo.purchaseInfo.specificationDetail.name))]),e._v(" "),r("td",e._l(e.orderInfo.purchaseInfo.specificationDetail.spec2prod,function(t){return r("div",[e._v(e._s(t.productName)+"："+e._s(t.count)+"次")])})),e._v(" "),r("td",[e._v(e._s(e.orderInfo.purchaseInfo.count))])])])]),e._v(" "),r("span",{staticClass:"info-title"},[e._v("产品使用人信息")]),e._v(" "),r("div",{staticClass:"ddxx"},[r("table",{attrs:{cellspacing:"0"}},[r("tr",[r("th",[e._v("产品使用人")]),e._v(" "),r("th",[e._v("手机号码")]),e._v(" "),e.orderInfo.address?r("th",[e._v("地址")]):e._e(),e._v(" "),e.orderInfo.servicePeople?r("th",[e._v("年龄")]):e._e(),e._v(" "),e.orderInfo.servicePeople?r("th",[e._v("身份证号")]):e._e(),e._v(" "),e.orderInfo.servicePeople?r("th",[e._v("身份证图片")]):e._e()]),e._v(" "),r("tr",[e.orderInfo.address?r("td",[e._v(e._s(e.orderInfo.address.name))]):e._e(),e._v(" "),e.orderInfo.address?r("td",[e._v(e._s(e.orderInfo.address.mobile))]):e._e(),e._v(" "),e.orderInfo.address?r("td",[e._v(e._s(e.orderInfo.address.address)+"\n          ")]):e._e(),e.orderInfo.servicePeople?r("td",[e._v(e._s(e.orderInfo.servicePeople.name))]):e._e(),e._v(" "),e.orderInfo.servicePeople?r("td",[e._v(e._s(e.orderInfo.servicePeople.mobile))]):e._e(),e._v(" "),e.orderInfo.servicePeople?r("td",[e._v(e._s(e.orderInfo.servicePeople.age))]):e._e(),e._v(" "),e.orderInfo.servicePeople?r("td",[e._v(e._s(e.orderInfo.servicePeople.idCardNum))]):e._e(),e._v(" "),e.orderInfo.servicePeople?r("td",[r("img",{staticStyle:{width:"50px",height:"50px"},attrs:{src:e.orderInfo.servicePeople.idCardUrl+"&token="+e.token,alt:""}})]):e._e()])])])])])])},staticRenderFns:[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("tr",[r("th",[e._v("订单编号")]),e._v(" "),r("th",[e._v("用户账号")]),e._v(" "),r("th",[e._v("提交时间")]),e._v(" "),r("th",[e._v("订单状态")]),e._v(" "),r("th",[e._v("订单金额")])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("tr",[r("th",[e._v("商品编号")]),e._v(" "),r("th",[e._v("商品图")]),e._v(" "),r("th",[e._v("商品名称")]),e._v(" "),r("th",[e._v("规格")]),e._v(" "),r("th",[e._v("规格详细信息")]),e._v(" "),r("th",[e._v("数量")])])}]};var d=r("VU/8")(o,s,!1,function(e){r("ujSv")},"data-v-501207da",null);t.default=d.exports}});
//# sourceMappingURL=16.a808bed7467f8fa7b90e.js.map