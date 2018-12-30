<template>
    <div>
      <vue-nav ref="child"></vue-nav>
      <div>
        <router-view style="width: 100%;height: auto"></router-view>
      </div>
      <div class="fix-box"  @click="getTalk">
        <img src="../../static/images/20180813194640.png" alt="">
        <span>客 服</span>
      </div>
      <div class="fix-box" style="bottom: 140px;width: 50px;right: 45px"  @mouseenter="enter()" @mouseleave="leave()">
        <img src="../../static/images/mobileLogo.png" style="width: 80%">
        <span>手机APP</span>
      </div>
      <div class="erweima" v-show="style">
        <img src="../../static/images/erweima_mobile.png" width="100%"/>
      </div>
    </div>
</template>

<script>
    import mainnav from '../components/mainnav'
    export default {
        name: "mainTable",
        data(){
          return {
            chars: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
            style:false
          }
        },
      //组件
        components:{
          'vue-nav':mainnav
        },
        methods:{
          //页面跳转改变颜色
            pushToUrl(url) {
              this.$router.push({path: url});
            },
            getToken(){
              const self = this;
              if (self.Cookies.get("userShow") == undefined){
                self.$store.state.vuexs.userShow = false;
              }else {
                const bol = self.Cookies.get("userShow") == "false" ? false : true;
                self.$store.state.vuexs.userShow = bol;
              }
              self.$store.state.vuexs.user= self.Cookies.get("username");
              self.$store.state.vuexs.token = self.Cookies.get("token");
            },
            getNum(){
              var res = "";
              for(var i = 0; i < 16 ; i ++) {
                var id = Math.ceil(Math.random()*25);
                res += this.chars[id];
              }
              this.Cookies.set('random',res)
            },
            getTalk(){
              this.$router.push({name:"talk"})
            },
            enter(){
              this.style = true;
            },
            leave(){
              this.style = false;
            }
          },
        created(){
            //this.getToken();
          //this.Cookies.set("userShow",false)
        },
        mounted(){
          this.getToken();
          this.getNum();
         /* this.pushToUrl("/mainhome");*/
        }
    }
</script>

<style scoped>
.fix-box{
  width: 100px;
  height: 120px;
  position: fixed;
  right: 20px;
  bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.erweima{
  width: 160px;
  height: auto;
  position: fixed;
  bottom: 90px;
  right: 120px;
}

  .fix-box img{
    width: 66px;
  }
  .fix-box span{
    margin-top: 5px;
  }
</style>
