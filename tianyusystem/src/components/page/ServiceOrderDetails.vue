<template>
  <el-container class="ServiceOrderDetails">
    <el-header>
      <div class="ty-el-header">
        <el-col :span="24"><i class="el-icon-date"></i> 当前订单状态：<span>{{this.status}}</span></el-col>
        <el-col :span="2">
          <el-button @click="clientrecord">客户档案</el-button>
        </el-col>

      </div>
    </el-header>
    <el-main>
      <!--订单信息-->
      <div class="ty-listone">
        <div class="ty-el-main">
          <el-col :span="12"><i class="el-icon-date"></i>订单信息</el-col>
        </div>
        <el-table
          :data="tableData1"
          border
          style="width: 100%; margin-top: 20px">
          <el-table-column
            prop="no"
            label="订单编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="用户账号">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称">
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="时间">
          </el-table-column>
          <el-table-column
            prop="status"
            label="订单状态">
          </el-table-column>
          <el-table-column
            prop="source"
            label="来源">
          </el-table-column>
          <el-table-column
            prop="totalPrice"
            label="总价">
          </el-table-column>
        </el-table>
      </div>
      <!--商品信息-->
      <div class="ty-listone">
        <div class="ty-el-main">
          <el-col :span="12"><i class="el-icon-date"></i>商品信息</el-col>
        </div>
        <el-table
          :data="tableData4"
          border
          style="width: 100%; margin-top: 20px">
          <el-table-column
            prop="no"
            label="编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="picPath"
            label="商品图片">
            <template scope="scope">
              <img :src="scope.row.picPath" width="60" height="40">
            </template>
          </el-table-column>
          <el-table-column
            prop="commodityName"
            label="商品名称">
          </el-table-column>
          <el-table-column
            prop="count"
            label="数量">
          </el-table-column>
          <!--规格名称-->
          <el-table-column
            :data="tableData"
            label="规格名称">
            <template slot-scope="scope" v-for="item in tableData">
              <span>{{item.name}}</span>
            </template>
          </el-table-column>

          <el-table-column :data="tableData5" label="规格详细信息">
            <template slot-scope="scope">
              <ul v-for="item in tableData5">
                <li>{{item.productName}}:{{item.count}}</li>
              </ul>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <!--服务信息-->
      <div class="ty-listone">
        <div class="ty-el-main">
          <el-col :span="12"><i class="el-icon-date"></i>服务信息</el-col>
        </div>
        <el-table
          :data="tableData2"
          border
          style="width: 50%; margin-top: 20px">
          <el-table-column
            prop="productName"
            label="名称">
          </el-table-column>

          <el-table-column
            prop="total"
            label="数量">
          </el-table-column>
          <el-table-column
            prop="count"
            label="剩余次数">
          </el-table-column>
          <!--编辑-->
          <!--  <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handlecompile">预约</el-button>
              </template>
            </el-table-column>-->

        </el-table>

      </div>
    </el-main>
    <!--预约弹窗-->


  </el-container>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        params: this.$route.params,
        tableData1: [],//订单信息
        tableData4: [], //产品信息
        tableData: [],//规格名称
        tableData2: [],//服务信息
        tableData5: {},//规格详细信息
       // params: this.$route.params, //携带过来的id
        baseURl: this.$store.state.url,
        token: '',
        status: '',//付款的状态
        content: '',//备注信息input
        userId: '',
      }
    },
    methods: {
      gettoken() {
        var self = this
        self.token = localStorage.getItem('currentUser_token');
      },
      sublist() {
        var self = this
        var token = self.params.token_TO

//        console.log(token)
        axios.defaults.headers.post['token'] = token;
        let url = '';
        url = self.baseURl + '/serviceorder/detail?id=' + self.params.task_id;
        /*        if(self.params.detailType != undefined && self.params.detailType != "" && self.params.detailType != null){
        //        	url = self.baseURl+'/appointservice/detail?id='+self.params.task_id;
                  url = self.baseURl+'/serviceorder/detail?id='+self.params.task_id;
                }else{
                    url = self.baseURl+'/serviceorder/detail?id='+self.params.task_id;
                }*/
        axios({
          method: 'post',
          url: url,
          data: '',
        }).then(res => {
          console.log(res)
          if (res.data['code'] == '0') {
//            self.tableData1=res.data.data
            self.tableData1.push(res.data.data.orderInfo) //订单编号
            self.tableData4.push(res.data.data.purchaseInfo) //商品详情
            self.tableData5 = res.data.data.purchaseInfo.specificationDetail.spec2prod //商品信息 里边的规格详情
            self.tableData.push(res.data.data.purchaseInfo.specificationDetail)//商品信息 规格名称
            self.tableData2 = res.data.data.serviceInfos//服务信息
            self.userId = res.data.data.userId
//                  self.tableData3.push(res.data.data.servicePeople) //产品使用人信息


            console.log(self.userId)
            console.log("1111")
          } else {
            self.$message({
              message: '请求失败',
              type: 'error'
            });
          }

//          插入数据进行页面渲染
        })
      },
      handlecompile() { //预约

      },
      clientrecord() {//客户档案页面跳转
//        var id=this.params.task_id;
        this.$router.push({name: 'clientrecord', params: {doUserId: this.userId,}});
        console.log(this.params.task_id);
        let id = this.params.task_id;
      }
    },
    mounted() {
      this.status = this.params.status_TO;

      this.sublist()
    }
  }
</script>

<style scoped>
  .ty-el-header {
    display: flex;
    padding-left: 30px;
    height: 80px;
    line-height: 80px;
    background-color: rgba(243, 243, 243, 1);
    border: 1px solid rgba(228, 228, 228, 1);
    color: red;
    font-size: 16px;
  }

  .ty-el-main {
    padding-left: 20px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #333333;
  }

  .ty-listone {
    /*padding-left: 5px;*/
    height: 100%;
  }

  .el-el-main-input {
    padding-left: 100px;
  }

  .ty-right-anniu {
    text-align: center;
  }

  .ty-right-anniu .el-button:nth-child(1) {
    color: white;
    background: rgba(26, 188, 156, 0.8);
  }

  .ty-right-anniu .el-button:nth-child(2) {
    color: rgba(26, 188, 156, 0.8);
    background: white;
    border: 1px solid rgba(26, 188, 156, 0.8);
  }
</style>
<style>
  .ServiceOrderDetails .el-header {
    padding: 0;
    height: 100%;
  }

  .ServiceOrderDetails .is-leaf {
    background-color: #E9EEF3;
  }

  .ServiceOrderDetails .el-input {
    width: 200px;

  }

  .ServiceOrderDetails .el-input__inner {
    height: 30px;
    line-height: 30px;
  }
</style>
