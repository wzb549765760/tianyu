<template>
  <el-container class="orderlineitem">
    <el-header>
      <div class="ty-el-header">
        <el-col :span="24"><i class="el-icon-date"></i> 当前订单状态：<span>{{this.status}}</span></el-col>
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
            :resizable='false'
            width="180">
          </el-table-column>
          <el-table-column
            prop="mobile"
            :resizable='false'
            label="用户账号">
          </el-table-column>
          <el-table-column
            prop="name"
            :resizable='false'
            label="用户姓名">
          </el-table-column>
          <el-table-column
            prop="createDate"
            :resizable='false'
            label="时间">
          </el-table-column>
          <el-table-column
            prop="status"
            :resizable='false'
            label="订单状态">
          </el-table-column>
          <el-table-column
            prop="source"
            :resizable='false'
            label="来源">
          </el-table-column>
          <el-table-column
            prop="totalPrice"
            :resizable='false'
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
            :resizable='false'
            label="编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="picPath"
            :resizable='false'
            label="商品图片">
            <template scope="scope">
              <img :src="scope.row.picPath " style="display:block ;width: 60px;height: 50px;margin:0 auto" >
            </template>
          </el-table-column>
          <el-table-column
            prop="commodityName"
            :resizable='false'
            label="商品名称">
          </el-table-column>
          <el-table-column
            prop="count"
            :resizable='false'
            label="数量">
          </el-table-column>
          <!--规格名称-->
          <el-table-column
            :data="tableData"
            :resizable='false'
            label="规格名称">
            <template slot-scope="scope" v-for="item in tableData">
              <span>{{item.name}}</span>
            </template>
          </el-table-column>

          <el-table-column :data="tableData5" :resizable='false' label="规格详细信息">
            <template slot-scope="scope" v-for="item in tableData5">
              <span>{{item.productName}}</span>:<span>{{item.count}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--产品使用人信息-->
      <div class="ty-listone">
        <div class="ty-el-main">
          <el-col :span="12"><i class="el-icon-date"></i>产品使用人信息</el-col>
        </div>
        <el-table
          v-if="userShow"
          key="1"
          :data="tableData3"
          border
          style="width: 100%; margin-top: 20px">
          <el-table-column
            prop="name"
            label="使用人"
            :resizable='false'
            width="180"  :show-overflow-tooltip="false">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="mobile"
            :resizable='false'
            label="用户账号"  :show-overflow-tooltip="false">
            <template slot-scope="scope">
              <el-input v-model="scope.row.mobile" placeholder="请输入内容"></el-input>
            </template >
          </el-table-column>
          <el-table-column
            prop='age'
            :resizable='false'
            label="年龄"  :show-overflow-tooltip="false">
            <template slot-scope="scope">
              <el-input v-model="scope.row.age" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="idCardNum"
            :resizable='false'
            label="身份证号"  :show-overflow-tooltip="false">
            <template slot-scope="scope">
              <el-input v-model="scope.row.idCardNum" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column
                           prop="idCardUrl"
                           :resizable='false'
                           label="身份证正面"  :show-overflow-tooltip="false">
            <template slot-scope="scope">
              <img :src="scope.row.idCardUrl+ '&token=' + params.token_TO" style="display:block ;width: 50px;height: 50px;margin:0 auto"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="sex"
            :resizable='false'
            label="性别">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sex==1?'男':'女' " placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-if="!userShow"
          key="3"
          :data="tableData31"
          border
          style="width: 100%; margin-top: 20px">
          <el-table-column
            prop="name"
            :resizable='false'
            label="使用人"
            width="180">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="mobile"
            :resizable='false'
            label="使用人电话">
            <template slot-scope="scope">
              <el-input v-model="scope.row.mobile" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop='address'
            :resizable='false'
            label="地址">
            <template slot-scope="scope">
              <el-input v-model="scope.row.address" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--TODO 发票信息-->
      <div class="ty-listone">
        <div class="ty-el-main">
          <el-col :span="12"><i class="el-icon-date"></i>发票信息</el-col>
        </div>
        <el-table
          :data="tableData2"
          border
          style="width: 100%; margin-top: 20px">
          <el-table-column
            prop="content"
            :resizable='false'
            label="发票内容">
            <template slot-scope="scope">
              <el-input v-model="scope.row.content" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            :resizable='false'
            label="单位名称">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            :resizable='false'
            label="发票类型">
            <template slot-scope="scope">
              <el-input v-model="scope.row.type" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            :resizable='false'
            label="单位">
            <template slot-scope="scope">
              <el-input v-model="scope.row.title" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="number"
            :resizable='false'
            label="纳税人识别号">
            <template slot-scope="scope">
              <el-input v-model="scope.row.number" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--TODO 其他信息-->
      <div class="ty-listone">
        <div class="ty-el-main">
          <el-col :span="12"><i class="el-icon-date"></i>其他信息</el-col>
        </div>
        <div class="el-el-main-input">
          <el-form>
            <el-form-item label="备注：">
              <el-input placeholder="备注信息" v-model="content"></el-input><!--v-model="content"-->
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-main>
    <el-footer>
      <div class="ty-right-anniu" v-show="footerShow">
        <el-button @click="confirstatus">确认下单</el-button>
        <el-button @click="goBack">取消</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
  import axios from 'axios'

  export default {
    data: function () {
      return {
        params: this.$route.params, //携带过来的id
        baseURl: this.$store.state.url,
        token: '',
        status: '',//付款的状态
        userShow:true,
        tableData5: [], //商品信息的规格详情
        tableData4: [], //商品信息
        tableData3: [],//产品使用人信息
        tableData31: [],//产品使用人信息
        tableDate1: {},
        tableData2: [],//发票信息管理   备注信息也写在这个里表单
        tableData1: [],//订单详情
        tableData: [],//规格名称
        footerShow:true,
        /*      tableData6: [{
                id: '12987122',
                name: '18000000000',
                amount1: '2018-6-18 13:00:00',
                amount2: '已付款',
                amount3: 'APP订单'
              }, ],*/
        content: '' //备注信息input
      };
    },
    methods: {
      gettoken() {
        var self = this;
        self.token = localStorage.getItem('currentUser_token');
      },
      goBack() {
        history.go(-1);
      },
      sublist() { //TODO  请求页面数据
        var self = this;
        var token = self.params.token_TO;
//        console.log(token)
        axios.defaults.headers.post['token'] = token;
        axios({
          method: 'post',
          url: self.baseURl + '/purchaseorder/detail?id=' + self.params.task_id,
          data: ""
        }).then(res => {
          if (res.data['code'] == '0') {
//            self.tableData1=res.data.data
            console.log(res);
            if(res.data.data.commodityType=="货物"){
              self.footerShow=false;
            }else if(res.data.data.orderInfo.status=="服务中"){
              self.footerShow=false;
            }
            if (res.data.data.orderInfo != "" && res.data.data.orderInfo != null && res.data.data.orderInfo != undefined){
              if (res.data.data.orderInfo["name"] == ""){
                res.data.data.orderInfo["name"] = "无"
              }
            }

            self.tableData1.push(res.data.data.orderInfo) //订单编号
            self.tableData4.push(res.data.data.purchaseInfo) //商品详情
            self.tableData5 = res.data.data.purchaseInfo.specificationDetail.spec2prod //商品信息 里边的规格详情
           /* res.data.data.servicePeople?res.data.data.servicePeople.idCardUrl = res.data.data.servicePeople.idCardUrl + "&token=" + self.params.token_TO:null;*/
            self.tableData3.push(res.data.data.servicePeople);//产品使用人信息
            res.data.data.servicePeople?self.userShow=true:self.userShow=false;
            /*res.data.data.servicePeople?(res.data.data.servicePeople.sex==1?res.data.data.servicePeople.sex="男":res.data.data.servicePeople.sex="女"):null;*/
           /* self.tableData3.length>0?self.tableData3.forEach((item,index)=>{
              item.sex==1?item.sex="男":item.sex="女";
            }):null;*/
            self.tableDate1=res.data.data.servicePeople
            self.tableData31.push(res.data.data.address);
            console.log(self.tableData31);
            self.tableData.push(res.data.data.purchaseInfo.specificationDetail)//商品信息 规格名称
            //发票信息
            if (res.data.data.isInvoice) {
              if (res.data.data.invoiceInfo == null) {
                self.tableData2.push({
                  name: '',
                  mobile: '',
                  no: '',
                  source: '',
                  status: '',
                  totalPrice: '',
                  createDate: ''
                });
              } else {
                self.tableData2.push(res.data.data.invoiceInfo);
                console.log(self.tableData2);
              }
            }

          } else {
            self.$message({
              message: '请求失败',
              type: 'error'
            });
          }

//          插入数据进行页面渲染
        })

      },

      /*确认订单按钮*/
      Confirmorder() {
        var self = this
        var token = self.params.token_TO
//        console.log(token)
        axios.defaults.headers.post['token'] = token
        var a = self.tableData3
        var b = self.tableData2
        var obj = {}
        var obj2 = {}

        a.map(function (e, item) {
          /*console.log(e.name);
          obj[e.name] = e.value;
          console.log(e)*/
          obj = e
        });
        b.map(function (e, item) {
          /*console.log(e.name);
           obj[e.name] = e.value;
           console.log(e)*/
          obj2 = e
        });
        console.log(obj, obj2);
        if (self.tableData3.length > 0) {
          if (obj != null && obj != undefined) {
            if (obj["sex"] == "男") {
              obj["sex"] = 1;
            } else if (obj["sex"] == "女") {
              obj["sex"] = 2;
            } else if (obj["sex"] == 1||obj["sex"] == 2) {

            }else {
              self.$message({
                message: "请正确填写性别",
                type: 'error'
              });
              return;
            }
          }
        }


        var data = {
          id: self.params.task_id,
          servicePeople: obj,
          invoice: obj2,
          remark: self.content,
        };
        axios({
          method: 'post',
          url: self.baseURl + '/purchaseorder/confirm',
          data: data,
        }).then(res => {
          if (res.data.code == 0) {
            self.$message({
              message: '确认成功',
              type: 'success'
            });
            self.$router.push({path: '/orderlist'});
          } else {
            self.$message({
              message: res.data.desc,
              type: 'error'
            })
          }
        })
//    console.log(token)
      },

      /*确定按钮的付款状态*/
      confirstatus() {
        if(this.status=='服务中'){
          return
        }
        if (this.status == '未付款') {
          this.$message({
            message: '未付款状态不能点击确定订单按钮',
            type: 'error'
          })
        } else if(this.status=='已付款'){
          this.Confirmorder()
        }
      }
    },
    mounted() {
      this.sublist()
      this.gettoken()
      this.status = this.params.status_TO
//      console.log(this.status)
    }
  };
</script>

<style scoped>

  .cell{
    overflow: unset !important;
    text-overflow: unset !important;
  }


  .ty-el-header {
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
  .orderlineitem .el-header {
    padding: 0;
    height: 100%;
  }

  .orderlineitem .is-leaf {
    background-color: #E9EEF3;
  }

  .orderlineitem .el-input {
    /*width: 200px;*/

  }

  .orderlineitem .el-input__inner {
    height: 30px;
    line-height: 30px;
  }
</style>
