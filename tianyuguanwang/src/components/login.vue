<template>
    <div class="login-container">
      <div class="div1">
        <img src="../../static/images/login-1.png" alt="">
        <div class="div2">
          <img src="../../static/images/login-2.png" alt="">
          <div class="div3">
            <span>用户登录</span>
            <input type="text" class="text" placeholder="手机号登录" v-model="mobile">
            <input type="password" class="text" placeholder="密码" autocomplete="off" v-model="password" @keyup.enter="getLogin">
            <p @click="getLogin">
              登录
            </p>
           <div class="c-btnBox" ref="btnBox">
             <p class="c-btn c-left" @click="pushToUrl2('/forget')">忘记密码？</p>
             <p class="c-btn" @click="pushToUrl2('/register')">新用户注册</p>
           </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
          return{
            url:this.$store.state.vuexs.url,
            mobile:"",
            password:"",
            fullscreenLoading: false
          }
        },
        methods:{
          pushToUrl2(url){
            this.$router.push({path:url});
          },
          getLogin(){
            const self = this;
            const data = {
              mobile:self.mobile,
              password:self.password,
              type:1
            }
            console.log(self.$store.state.vuexs.userShow);
            self.axios({
              method:"post",
              url:self.url + "/account/login",
              data:self.qs.stringify(data)
            }).then(function (res) {
              console.log(data,res);
              if (res.data.code == 0){
                self.$message.warning(res.data.desc);
                self.$store.state.vuexs.token = res.data.data;
                self.$store.state.vuexs.user = self.mobile;
                //self.$store.state.vuexs.userShow = true;
                self.Cookies.set('username',self.mobile)
                /*self.Cookies.set('pwd',self.password)*/
                self.Cookies.set('token',res.data.data)
                self.Cookies.set('userShow',true);
                self.pushToUrl2('/loginmax');
                return res.data.code;
              }else {
                alert(res.data.desc);
              }
              return res.data.code
            }).then(function (res) {
              if(res==0){
                self.$loading();
                setTimeout(function () {
                  self.$router.push("/mainhome");
                  self.$loading().close()
                },1000)
              }
              return
            })
          }
        },
        mounted(){
          if(!!window.ActiveXObject || "ActiveXObject" in window||/MSIE/i.test(navigator.userAgent)){
            this.$refs.btnBox.style.marginLeft=-206+"px"
          }
        }
    }
</script>

<style>
  .text{
    padding-left:15px;
    margin: 0 0 30px 0;
  }
  .text::-webkit-input-placeholder {
    color:#dadada;
    font-size: 20px;
    padding-left:15px;
  }
  .text:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #dadada;
    font-size: 20px;
    padding-left: 15px;
  }
  .text::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #dadada;
    font-size: 20px;
    padding-left: 15px;
  }
  .text:-ms-input-placeholder { /* Internet Explorer 10+ */
    color:#dadada;
    font-size: 20px;
    padding-left:15px;
  }
  .login-container{
    display: flex;
    justify-content: center;
    position: absolute;
    top: 153px;
    left: 0;
    align-items: center;
  }
  .login-container .div1{
    display: flex;
    justify-content: space-between;
    position: relative;
  }
  .login-container .div1 img{
    width: 50%;
    height:600px;
  }
  .login-container .div1 .div2{
    height: 580px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 0 20px 0 20px;
  }
  .login-container .div1 .div2 img{
    width: 304px;
    height: 129px;
  }
  .login-container .div1 .div2 .div3{
    width: 575px;
    height: 570px;
    box-shadow: 0 4px 8px 2px rgba(233,233,233,1);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .login-container .div1 .div2 .div3 span{
    font-size:30px;
    font-family:PingFangSC-Regular;
    color:rgba(1,143,215,1);
    line-height:42px;
    margin: 60px 0 40px 0;
  }
  .login-container .div1 .div2 .div3 input{
    width: 400px;
    height: 60px;
    box-sizing: border-box;
    font-size: 24px;
    border:1px solid rgba(218,218,218,1);
  }
  .login-container .div1 .div2 .div3 p{
    margin-top: 0;
    width: 400px;
    height:60px;
    background:rgba(1,143,215,1);
    border-radius:8px;font-size:28px;
    font-family:MicrosoftYaHei-Bold;
    color:rgba(255,255,255,1);
    line-height:60px;
    text-align: center;
    cursor: pointer;
  }
  .login-container .div1 .div2 .div3 .c-btnBox{
    width: 400px;
    position: absolute;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0;
    bottom: 20px;
    box-shadow: none;
  }
  .login-container .div1 .div2 .div3 .c-btnBox .c-btn{
    width: 100px;
    height: auto;
    font-size:20px;
    font-family:PingFangSC-Regular;
    color:rgba(1,143,215,1);
    background: none;
    line-height: 0;
    cursor: pointer;
  }
</style>
