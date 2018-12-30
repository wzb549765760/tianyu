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
          <el-col :span="12"><i class="el-icon-date"></i>预约信息</el-col>
        </div>
        <el-table
          :data="tableData3"
          border
          style="width: 100%; margin-top: 20px">
          <el-table-column
            prop="appointDate"
            label="预约日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="productName"
            label="服务名称">
          </el-table-column>
          <el-table-column
            prop="consultationType"
            label="咨询类型">
          </el-table-column>
          <el-table-column
            prop="conditionComplaint"
            label="病情主诉">
          </el-table-column>
          <el-table-column
            label="附件">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" v-for="l in fujian">
                <a :href="l.url+'&token='+token" style="color: white;text-decoration: none">{{l.name}} </a>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--商品信息-->
      <div class="ty-listone">
        <div class="ty-el-main">
          <el-col :span="12"><i class="el-icon-date"></i>订单信息</el-col>
        </div>
        <el-table
          :data="tableData2"
          border
          style="width: 100%; margin-top: 20px">
          <el-table-column
            prop="no"
            label="编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="orderNo"
            label="订单编号">
            <!--<template scope="scope">
              <img :src="scope.row.picPath" width="60" height="40">
            </template>-->
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="source"
            label="来源">
          </el-table-column>
          <!--        TODO 服务信息-->
        </el-table>
      </div>
      <!--TODO 其他信息-->
      <div class="ty-listone">
        <div class="ty-el-main">
          <el-col :span="12"><i class="el-icon-date"></i>其他信息</el-col>
        </div>
        <div class="el-el-main-input">
          <el-form :data="tableData1" v-for="(list,index) in tableData1">
            <!-- <el-form-item label="offlineDoctorId" prop="offlineDoctorId">
               <el-input placeholder="服务时间" v-model="list.offlineDoctorId"></el-input>
             </el-form-item>-->
            <!--  <el-form-item label="onlineDoctorId："prop="onlineDoctorId">
                <el-input placeholder="onlineDoctorId" v-model="list.onlineDoctorId"></el-input>
              </el-form-item>-->

            <el-form-item label="服务时间：" prop="serviceDate">
              <el-date-picker :readonly="editFlag"
                              v-model="list.serviceDate"
                              type="datetime"
                              value-format="yyyy-MM-dd HH:mm"
                              format="yyyy-MM-dd HH:mm"
                              placeholder="选择日期">
              </el-date-picker>
              <!--<el-input placeholder="服务时间" v-model="list.serviceDate"></el-input>-->
            </el-form-item>

            <el-form-item label="陪诊人员姓名：" prop="serviceName">
              <el-input placeholder="陪诊人员姓名" v-model="list.serviceName" :readonly="editFlag"></el-input>
            </el-form-item>
            <el-form-item label="陪诊人员电话：" prop="serviceMobile">
              <el-input placeholder="陪诊人员电话" v-model="list.serviceMobile" :readonly="editFlag"></el-input>
            </el-form-item>
            <el-form-item label="使用人姓名:" prop="useName">
              <el-input placeholder="使用人姓名" v-model="list.useName" :readonly="editFlag"></el-input>
            </el-form-item>
            <el-form-item label="使用人电话：" prop="useMobile">
              <el-input placeholder="使用人电话" v-model="list.useMobile" :readonly="editFlag"></el-input>
            </el-form-item>
            <el-form-item label="就诊地点:" prop="visitAddress">
              <!--就整地点-->
              <el-select placeholder="就诊地点" v-model="list.visitAddress" :disabled="editFlag">
                <el-option
                  v-for="item in options"
                  :value="item.value"
                  :label="item.label"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="就诊类型：" prop="visitType">
              <!--就诊类型-->
              <el-select placeholder="就诊类型" v-model="list.visitType" :disabled="editFlag">
                <el-option
                  v-for="item in options2"
                  :value="item.value"
                  :label="item.label"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="保健医:" prop="visitAddress">
              <!--就整地点-->
              <el-select placeholder="保健医" v-model="Doctorcould" :disabled="editFlag">
                <el-option v-for="itemD in optionsDoctorcouldDefault"
                           :value="itemD.id"
                           :label="itemD.name+itemD.mobile">
                </el-option>
                <el-option
                  v-for="item in optionsDoctorcould"
                  :value="item.id"
                  :label="item.name+item.mobile"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
              <el-input placeholder="备注" v-model="list.remark" :readonly="editFlag"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-main>
    <el-footer>
      <div class="ty-right-anniu">
        <el-button @click="confirstatus" v-show="!editFlag">接受预约</el-button>
        <el-button @click="goBack">取消</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'

  export default {
    data() {
      return {
        currentPage: 1,
        currentSize: 20000,
        Doctorcould: '', //保健医生
        optionsDoctorcould: [], //保健医生选框
        optionsDoctorcouldDefault: [{
          "id":"",
          "name":"请选择保健医",
          "mobile":""
        }], //保健医生选框
        params: this.$route.params, //携带过来的id
        baseURl: this.$store.state.url,
        token: '',
        status: '',//付款的状态
        editFlag: false,
        tableData3: [], //TODO 预约单详情
        tableData2: [],//TODO 预约信息
        tableData1: [],//TODO 服务信息
        tableData: '',
//        tableData:[
        /* {
           serviceDate:'',
           useName:'',
           useMobile:'',
           onlineDoctorId:'',
           offlineDoctorId:'',
           serviceName:'',
           serviceMobile:'',
           visitAddress:'',
           visitType:'',
           remark:'',
         }*/
//        ],
        options: [
          {
            value: "中日友好",
            label: '中日友好'
          }, {
            value: "解放军301",
            label: '解放军301'
          }, {
            value: "北京协和",
            label: '北京协和'
          },{
            value: "北京友谊",
            label: '北京友谊'
          },{
            value: "北京医院",
            label: '北京医院'
          },{
            value: "解放军第一附属医院（304医院）",
            label: '解放军第一附属医院（304医院）'
          },{
            value: "解放军第302 医院",
            label: '解放军第302 医院'
          },{
            value: "解放军第306 医院",
            label: '解放军第306 医院'
          },{
            value: "解放军第309医院",
            label: '解放军第309医院'
          },{
            value: "海军总医院",
            label: '海军总医院'
          },{
            value: "空军总医院",
            label: '空军总医院'
          },{
            value: "武警总医院",
            label: '武警总医院'
          },{
            value: "陆军总医院",
            label: '陆军总医院'
          },{
            value: "火箭军总医院",
            label: '火箭军总医院'
          },{
            value: "中国医学科学肿瘤医院",
            label: '中国医学科学肿瘤医院'
          },{
            value: "北京阜外心血管病医院",
            label: '北京阜外心血管病医院'
          },{
            value: "北京大学第一医院",
            label: '北京大学第一医院'
          },{
            value: "北京大学人民医院",
            label: '北京大学人民医院'
          },{
            value: "北京大学第三医院",
            label: '北京大学第三医院'
          },{
            value: "北京大学肿瘤医院",
            label: '北京大学肿瘤医院'
          },{
            value: "北京大学口腔医院",
            label: '北京大学口腔医院'
          },{
            value: "北京中医药大学东方医院",
            label: '北京中医药大学东方医院'
          },{
            value: "北京博爱医院（康复中心）",
            label: '北京博爱医院（康复中心）'
          },{
            value: "北京广安门中医院",
            label: '北京广安门中医院'
          },{
            value: "北京同仁医院",
            label: '北京同仁医院'
          },{
            value: "清华大学长庚医院",
            label: '清华大学长庚医院'
          },{
            value: "北京天坛医院",
            label: '北京天坛医院'
          },{
            value: "北京安贞医院",
            label: '北京安贞医院'
          },{
            value: "北京朝阳医院",
            label: '北京朝阳医院'
          },{
            value: "北京宣武医院",
            label: '北京宣武医院'
          },{
            value: "北京市积水潭医院",
            label: '北京市积水潭医院'
          },{
            value: "北京世纪坛医院",
            label: '北京世纪坛医院'
          },{
            value: "北京中医医院",
            label: '北京中医医院'
          },{
            value: "北京市儿童医院",
            label: '北京市儿童医院'
          },{
            value: "首都儿科研究所",
            label: '首都儿科研究所'
          },{
            value: "北京市妇产医院",
            label: '北京市妇产医院'
          },{
            value: "北京佑安医院",
            label: '北京佑安医院'
          },{
            value: "北京地坛医院",
            label: '北京地坛医院'
          },{
            value: "北京胸科医院",
            label: '北京胸科医院'
          },{
            value: "首都医科大学附属北京口腔医院",
            label: '首都医科大学附属北京口腔医院'
          },{
            value: "北京安定医院",
            label: '北京安定医院'
          },{
            value: "北京回龙观医院",
            label: '北京回龙观医院'
          },{
            value: "北京老年医院",
            label: '北京老年医院'
          },{
            value: "北京小汤山疗养院",
            label: '北京小汤山疗养院'
          }],
        options2: [
          {
            value: "专家门诊",
            label: '专家门诊'
          }, {
            value: "特需门诊",
            label: '特需门诊'
          }, {
            value: "国际部",
            label: '国际部'
          }],
        fujian: [],
        content: '' //备注信息input
      };
    },
    methods: {
      gettoken() {
        var self = this;
        self.token = localStorage.getItem('currentUser_token');
      },
      sublist() { //TODO  请求页面数据
        var self = this;
        var token = self.params.token_TO;
        axios.defaults.headers.post['token'] = token;
        axios({
          method: 'post',
          url: self.baseURl + '/appointservice/detail?id=' + self.params.task_id,
          data: '',
        }).then(res => {
          if (res.data['code'] == '0') {
            self.tableData3.push(res.data.data.appointInfo);
            var caseAppendagePath = res.data.data.appointInfo.caseAppendagePath;
            var list = caseAppendagePath.split(";");
            for (var i = 0; i < list.length; i++) {
              if (list[i] != "" && list[i] != undefined && list[i] != null) {
                var name = list[i].split("name=")[1];
                if (name != "" && name != undefined && name != null) {
                  var nameD = name.split(".");
                  self.fujian.push({
                    "name": nameD[0],
                    "url": list[i]
                  })
                }
              }

            }
            console.log(self.fujian);
            self.tableData2.push(res.data.data.orderInfo);
            self.tableData = res.data.data.id;
            self.tableData1.push(res.data.data.serviceInfo);
            self.Doctorcould = res.data.data.serviceInfo.onlineDoctorId;
            // self.tableData1[0]['serviceDate'] = self.tableData3[0]['appointDate'];
            var date = new Date(self.tableData3[0]['appointDate']);

            self.tableData1[0]['serviceDate'] = self.getTime(date);
            console.log(self.tableData1[0]['serviceDate']);
          } else {
            self.$message({
              message: '请求失败',
              type: 'error'
            });
          }
        })

      },
      getTime(date) {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var currentTime =year + ":" + month + ":" + day + " " + hour + ":" + minute;
        return currentTime;
      },
      /*TODO  接受预约按钮*/
      Confirmorder() {
        var self = this;

        var a = self.tableData1;
        var obj1 = '';
        a.map(function (e, item) {
          obj1 = e
        });
        obj1.id = self.tableData;
        // if (self.Doctorcould == "" || self.Doctorcould == null || self.Doctorcould == undefined) {
        //   self.$message({
        //     message: '保健医不能为空',
        //     type: 'error'
        //   })
        //   return;
        // }
        obj1.onlineDoctorId = self.Doctorcould;
        console.log(obj1);
        axios({
          method: 'post',
          url: self.baseURl + '/appointservice/acceptappoint',
          data: obj1
        }).then(res => {
          if (res.data['code'] == '0') {
            self.$message({
              message: '请求成功',
              type: 'success'
            });
//              回到预约列表页面
            self.$router.push({name: 'ServeMakeList'})
          } else {
            self.$message({
              message: res.data.desc,
              type: 'error'
            })
          }
        })
      },

      doc() { //查询保健医生
        let self = this;
        self.token = localStorage.getItem('currentUser_token');
        let data = {
          pageSize: self.currentSize, //页数量
          pageNum: self.currentPage, //第几页
        };
        axios.defaults.headers.post['token'] = self.token;
        axios({
          method: 'post',
          url: self.baseURl + '/user/docker',
          data: qs.stringify(data),
        }).then(res => {
          if (res.data['code'] == "0") {
            this.optionsDoctorcould = res.data.data.rows;

            console.log(this.optionsDoctorcould)
          }
        })


      },
      goBack() {
        window.history.go(-1);
      },
      /* TODO 确定按钮的付款状态*/
      confirstatus() {
        if (this.status == '未付款') {
          this.$message({
            message: '未付款状态不能点击确定订单按钮',
            type: 'error'
          })
        } else {
          this.Confirmorder()
        }
      }
    },
    mounted() {
      this.sublist()
      this.gettoken()
      this.status = this.params.status_TO;
      if (this.status == '未处理') {
        this.editFlag = false;
      } else {
        this.editFlag = true;
      }
      this.doc()
//      console.log(this.status)
    }
  };
</script>

<style scoped>
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
    width: 200px;

  }

  .orderlineitem .el-input__inner {
    height: 30px;
    line-height: 30px;
  }
</style>
