<template>
  <el-container class="orderlist">
    <el-header style="height: 100%">
      <el-row>
        <div class="ty-header-list2">
          <el-col :span="24"><i class="el-icon-search"></i>筛选查询</el-col>
        </div>
        <div class="ty-header-list3">
          <div class="ty-shaoxuan-content">
            <!--<div class="ty-shaixuan-list1">
&lt;!&ndash;
                            <el-col :span="6">
                                <div class="grid-content bg-purple"></div>
                            </el-col>&ndash;&gt;

                        </div>-->
            <div class="ty-shaixuan-list1">
              <span>就诊人信息：</span>
              <el-input placeholder="就诊人员/就诊人员手机号" class="searchBox" v-model="nameOrMobile"></el-input>
              <!--<el-button icon="el-icon-search" type="primary"></el-button>-->
              <span>就诊开始-结束：</span>
              <!--	<el-col :span="6">
                                  <div class="grid-content bg-purple"></div>
                              </el-col>-->
              <!--	<el-date-picker v-model="orderTime" type="datetime" placeholder="选择日期时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                              </el-date-picker>-->

              <el-date-picker type="date" placeholder="选择日期" v-model="start" style="width: 100%;" format="yyyy-MM-dd"
                              value-format="yyyy-MM-dd"></el-date-picker>


              <el-date-picker type="date" placeholder="选择日期" v-model="end" style="width: 100%;" format="yyyy-MM-dd"
                              value-format="yyyy-MM-dd"></el-date-picker>
              <!--<el-time-picker type="fixed-time" placeholder="选择时间" v-model="orderTime" style="width: 100%;"></el-time-picker>-->


              <span>服务状态：</span>
              <el-select v-model="formInline.region">
                <el-option v-for="item in options" :value="item.value" :label="item.label"></el-option>
              </el-select>
              <el-button @click="getExecuteList">筛选</el-button>
            </div>
            <!--<div class="ty-shaixuan-list1" :model="formInline">

                        </div>-->
          </div>
        </div>
      </el-row>

    </el-header>
    <el-main>
      <!-- 編輯彈窗頁面 catalogueDialog"-->
      <div class="ty-header-list2">
        <el-col :span="24"><i class="el-icon-document"></i> 服务执行排期表</el-col>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="no" label="排期编号" width=""></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <el-table-column prop="serviceDate" label="就诊时间"></el-table-column>
        <el-table-column prop="visitAddress" label="就诊地点">
          <template slot-scope="scope">
            <span v-show="!scope.row.visitAddress">无</span>
            <span v-show="scope.row.visitAddress">{{scope.row.visitAddress}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="visitType" label="就诊类型">
          <template slot-scope="scope">
            <span v-show="!scope.row.visitType">无</span>
            <span v-show="scope.row.visitType">{{scope.row.visitType}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="serviceName" label="陪诊人员">
          <template slot-scope="scope">
            <span v-show="!scope.row.serviceName">无</span>
            <span v-show="scope.row.serviceName">{{scope.row.serviceName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="serviceMobile" label="电话">
          <template slot-scope="scope">
            <span v-show="!scope.row.serviceMobile">无</span>
            <span v-show="scope.row.serviceMobile">{{scope.row.serviceMobile}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="productName" label="服务项">
          <template slot-scope="scope">
            <span v-show="!scope.row.productName">无</span>
            <span v-show="scope.row.productName">{{scope.row.productName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-show="!scope.row.remark">无</span>
            <span v-show="scope.row.remark">{{scope.row.remark}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" align="center" label="服务状态">
          <template slot-scope="scope">
            <el-select v-show="scope.row.status!='已完成'" v-model="scope.row.status" @change="changeType(scope.row.id)">
              <el-option v-for="item in optionsChildren" :value="item.value" :label="item.label"></el-option>
            </el-select>
            <span v-show="scope.row.status=='已完成'" style="color: #409EFF;">已完成</span>
          </template>
        </el-table-column>
        <!--编辑-->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="updateReservations(scope.$index,scope.row.status)">修改预约</el-button>
          </template>
        </el-table-column>
        <el-table-column label="">
          <template slot-scope="scope">
            <el-button size="mini" type="primary"
                       @click="handlecompile(scope.$index, scope.row.serviceOrderId,scope.row.status)">查看订单
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="历史">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="getHistoryById(scope.row.id)">修改历史</el-button>
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
    <!--修改预约-->
    <div class="button-el-dialog">
      <el-dialog :modal="false" title="修改预约" :visible.sync="centerDialogVisible" width="25%" center>
        <el-form :model="updataOrder">
          <el-form-item label="就诊时间" :label-width="formLabelWidth">
            <el-date-picker v-model="updataOrder.time" type="datetime" placeholder="选择日期时间" format="yyyy-MM-dd HH:mm"
                            value-format="yyyy-MM-dd HH:mm">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="服务人员姓名" :label-width="formLabelWidth">
            <el-input v-model="updataOrder.serviceName"></el-input>
          </el-form-item>
          <el-form-item label="服务人员电话" :label-width="formLabelWidth">
            <el-input v-model="updataOrder.serviceMobile"></el-input>
          </el-form-item>
          <el-form-item label="就诊医院" :label-width="formLabelWidth">
            <el-select placeholder="" v-model="updataOrder.hospital">
              <el-option v-for="item in hospitalOptions" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <!--<el-form-item label="服务人员" :label-width="formLabelWidth">
            <el-select placeholder="" v-model="updataOrder.servicePersonal">
              <el-option v-for="item in servicePersonalOptions" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>-->

          <el-form-item label="就诊类别" :label-width="formLabelWidth">
            <el-select placeholder="" v-model="updataOrder.category">
              <el-option v-for="item in categoryOptions" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="updataOrder.remarks"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="sureUpdateOrder">确 定</el-button>
    </span>
      </el-dialog>
    </div>

    <!--历史记录-->
    <div class="button-el-dialog">
      <el-dialog :modal="false" title="修改历史" :visible.sync="historyVisible" width="25%" center>
        <div class="historyMain">
          <div class="historyList" v-for="(l,index) in historyList">
            <i :class="index==0?'focus':'nomal'"></i>
            <div class="historyAddress" v-for="lc in l.info" v-if="lc != ''">
              {{lc}}
            </div>
            <div class="historyTime">
              {{l.createDate}}
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
      <el-button @click="historyVisible = false">取 消</el-button>
      <el-button type="primary" @click="historyVisible = false">确 定</el-button>
    </span>
      </el-dialog>
    </div>

  </el-container>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "orderlist",
    data() {
      return {
        formLabelWidth: '100px',
        formInline: { //弹窗的 select
          //          user: '',
          region: ''
        },
        updataOrder: {
          time: "",
          hospital: "",
          servicePersonal: "",
          category: "",
          remarks: "",
          serviceName:"",
          serviceMobile:""
        },
        hospitalOptions: [ //医院
          {
            value: '1',
            label: '北京协和'
          }, {
            value: '2',
            label: '中日友好'
          },
          {
            value: '3',
            label: '解放军301'
          }
        ],
        categoryOptions: [ //就诊类别
          {
            value: '1',
            label: '普通'
          }, {
            value: '2',
            label: '专家'
          },
          {
            value: '3',
            label: '特区'
          },
          {
            value: '4',
            label: '国际'
          },
          {
            value: '5',
            label: '无'
          }
        ],
        options: [ //
          {
            value: '1',
            label: '待服务'
          },
          {
            value: '2',
            label: '已完成'
          }
        ],
        servicePersonalOptions: [],
        optionsChildren: [
          {
            value: '2',
            label: '已完成'
          }
        ],
        tableData: [],
        //URL前缀
        baseURl: this.$store.state.url,
        currentPage: 1,
        currentSize: 10,
        centerDialogVisible: false,
        historyVisible: false,
        token: "",
        orderId: "",
        nameOrMobile: "",
        orderTime: "",
        end: '',
        start: '',
        historyList: [],
        pageNum: 0
      }
    },
    methods: {
      getHistoryById(id) {
        var self = this;
        this.historyVisible = true;
        var token = localStorage.getItem('currentUser_token');
        axios.defaults.headers.get['token'] = token;
        axios({
          method: 'get',
          url: self.baseURl + '/appointservice/updatehistory?id=' + id,
        }).then(res => {
          if (res.data['code'] == '0') {
            self.historyList = res.data.data;
          }
        })
      },
      handleSizeChange(val) {
        this.currentSize = val;
        this.getExecuteList()
      },
      changeType(id) {
        let self = this;
        var token = localStorage.getItem('currentUser_token');
        axios.defaults.headers.get['token'] = token;
        axios({
          method: 'get',
          url: self.baseURl + '/appointservice/setappointservicetofinished?id=' + id,
        }).then(res => {
          if (res.data['code'] == '0') {
            self.getExecuteList();
          }
        })
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getExecuteList();
      },
      handlecompile(index, id, status) { //表单编辑按钮
        console.log(id)
        this.$router.push({
          name: 'ServiceOrderDetails',
          params: {task_id: id, token_TO: localStorage.getItem('currentUser_token'), status_TO: status}
        })
      },
      getExecuteList() {
        var self = this;
        var token = localStorage.getItem('currentUser_token');
        var data = {
          pageSize: self.currentSize, //页数量
          pageNum: self.currentPage, //第几页
          query: {
            status: self.formInline.region,
            userInfo: self.nameOrMobile,
            start: self.start,
            end: self.end,
          }
        }
        axios.defaults.headers.post['token'] = token;
        axios({
          method: 'post',
          url: self.baseURl + '/appointservice/schedulelist',
          data: data,
        }).then(res => {
          if (res.data['code'] == '0') {
            this.tableData = res.data.data.rows
            this.pageNum = parseInt(res.data.data["total"])
          }
        })
      },
      sureUpdateOrder() {
        var obj = this.updataOrder;
        console.log(obj)
        var self = this;
        var token = localStorage.getItem('currentUser_token');
        var data = {
          id: self.orderId,
          serviceDate: obj.time,
          // offlineDoctorId: obj.servicePersonal,
          visitAddress: "",
          visitType: "",
          remark: ""
        };
        data["remark"] = obj.remarks;
        console.log(data["remark"]);
        for (let c of this.categoryOptions) {
          if (c.value == obj.category) {
            data["visitType"] = c.label;
          }
        }
        // for (let se of this.servicePersonalOptions) {
        //   if (se.value == obj.servicePersonal) {
        //     data["serviceName"] = se.label;
        //   }
        // }
        for (let h of this.hospitalOptions) {
          if (h.value == obj.hospital) {
            data["visitAddress"] = h.label;
          }
        }
        data["serviceMobile"] = obj.serviceMobile;
        data["serviceName"] = obj.serviceName;
        axios.defaults.headers.post['token'] = token;
        axios({
          method: 'post',
          url: self.baseURl + '/appointservice/updatescheduleappoint',
          data: data,
        }).then(res => {
          if (res.data['code'] == '0') {
            this.getExecuteList();
            this.centerDialogVisible = false;
          }
        })

      },
      updateReservations(i,status) {
        if(status==="已完成"){
          this.$message.warning("服务已经完成，不能再进行修改");
          return
        }
        this.centerDialogVisible = true;
        var obj = this.tableData[i];
        this.orderId = obj.id;
        this.updataOrder.time = obj.serviceDate;
        this.hospitalOptions;
        var flag = false;
        for (let h of this.hospitalOptions) {
          if (h.label == obj.visitAddress) {
            this.updataOrder.hospital = h.value;
            flag = true;
          }
        }
        if (!flag) {
          this.updataOrder.hospital = "";
        }
        /*flag = false;
        for (let s of this.servicePersonalOptions) {
          if (s.label == obj.serviceName) {
            this.updataOrder.servicePersonal = s.value;
            flag = true;
          }
        }
        if (!flag) {
          this.updataOrder.servicePersonal = "";
        }*/
        flag = false;
        for (let c of this.categoryOptions) {
          if (c.label == obj.visitType) {
            this.updataOrder.category = c.value;
            flag = true;
          }
        }
        if (!flag) {
          this.updataOrder.category = "";
        }
        this.updataOrder.remarks = obj.remark;
        this.updataOrder.serviceName = obj.serviceName;
        this.updataOrder.serviceMobile = obj.serviceMobile;
      },
      getDockerList() {
        var self = this;
        var token = localStorage.getItem('currentUser_token');
        var fd = new FormData();
        fd.append('pageSize', 10000);
        fd.append('pageNum', 1);
        axios.defaults.headers.post['token'] = token;
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        axios.post(self.baseURl + '/user/docker', fd, config).then(res => {
          if (res.status == 200) {
            let data = res.data.data.rows;
            for (let i = 0; i < data.length; i++) {
              self.servicePersonalOptions.push({
                "value": data[i]["id"],
                "label": data[i]["name"]
              });
            }
          }
        }).catch(res => {
          console.log(res)
        })

      }
    },
    mounted() {
      this.getDockerList();
      this.getExecuteList();
    }
  }
</script>

<style scoped>
  /*历史记录*/

  .historyMain {
    width: 100%;
    height: 200px;
    overflow: auto;
    padding: 10px;
    box-sizing: border-box;
  }

  .historyMain .historyList {
    width: 100%;
    height: auto;
    border-left: 1px solid #e5e5e5;
    box-sizing: border-box;
    position: relative;
    padding-left: 20px;
  }

  .historyMain .historyList:last-child {
    border-left-color: white;
  }

  .historyMain .historyList i {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    position: absolute;
    left: -10px;
    top: 0px;
  }

  .historyMain .historyList i.focus {
    background-color: #409EFF;
  }

  .historyMain .historyList i.nomal {
    background-color: #e5e5e5;
  }

  .historyMain .historyList .historyAddress {
    width: 100%;
    height: 35px;
    font-size: 14px;
  }

  .historyMain .historyList .historyTime {
    width: 100%;
    height: 35px;
    font-size: 12px;
  }

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
    width: 100%;
    height: 80px;
    display: inline-block;
  }

  .ty-shaoxuan-content {
    /*height: 80px;*/
    line-height: 80px;
    background-color: rgba(255, 255, 255, 1);
    font-size: 14px;
    border: 1px solid rgba(228, 228, 228, 1);
    padding-left: 20px;
  }
</style>
<style>
  .orderlist .el-header {
    padding: 0px;
  }

  .orderlist .el-input {
    width: 100% !important;
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
