<template>
  <div>
    <!--<vue-nav ref="child"></vue-nav>-->
    <div class="login-min">
      <login-nav></login-nav>
      <router-view class="login-route"></router-view>
    </div>
    <div class="footer-box">
      Copyright © 天宇尚医, All Rights Reserved.&nbsp&nbsp 备案号：京ICP备18045115号-1
    </div>
  </div>
</template>

<script>
    import mainnav from '../components/mainnav'
    import loginav from '../components/loginnav'
    export default {
        name: "loginmax",
        components:{
          'vue-nav':mainnav,
          "login-nav":loginav
        },
        methods:{
          changeColor(){
            this.$store.state.vuexs.itemTextArr.forEach((value) =>{
              value.isActive = false;
            })
          },
          getToken(){
            const self = this;
            self.$store.state.vuexs.user= self.Cookies.get("username");
            self.$store.state.vuexs.token = self.Cookies.get("token");
            self.$store.state.vuexs.userShow = self.Cookies.get("userShow");;
          }
        },
      mounted(){
          this.getToken()
          this.changeColor()
      }
    }
</script>

<style scoped>
    .login-min{
      display: flex;
      width: 100%;
      border-top: 1px solid #EFEFEF;
    }
  .login-route{
    position: absolute;
    left: 200px;
    right: 0;
    top: 80px;
    bottom: 40px;
    overflow: auto;
  }
  .footer-box{
    position: absolute;
    bottom: 0;
    left: 0;
    width:100%;
    height:40px;
    font-size:14px;
    font-family:MicrosoftYaHei;
    color:rgba(136,159,172,1);
    line-height: 40px;
    text-align: center;
    background:rgba(68,80,87,1);
  }
</style>
