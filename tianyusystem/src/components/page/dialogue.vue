<template>
  <el-container class="orderlist">
    <el-header style="height: 100%">
      <el-row>
        <div class="ty-header-list2">
          <el-col :span="24"><i class="el-icon-search"></i> 筛选查询</el-col>
        </div>
        <div class="ty-header-list3">
          <div class="ty-shaoxuan-content">
            <div class="ty-shaixuan-list1">
              <span>用户名称：</span>
              <el-col :span="6">
                <div class="grid-content bg-purple"></div>
              </el-col>
              <el-input placeholder="用户名/用户手机号" class="searchBox" v-model="nameOrMobile"></el-input>
              <!--<el-button icon="el-icon-search" type="primary"></el-button>-->
            </div>
            <el-button @click="changeTypeGetList('nameOrMobile')">筛选</el-button>
          </div>
        </div>
      </el-row>

    </el-header>
    <el-main><!-- 編輯彈窗頁面 catalogueDialog"-->
      <div class="ty-header-list22">
        <!--<el-col :span="24"><i class="el-icon-document"></i> 服务执行排期表</el-col>-->
        <el-col :span="2">
          <div class="grid-content bg-purple ty-el-main-4" :class="typeFlag.today ? 'typeselect' : ''"
               @click="changeTypeGetList('today')">今天
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple ty-el-main-4" :class="typeFlag.lastweek ? 'typeselect' : ''"
               @click="changeTypeGetList('lastweek')">最近一周
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple ty-el-main-4" :class="typeFlag.lastmonth ? 'typeselect' : ''"
               @click="changeTypeGetList('lastmonth')">最近一个月
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple ty-el-main-4" :class="typeFlag.all ? 'typeselect' : ''"
               @click="changeTypeGetList('all')">全部
          </div>
        </el-col>
        <!--<el-button>筛选</el-button>-->
      </div>
      <!--会话列表和详细会话内容-->
      <div class="ty-serve">
        <div class="ty-serve-left">
          <div class="ty-serve-list" v-for="l in dialogueList" @click="getDialogueListDetail(l)">
            <div class="ty-name-span">
              <span>{{l.userName}}</span><span>{{l.docterName}}</span>
            </div>
            <div class="ty-time-p">
              <p>开始时间<span>{{l.start}}</span></p>
              <p>结束时间<span>{{l.end}} </span></p>
            </div>
          </div>
        </div>
        <div class="ty-serve-right">
          <div class="ty-serve-list">
            <div class="ty-right-time" v-show="updateTime"><span>{{updateTime}}</span></div>
            <div class="ty-right-neirong" v-for="lDetail in dialogueListDetail">
              <p>{{lDetail.name}} {{lDetail.updateDate}}</p>
              <p>{{lDetail.message}}</p>
            </div>
          </div>
        </div>
      </div>
    </el-main>
    <el-footer class="ty-footer">
      <div class="ty-foot-lef">
        <div class="pages">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10" background
                         layout="sizes,prev, pager, next" :total="pageNum">
          </el-pagination>
        </div>
      </div>
      <div class="ty-foot-rig">
        <div class="pages">
          <el-pagination @size-change="handleSizeChangeDetail" @current-change="handleCurrentChangeDetail"
                         :current-page.sync="currentPageDetail" :page-sizes="[10, 20, 30, 40]" :page-size="10"
                         background layout="sizes,prev, pager, next" :total="pageNumDetail">
          </el-pagination>
        </div>
      </div>
    </el-footer>
  </el-container>
</template>
<script>
  import axios from 'axios'

  export default {
    name: "orderlist",
    data() {
      return {
        formInline: { //弹窗的 select
          user: '',
          region: ''
        },
        typeFlag: {
          today: true,
          lastweek: false,
          lastmonth: false,
          all: false
        },
        options: [ //
          {
            value: '1',
            label: '待服务'
          }, {
            value: '2',
            label: '所有'
          },
          {
            value: '3',
            label: '已完成'
          }],
        dialogueList: [],
        dialogueListDetail: [],
        baseURl: this.$store.state.url,
        nameOrMobile: "",
        currentPage: 1,
        currentSize: 10,
        pageNum: 0,
        currentPageDetail: 1,
        currentSizeDetail: 10,
        pageNumDetail: 0,
        durationType: "today",
        updateTime: "",
        obj: null
      }
    },
    methods: {
      getDialogueList() {
        let self = this;
        let token = localStorage.getItem('currentUser_token')
        let data = {
          pageSize: self.currentSize,//页数量
          pageNum: self.currentPage, //第几页
          query: {
            duration: self.durationType,
            userInfo: self.nameOrMobile
          }
        };

        const loading = this.$loading({
          lock: true,
          text: '加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        axios.defaults.headers.post['token'] = token;
        axios({
          method: 'post',
          url: self.baseURl + '/chat/chatlist',
          data: data,
        }).then(res => {
          loading.close();
          if (res.data.code === 0) {
            self.pageNum = res.data.data.total;
            self.dialogueList = res.data.data.rows;
            console.log(self.dialogueList);
          } else {
            self.$message({
              type: 'info',
              message: '加载失败'
            });
          }

        })
      },
      getDialogueListDetail(obj) {
        let self = this;
        if (!obj) {
          obj = self.obj;
        } else {
          self.obj = obj;
        }
        let token = localStorage.getItem('currentUser_token');
        self.updateTime = obj.start;
        let data = {
          pageSize: self.currentSizeDetail,//页数量
          pageNum: self.currentPageDetail, //第几页
          query: {
            docterId: "",
            end: obj.end,
            start: obj.start,
            userId: obj.userId
          }
        };
        axios.defaults.headers.post['token'] = token;

        const loading = this.$loading({
          lock: true,
          text: '加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        axios({
          method: 'post',
          url: self.baseURl + '/chat/chatdetail',
          data: data,
        }).then(res => {
          loading.close();
          if (res.data.code === 0) {
            self.pageNumDetail = res.data.data.total;
            self.dialogueListDetail = res.data.data.rows;
          } else {
            self.$message({
              type: 'info',
              message: '加载失败'
            });
          }
        })
      },
      changeTypeGetList(type) {
        if (type != 'nameOrMobile') {
          if (this.typeFlag[type]) {
            return;
          }
          this.typeFlag = {
            today: false,
            lastweek: false,
            lastmonth: false,
            all: false
          };
          this.typeFlag[type] = true;
          this.durationType = type;
        }

        this.currentPage = 1;
        this.currentSize = 10;
        this.currentPageDetail = 1;
        this.currentSizeDetail = 10;
        this.dialogueListDetail = [];
        this.updateTime = "";
        this.getDialogueList();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getDialogueList();
      },
      handleCurrentChangeDetail(val) {
        this.currentPageDetail = val;
        this.getDialogueListDetail();
      },
      handleSizeChange(val) {
        this.currentSize = val;
        this.getDialogueList()
      },
      handleSizeChangeDetail(val) {
        this.currentSizeDetail = val;
        this.getDialogueListDetail()
      }
    },
    mounted() {
      this.getDialogueList();
    }
  }
</script>

<style scoped>

  /*.ty-catalogue-list1:nth-child(1){*/
  /*background: rgba(26, 188, 156, 0.8);*/
  /*color: white;*/
  /*}*/
  .ty-catalogue-list1 {
    text-align: center;
    height: 30px;
    line-height: 30px;
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid rgba(228, 228, 228, 1);
  }

  .ty-header-list1 {
    font-size: 13px;
    height: 80px;
    background: rgba(249, 249, 249, 1);
    /*line-height: 80px;*/
  }

  .typeselect {
    background: rgba(26, 188, 156, 0.8);
    color: white;
  }

  .ty-serve-list {
    width: 100%;
    height: auto;
    cursor: pointer;
  }

  .ty-el-col-header {
    height: 30px;
    padding: 25px 0;
  }

  .ty-header-list2 {
    padding-left: 20px;
    line-height: 60px;
    height: 60px;
    background-color: rgba(243, 243, 243, 1);
    border: 1px solid rgba(228, 228, 228, 1);
    width: 100%;
    font-size: 12px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .ty-header-list22 {
    padding-left: 20px;
    line-height: 30px;
    height: 30px;
  }

  .ty-shaixuan-list1 {
    height: 80px;
    display: inline-block;
  }

  .ty-shaoxuan-content {
    height: 80px;
    line-height: 80px;
    background-color: rgba(255, 255, 255, 1);
    font-size: 14px;
    border: 1px solid rgba(228, 228, 228, 1);
    padding-left: 20px;
  }

  .ty-el-main-4 {
    margin-right: 10px;
    text-align: center;
    cursor: pointer;
  }

  .ty-serve {
    padding: 0 20px;
    /*border:1px solid rgba(228, 228, 228, 1);*/
    display: flex;
  }

  .ty-serve-left {
    height: 500px;
    padding-top: 20px;
    border: 1px solid rgba(228, 228, 228, 1);
    width: 40%;
  }

  .ty-serve-right {
    height: 500px;
    padding-top: 20px;
    width: 40%;
    border: 1px solid rgba(228, 228, 228, 1);
    overflow: auto;
  }

  .ty-time-p {
    padding-left: 20px;
    font-size: 12px;
    color: #999999;
    height: 28px;
    display: flex;
  }

  .ty-name-span {
    padding-left: 20px;
    height: 28px;
    line-height: 28px;
  }

  .ty-name-span span:nth-child(1) {
    /*width: 30%;*/
    margin-right: 40px;
  }

  .ty-right-time {
    margin-left: 30%;
    background: rgba(228, 228, 228, 1);
    width: 300px;
    border-radius: 20px;
  }

  .ty-right-time span {
    color: #999999;
    padding: 15px 15px 15px 40px;
  }

  .ty-right-neirong p:nth-child(1) {
    padding: 15px 15px 15px 40px;
    /*height: 28px;*/
    font-size: 12px;
    color: #999999;
  }

  .ty-right-neirong p:nth-child(2) {
    padding-left: 40px;;
  }

  .ty-footer {
    height: 60px;
    display: flex;
  }

  .ty-foot-lef {
    width: 40%;
    background: rgba(249, 250, 252, 1);
    border: 1px solid rgba(228, 228, 228, 1);
  }

  .ty-foot-rig {
    width: 40%;
    background: rgba(249, 250, 252, 1);
    border: 1px solid rgba(228, 228, 228, 1);
  }
</style>
<style>
  .orderlist .el-header {
    padding: 0px;
  }

  .orderlist .el-input {
    width: 200px;
  }

  .ty-shaixuan-list1 .el-input__inner {
    height: 35px;
  }

  .orderlist .el-header {
    height: 100%;
  }

  .orderlist .el-main {
    padding: 0;
    overflow: hidden;
  }
</style>
