webpackJsonp([20],{HoX4:function(e,l){},ITJv:function(e,l){},SP30:function(e,l,t){"use strict";Object.defineProperty(l,"__esModule",{value:!0});var n=t("woOf"),a=t.n(n),o=t("mtWM"),i=t.n(o),r={name:"service-list",data:function(){return{baseURl:"http://apitest.tianyushangyi.com",token:"",currentPage:1,currentSize:10,pageNum:0,tableData:[],formInline:{needCaseAppendage:"",needConditionComplaint:"",consultationType:"",preDayOfAppointment:"",needTimeOfAppointment:"",usedByFamily:"",needDoctor:"",detail:"",name:"",productType:""},formInline2:{needCaseAppendage:"",needConditionComplaint:"",consultationType:"",preDayOfAppointment:"",needTimeOfAppointment:"",usedByFamily:"",needDoctor:"",detail:"",name:"",productType:""},formLabelWidth:"100px",formLabetimelWidth:"100px",dialogVisible:!1,dialogVisiblecompile:!1,options:[{value:!0,label:"需要"},{value:!1,label:"不需要"}],optionsday:[{value:1,label:"1天"},{value:3,label:"3天"},{value:7,label:"7天"}],optionyesno:[{value:!1,label:"否"},{value:!0,label:"是"}],consult:[{value:"需要",label:"需要"},{value:"不需要",label:"不需要"}]}},methods:{gettoken:function(){this.token=localStorage.getItem("currentUser_token")},judege:function(e,l,t,n){return t?"需要":"不需要"},famege:function(e,l,t,n){return t?"是":"否"},handleAdd:function(e,l){this.formInline={needCaseAppendage:"",needConditionComplaint:"",consultationType:"",preDayOfAppointment:"",needTimeOfAppointment:"",usedByFamily:"",needDoctor:"",detail:"",name:"",productType:""},this.dialogVisible=!0},handlecompile:function(e,l){this.dialogVisiblecompile=!0,this.formInline2=a()({},l)},newserve:function(){var e=this,l={needCaseAppendage:e.formInline.needCaseAppendage,needConditionComplaint:e.formInline.needConditionComplaint,consultationType:e.formInline.consultationType,preDayOfAppointment:e.formInline.preDayOfAppointment,needTimeOfAppointment:e.formInline.needTimeOfAppointment,usedByFamily:e.formInline.usedByFamily,needDoctor:e.formInline.needDoctor,detail:e.formInline.detail,name:e.formInline.name,productType:""};i.a.defaults.headers.post.token=e.token,i()({method:"post",url:e.baseURl+"/product/add",data:l}).then(function(l){"0"==l.data.code?(console.log(l),e.dialogVisible=!1,e.sublist(),e.formInline={},e.$message({message:"创建新增成功",type:"success"})):e.$message({message:"创建新增失败请从新填写",type:"error"})})},indexMethod:function(e){return 1*e+1},handleSizeChange:function(e){this.currentSize=e,this.sublist()},handleCurrentChange:function(e){this.currentPage=e,this.sublist()},sublist:function(){var e=this,l=localStorage.getItem("currentUser_token"),t={pageSize:this.currentSize,pageNum:this.currentPage};i.a.defaults.headers.post.token=l,i()({method:"post",url:this.baseURl+"/product/list",data:t}).then(function(l){"0"==l.data.code&&(e.tableData=l.data.data.rows,e.pageNum=parseInt(l.data.data.total))})},handleEdit:function(e,l){var t=this;console.log(e,l),i.a.defaults.headers.post.token=this.token,i()({method:"post",url:this.baseURl+"/product/update",data:this.formInline2}).then(function(e){"0"==e.data.code?(t.$message({showClose:!0,type:"success",message:"編輯成功"}),t.dialogVisiblecompile=!1,t.sublist()):t.$message({showClose:!0,type:"error",message:"编辑失败请检车从新编辑"})})},editformdelet:function(e,l){var t=this;l=l;console.log(l),i.a.defaults.headers.post.token=this.token,i()({method:"post",url:this.baseURl+"/product/delete?id="+l,data:""}).then(function(e){"0"==e.data.code?(console.log("删除成功"),t.sublist(),t.$message({message:"删除成功",type:"success"})):console.log(e.data.desc)})}},mounted:function(){this.sublist(),this.gettoken()}},s={render:function(){var e=this,l=e.$createElement,t=e._self._c||l;return t("el-container",{staticClass:"ServiceList"},[t("el-header",[t("el-row",{attrs:{gutter:20}},[t("el-col",{attrs:{span:2}},[t("i",{staticClass:"el-icon-menu"}),e._v(" 服务列表")]),e._v(" "),t("div",{staticClass:"ty-service-add"},[t("el-button",{attrs:{icon:"el-icon-plus"},on:{click:e.handleAdd}},[e._v("新增服务")])],1)],1)],1),e._v(" "),t("el-main",[t("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData}},[e._v(' //v-for="item in items"\n      '),t("el-table-column",{attrs:{type:"index",index:e.indexMethod}}),e._v(" "),t("el-table-column",{attrs:{prop:"name",label:"名称",width:""}}),e._v(" "),t("el-table-column",{attrs:{prop:"no",label:"编号"}}),e._v(" "),t("el-table-column",{attrs:{prop:"needDoctor",label:"医生",formatter:e.judege}}),e._v(" "),t("el-table-column",{attrs:{prop:"usedByFamily",label:"家属",formatter:e.famege}}),e._v(" "),t("el-table-column",{attrs:{prop:"needTimeOfAppointment",label:"预约",formatter:e.judege}}),e._v(" "),t("el-table-column",{attrs:{prop:"preDayOfAppointment",label:"提前天数"}}),e._v(" "),t("el-table-column",{attrs:{prop:"consultationType",label:"咨询类别"}}),e._v(" "),t("el-table-column",{attrs:{prop:"needConditionComplaint",label:"病情主诉",formatter:e.judege}}),e._v(" "),t("el-table-column",{attrs:{prop:"needCaseAppendage",label:"病例附件",formatter:e.judege}}),e._v(" "),t("el-table-column",{attrs:{prop:"detail",label:"服务详情"}}),e._v(" "),t("el-table-column",{attrs:{prop:"updateDate",label:"时间"}}),e._v(" "),t("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(l){return[t("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){e.handlecompile(l.$index,l.row)}}},[e._v("编辑\n          ")])]}}])}),e._v(" "),t("el-table-column",{attrs:{label:""},scopedSlots:e._u([{key:"default",fn:function(l){return[t("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){e.editformdelet(l.$index,l.row.id)}}},[e._v("删除\n          ")])]}}])})],1),e._v(" "),t("div",{staticClass:"pages"},[t("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,30,40],"page-size":10,background:"",layout:"sizes,prev, pager, next",total:e.pageNum},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(l){e.currentPage=l}}})],1)],1),e._v(" "),t("el-dialog",{attrs:{modal:!1,title:"服务信息",visible:e.dialogVisible,width:"30%"},on:{"update:visible":function(l){e.dialogVisible=l}}},[t("el-form",{attrs:{model:e.formInline}},[t("span",[e._v("基本信息：")]),e._v(" "),t("el-form-item",{attrs:{label:"名称","label-width":e.formLabelWidth}},[t("el-input",{model:{value:e.formInline.name,callback:function(l){e.$set(e.formInline,"name",l)},expression:"formInline.name"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"详情","label-width":e.formLabelWidth}},[t("el-input",{model:{value:e.formInline.detail,callback:function(l){e.$set(e.formInline,"detail",l)},expression:"formInline.detail"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"保健医","label-width":e.formLabelWidth}},[t("el-select",{attrs:{placeholder:"状态"},model:{value:e.formInline.needDoctor,callback:function(l){e.$set(e.formInline,"needDoctor",l)},expression:"formInline.needDoctor"}},e._l(e.options,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),t("el-form-item",{attrs:{label:"家属可用","label-width":e.formLabelWidth}},[t("el-select",{attrs:{placeholder:"状态"},model:{value:e.formInline.usedByFamily,callback:function(l){e.$set(e.formInline,"usedByFamily",l)},expression:"formInline.usedByFamily"}},e._l(e.optionyesno,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),t("span",[e._v("预约时间：")]),e._v(" "),t("el-form-item",{attrs:{label:"需要预约","label-width":e.formLabelWidth}},[t("el-select",{attrs:{placeholder:"状态"},model:{value:e.formInline.needTimeOfAppointment,callback:function(l){e.$set(e.formInline,"needTimeOfAppointment",l)},expression:"formInline.needTimeOfAppointment"}},e._l(e.options,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),t("el-form-item",{attrs:{label:"预约提前时间","label-width":e.formLabetimelWidth}},[t("el-select",{attrs:{placeholder:"状态"},model:{value:e.formInline.preDayOfAppointment,callback:function(l){e.$set(e.formInline,"preDayOfAppointment",l)},expression:"formInline.preDayOfAppointment"}},e._l(e.optionsday,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),t("el-form-item",{attrs:{label:"咨询类别","label-width":e.formLabelWidth}},[t("el-select",{attrs:{placeholder:"状态"},model:{value:e.formInline.consultationType,callback:function(l){e.$set(e.formInline,"consultationType",l)},expression:"formInline.consultationType"}},e._l(e.consult,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),t("el-form-item",{attrs:{label:"病情主诉","label-width":e.formLabelWidth}},[t("el-select",{attrs:{placeholder:"状态"},model:{value:e.formInline.needConditionComplaint,callback:function(l){e.$set(e.formInline,"needConditionComplaint",l)},expression:"formInline.needConditionComplaint"}},e._l(e.options,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),t("el-form-item",{attrs:{label:"病例附件","label-width":e.formLabelWidth}},[t("el-select",{attrs:{placeholder:"状态"},model:{value:e.formInline.needCaseAppendage,callback:function(l){e.$set(e.formInline,"needCaseAppendage",l)},expression:"formInline.needCaseAppendage"}},e._l(e.options,function(e){return t("el-option",{attrs:{value:e.value,label:e.label}})}))],1)],1),e._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(l){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:e.newserve}},[e._v("确 定")])],1)],1),e._v(" "),t("el-dialog",{attrs:{modal:!1,title:"服务信息",visible:e.dialogVisiblecompile,width:"30%"},on:{"update:visible":function(l){e.dialogVisiblecompile=l}}},[t("el-form",{attrs:{model:e.formInline2}},[t("span",[e._v("基本信息：")]),e._v(" "),t("el-form-item",{attrs:{label:"名称","label-width":e.formLabelWidth}},[t("el-input",{model:{value:e.formInline2.name,callback:function(l){e.$set(e.formInline2,"name",l)},expression:"formInline2.name"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"保健医","label-width":e.formLabelWidth}},[t("el-select",{attrs:{placeholder:"状态"},model:{value:e.formInline2.needDoctor,callback:function(l){e.$set(e.formInline2,"needDoctor",l)},expression:"formInline2.needDoctor"}},e._l(e.options,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),t("el-form-item",{attrs:{label:"家属可用","label-width":e.formLabelWidth}},[t("el-select",{attrs:{placeholder:"状态"},model:{value:e.formInline2.usedByFamily,callback:function(l){e.$set(e.formInline2,"usedByFamily",l)},expression:"formInline2.usedByFamily"}},e._l(e.optionyesno,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),t("span",[e._v("预约时间：")]),e._v(" "),t("el-form-item",{attrs:{label:"需要预约","label-width":e.formLabelWidth}},[t("el-select",{attrs:{placeholder:"状态"},model:{value:e.formInline2.needTimeOfAppointment,callback:function(l){e.$set(e.formInline2,"needTimeOfAppointment",l)},expression:"formInline2.needTimeOfAppointment"}},e._l(e.options,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),t("el-form-item",{attrs:{label:"预约提前时间","label-width":e.formLabetimelWidth}},[t("el-select",{attrs:{placeholder:"状态"},model:{value:e.formInline2.preDayOfAppointment,callback:function(l){e.$set(e.formInline2,"preDayOfAppointment",l)},expression:"formInline2.preDayOfAppointment"}},e._l(e.optionsday,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),t("el-form-item",{attrs:{label:"咨询类别","label-width":e.formLabelWidth}},[t("el-select",{attrs:{placeholder:"状态"},model:{value:e.formInline2.consultationType,callback:function(l){e.$set(e.formInline2,"consultationType",l)},expression:"formInline2.consultationType"}},e._l(e.consult,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),t("el-form-item",{attrs:{label:"病情主诉","label-width":e.formLabelWidth}},[t("el-select",{attrs:{placeholder:"状态"},model:{value:e.formInline2.needConditionComplaint,callback:function(l){e.$set(e.formInline2,"needConditionComplaint",l)},expression:"formInline2.needConditionComplaint"}},e._l(e.options,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),t("el-form-item",{attrs:{label:"病例附件","label-width":e.formLabelWidth}},[t("el-select",{attrs:{placeholder:"状态"},model:{value:e.formInline2.needCaseAppendage,callback:function(l){e.$set(e.formInline2,"needCaseAppendage",l)},expression:"formInline2.needCaseAppendage"}},e._l(e.options,function(e){return t("el-option",{attrs:{value:e.value,label:e.label}})}))],1),e._v(" "),t("el-form-item",{attrs:{label:"详情","label-width":e.formLabelWidth}},[t("el-input",{model:{value:e.formInline2.detail,callback:function(l){e.$set(e.formInline2,"detail",l)},expression:"formInline2.detail"}})],1)],1),e._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(l){e.dialogVisiblecompile=!1}}},[e._v("取 消")]),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:e.handleEdit}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var d=t("VU/8")(r,s,!1,function(e){t("ITJv"),t("HoX4")},"data-v-11142344",null);l.default=d.exports}});
//# sourceMappingURL=20.6908ef3a42dd52792977.js.map