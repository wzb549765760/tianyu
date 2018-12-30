<template>
  <div class="container">
      <div class="account-container">
          <div class="account-title">修改密码</div>
          <div class="account-info">
             <!-- <div class="min-info">
                <span><i>*</i>用户名：</span>
                <input type="text" v-model="username">
              </div>-->
              <div class="min-info">
                <span><i>*</i>旧密码：</span>
                <input type="password" v-model="oldPassword">
              </div>
              <div class="min-info">
                <span><i>*</i>新密码：</span>
                <input type="password" v-model="password">
              </div>
              <div class="min-info">
                <span><i>*</i>确认密码：</span>
                <input type="password" v-model="passwordCheck">
              </div>
              <div class="account-btn" @click="changePwd">
                提交
              </div>
            <el-button :plain="true" @click="open" v-show="false"></el-button>
          </div>
      </div>
  </div>
</template>

<script>
    export default {
        name: "account",
        data(){
          return{
            username:"",
            oldPassword:"",
            password:"",
            passwordCheck:"",
            token:"",
            url:this.$store.state.vuexs.url
          }
        },
        methods:{
          open(){
            this.$message({
              showClose: true,
              message: '密码输入错误',
              type: 'error'
            });
          },
          getToken(){
            const self = this;
            self.token =  self.Cookies.get("token")
          },
          changePwd(){
            const self = this;
            if (self.oldPassword == "" || self.password == "" || self.passwordCheck == ""){
                alert("必填项不能为空")
            } else if (self.passwordCheck != self.password){
                alert("新密码两次输入不一致")
            } else {
              const data = {
                oldPassword:self.oldPassword,
                newPassword:self.password
              }
              self.axios.defaults.headers.post['token'] = self.token;
              self.axios({
                method:"post",
                url:self.url + "/account/resetpassword",
                data:self.qs.stringify(data)
              }).then(function (res) {
                console.log(res);
                  if(res.data.code == 0){
                    self.Cookies.remove("username")
                    self.Cookies.remove("token")
                    self.Cookies.remove("userShow")
                    self.$store.state.vuexs.userShow = false;
                    self.Cookies.set('userShow',false)
                    self.$router.push({path:'/login'});
                  }else{
                    self.open()
                  }
              })
            }
          }
        },
      created(){
          this.getToken();
      }
    }
</script>

<style scoped>
  .container{
    position: absolute;
    overflow: auto;
  }
  .account-container{
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 60px;
    box-sizing: border-box;
  }
  .account-title{
    width: 100%;
    font-size:20px;
    font-family:MicrosoftYaHei;
    color:rgba(131,131,131,1);
    line-height:26px
  }
  .account-info{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .min-info{
    display: flex;
    align-items: center;
    margin: 60px 0 0 0;
  }
  .min-info span{
    width: 200px;
    font-size:24px;
    font-family:MicrosoftYaHei;
    color:rgba(48,48,48,1);
    line-height:31px;
    text-align: right;
  }
  .min-info input{
    width:400px;
    height:40px;
    border:1px solid rgba(218,218,218,1);
  }
  .min-info i{
    line-height: 40px;
    width:4px;
    height:5px;
    color:rgba(255,101,85,1);
    margin:20px 5px 0 0;
  }
  .account-btn{
    width:150px;
    height:50px;
    background:rgba(1,143,215,1);
    border-radius:8px;
    font-size:22px;
    font-family:MicrosoftYaHei-Bold;
    color:rgba(255,255,255,1);
    line-height:50px;
    text-align: center;
    margin: 100px 0 0 0;
  }
</style>
