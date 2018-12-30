<template>
  <div class="header">
    <div class="logo"> &nbsp &nbsp &nbsp &nbsp</div>
    <div class="ty-titlt"><span>{{title.title}}</span></div>
    <div class="user-info">
      <el-dropdown trigger="click" @command="handleCommand">
        <!--<span>{{title.title}}</span>-->
                <span class="el-dropdown-link" >
                    <img class="user-logo" src="../../assets/img/关闭.png">
                    <span style="color: #303030"></span>
                </span>
                <span class="el-dropdown-link" v-on:mouseenter="dataDetails($parent.$index)" v-on:mouseleave="hiddenDetail($parent.$index)" style="display: none;">
                    <img class="user-logo" src="../../assets/img/remindfill.png">
                    <span style="background: red;color: white;border-radius: 5px;width: 23px;height: 20px;">{{this.todayOrderCount<10?"0"+this.todayOrderCount:this.todayOrderCount}}</span>

                </span>
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../assets/img/头像.png">
                   {{username}}
                </span>
          <div class="ty-list" v-show="isShow" v-on:mouseenter="dataDetails($parent.$index)" v-on:mouseleave="hiddenDetail($parent.$index)">
            <li>今日订单量<span style="color: red;margin-left: 20px">{{this.todayOrderCount}}</span></li>
            <li>今日销量<span style="color: red;margin-left: 20px">{{this.todayTotalSales}}</span></li>
            <li>昨日销量<span style="color: red;margin-left: 20px">{{this.yesterdayTotalSales}}</span></li>
            <li>近7天销量<span style="color: red;margin-left: 20px">{{this.last7DayTotalSales}}</span></li>
          </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="loginout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        name: '',
//        消息
        isShow:false,
        //URL前缀
        baseURl:this.$store.state.url,
        last7DayTotalSales:'',
        todayOrderCount:'',
        todayTotalSales:'',
        yesterdayTotalSales:'',
      }
    },
    computed:{
      username(){
        let username = localStorage.getItem('currentUser_name');
        return username ? username : this.name;
      },
      ...mapState(['title'])
    },
    methods:{
      handleCommand(command) {
        if(command == 'loginout'){
          localStorage.removeItem('ms_username');
          localStorage.removeItem("currentUser_name");
          localStorage.removeItem('currentUser_token');
          this.$router.push('/Login');
        }
      },
      toggle(){
        this.isShow=!this.isShow
      },

      dataDetails(){//鼠标滑过显示
          this.isShow=true
      },
      hiddenDetail(){///鼠标离开隐藏
        this.isShow=false
      },
      sublist(){
        var self=this
        var token=localStorage.getItem('currentUser_token');
        axios.defaults.headers.get['token'] =token
        axios({
          method:'get',
          url:self.baseURl+'/purchaseorder/overview',
//          data:data,
        }).then(res=>{
          if(res.data['code']=='0'){
            self.$message({
              type:'success',
              message:'成功'
            })
//            self.sublist()
            self.todayOrderCount=res.data.data.todayOrderCount
            self.todayTotalSales=res.data.data.todayTotalSales
            self.yesterdayTotalSales=res.data.data.yesterdayTotalSales
            self.last7DayTotalSales=res.data.data.last7DayTotalSales
            console.log(self.todayOrderCount)
          }
        })
      }
    },
    mounted(){
      this.sublist(); //

    }
  }
</script>
<!--<button class="bi-btn btn-primary bi-btn-end detail" v-on:mouseenter="dataDetails($parent.$index)" v-on:mouseleave="hiddenDetail($parent.$index)"></button>-->
<style scoped>
  .el-dropdown-link :hover{

  }
  .header {
    background:rgba(243, 243, 243, 1) ;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    line-height: 70px;
    color: #fff;
  }
  .header .logo{
    background:rgba(51, 51, 51, 1);
    float: left;
    width:154px;
    text-align: center;
  }
  .user-info {
    float: right;
    padding-right: 50px;
    font-size: 16px;
    color: #fff;
  }
  .user-info .el-dropdown-link{
    position: relative;
    display: inline-block;
    padding-left: 50px;
    line-height: 40px;
    color: #303030;
    cursor: pointer;
    vertical-align: middle;
  }
  .user-info .user-logo{
    /*position: absolute;*/
    /*left:0;*/
    /*top:15px;*/
    line-height: 40px;
    width:40px;
    height:40px;
    border-radius: 40%;
  }
  .el-dropdown-menu__item{
    text-align: center;
  }
  .ty-titlt{
    float: left;
    /*left: 230px;*/
    margin-left: 20px;
    font-size: 14px;
    color: #999999;
  }
  /*.ty-tit-span{*/
    /*width: 5px;*/
    /*height: 18px;*/
    /*background: rgba(26, 188, 156, 0.8);*/
  /*}*/
  .ty-list{
    /*display: none;*/
    width: auto;
    min-width: 200px;
    padding: 10px;
    left: 85px;
    position: absolute;
    z-index: 2000;
    background-color: #fff;
  }
</style>
