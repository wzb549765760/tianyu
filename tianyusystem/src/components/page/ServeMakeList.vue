<template>
  <el-container class="orderlist">
    <el-header style="height: 100%">
      <el-row>
        <div class="ty-header-list1">
          <el-col :span="2"><i class="el-icon-menu"></i> 筛选查询</el-col>
          <!--<el-breadcrumb-item><i class="el-icon-menu"></i> 商品列表</el-breadcrumb-item>-->
          <el-col :span="2" :offset="3">
            <div class="grid-content bg-purple ty-catalogue-list1" style="cursor: pointer"
                 @click="getServeMakeList('')">
              <span>全部<span></span></span>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple ty-catalogue-list1" style="cursor: pointer"
                 @click="getServeMakeList('0')">
              <span>待处理<span></span></span>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple ty-catalogue-list1" style="cursor: pointer"
                 @click="getServeMakeList('1')">
              <span>已处理<span></span></span>
            </div>
          </el-col>
        </div>
        <div class="ty-header-list2">
          <el-col :span="24"><i class="el-icon-search"></i> 筛选查询</el-col>
        </div>
        <div class="ty-header-list3">
          <div class="ty-shaoxuan-content">
            <!-- <div class="ty-shaixuan-list1">

               &lt;!&ndash;<el-button icon="el-icon-search" type="primary"></el-button>&ndash;&gt;
             </div>-->
            <div class="ty-shaixuan-list1">
              <span>预约人信息：</span>
              <el-col :span="6">
                <div class="grid-content bg-purple"></div>
              </el-col>
              <el-input placeholder="请输入预约姓名/电话" class="searchBox" v-model="query.userInfo"></el-input>
              <span>预约编号：</span>
              <el-col :span="6">
                <div class="grid-content bg-purple"></div>
              </el-col>
              <el-input placeholder="请输入预约编号" class="searchBox" v-model="query.no"></el-input>
              <span @click="getServeMakeList('')" style="margin-left: 20px;cursor: pointer;">筛选</span>
            </div>
          </div>
        </div>
      </el-row>

    </el-header>
    <el-main><!-- 編輯彈窗頁面 catalogueDialog"-->
      <div class="ty-header-list2">
        <el-col :span="24"><i class="el-icon-document"></i> 预约列表</el-col>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="no" label="预约编号" width=""></el-table-column>
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="productName" label="服务名称"></el-table-column>
        <el-table-column prop="createDate" label="创建时间"></el-table-column>
        <el-table-column prop="appointDate" label="预约时间"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <!--编辑-->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="toServeMakeListDetail(scope.row.id,scope.row.status)">查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--页数标签-->
      <div class="pages">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10" background
                       layout="sizes,prev, pager, next" :total="pageNum">
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
        tableData: [],
        baseURl: this.$store.state.url,
        currentPage: 1,
        currentSize: 10,
        pageNum: 0,
        orderNo: "",
        yuyueImf: "",
        token: '',
        query: {
          status: '',
          userInfo: '',
          no: '',
        }
      }
    },
    methods: {
      getServeMakeList: function (status) {
        let self = this;
        self.token = localStorage.getItem('currentUser_token');
        let data = {
          pageSize: self.currentSize, //页数量
          pageNum: self.currentPage, //第几页
          query: {
            status: status,
            userInfo: self.query.userInfo,
            no: self.query.no,
          }

        };
        axios.defaults.headers.post['token'] = self.token;
        axios({
          method: 'post',
          url: self.baseURl + '/appointservice/list',
          data: data,
        }).then(res => {
          if (res.data['code'] == "0") {
            this.tableData = res.data.data.rows;
            this.pageNum = parseInt(res.data.data["total"])
          }
        })
      },
      toServeMakeListDetail(id, status) {
        console.log(id, status);
        this.$router.push({name: 'serverMakeDatails', params: {task_id: id, token_TO: this.token, status_TO: status}});
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getServeMakeList();
      },
      handleSizeChange(val) {
        this.currentSize = val;
        this.getServeMakeList()
      }
    },
    mounted() {
      this.getServeMakeList();
    }
  }
</script>

<style scoped>

  /*.ty-catalogue-list1:nth-child(1){*/
  /*background: rgba(26, 188, 156, 0.8);*/
  /*color: white;*/
  /*}*/
  .ty-catalogue-list1 {
    margin-top: 25px;
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
    line-height: 80px;
  }

  .ty-header-list2 {
    padding-left: 20px;
    line-height: 50px;
    height: 50px;
    background-color: rgba(243, 243, 243, 1);
    border: 1px solid rgba(228, 228, 228, 1);
    width: 100%;
    font-size: 12px;
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
    /*padding-left: 20px;*/
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
