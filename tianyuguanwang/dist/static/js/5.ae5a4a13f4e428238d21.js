webpackJsonp([5],{Cdx3:function(e,t,a){var s=a("sB3e"),o=a("lktj");a("uqUo")("keys",function(){return function(e){return o(s(e))}})},Rjor:function(e,t){},VQA1:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("fZjL"),o=a.n(s),i={name:"myserves",data:function(){return{pickerOptions0:{disabledDate:function(e){}},tt:2,servesList:[],serviceInfos:[],token:"",num:0,url:this.$store.state.vuexs.url,upData:{type:1},headers:{token:this.Cookies.get("token")},options:[{value:"线下",label:"线下"},{value:"线上(APP)",label:"线上(APP)"}],options2:[{value:!0,label:"本人"},{value:!1,label:"家属"}],fileList:[],isShow:!1,showData:{},serviceData:{serviceInfoId:"",productId:"",isSelf:!0,consultationType:"线下",conditionComplaint:"",caseAppendagePath:"",appointDate:""}}},methods:{getToken:function(){this.token=this.Cookies.get("token")},getTab:function(){this.isShow=!this.isShow},getServers:function(){var e=this;e.token=e.Cookies.get("token"),e.axios.defaults.headers.post.token=e.token,e.axios({method:"post",url:e.url+"/serviceorder/personallist"}).then(function(t){console.log(t),0==t.data.code&&(e.servesList=t.data.data.rows)})},reservation:function(e){console.log(e);var t=this;t.fileList=[],t.serviceData={},t.token=t.Cookies.get("token"),t.serviceData.serviceInfoId=e.id,t.serviceData.productId=e.productId,t.axios.defaults.headers.get.token=t.token,t.axios({method:"get",url:t.url+"/product/edit?id="+e.productId}).then(function(a){console.log(a,e.productId),0==a.data.code&&(t.showData=a.data.data,console.log(t.showData.preDayOfAppointment),t.pickerOptions0.disabledDate=function(e){return e.getTime()<Date.now()+864e5*t.showData.preDayOfAppointment-864e5},t.getTab())})},resSubmit:function(){var e=this;e.token=e.Cookies.get("token"),console.log(e.serviceData),console.log(e.token),e.axios.defaults.headers.post.token=e.token,e.axios({method:"post",url:e.url+"/appointservice/personalappoint",data:e.serviceData}).then(function(t){console.log(t),0==t.data.code?e.$message({message:t.data.desc,type:"success"}):e.$message({message:t.data.desc,type:"error"}),e.getTab()})},handleRemove:function(e,t){console.log(e,t)},handleSuccess:function(e,t,a){console.log(e);0==e.code&&(this.serviceData.caseAppendagePath=e.data.url)},handlePreview:function(e){console.log(e)},handleExceed:function(e,t){[]},beforeRemove:function(e,t){return this.$confirm("确定移除 "+e.name+"？")},removeObj:function(e){o()(e).forEach(function(t){console.log(t,e[t]),e[t]=""}),console.log(this.serviceData),this.getTab()}},created:function(){this.getToken(),this.getServers()}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"server-box"},[a("div",{staticClass:"title"},[e._v("我的服务订单")]),e._v(" "),e._l(e.servesList,function(t){return a("div",{staticClass:"dd-content"},[a("div",{staticClass:"dd-number"},[e._v("服务订单编号 : "),a("span",[e._v(e._s(t.info.no))])]),e._v(" "),a("span",{staticClass:"dd-info"},[e._v("订单信息")]),e._v(" "),a("div",{staticClass:"dd-decB"},[a("table",{attrs:{cellspacing:"0"}},[e._m(0,!0),e._v(" "),a("tr",[a("td",{staticClass:"dd-infoTr"},[e._v(e._s(t.info.no))]),e._v(" "),a("td",{staticClass:"dd-infoTr"},[e._v(e._s(t.info.createDate))]),e._v(" "),a("td",{staticClass:"dd-infoTr"},[e._v(e._s(t.info.commodityName))]),e._v(" "),a("td",{staticClass:"dd-infoTr"},[e._v(e._s(t.info.specificationName))]),e._v(" "),a("td",{staticClass:"dd-infoTr"},[a("img",{attrs:{src:t.info.majorPath,alt:""}})])])])]),e._v(" "),e._m(1,!0),e._v(" "),a("div",{staticClass:"fu-dec"},[a("table",{attrs:{cellspacing:"0"}},[e._m(2,!0),e._v(" "),e._l(t.serviceInfos,function(t){return a("tr",[a("td",[e._v(e._s(t.productName))]),e._v(" "),a("td",[e._v(e._s(t.total))]),e._v(" "),a("td",[e._v(e._s(t.count))]),e._v(" "),a("td",[e._v(e._s(t.productDetail))]),e._v(" "),a("td",[a("el-button",{attrs:{type:"primary"},on:{click:function(a){e.reservation(t)}}},[e._v("预约")])],1)])})],2)])])}),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.isShow,expression:"isShow"}],staticClass:"serves-add"},[a("div",[a("div",{directives:[{name:"show",rawName:"v-show",value:"需要"==e.showData.consultationType,expression:"showData.consultationType=='需要'"}]},[a("label",[e._v("咨询类别 : ")]),e._v(" "),a("el-select",{attrs:{filterable:"",placeholder:"请选择"},model:{value:e.serviceData.consultationType,callback:function(t){e.$set(e.serviceData,"consultationType",t)},expression:"serviceData.consultationType"}},e._l(e.options,function(e){return a("el-option",{key:e.value,attrs:{value:e.value}})}))],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.showData.needTimeOfAppointment,expression:"showData.needTimeOfAppointment"}]},[a("label",[e._v("预约时间 : ")]),e._v(" "),a("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm",format:"yyyy-MM-dd HH:mm","picker-options":e.pickerOptions0,focus:e.pickerOptions0.disabledDate,placeholder:"选择日期时间"},model:{value:e.serviceData.appointDate,callback:function(t){e.$set(e.serviceData,"appointDate",t)},expression:"serviceData.appointDate"}})],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.showData.usedByFamily,expression:"showData.usedByFamily"}]},[a("label",[e._v("就诊人员 : ")]),e._v(" "),a("el-select",{attrs:{filterable:"",placeholder:"请选择"},model:{value:e.serviceData.isSelf,callback:function(t){e.$set(e.serviceData,"isSelf",t)},expression:"serviceData.isSelf"}},e._l(e.options2,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.showData.needCaseAppendage,expression:"showData.needCaseAppendage"}]},[a("label",[e._v("既往病例 : ")]),e._v(" "),a("el-upload",{staticClass:"upload-demo",attrs:{action:"http://apitest.tianyushangyi.com/file/upload",headers:e.headers,data:e.upData,"on-preview":e.handlePreview,"on-remove":e.handleRemove,"on-success":e.handleSuccess,"before-remove":e.beforeRemove,multiple:"","on-exceed":e.handleExceed,"file-list":e.fileList}},[a("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")]),e._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"})],1)],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.showData.needConditionComplaint,expression:"showData.needConditionComplaint"}]},[a("label",[e._v("病情主诉 : ")]),e._v(" "),a("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:e.serviceData.conditionComplaint,callback:function(t){e.$set(e.serviceData,"conditionComplaint",t)},expression:"serviceData.conditionComplaint"}})],1),e._v(" "),a("div",{staticClass:"add-btn"},[a("el-button",{attrs:{type:"primary"},on:{click:e.resSubmit}},[e._v("预约")]),e._v(" "),a("el-button",{attrs:{type:"info"},on:{click:function(t){e.removeObj(e.serviceData)}}},[e._v("取消")])],1)])])],2)},staticRenderFns:[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("tr",[a("th",[e._v("服务订单编号")]),e._v(" "),a("th",[e._v("订单生成时间")]),e._v(" "),a("th",[e._v("商品名称")]),e._v(" "),a("th",[e._v("商品规格")]),e._v(" "),a("th",[e._v("商品图片")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"fu-info"},[this._v("服务信息"),t("span",{staticClass:"fu-infoMin"},[this._v("服务使用须知：体检需提前一周预约，其它健康服务项目需提前2-3个工作日预约")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("tr",[a("th",[e._v("服务项")]),e._v(" "),a("th",[e._v("总次数")]),e._v(" "),a("th",[e._v("可用次数")]),e._v(" "),a("th",[e._v("服务详情")]),e._v(" "),a("th",[e._v("操作")])])}]};var l=a("VU/8")(i,n,!1,function(e){a("Rjor")},"data-v-557255ef",null);t.default=l.exports},fZjL:function(e,t,a){e.exports={default:a("jFbC"),__esModule:!0}},jFbC:function(e,t,a){a("Cdx3"),e.exports=a("FeBl").Object.keys},uqUo:function(e,t,a){var s=a("kM2E"),o=a("FeBl"),i=a("S82l");e.exports=function(e,t){var a=(o.Object||{})[e]||Object[e],n={};n[e]=t(a),s(s.S+s.F*i(function(){a(1)}),"Object",n)}}});
//# sourceMappingURL=5.ae5a4a13f4e428238d21.js.map