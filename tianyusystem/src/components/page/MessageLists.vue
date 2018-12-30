<template>
  <el-container class="MessageLists">
    <el-header style="height: 100%">
      <el-row>
        <div class="ty-header-list1">
          <!--<el-col :span="2"><i class="el-icon-menu"></i> 商品列表</el-col>-->
          <!--<el-breadcrumb-item><i class="el-icon-menu"></i> 商品列表</el-breadcrumb-item>-->
          <el-col :span="2" class="ty-el-col-header">
            <div class="grid-content bg-purple ty-catalogue-list1" @click="status3">
              <span>全部<span></span></span>
            </div>
          </el-col>
          <el-col :span="2" :offset="1" class="ty-el-col-header">
            <div class="grid-content bg-purple ty-catalogue-list1" @click="status1">
              <span>服务中<span></span></span>
            </div>
          </el-col>
          <el-col :span="2" :offset="1" class="ty-el-col-header">
            <div class="grid-content bg-purple ty-catalogue-list1" @click="status2">
              <span>已完成<span></span></span>
            </div>
          </el-col>
        </div>
        <div class="ty-header-list2">
          <el-col :span="24"><i class="el-icon-search"></i> 筛选查询</el-col>
        </div>
        <div class="ty-header-list3">
          <!--<el-form>-->
          <!--<el-form-item label="服务编号" class="ty-shaixuan-list1">-->
          <!--<el-input></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="服务编号" class="ty-shaixuan-list1">-->
          <!--<el-input></el-input>-->
          <!--</el-form-item>-->
          <!--</el-form>-->
          <div class="ty-shaoxuan-content">
            <div class="ty-shaixuan-list1">
              <span>服务编号：</span>
              <el-col :span="6">
                <div class="grid-content bg-purple"></div>
              </el-col>
              <el-input placeholder="请输入内容" class="searchBox" v-model="query.no"></el-input>
              <!--<el-button icon="el-icon-search" type="primary"></el-button>-->
            </div>
            <div class="ty-shaixuan-list1">
              <span>使用人信息：</span>
              <el-col :span="6">
                <div class="grid-content bg-purple"></div>
              </el-col>
              <el-input placeholder="请输入内容" class="searchBox" v-model="query.userInfo"></el-input>
              <el-button @click="sublist">筛选</el-button>
              <!--<el-button>新增订单</el-button>-->
            </div>
          </div>
        </div>
      </el-row>

    </el-header>
    <el-main><!-- 編輯彈窗頁面 catalogueDialog"-->
      <div class="ty-header-list2">
        <el-col :span="2"><i class="el-icon-document"></i> 订单列表</el-col>

      </div>

      <!--TODO 订单列表-->
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column type="index" :index="indexMethod"></el-table-column>
        <!--<el-table-column prop="id" label="id" width=""></el-table-column>-->
        <el-table-column prop="no" label="编号"></el-table-column>
        <el-table-column prop="serviceNo" label="服务编号"></el-table-column>
        <el-table-column prop="name" label="名称">
        </el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="serviceDate" label="时间"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="warmPreDay" label="提醒时间"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handlecompile(scope.$index, scope.row.serviceOrderId,scope.row.status)">查看订单
            </el-button>
          </template>
        </el-table-column>
        <!--删除-->
        <el-table-column label="" prop="status">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              v-model="scope.row.status"
              @click="editformdelet(scope.$index, scope.row.id,scope.row.status)">{{scope.row.status}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--TODO 页数标签-->
      <div class="pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          background
          layout="sizes,prev, pager, next"
          :total="pageNum">
        </el-pagination>
      </div>


    </el-main>

  </el-container>
</template>

<script>
  import axios from 'axios'
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";

  export default {
    components: {ElButton},
    name: "orderlist",
    data() {
      return {
        updataOrder: {
          time: "",
          updataOrder: '',
        },
        formInline: { //弹窗的 select
          user: '',
          region: ''
        },
        formLabelWidth: '100px',
        searchWorld: '',

        options: [ //
          {
            value: 'success',
            label: '提前一天'
          }, {
            value: 'pending',
            label: '提前3天'
          },
          {
            value: 'pendi',
            label: '提前一周'
          }],
        /*todo 列表*/
        tableData: [], //列表容器
        //URL前缀
        baseURl: this.$store.state.url,
        token: '',
        currentPage: 1,
        currentSize: 10,
        pageNum: 0,
        multipleSelection: [],
        query: {
          status: '',
          userInfo: '',
          no: ''
        }
      }
    },
    methods: {
      sub() {
        console.log('2222')
      },
      /*获取select的值*/
      handleSelectionChange(val) {
        if (val) {
          val.forEach(row => {
            this.multipleSelection = row.id
            console.log(this.multipleSelection)
          });
//        this.multipleSelection = val;
//        console.log(this.multipleSelection)
        }
        /*   remarks(){
         this.dialogVisiblespan1=true
         console.log('ispan点击')
         */
      },
      gettoken() {
        var self = this
        self.token = localStorage.getItem('currentUser_token');
      },
      //TODO 列表信息
      indexMethod(index) {
        return index * 1+1;
      },
//TODO 页数管理
      handleSizeChange(val) {
        this.currentSize = val;
        this.sublist()
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.sublist()
      },
      sublist() {//列表的方法
        var self = this;
        var token = localStorage.getItem('currentUser_token');
        var data = {
          pageSize: self.currentSize,//页数量
          pageNum: self.currentPage, //第几页
//            token:token
          query: {
            status: self.query.status,
            userInfo: self.query.userInfo,
            no: self.query.no,
          }
        }
        axios.defaults.headers.post['token'] = token
        axios({
          method: 'post',
          url: self.baseURl + '/todolist/list',
          data: data,
        }).then(res => {
          if (res.data['code'] == '0') {
            this.tableData = res.data.data.rows
            this.pageNum = parseInt(res.data.data["total"])
            console.log(this.tableData)
//              console.log( this.pageNum )
          }
        })

      },
      handlecompile(index, id, status) { //表单编辑按钮
        var self = this
        self.$router.push({name: 'ServiceOrderDetails', params: {task_id: id, token_TO: this.token, status_TO: status}})
      },
      editformdelet(index, id, status) {//服务跟踪
        var self = this
        if (status == "已完成") {
          return
        }
        var token = localStorage.getItem('currentUser_token');
        axios.defaults.headers.get['token'] = token
        axios({
          method: 'get',
          url: self.baseURl + '/todolist/setfinished?id=' + id,
//          data:data,
        }).then(res => {
          if (res.data['code'] == '0') {
            self.$message({
              type: 'success',
              message: '修改成功'
            })
            self.sublist()
          }
        })
//        self.$router.push({name:'Servertracking',params:{task_id :id,token_TO:this.token}})
      },
      status1() {
        this.query.status = "1";
        this.sublist()
      },
      status3() {
        this.query.status = "";
        this.sublist()
      },
      status2() {
        this.query.status = "2";
        this.sublist()
      }
    },
    mounted() {
      this.sublist(); //
      this.gettoken()
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

  .ty-el-col-header {
    height: 30px;
    padding: 25px 0;
  }

  .ty-header-list2 {
    padding-left: 20px;
    line-height: 50px;
    height: 50px;
    background-color: rgba(243, 243, 243, 1);
    border: 1px solid rgba(228, 228, 228, 1);
    width: 100%;
    font-size: 12px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
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

  .ty-button .el-button {
    margin-right: 15px;
  }

  .ty-ico-1 {
    position: absolute;
    top: -15px;
    left: 67px;
  }

  .ty-ico-2 {
    position: absolute;
    top: -15px;
    left: 166px;
  }

  .ty-ico-3 {
    position: absolute;
    top: -15px;
    left: 266px;
  }

  .ty-ico-4 {
    position: absolute;
    top: -15px;
    left: 366px;
  }

  .ty-button {
    float: right;
    position: relative;
    padding-right: 30px;
  }

  .ty-ico-list .el-icon-document {
    background: #138CDD;
    color: white;
    width: 13px;
    height: 12px;
  }

  /*.ty-ico-list{*/
  /*width: 13px;*/
  /*height: 12px;*/
  /*}*/
</style>
<style>
  .MessageLists .el-header {
    padding: 0px;
  }

  .MessageLists .el-input {
    width: 200px;
  }

  .ty-shaixuan-list1 .el-input__inner {
    height: 35px;
  }

  .MessageLists .el-header {
    height: 100%;
  }

  .MessageLists .el-main {
    padding: 0;
    overflow: hidden;
  }

  .MessageLists .button-el-dialog .el-dialog {
    background-color: rgba(215, 215, 215, 1);
    /*width: 300px;*/
    /*height: 202px;*/
  }

  .MessageLists .el-dialog .el-input {
    /*width: 165px;*/
    padding-bottom: 3px;
  }

  .MessageLists .el-dialog .el-input__inner {
    height: 30px;
    padding-bottom: 3px;
  }

  .MessageLists .span-el-dialog .el-dialog__header {
    background: #8f949a;
    padding: 0px 19px 6px;
  }

  .MessageLists .span-el-dialog.el-dialog__headerbtn .el-dialog__close {
    color: #303030;
  }

  .MessageLists .span-el-dialog .el-dialog__headerbtn {
    position: absolute;
    top: 0px;
    right: 0px;
  }
</style>
