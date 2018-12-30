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
              <span>用户手机号：</span>
              <el-col :span="6">
                <div class="grid-content bg-purple"></div>
              </el-col>
              <el-input placeholder="请输入用户手机号" class="searchBox" v-model="mobile"></el-input>
              <!--<el-button icon="el-icon-search" type="primary"></el-button>-->
            </div>
            <div class="ty-shaixuan-list1">
              <span>用户昵称：</span>
              <el-col :span="6">
                <div class="grid-content bg-purple"></div>
              </el-col>
              <el-input placeholder="请输入用户昵称" class="searchBox" v-model="nickname"></el-input>
              <!--<el-button>筛选</el-button>-->
              <!--<el-button>新增订单</el-button>-->
            </div>
            <div class="ty-shaixuan-list1" :model="formInline">
              <span>用户类型：</span>
              <el-select v-model="type">
                <el-option v-for="item in options"
                           :value="item.value"
                           :label="item.label"></el-option>
              </el-select>
              <el-button @click="getSearch">筛选</el-button>
              <el-button @click="addNew">新建用户</el-button>
            </div>
          </div>
        </div>
      </el-row>

    </el-header>
    <el-main><!-- 編輯彈窗頁面 catalogueDialog"-->
      <div class="ty-header-list2">
        <el-col :span="24"><i class="el-icon-document"></i>用户列表</el-col>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <!--<el-table-column type="index" :index="indexMethod"></el-table-column>-->
        <el-table-column prop="nickname" label="昵称"></el-table-column>
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="type" label="用户类型">
          <template slot-scope="scope">
            <span>{{scope.row.type | typeChoose}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="账户启用状态">
          <template slot-scope="scope">
            <img src="../../assets/img/20180516162000.png" style="cursor: pointer" v-show="scope.row.status == '1'"
                 @click="ntn(scope)" alt="">
            <img src="../../assets/img/20180516161301.png" style="cursor: pointer" v-show="scope.row.status =='2'"
                 @click="ntn(scope)" alt="">
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handlecompile(scope.row.id, scope.row)">编辑
            </el-button>
          </template>
        </el-table-column>
        <!--删除-->
        <el-table-column label="">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="editformdelete(scope.$index, scope.row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
  import qs from 'qs'

  export default {
    name: "orderlist",
    data() {
      return {
        formInline: { //弹窗的 select
          user: '',
          region: ''
        },
        options: [ //
          {
            value: 0,
            label: '全部'
          },
          {
            value: 1,
            label: '用户'
          }, {
            value: 2,
            label: "医生"
          },
          {
            value: 3,
            label: 'VIP用户'
          },
        ],
        currentPage: 1,
        currentSize: 10,
        pageNum: 0,
        tableData: [],
        baseURl: this.$store.state.url,
        mobile: "",
        nickname: "",
        type: 0
      }
    },
    methods: {
      handleSizeChange(val) {
        this.currentSize = val;
        this.getUSerList()
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getUSerList()
      },
      //获取用户列表
      getUSerList() {
        var self = this;
        var token = localStorage.getItem('currentUser_token');
        var data = {
          pageSize: self.currentSize,//页数量
          pageNum: self.currentPage, //第几页
          mobile: self.mobile,
          nickname: self.nickname,
          type: self.type
//            token:token
        }
        axios.defaults.headers.post['token'] = token
        axios({
          method: 'post',
          url: self.baseURl + '/user/list',
          data: qs.stringify(data),
        }).then(res => {
          if (res.data['code'] == '0') {
            this.tableData = res.data.data.rows
            this.pageNum = parseInt(res.data.data["total"])
            console.log(this.tableData)
//              console.log( this.pageNum )
          }
        })
      },
      /*getServerPeopleList() {
        var self = this;
        var token = localStorage.getItem('currentUser_token');
        var data = {
          pageSize: 1,//页数量
          pageNum: 10000, //第几页
        }
        axios.defaults.headers.post['token'] = token
        axios({
          method: 'post',
          url: self.baseURl + '/servicepeople/list',
          data: qs.stringify(data),
        }).then(res => {
          if (res.data['code'] == '0') {
            console.log(res)
//              console.log( this.pageNum )
          }
        })
      },*/
      editformdelete(index, id) {
        var self = this;
        var token = localStorage.getItem('currentUser_token');
        var data = {
          doUserId: id
        };
        axios.defaults.headers.post['token'] = token;
        axios({
          method: 'post',
          url: self.baseURl + '/user/delete',
          data: qs.stringify(data),
        }).then(res => {
          if (res.data.code == "0") {
            self.$message({
              type: 'success',
              message: "刪除成功"
            });
            self.tableData.splice(index, 1);
          } else {
            self.$message({
              type: 'error',
              message: res.data.desc
            })
          }
        })
      },
      addNew() {
        const self = this;
        self.$router.push({name: 'AddUser'})
      },
      ntn(value) {
        console.log(value);
        const self = this;
        const data = {};
        Object.keys(value.row).forEach(function (key) {
          console.log(key, value.row[key]);
          if (key == "id") {
            data["doUserId"] = value.row["id"]
          } else {
            data[key] = value.row[key]
          }
        });
        // data.status = !data.status;
        var token = localStorage.getItem('currentUser_token');
        data["status"] = data["status"] == "1" ? "2" : "1";
        axios.defaults.headers.post['token'] = token;
        axios({
          method: 'post',
          url: self.baseURl + '/user/update',
          data: qs.stringify(data),
        }).then(res => {
          if (res.data['code'] == '0') {
            self.getUSerList()
//              console.log( this.pageNum )
          }
        })

      },
      getSearch() {
        this.currentPage = 1;
        this.getUSerList()
      },
      handlecompile(id, row) {
        const self = this;
        console.log(id);
        self.$router.push({name: 'bianji', params: {doUserId: id}})
      },
    },
    filters: {
      typeChoose(value) {
        switch (value) {
          case 1:
            return "用户";
            break;
          case 2:
            return "医生";
            break;
          case 3:
            return "Vip用户";
            break;
        }
      }
    },
    mounted() {
      this.getUSerList();
      /*this.getServerPeopleList();*/
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
