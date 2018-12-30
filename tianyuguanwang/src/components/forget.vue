<template>
  <div class="reg-container">
      <div class="reg-title">忘记密码</div>
      <div class="reg-info">
        <input type="text" placeholder="输入手机号" class="text" v-model="mobile">
        <div class="yzm-box">
          <input type="text" placeholder="短信验证码" class="text" v-model="code">
          <span class="yzm" @click="getCodeNumber(mobile)" v-show="timerShow">获取验证码</span>
          <span v-show="!timerShow">{{backTimer}}s后重新发送</span>
        </div>
        <input type="password" placeholder="设置6至20位登录密码" class="text" v-model="password">
        <input type="password" placeholder="请再次输入登录密码" class="text" v-model="passwordCheck">
        <span class="treaty">
          <!--<input type="checkbox" checked="checked">已阅读并同意<span></span>-->
        </span>
        <div class="reg-btn" @click="updatePassword">
            立即重置
        </div>
      </div>
  </div>
</template>

<script>
    export default {
        name: "forget",
        data(){
          return {
            mobile:"",
            code:"",
            password:"",
            passwordCheck:"",
            url:this.$store.state.vuexs.url,
            timerShow: true,
            backTimer: 60,
          }
        },
        methods:{
          pushToUrl2(url){
            this.$router.push({path:url});
          },
          getCodeNumber(mobile){

            console.log(mobile);
            const self = this;
            if (mobile.length != 11 || mobile == ""){
                self.$message({
                  showClose: true,
                  message: "请正确输入手机号",
                  type: 'error'
                });
                self.timerShow=true;
              return
            }else {
              const data={
                mobile:mobile
              };
              clearInterval(timer);
              this.timerShow = false;
              this.backTimer = 60;
              var timer = window.setInterval((e) => {
                this.backTimer--;
                if (this.backTimer < 0) {
                  this.timerShow = true;
                  clearInterval(timer)
                }
                e.preventDefault()
              }, 1000);
              self.axios({
                method:'post',
                url:self.url+'/account/sendupdatepasswordcode',
                data:self.qs.stringify(data)
              }).then(function (res) {
                console.log(res);
              }).catch(function (err) {
              })
            }
          },
          updatePassword(){
            const self = this;
            if (self.password != self.passwordCheck){
              alert("两次密码不一致")
            }else {
              const data = {
                mobile: self.mobile,
                code:self.code,
                newPassword:self.password
              }
              self.axios({
                method: 'post',
                url: self.url + '/account/updatepassword',
                data: self.qs.stringify(data)
              }).then(function (res) {
                console.log(res);
                if (res.data.code == 0){
                  alert(res.data.desc);
                  self.pushToUrl2("/login")
                }else {
                  alert(res.data.desc)
                }
              }).catch(function (err) {
              })
            }
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
  .reg-container{
    margin:0;
  }
  .reg-title{
    font-size:20px;
    margin: 20px 50px;
    font-family:MicrosoftYaHei;
    color:rgba(131,131,131,1);
    line-height:26px;
  }
  .reg-info{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .reg-info input{
    width: 500px;
    height: 50px;
    border: 1px solid rgba(218,218,218,1);
    margin: 60px 0 0 0;
    padding-left:40px;
    box-sizing: border-box;
  }
  .yzm-box{
    position: relative;
    display: flex;
  }
  .yzm-box span{
    position: absolute;
    right: 20px;
    top: 75px;
    color: #0b94d9;
    cursor: pointer;
  }
  .yzm-box input{
    padding-right: 200px;
    box-sizing: border-box;
  }
  .treaty{
    width: 500px;
    display: flex;
    justify-content: flex-start;
    margin: 10px 0 0 0;
    color: rgba(131,131,131,1);
    font-size:16px;
  }
  .treaty input{
    width: 20px;
    height: 20px;
    margin: 0;
  }
  .treaty span{
    font-size:16px;
    font-family:MicrosoftYaHei;
    color:#018FD7;
    line-height:21px;
  }
  .reg-btn{
    width: 500px;
    height: 60px;
    background:rgba(1,143,215,1);
    border-radius:8px;
    font-size:28px;
    font-family:MicrosoftYaHei-Bold;
    color:rgba(255,255,255,1);
    line-height:60px;
    text-align: center;
    margin: 100px 0 0 0;
    cursor: pointer;
  }
</style>
