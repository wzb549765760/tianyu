<template>
  <el-container class="catalogue">
    <el-header>

      <el-row :gutter="20">
        <el-col :span="2"><i class="el-icon-menu"></i> 商品列表</el-col>
        <!--<el-breadcrumb-item><i class="el-icon-menu"></i> 商品列表</el-breadcrumb-item>-->
        <el-col :span="2" :offset="3">
          <div class="grid-content bg-purple ty-catalogue-list1" @click="sublistAll">
            <span @click="onDisplay('')" style="cursor: pointer">全部<span style="color: red;margin-left: 10px;">{{this.total}}</span></span>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple ty-catalogue-list1" @click="puton">
            <span @click="onDisplay(1)" style="cursor: pointer">已上架<span style="color: red;margin-left: 10px;">{{this.putonCount}}</span></span>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple ty-catalogue-list1" @click="putout">
            <span @click="onDisplay(0)" style="cursor: pointer">未上架<span style="color: red;margin-left: 10px;">{{this.putoffCount}}</span></span>
          </div>
        </el-col>
        <!--<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
        <el-input placeholder="请输入商品名称/编号" class="searchBox" v-model="query.query"></el-input>
        <el-button icon="el-icon-search" type="primary" @click="sublist"></el-button>
      </el-row>

    </el-header>
    <el-main><!-- 編輯彈窗頁面 catalogueDialog"-->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" :resizable='false' :index="indexMethod"></el-table-column>
        <el-table-column prop="name" :resizable='false' label="名称" width=""></el-table-column>
        <el-table-column prop="no" :resizable='false' label="编号"></el-table-column>
        <el-table-column prop="price" :resizable='false' label="标注单位"></el-table-column>
        <el-table-column prop="majorPath" :resizable='false' label="商品主图片路径">
          <template scope="scope">
            <img :src="scope.row.majorPath" width="60" height="40">
          </template>
        </el-table-column>
        <!--   <el-table-column prop="usedByFamily" label="家属"></el-table-column>
           <el-table-column prop="needTimeOfAppointment" label="预约"></el-table-column>
           <el-table-column prop="preDayOfAppointment" label="提前天数"></el-table-column>

           <el-table-column prop="consultationType" label="咨询类别"></el-table-column>
           <el-table-column prop="needConditionComplaint" label="病情主诉"></el-table-column>
           <el-table-column prop="needCaseAppendage" label="病例附件"></el-table-column>
           <el-table-column prop="updateDate" label="时间"></el-table-column>-->
        <el-table-column prop="isPutOn" :resizable='false' label="上架状态" :formatter="isstate"></el-table-column>
        <!--编辑-->
        <el-table-column :resizable='false' label="操作上架状态">
          <template slot-scope="scope">
            <!--<el-button>{{scope.row.freeze
                }}</el-button>-->
            <div @click="switchoverState(scope.row,scope.row.id)" type="text" size="small" v-if="scope.row.isPutOn"><img
              src="../../assets/1.png" alt=""></div>
            <div @click="switchoverState(scope.row,scope.row.id)" type="text" size="small" v-if="!scope.row.isPutOn">
              <img src="../../assets/2.png" alt=""></div>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :resizable='false'
              type="primary"
              @click="handleEdit(scope.$index, scope.row.id)">编辑
            </el-button>
          </template>
        </el-table-column>
        <!--删除-->
        <el-table-column label="">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :resizable='false'
              type="danger"
              @click="editformdelet(scope.$index, scope.row.id)">删除
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
    data() {
      return {
        putonCount: '',  //上架
        putoffCount: '',//下架
        total: '2',//总计
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
          query: '',
          isputon: '',
        }
      }
    },
    name: "catalogue",
    // props: {
    //   routes: {
    //     type: Array
    //   },
    // title: {
    //   type: String,
    //   // default: '首页'
    // },
    // },

    methods: {
      onDisplay(query1) {
        this.query.isputon = query1;
        this.sublist()
      },
      sublistAll() {
        this.query.isputon = "";
        this.sublist()
      },
//        未上架 已上架请求
      puton() {
        this.query.isputon = "1";
        this.sublist()
      },
      putout() {
        this.query.isputon = "0";
        this.sublist()
      },
      gettoken() {
        var self = this
        self.token = localStorage.getItem('currentUser_token');
      },
//  TODO  上架状态返回的formatter
      isstate(row, column, cellValue, index) {
        return cellValue ? '已上架' : '未上架';
      },
//  TODO 切换上下架的状态
      switchoverState(row, id) {
        var self = this;
        row.isPutOn = !row.isPutOn;
        let str = '';

        row.isPutOn ? str = true : str = false;
        var data = {
          id: id,
          isPutOn: str
        }
        axios({
          method: 'post',
          url: self.baseURl + '/commodity/setputon',
          data: data
        }).then(function (res) {
          if (res.data['code'] == '0') {
            self.$message({
              message: '上架状态切换成功',
              type: 'success'
            });
            // self.sublist()
//              self.openElert('切换成功','success');
          } else {
            self.$message({
              message: '上架状态切换失败',
              type: 'error'
            });
            // self.sublist()
          }
        })
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
      sublist() {
        var self = this;
        var token = localStorage.getItem('currentUser_token');
        var data = {
          pageSize: self.currentSize,//页数量
          pageNum: self.currentPage, //第几页
//            token:token
          query: {
            isputon: self.query.isputon, //0 未上架 1已上架
            query: self.query.query //名称或者编号
          }
        };
        axios.defaults.headers.post['token'] = token;
        axios({
          method: 'post',
          url: self.baseURl + '/commodity/list',
          data: data,
        }).then(res => {
          if (res.data['code'] == '0') {
            console.log(data);
            this.tableData = res.data.data.rows
            this.pageNum = parseInt(res.data.data["total"])
            console.log(this.tableData, data);
//              console.log(this.tableData)
//              console.log( this.pageNum )
          }
        })
      },
//TODO 表单编辑确定按钮
      handleEdit(index, id) {
        var self = this;
        console.log(index, id);
        self.$router.push({name: 'compilecommodity', params: {ta_id: id}})
      },
//TODO 表单的删除
      editformdelet(index, id) {
        var self = this;
        var id = id;
        console.log(id);
        var token = localStorage.getItem('currentUser_token');
        axios.defaults.headers.post['token'] = token;
        axios({
          method: 'post',
          url: self.baseURl + '/commodity/delete?id=' + id,
          data: ''
        }).then(res => {
          if (res.data['code'] == '0') {
            console.log('删除成功');
            this.sublist(); //调用列表
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          } else {
            console.log(res.data.desc)
          }
        })
      },
//TODO 商品概览
      commodityoverview() {
        var self = this;
        var token = localStorage.getItem('currentUser_token');
        axios.defaults.headers.get['token'] = token;
        axios({
          method: 'get',
          url: self.baseURl + '/commodity/overview',
        }).then(res => {
          if (res.data['code'] == '0') {

            self.putonCount = res.data.data.putonCount;
            self.putoffCount = res.data.data.putoffCount;
            self.total = res.data.data.total;

            console.log(self.putonCount);
            /*this.$message({
              message: '成功',
              type: 'success'
            });*/
          } else {
            console.log(res.data.desc)
          }
        })
      }
    },

    mounted() {
      this.sublist();
      this.commodityoverview()
    }

  }

</script>

<style scoped>
  /*.el-row {*/
  /*margin-bottom: 20px;*/
  /*&:last-child {*/
  /*margin-bottom: 0;*/
  /*}*/
  /*}*/
  .el-header {
    background: rgba(252, 252, 252, 1);
    padding: 8px 20px;
    border: 1px solid rgba(228, 228, 228, 1);
    /*border-bottom: 1px solid #cccccc;*/
    height: 50px;
  }

  .el-row {
    background: rgba(252, 252, 252, 1);
    height: 50px;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .catalogue .el-input {
    width: 200px;
  }

  /*头部*/
  .ty-catalogue-list1 {
    line-height: 36px;
    text-align: center;
    background: white;
  }

  /*.ty-catalogue-list1 :active{*/
  /*background: rgba(26, 188, 156, 0.8);*/
  /*}*/
  .grid-content :hover {
    /*background: rgba(26, 188, 156, 0.8);*/
    color: rgba(26, 188, 156, 0.8);;
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
