<template>
  <el-container>
    <!--<p>{{title}}</p>-->
    <el-header style="height: 150px">
      <el-row :gutter="20">
        <el-col :span="5" :offset="0" type="flex">
          <div class="grid-content bg-purple ty-div-bg-purple">
            <img src="../../assets/img/列表.png" alt="">
            <div class="el-div-text">
              <p>今日订单量</p>
              <p class="pandect">{{this.todayOrderCount}}</p>
            </div>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple ty-div-bg-purple">
            <img src="../../assets/img/环 人民币.png" alt="">
            <div class="el-div-text">
              <p>今日销量</p>
              <p class="pandect">{{this.todayTotalSales}}</p>
            </div>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple ty-div-bg-purple">
            <img src="../../assets/img/柱形图.png" alt="">
            <div class="el-div-text">
              <p>昨日销量</p>
              <p class="pandect">{{this.yesterdayTotalSales}}</p>
            </div>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple ty-div-bg-purple">
            <img src="../../assets/img/销售趋势.png" alt="">
            <div class="el-div-text">
              <p>近7天销量</p>
              <p class="pandect">{{this.last7DayTotalSales}}</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row class="row-bg" justify="space-around">
        <div class="ty-elrow-div1">
          <div class="ty-elmain-div1">
            <p class="ty-elmain-p">待处理事务</p>
          </div>
          <el-col :span="6">
            <div class="grid-content">
              <div class="ty-grid-content-div1" @click="pathToNext9('0')" style="cursor: pointer">
                <span>待付款订单</span><span>(<p>{{noPayCount}}</p>)</span>
              </div>
              <div class="ty-grid-content-div1" @click="pathToNext9('1')" style="cursor: pointer">
                <span>已付款订单</span><span>(<p>{{paiedCount}}</p>)</span>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <div class="grid-content">
                <div class="ty-grid-content-div1" @click="pathToNext8" style="cursor: pointer"><span>待处理服务单</span><span>(<p>{{pendingServiceCount}}</p>)</span>
                </div>
                <div class="ty-grid-content-div1" @click="pathToNext7" style="cursor: pointer"><span>待处理预约单</span><span>(<p>{{pendingAppointCount}}</p>)</span>
                </div>
                <div class="ty-grid-content-div1" @click="pathToNext6" style="cursor: pointer"><span>待处理事项</span><span>(<p>{{pendingCount}}</p>)</span>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content ">
              <div class="grid-content">
                <div class="ty-grid-content-div1" @click="pathToNext5" style="cursor: pointer">
                  <span>服务执行排期单</span><span>(<p>{{scheduleCount}}</p>)</span></div>
                <!--<div class="ty-grid-content-div1"><span>已付款订单</span><span>(<p>10</p>)</span></div>-->
              </div>
            </div>
          </el-col>
        </div>
      </el-row>
      <el-row class="row-bg" justify="space-around">
        <div class="ty-elrow-div1 ty-list2">
          <div class="ty-elmain-div1">
            <p class="ty-elmain-p">快捷入口</p>
          </div>
          <el-col :span="2">
            <div class="grid-content ty-entrance" @click="pathToNext1">
              <img src="../../assets/img/添加.png" alt="">
              <p>添加商品</p>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content">
              <div class="grid-content ty-entrance" @click="pathToNext2">
                <img src="../../assets/img/列表 (1).png" alt="">
                <p>订单列表</p>
              </div>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content ty-entrance">
              <div class="grid-content" @click="pathToNext3">
                <img src="../../assets/img/二级-用户管理.png" alt="">
                <p>用户管理</p>
              </div>
            </div>
          </el-col>
        </div>
      </el-row>
    </el-main>
    <el-footer>
      <div class="ty-elfooter">
        <el-row>
          <div class="ty-elfooter-elrow">
            <div class="ty-elfooter-elrow-div">

              <el-col :span="11">
                <div class="ty-elmain-div1">
                  <p class="ty-elmain-p">商品总览</p>
                </div>
                <div class="grid-content bg-purple ty-footer-elcol">
                  <div class="ty-daichuli">
                    <p>{{this.putonCount}}</p>
                    <p>已经上架</p>
                  </div>
                  <div class="ty-daichuli">
                    <p>{{this.putoffCount}}</p>
                    <p>已经下架</p>
                  </div>
                  <div class="ty-daichuli">
                    <p>{{this.total}}</p>
                    <p>数量</p>
                  </div>
                </div>
              </el-col>
              <el-col :span="11">
                <div class="ty-elmain-div1">
                  <p class="ty-elmain-p">用户总览</p>
                </div>
                <div class="grid-content bg-purple ty-footer-elcol">
                  <div class="ty-daichuli">
                    <p>{{this.todayAddNum}}</p>
                    <p>今日新增</p>
                  </div>
                  <div class="ty-daichuli">
                    <p>{{this.yesterdayAddNum}}</p>
                    <p>昨日新增</p>
                  </div>
                  <div class="ty-daichuli">
                    <p>{{this.monthAddNum}}</p>
                    <p>本月新增</p>
                  </div>
                  <div class="ty-daichuli">
                    <p>{{this.totalNum}}</p>
                    <p>客户总数</p>
                  </div>
                </div>
              </el-col>
            </div>
          </div>
        </el-row>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "readme",
    data() {
      return {
        baseURl: this.$store.state.url,
        last7DayTotalSales: '',
        todayOrderCount: '',
        todayTotalSales: '',
        yesterdayTotalSales: '',
        putonCount: '',//上架
        putoffCount: '', //下架
        total: '', //总计
        todayAddNum: 0,
        yesterdayAddNum: 0,
        monthAddNum: 0,
        totalNum: 0,
        noPayCount: 0,
        paiedCount: 0,
        pendingServiceCount: 0,
        pendingAppointCount: 0,
        pendingCount: 0,
        scheduleCount: 0,
      }
    },
    // props:{
    //   title: {
    //     type: String,
    //     default: '首页'
    //   },
    // }
    methods: {

      pathToNext1() {
        var self = this;
        self.$router.push('/AddMerchandise')
      },
      pathToNext9(s) {
        var self = this;
        // self.$router.push('/orderlist');
        self.$router.push({name: "orderlist", params: {status: s}});
      },
      pathToNext8() {
        var self = this;
        self.$router.push('/ServeOrderList')
      },
      pathToNext7() {
        var self = this;
        self.$router.push('/ServeMakeList')
      },
      pathToNext6() {
        var self = this;
        self.$router.push('/MessageLists')
      },
      pathToNext5() {
        var self = this;
        self.$router.push('/ServeExecuteList')
      },

      pathToNext2() {
        var self = this;
        self.$router.push('/orderlist')
      },
      pathToNext3() {
        var self = this;
        self.$router.push('/UserList')
      },
      /*TODO 订单总览*/
      sublist() {
        var self = this
        var token = localStorage.getItem('currentUser_token');
        axios.defaults.headers.get['token'] = token
        axios({
          method: 'get',
          url: self.baseURl + '/purchaseorder/overview',
//          data:data,
        }).then(res => {
          if (res.data['code'] == '0') {
            /*self.$message({
              /!*type:'success',*!/
             /!* message:'成功'*!/
            })*/
//            self.sublist()
            self.todayOrderCount = res.data.data.todayOrderCount
            self.todayTotalSales = res.data.data.todayTotalSales
            self.yesterdayTotalSales = res.data.data.yesterdayTotalSales
            self.last7DayTotalSales = res.data.data.last7DayTotalSales
            console.log(self.todayOrderCount)
          }
        })
      },
      daichuli() {
        var self = this;
        var token = localStorage.getItem('currentUser_token');
        axios.defaults.headers.get['token'] = token;
        axios({
          method: 'get',
          url: self.baseURl + '/statistics/todo\n',
//          data:data,
        }).then(res => {
          if (res.data.code == "0") {
            self.noPayCount = res.data.data.noPayCount;
            self.paiedCount = res.data.data.paiedCount;
            self.pendingServiceCount = res.data.data.pendingServiceCount;
            self.pendingAppointCount = res.data.data.pendingAppointCount;
            self.pendingCount = res.data.data.pendingCount;
            self.scheduleCount = res.data.data.scheduleCount;
          }
        })
      },

      /*商品概览*/
      commoverview() {
        var self = this
        var token = localStorage.getItem('currentUser_token');
        axios.defaults.headers.get['token'] = token
        axios({
          method: 'get',
          url: self.baseURl + '/commodity/overview',
//          data:data,
        }).then(res => {
          if (res.data['code'] == '0') {
            /*self.$message({
              type:'success',
              /!*message:'成功'*!/
            })*/
//            self.sublist()
            self.putonCount = res.data.data.putonCount
            self.putoffCount = res.data.data.putoffCount
            self.total = res.data.data.total
//              console.log(self.todayOrderCount)
          }
        })
      },

      /*用户概览*/
      useoverview() {
        var self = this
        var token = localStorage.getItem('currentUser_token');
        axios.defaults.headers.get['token'] = token
        axios({
          method: 'get',
          url: self.baseURl + '/user/overview',
//          data:data,
        }).then(res => {
          if (res.data['code'] == '0') {
            /*self.$message({
              type:'success',
              /!*message:'成功'*!/
            })*/
//            self.sublist()
            self.todayAddNum = res.data.data.todayAddNum
            self.yesterdayAddNum = res.data.data.yesterdayAddNum
            self.monthAddNum = res.data.data.monthAddNum
            self.totalNum = res.data.data.totalNum
//              console.log(self.todayOrderCount)
          }
        })
      }
    },
    mounted() {
      this.sublist();
      this.daichuli();
      this.commoverview()
      this.useoverview()
    }
  }
</script>

<style scoped type="es6">
  .el-header, .el-footer {
    padding: 15px 39px;
    background-color: rgba(243, 243, 243, 0.2);
    color: #333;
    text-align: center;
    /*line-height: 60px;*/
  }

  /*头部的图片*/
  .bg-purple img {
    width: 46px;
    height: 48px;
  }

  .ty-div-bg-purple {
    align-items: center;
    padding: 15px;
    /*width: 249px;*/
    height: 93px;
    display: flex;
  }

  .el-div-text {
    width: 149px;
    height: 40px;
  }

  .el-div-text p:nth-child(1) {
    color: #999999;
    margin: 0px;
    font-size: 16px;
    text-rendering: optimizeLegibility;
    font-feature-settings: "kern" 1;
    -webkit-font-feature-settings: "kern";
    -moz-font-feature-settings: "kern";
    -moz-font-feature-settings: "kern=1";
    font-kerning: normal;
  }

  .el-div-text p:nth-child(2) {
    font-family: 'Arial Normal', 'Arial';
    color: red;
    padding-left: 40px;
    font-size: 20px;
    font-weight: 400;
    font-style: normal;
    text-align: left;
    line-height: 28px;
  }

  .el-main {
    background-color: rgba(243, 243, 243, 0.2);
    padding: 15px 39px;
    /*background-color: #E9EEF3;*/
    color: #333;
    text-align: center;
    /*line-height: 160px;*/
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5), .el-container:nth-child(6) {
    line-height: 260px;
  }

  .el-container:nth-child(7) {
    line-height: 320px;
  }

  /*.el-row {*/
  /*padding-bottom: 20px;*/
  /*&:last-child {*/
  /*padding-bottom: 0;*/
  /*}*/
  /*}*/
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background-color: rgba(255, 255, 255, 1);
  }

  .bg-purple {
    background-color: rgba(255, 255, 255, 1);
  }

  .bg-purple-light {
    background-color: rgba(255, 255, 255, 1);
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    /*border: 1px solid  rgba(228, 228, 228, 1);*/
    /*border-color: rgba(228, 228, 228, 1);*/
    background-color: rgba(255, 255, 255, 1);
  }

  .bg-purple {
    border: 1px solid rgba(228, 228, 228, 1);
    background-color: rgba(255, 255, 255, 1);
  }

  .bg-purple-light {
    background-color: rgba(255, 255, 255, 1);
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  /*el-main*/
  .ty-elmain-p {
    padding-left: 24px;
    font-size: 13px;
    color: #333333;
    height: 36px;
    text-align: left;
  }

  .ty-elmain-div1 {
    background: rgba(243, 243, 243, 1);
    border: 1px solid rgba(228, 228, 228, 1);
    height: 45px;
    font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';
    font-weight: 700;
    font-style: normal;
    text-align: left;
    line-height: 36px;
  }

  .ty-elrow-div1 {
    height: 200px;
  }

  .ty-grid-content-div1 {
    position: relative;
    display: flex;
    align-items: center;
    height: 40px;
    font-size: 13px;
    color: #333333;
    padding-left: 45px;
    border-bottom: 1px solid rgba(242, 242, 242, 1);
  }

  .ty-grid-content-div1 span:nth-child(2) {
    display: flex;
    position: absolute;
    right: 0px;
  }

  .ty-grid-content-div1 p:nth-child(1) {
    color: rgb(240, 72, 68);
    /*width: 36px;*/
    display: flex;
  }

  .ty-entrance {
    align-items: center;
    padding: 15px 15px;
    line-height: 25px;
    /*width: 118px;*/
    /*height: 156px;*/
  }

  .ty-entrance :hover {
    border-right: 1px solid rgba(228, 228, 228, 1);
    color: rgba(26, 188, 156, 0.8);
  }

  .ty-entrance img {
    width: 46px;
    height: 48px;
  }

  .ty-entrance p {
    font-size: 13px;
  }

  /*.ty-list2 el-col el-col-3 :hover{*/
  /*border-right: 1px solid rgba(228,228,228,1);*/
  /*}*/
  .ty-elfooter {
    display: flex;
  }

  .el-footer .el-row {
    width: 100%;
  }

  .el-footer .el-col {
    margin-right: 20px;
  }

  .ty-footer-elcol {
    display: flex;
    height: 155px;
    align-items: center;
    justify-items: center;
    padding: 0 30px;
  }

  .ty-elfooter-elrow-div {
    height: 200px;
    /*background: rebeccapurple;*/
  }

  .ty-daichuli {
    margin: 20px;
  }

  .ty-daichuli p:nth-child(1) {
    color: #F04844;
    font-size: 28px;
  }

  .ty-daichuli p:nth-child(2) {
    font-size: 14px;
    color: #666666;
  }

  .el-div-text .pandect {
    color: red;
  }
</style>
