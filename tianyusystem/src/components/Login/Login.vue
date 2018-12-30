<template>
    <div class="warp">
     <div class="ty-content">
      <p>
       <span>天宇尚医业务管理系统</span>
       <span>Business Management System</span>
      </p>
       <div class="warp-input">
         <input type="text" placeholder="请输入用户名称" v-model="user_name">
         <input type="password" placeholder="请输入登录密码" v-model="user_pass">
         <el-button class="login-but" @click="login" >登录</el-button>
       </div>
     </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
    export default {
        name: "login",
        data(){
          return{
            baseURl:'http://47.92.11e2.244:8777' ,//默认路径前缀
            // user_name:'17611571680',
            // user_pass:'123456'
            user_name:'',
            url:this.$store.state.url,
            user_pass:''
          }
        },
        methods:{
          login(){
            const self =this;
            // self.$store.dispatch("userLogin",{"user_name":this.user_name,"user_pass":this.user_pass});
            var mobile = this.user_name;
            var password = this.user_pass;
            if (mobile == null || mobile == "" || mobile == undefined){
              self.$message({
                message: "用户名不能为空",
                type: 'error'
              });
              return;
            }
            if (password == null || password == "" || password == undefined){
              self.$message({
                message: "密码不能为空",
                type: 'error'
              });
              return;
            }

            var type = 0;
            var data = {
              mobile, password,type
            };
            axios({
              method: "post",
              url: self.url + '/account/login',
              data: qs.stringify(data)
            }).then(res => {
              if (res.data['code'] == '0') {
                var token = res.data.data;
                if (token != "") {
                  // 后端API验证通过
                  // 调用上面mutations里定义的方法
                  // context.commit("setUser", {"user_name": user_name, "user_token": token});
                  localStorage.setItem("currentUser_name", mobile);
                  localStorage.setItem('currentUser_token', token);
                  self.$router.push('/Readme');
                  console.log(token)
                }
              } else {
                self.$message({
                  message: "请输入正确的账号密码",
                  type: 'error'
                });
              }
            });
//            self.$store.commit('user_token', data["Authentication-Token"]);
          }
         /* pathToNext(){
             var self=this;
             var mobile=self.username;
             var password=self.userpassw;
             console.log(mobile,password);
             var data={
               mobile,//               获取用户名的值
               password//               获取input密码
             };
              axios({
                method:"post",
                url:self.baseURl+'/account/login',
                data:qs.stringify(data)
              }).then(res=> {
                if(res.data['code']=='0'){
                let data=res.data.data
//                  console.log(data)
//                  console.log(res)
//                  console.log(self)
//                  this.$store.commit('set_token',data["Authentication-Token"]);
//                  if(store.state.token){
//                    this.$router.push('/Readme')
//                    console.log(store.state.token)
//                  }
//TODO  重新写保存方法



                }else{

                }
              });
          }*/
      },
      mounted(){

      }
    }
</script>

<style scoped>
.warp{
  height: 100%;
  background-image: url("../../assets/img/login.jpg");
  background-size: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
}
  .ty-content{
    border-width: 0px;
    position: absolute;
    padding-left: 30%;
    top: 35%;
    width: 100%;
    height: 30%;
    -ms-overflow-x: hidden;
    overflow-x: hidden;
    -ms-overflow-y: hidden;
    overflow-y: hidden;
    background-color: rgba(0, 0, 0, 0.498039215686275);
    background-image: none;
    font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';
    font-weight: 700;
    font-style: normal;
    color: #FFFFFF;
    border-width: 0px;
    word-wrap: break-word;
  }
  span:nth-child(1){
    display: block;
    font-size: 48px;
    height: 64px;
  }
  span:nth-child(2){
    font-size: 36px;
    height: 48px;
  }
  .warp-input input{
    margin-top: 15px;
    height: 35px;
  }
  .login-but{
    /*margin-left: 15px;*/
    /*height: 30px;*/
    /*width: 50px;*/
    /*background: aquamarine;*/
    /*color: blue;*/
  }
</style>
