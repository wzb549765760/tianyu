<template>
    <div class="loginNav-box">
        <div class="title">个人中心</div>
        <div class="click-list" v-for="(site,index) in itemTextArr" :class="{'isActive':site.isActive}" @click="pushToUrl(site.url,site.isActive,index)">{{site.name}}</div>
        <div class="click-list" @click="getLeave">退出登录</div>
    </div>
</template>

<script>
    export default {
        name: "loginnav",
        data(){
          return {
            itemTextArr:[
              {
                name:"我的服务",
                url:"/myserves",
                isActive:true
              },{
                name:"我的档案",
                url:"/myfile",
                isActive:false
              },{
                name:"我的订单",
                url:"/money",
                isActive:false
              },{
                name:"服务（收货）人信息",
                url:"/servesMan",
                isActive:false
              },{
                name:"修改密码",
                url:"/account",
                isActive:false
              }
            ],
          }
        },
        methods:{
          changePathOrColor(active,index){
            const self = this;
            self.itemTextArr.forEach((value) =>{
              value.isActive = false;
            })
            self.itemTextArr[index].isActive = true;
          },
          pushToUrl(url,active,index){
            this.$router.push({path:url});
            this.changePathOrColor(active,index)
          },
          getLeave(){
            this.Cookies.remove("username")
            this.Cookies.remove("token")
            this.Cookies.remove("userShow")
            this.$store.state.vuexs.userShow = false;
            this.Cookies.set('userShow',false)
            this.$router.push({path:'/mainTable'});
          }
        }
    }
</script>

<style scoped>
    .loginNav-box{
      width: 200px;
      position:absolute;
      top: 80px;
      bottom: 40px;
      background:rgba(243,243,243,1);
      display: flex;
      flex-direction: column;
    }
  .title{
    width: 100%;
    height: 31px;
    font-size:24px;
    font-family:MicrosoftYaHei;
    color:rgba(48,48,48,1);
    line-height:31px;
    box-sizing: border-box;
    padding: 0 0 0 24px;
    margin: 67px 0 0 0;
  }
  .click-list{
    width: 100%;
    height: 20px;
    border-left:4px solid rgba(1,143,215,0);
    border-right:4px solid rgba(1,143,215,0);
    box-sizing: border-box;
    padding: 0 0 0 20px;
    font-size:16px;
    font-family:MicrosoftYaHei;
    color:rgba(131,131,131,1);
    line-height:21px;
    margin: 18px 0 0 0;
    cursor: pointer;
  }
  .click-list:hover{
    border-left:4px solid rgba(1,143,215,1);
    color:rgba(1,143,215,1);
  }
  .isActive{
    border-left:4px solid rgba(1,143,215,1);
    color:rgba(1,143,215,1);
  }
</style>
