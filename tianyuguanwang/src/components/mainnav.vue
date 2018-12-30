<template>
  <div class="home-title">
    <div class="home-left">
      <img class="home-logo" v-bind:src="imageLogoUrl" alt="">
      <span class="home-text">{{itemByName}}</span>

    </div>
    <div class="home-kindBox" ref="kindBox">
      <span class="home-kind" v-for="(site,index) in itemTextArr2"  :class="{'isActive':site.isActive}" @click="pushToUrl(site.url,site.isActive,index)">
        {{site.name}}
      </span>
      <span class="home-login" @click="pushToUrl2('/login')" v-show="!$store.state.vuexs.userShow" :class="{'isActive':loginClass}">登录</span>
      <span class="home-kind" v-show="$store.state.vuexs.userShow" @click="pushToUrl2('/loginmax')">{{$store.state.vuexs.user}}</span>
      <span class="telCont" style="position: relative">
        <span style="display: block; height: 100%;position: absolute;font-size: 16px;line-height: 42px;color: #008FD7;right: 120px;">咨询热线:</span>
        <span class="home-text" style="font-size: 16px;margin-left: 100px;">400-873-9113</span>
        <span class="home-text" style="font-size: 16px;margin-left: 100px;">010-59739113</span>
      </span>

    </div>
  </div>
</template>

<script>
    export default {
        name: "mainnav",
      data(){
        return {
          imageLogoUrl:"../../static/images/logo.png",
          itemByName:"天宇尚医（北京）健康咨询有限公司",
          loginClass:false,
          itemTextArr:[
            {
              name:"首页",
              url:"/mainhome",
              isActive:true
            },{
              name:"服务与产品",
              url:"/products",
              isActive:false
            },{
              name:"医院&专家",
              url:"/productDesc",
              isActive:false
            },{
              name:"联系我们",
              url:"/content",
              isActive:false
            }
          ],
          itemTextArr2:this.$store.state.vuexs.itemTextArr,
          userShow:this.$store.state.vuexs.userShow
        }
      },
      methods:{
        //页面跳转改变颜色
        changePathOrColor(active,index){
          const self = this;
          self.itemTextArr2.forEach((value) =>{
            value.isActive = false;
          })
          self.itemTextArr2[index].isActive = true;
        },
        pushToUrl(url,active,index){
          this.$router.push({path:url});
          this.changePathOrColor(active,index);
          this.loginClass=false;
        },
        pushToUrl2(url){
          this.$router.push({path:url});
          this.itemTextArr2.forEach((item,index)=>{
            item.isActive=false;
          })
          /*this.loginClass=true;*/
        },
      },
      created(){
          const self=this;

        self.$store.state.vuexs.itemTextArr.forEach((value) =>{
          value.isActive = false;
        })
        this.$store.state.vuexs.itemTextArr[1].isActive = true;
        if(location.hash=="#/products"){
          self.$store.state.vuexs.itemTextArr.forEach(function (item,index) {
            item.isActive=false;
          });
          this.$store.state.vuexs.itemTextArr[1].isActive=true;
        }else if(location.hash=="#/mainhome"){
          self.$store.state.vuexs.itemTextArr.forEach(function (item,index) {
            item.isActive=false;
          });
          this.$store.state.vuexs.itemTextArr[0].isActive=true;
        }else if(location.hash=="#/sources"){
          self.$store.state.vuexs.itemTextArr.forEach(function (item,index) {
            item.isActive=false;
          });
          this.$store.state.vuexs.itemTextArr[2].isActive=true;
        }else if(location.hash=="#/content"){
          self.$store.state.vuexs.itemTextArr.forEach(function (item,index) {
            item.isActive=false;
          });
          this.$store.state.vuexs.itemTextArr[3].isActive=true;
        }
      },
      mounted(){
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
          this.$refs.kindBox.style.width=680+"px"
          this.$refs.kindBox.style.marginRight=0
        }
          if(/MSIE/i.test(navigator.userAgent)){
            this.$refs.kindBox.style.width=680+"px"
            this.$refs.kindBox.style.marginRight=0
          }
      }
    }
</script>

<style scoped>
  .home-title{
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    overflow: hidden;
    justify-content: space-between;
  }
  .home-left{
    display: flex;
    align-items: center;
  }
  .home-logo{
    width: 50px;
    margin-left: 60px;
  }
  .home-text{
    font-family: MicrosoftYaHei-Bold;
    font-size: 20px;
    color: #008FD7;
    margin-left: 16px;
    font-weight: bold;
  }
  .home-kindBox{
    margin:0 7.75% 0 0;
    display: flex;
    display: -ms-flexbox;
    display: -moz-box;
    display: -webkit-box;
    -ms-flex-align: center;
    -moz-box-align: center;
    -webkit-box-align: center;
    width: auto;
  }
  .home-kind{
    font-family: MicrosoftYaHei;
    font-size: 16px;
    color: #018FD7;
    margin-right:0px;
    height: 68px;
    display: flex;
    padding: 0 12px;
    align-items: center;
    border-top: solid 6px #FFFFFF;
    border-bottom: solid 6px #FFFFFF;
    cursor: pointer;
  }
  .isActive{
    border-bottom: solid 6px #008FD7;
  }
  .home-login{
    font-family: MicrosoftYaHei;
    font-size: 16px;
    color: #018FD7;
    display: flex;
    height: 40px;
    width: 60px;
    align-items: center;
    justify-content: center;
    margin: 0 0 0;
    cursor: pointer;
  }
  .telCont{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
