<template>
  <el-container class="orderlist">
    <el-header style="height: 100%">
      <el-row>
        <div class="ty-header-list1">
          <!--<el-col :span="2"><i class="el-icon-menu"></i> 商品列表</el-col>-->
          <!--<el-breadcrumb-item><i class="el-icon-menu"></i> 商品列表</el-breadcrumb-item>-->
          <el-col :span="2" class="ty-el-col-header">
            <div class="grid-content bg-purple ty-catalogue-list1" @click="sublist('all')">
              <span>全部订单<span></span></span>
            </div>
          </el-col>
          <el-col :span="2" :offset="1" class="ty-el-col-header">
            <div class="grid-content bg-purple ty-catalogue-list1" @click="sublist('0')">
              <span>未付款<span></span></span>
            </div>
          </el-col>
          <el-col :span="2" :offset="1" class="ty-el-col-header">
            <div class="grid-content bg-purple ty-catalogue-list1" @click="sublist('1')">
              <span>已付款<span></span></span>
            </div>
          </el-col>
          <el-col :span="2" :offset="1" class="ty-el-col-header">
            <div class="grid-content bg-purple ty-catalogue-list1" @click="sublist('2')">
              <span>服务中<span></span></span>
            </div>
          </el-col>
          <el-col :span="2" :offset="1" class="ty-el-col-header">
            <div class="grid-content bg-purple ty-catalogue-list1" @click="sublist('3')">
              <span>已完成<span></span></span>
            </div>
          </el-col>
          <el-col :span="2" :offset="1" class="ty-el-col-header">
            <div class="grid-content bg-purple ty-catalogue-list1" @click="sublist('4')">
              <span>已取消<span></span></span>
            </div>
          </el-col>
          <!--<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
          <!--<el-input placeholder="请输入内容" class="searchBox" v-model="searchWorld"></el-input>-->
          <!--<el-button icon="el-icon-search" type="primary"></el-button>-->
        </div>
        <div class="ty-header-list2">
          <el-col :span="24"><i class="el-icon-search"></i> 筛选查询</el-col>
        </div>
        <div class="ty-header-list3">
          <div class="ty-shaoxuan-content">
            <div class="ty-shaixuan-list1">
              <span>订单编号：</span>
              <el-col :span="6">
                <div class="grid-content bg-purple"></div>
              </el-col>
              <el-input placeholder="订单编号" class="searchBox" v-model="query.no"></el-input>
              <!--<el-button icon="el-icon-search" type="primary"></el-button>-->
              <span>手机号：</span>
              <el-col :span="6">
                <div class="grid-content bg-purple"></div>
              </el-col>
              <el-input placeholder="手机号码" class="searchBox" v-model="query.mobile"></el-input>
              <el-button @click="sublist('')">筛选</el-button>
              <!--<el-button>新增订单</el-button>-->
            </div>
            <div class="ty-shaixuan-list1">

            </div>
          </div>
        </div>
      </el-row>

    </el-header>
    <el-main><!-- 編輯彈窗頁面 catalogueDialog"-->
      <div class="ty-header-list2">
        <el-col :span="24"><i class="el-icon-document"></i> 订单列表</el-col>
      </div>
      <!--表单列表-->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" :index="indexMethod"></el-table-column>
        <el-table-column prop="no" label="编号" width=""></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="picPath" label="商品图片">
          <template scope="scope">
            <img :src="scope.row.picPath" width="60" height="40">
          </template>
        </el-table-column>
        <el-table-column prop="commodityName" label="商品名称"></el-table-column>
        <el-table-column prop="count" label="数量"></el-table-column>
        <el-table-column prop="totalPrice" label="总价"></el-table-column>
        <el-table-column prop="payType" label="支付方式"></el-table-column>
        <el-table-column prop="status" label="订单状态"></el-table-column>
        <el-table-column prop="source" label="来源"></el-table-column>
        <el-table-column prop="createDate" label="时间"></el-table-column>

        <!--编辑-->
        <el-table-column label="操作付款状态">
          <template slot-scope="scope">
            <el-button v-show="scope.row.status == '未付款'"
                       size="mini"
                       type="primary"
                       @click="handlecompilestate(scope.$index, scope.row.id,scope.row.status)"
                       :disabled="scope.row.payType != '对公转账'">切换
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handlecompile(scope.$index, scope.row.id,scope.row.status)">查看详情订单
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--页数标签-->
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

  export default {
    name: "orderlist",
    data() {
      return {
        searchWorld: '',
        separator: '',
        //URL前缀
        baseURl: this.$store.state.url,
        token: '',
        currentPage: 1,
        currentSize: 10,
        pageNum: 0,
        tableData: [], //列表数据总管理
        query: {
          status: '',
          mobile: '',
          no: '' //编号
        },
        listStatus: ""
      }
    },
    methods: {
      gettoken() {
        var self = this
        self.token = localStorage.getItem('currentUser_token');
      },
//TODO 列表信息index角标
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
//TODO 请求页面表单数据
      sublist(status) {
        var self = this;
        if (status == undefined || status == "" || status == null) {
          status = self.listStatus;
        } else if (status == 'all') {
          self.listStatus = "";
          status = "";
        } else {
          self.listStatus = status;
        }
        var token = localStorage.getItem('currentUser_token');
        var data = {
          pageSize: self.currentSize,//页数量
          pageNum: self.currentPage, //第几页
//            token:token
          query: {
            status: status,
            mobile: self.query.mobile,
            no: self.query.no,
          }
        }
        axios.defaults.headers.post['token'] = token
        axios({
          method: 'post',
          url: self.baseURl + '/purchaseorder/list',
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
// TODO 操作的查看详情跳转
      handlecompile(index, id, status) {
        console.log(index, id, status, this.token);
        this.$router.push({name: 'orderlineitem', params: {task_id: id, token_TO: this.token, status_TO: status}})
      },
      handlecompilestate(index, id, status) {
        var self = this;
        var token = localStorage.getItem('currentUser_token');
        axios.defaults.headers.get['token'] = token
        axios({
          method: 'get',
          url: self.baseURl + '/purchaseorder/setpaied?id=' + id,
        }).then(res => {
          if (res.data['code'] == '0') {
            self.$message({
              type: 'success',
              message: '成功'
            })
            self.sublist()
          } else {
            self.$message({
              type: 'error',
              message: res.data.desc
            })
          }
        })
      }
    },
    mounted: function () {
      var status = this.$route.params.status;
      if (status == "" || status == null || status == undefined) {
        status = 'all';
      }
      this.sublist(status);
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
    cursor: pointer;
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
    width: 100%;
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

  .pages {
    /*position: fixed;*/
    bottom: 50px;
    right: 50px;
    line-height: 0 !important;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>
<style>
  .orderlist .el-header {
    padding: 0px;
  }

  .orderlist .el-input {
    width: 100%;
    max-width: 200px;
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
