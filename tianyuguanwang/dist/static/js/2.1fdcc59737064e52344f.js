webpackJsonp([2],{"+who":function(t,e,s){t.exports=s.p+"static/img/ss-6.e1d53f9.jpg"},"1zCN":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"mainhome",data:function(){return{slideStyle:{height:500*document.body.clientWidth/1920+"px"},slideList:[{clickUrl:"#",desc:"nhwc",image:"../../static/images/sss-1.png"},{clickUrl:"#",desc:"hxrj",image:"../../static/images/sss-2.png"},{clickUrl:"#",desc:"rsdh",image:"../../static/images/sss-3.png"},{clickUrl:"#",desc:"rsdh",image:"../../static/images/sss-4.png"}],currentIndex:0,timer:"",slideList2:[{text:"成为最尊敬的企业是我们的愿景目标"},{text:"成为最尊敬的企业是我们的愿景目标"},{text:"成为最尊敬的企业是我们的愿景目标"},{text:"成为最尊敬的企业是我们的愿景目标"}],newText:"到了杨梅时节。如果你看到杨梅却迟迟不敢心动是不是因为听过这些“吃杨梅前一定要知道的事杨梅里面泡出！…",productList:[],mainHomePicList:[],doctorList:[{imgUrl:"../../static/images/d-1.jpg",name:"江晓琪",department:"急诊科",desc:"燕京大学国际医院急诊科副主任医师,急救医学博士。"},{imgUrl:"../../static/images/d-1.jpg",name:"何建一",department:"急诊科",desc:"燕京大学国际医院急诊科主任医师。"},{imgUrl:"../../static/images/d-1.jpg",name:"刘慧敏",department:"急诊科",desc:"燕京大学国际医院急诊科副主任医师。"},{imgUrl:"../../static/images/d-1.jpg",name:"赵蕾",department:"急诊科",desc:"燕京大学国际医院医务处主任。"},{imgUrl:"../../static/images/d-1.jpg",name:"乔娜",department:"急诊科",desc:"燕京大学国际医院急诊科医生。"},{imgUrl:"../../static/images/d-1.jpg",name:"张泠",department:"急诊科",desc:"燕京大学国际医院急诊科护士。"},{imgUrl:"../../static/images/d-1.jpg",name:"海洋",department:"急诊科",desc:"燕京大学国际医院急诊科医生。"},{imgUrl:"../../static/images/d-1.jpg",name:"方志军",department:"急诊科",desc:"燕京大学国际医院急诊科医生。"}],itemTextArr2:this.$store.state.vuexs.itemTextArr,url:this.$store.state.vuexs.url}},methods:{getMainHomePic:function(t){var e=this,s={type:t,pageNum:1,pageSize:10};e.axios({method:"post",url:e.url+"/resource/list",data:e.qs.stringify(s)}).then(function(s){0==s.data.code?1==t?e.mainHomePicList=s.data.data.rows:2==t?e.productPicList=s.data.data.rows:3==t&&(e.doctorPicList=s.data.data.rows):e.$message({showClose:!0,message:"获取失败",type:"error"}),console.log(s)})},go:function(){var t=this;t.timer=setInterval(function(){t.autoPlay()},4e3)},stop:function(){clearInterval(this.timer),this.timer=null},change:function(t){this.currentIndex=t},autoPlay:function(){this.currentIndex++,this.currentIndex>this.mainHomePicList.length-1&&(this.currentIndex=0)},changeColor:function(t){this.productList.forEach(function(t){t.isActive=!1}),this.productList[t].isActive=!0},changeNone:function(t,e){this.productList.forEach(function(t){t.isActive=!1})},pushToUrl2:function(t){this.$store.state.vuexs.itemTextArr.forEach(function(t){t.isActive=!1}),this.$store.state.vuexs.itemTextArr[1].isActive=!0,this.$router.push({path:t}),window.scrollTo(0,0)},pushToUrl3:function(t){this.$store.state.vuexs.itemTextArr.forEach(function(t){t.isActive=!1}),this.$store.state.vuexs.itemTextArr[2].isActive=!0,this.$router.push({path:t}),window.scrollTo(0,0)},getProductList:function(){var t=this;t.token=t.Cookies.get("token"),t.axios.defaults.headers.post.token=t.token,t.axios({method:"post",url:t.url+"/commodity/list",data:{pageSize:6,pageNum:1}}).then(function(e){console.log(e),t.productList=e.data.data.rows,t.total=e.data.data.total})},getOrder:function(t){console.log("1111"),this.$router.push({name:"productDesc",params:{id:t}}),window.scrollTo(0,0)}},filters:{numFilter:function(t){if(t.length>15)return t.slice(0,35)+"..."}},created:function(){var t=this;this.$nextTick(function(){t.getMainHomePic(1),t.timer=setInterval(function(){t.autoPlay()},4e3)})},mounted:function(){var t=this;window.onresize=function(){t.slideStyle={height:500*document.body.clientWidth/1920+"px"}}}},a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{},[s("div",{staticClass:"carousel-wrap",style:t.slideStyle,attrs:{id:"carousel"},on:{mouseenter:function(e){t.stop()},mouseleave:function(e){t.go()}}},[s("transition-group",{staticClass:"slide-ul",attrs:{tag:"ul",name:"list"}},t._l(t.mainHomePicList,function(e,i){return s("li",{directives:[{name:"show",rawName:"v-show",value:i===t.currentIndex,expression:"index===currentIndex"}],key:i},[s("a",{attrs:{href:"#"}},[s("img",{staticStyle:{height:"100%"},attrs:{src:e.img,alt:e.desc}})])])})),t._v(" "),s("div",{staticClass:"carousel-items"},t._l(t.mainHomePicList.length,function(e,i){return s("span",{class:{active:i===t.currentIndex},on:{mouseover:function(e){t.change(i)}}})}))],1),t._v(" "),t._m(0),t._v(" "),s("div",{staticClass:"home-footer"},[t._v("\n    Copyright © 天宇尚医, All Rights Reserved.   备案号：京ICP备18045115号-1\n  ")])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"main-box"},[e("img",{attrs:{src:s("pvY5"),alt:""}}),this._v(" "),e("img",{attrs:{src:s("JyD6"),alt:""}}),this._v(" "),e("img",{attrs:{src:s("Bpou"),alt:""}}),this._v(" "),e("img",{attrs:{src:s("ie8A"),alt:""}}),this._v(" "),e("img",{attrs:{src:s("+who"),alt:""}}),this._v(" "),e("img",{attrs:{src:s("U4Uj"),alt:""}}),this._v(" "),e("img",{attrs:{src:s("bhNc"),alt:""}})])}]};var n=s("VU/8")(i,a,!1,function(t){s("Jmk8")},"data-v-7e98ce88",null);e.default=n.exports},Bpou:function(t,e,s){t.exports=s.p+"static/img/ss-3.0dbebf4.jpg"},Jmk8:function(t,e){},JyD6:function(t,e,s){t.exports=s.p+"static/img/ss-4.631cb6a.jpg"},U4Uj:function(t,e,s){t.exports=s.p+"static/img/ss-7.d5f868f.jpg"},bhNc:function(t,e,s){t.exports=s.p+"static/img/localText.089eb12.jpg"},ie8A:function(t,e,s){t.exports=s.p+"static/img/ss-5.6635353.jpg"},pvY5:function(t,e,s){t.exports=s.p+"static/img/ss-2.612aeaa.jpg"}});
//# sourceMappingURL=2.1fdcc59737064e52344f.js.map