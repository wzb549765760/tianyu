<template>
  <div class="orders-box">
    <div class="orders-container">
      <span class="orders-title">使用服务人员信息地址（以下信息为使用医疗服务的人员信息，请务必准确填写）<br/><br/>
        <!--<span class="info-change" @click="tabChange">修改信息</span>--></span>
      <!--<div class="orders-man" v-show="isShow">
          <div class="man-desc">
              <div><span class="man-im">*</span><span class="man-label">姓名&nbsp;:&nbsp;</span><span class="man-info">{{orderInfo.servicepeople.name}}</span> </div>
              <div><span class="man-im">*</span><span class="man-label">性别&nbsp;:&nbsp;</span><span class="man-info"><el-radio v-model="orderInfo.servicepeople.sex" label="1">男</el-radio>
<el-radio v-model="orderInfo.servicepeople.sex" label="2">女</el-radio></span> </div>
              <div><span class="man-im">*</span><span class="man-label">年龄&nbsp;:&nbsp;</span><span class="man-info">{{age}}</span> </div>
              <div><span class="man-im">*</span><span class="man-label">手机号&nbsp;:&nbsp;</span><span class="man-info">{{orderInfo.servicepeople.mobile}}</span> </div>
              <div><span class="man-im">*</span><span class="man-label">身份证&nbsp;:&nbsp;</span><span class="man-info">{{orderInfo.servicepeople.idCardNum|numFilter}}</span> </div>
          </div>
          <div class="man-image">
              <div>
                <span class="man-im">*</span><span class="man-label">身份证正面照&nbsp;:&nbsp;</span>
                <img :src="orderInfo.servicepeople.idCardFrontPicFileId + '&token='+ headers.token" alt="">
              </div>
          </div>
      </div>
      <div class="orders-man" v-show="!isShow">
          <div class="man-desc">
              <div><span class="man-im">*</span><span class="man-label">姓名&nbsp;:&nbsp;</span><span class="man-info3"><input
                type="text" v-model="orderInfo.servicepeople.name"> </span> </div>
              <div><span class="man-im">*</span><span class="man-label">性别&nbsp;:&nbsp;</span><span class="man-info3"><el-radio v-model="orderInfo.servicepeople.sex" label="1">男</el-radio>
<el-radio v-model="orderInfo.servicepeople.sex" label="2">女</el-radio></span> </div>
              <div><span class="man-im">*</span><span class="man-label">年龄&nbsp;:&nbsp;</span><span class="man-info3"><input
                type="text" v-model="orderInfo.servicepeople.age"></span> </div>
            <div><span class="man-im">*</span><span class="man-label">手机号&nbsp;:&nbsp;</span><span class="man-info3"><input
                type="text" v-model="orderInfo.servicepeople.mobile"></span> </div>
              <div><span class="man-im">*</span><span class="man-label">身份证&nbsp;:&nbsp;</span><span class="man-info3"><input
                type="text" v-model="orderInfo.servicepeople.idCardNum"></span> </div>
              <div><span class="man-im">*</span><span class="man-label">身份证正面照&nbsp;:&nbsp;</span><span class="man-info3"><el-upload
                class="upload-demo"
                action="http://apitest.tianyushangyi.com/file/upload"
                :headers="headers"
                :data="upData"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :before-remove="beforeRemove"
                multiple
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload></span> </div>
          </div>
      </div>-->
      <div class="addressMain">
        <div class="tittle">使用人信息</div>
        <div class="addressImfMain">
          <div class="addressNull" style="display: none">暂无可用的收货地址，请添加</div>
          <div class="addressDetailsMain">
            <div class="addressDetail">使用人姓名: {{orderInfo.servicepeople.name}}</div>
            <div class="addressDetail">使用人手机: {{orderInfo.servicepeople.mobile}}</div>
            <div class="addressDetail">身份证号码: {{orderInfo.servicepeople.idCardNum}}</div>
          </div>
          <div class="bottomMain">
            <div class="bottom" @click="addData('add')">添加使用人</div>
            <div class="bottom" @click="addressListFlag=true">切换使用人</div>
            <div class="bottom1" @click="updateData('update')">修改使用人</div>
          </div>
        </div>
      </div>
      <span class="space-line"></span>
      <span class="pay-title">支付方式</span>
      <div class="pay-kind">
        <p :class="{ 'pay-ace' : pay_ace1 }" @click="payKindTab1">在线支付</p>
        <p :class="{'pay-ace':pay_ace2}" @click="payKindTab2">对公转账</p>
        <span>高于20万只能使用对公转账，付款后，服务人员会与您联系，付款后提供服务</span>
      </div>
      <span class="space-line"></span>
      <span class="pay-title">发票信息</span>
      <span class="pay-cl"><input class="pay-check" type="checkbox" v-model="orderInfo.isInvoice" @change="checkChange">我需要发票</span>
      <span class="space-line"></span>
      <span class="pay-title">商品信息</span>
      <div class="man-info2">
        <table cellspacing="0">
          <tr>
            <th>商品图</th>
            <th>商品信息</th>
            <th>规格</th>
            <th>数量</th>
            <th>价格</th>
          </tr>
          <tr>
            <td><img style="width: 160px;height: 100px" :src="params.image" alt=""></td>
            <td>{{params.name}}</td>
            <td>{{params.specificationName}}</td>
            <td>{{params.num}}</td>
            <td>{{params.num * params.specificationPrice}}</td>
          </tr>
        </table>
      </div>
      <span class="space-line"></span>
      <span class="pay-title">金额明细</span>
      <div class="pay-price">
        <div>商品总额&nbsp;:&nbsp;<span class="price1">¥&nbsp;{{params.num * params.specificationPrice}}</span></div>
        <div>应付总额&nbsp;:&nbsp;<span class="price2">¥&nbsp;{{params.num * params.specificationPrice}}</span></div>
        <p @click="submitOrder">提交订单</p>
      </div>

    </div>
    <div class="home-footer">
      Copyright © 天宇尚医, All Rights Reserved.&nbsp&nbsp 备案号：京ICP备18045115号-1
    </div>
    <div class="invoice" v-show="invoiceShow">
      <div class="invoice-min">
        <span class="invoice-title">发票类型&nbsp;:&nbsp;增值税普通发票</span>
        <span class="invoice-title"><span style="color:#FF6555 ">*</span>发票抬头&nbsp;:&nbsp;
                <el-radio v-model="orderInfo.invoice.title" label="个人" @change="radioChange">个人</el-radio>
                <el-radio v-model="orderInfo.invoice.title" label="单位" @change="radioChange">单位</el-radio>
            </span>
        <span class="invoice-title"><span style="color:#FF6555 ">*</span>发票内容&nbsp;:&nbsp;<input
          style="height: 30px;width: 300px" type="text" v-model="orderInfo.invoice.content"></span>
        <div v-show="orderInfo.invoice.title == '单位'" class="invoice-title">
          <span class="invoice-title"><span style="color:#FF6555 ">*</span>单位名称&nbsp;:&nbsp;<input style="height: 30px"
                                                                                                   type="text"
                                                                                                   v-model="orderInfo.invoice.name"></span>
          <span class="invoice-title"><span style="color:#FF6555 ">*</span>纳税人识别号&nbsp;:&nbsp;<input
            style="height: 30px" type="text" v-model="orderInfo.invoice.number"></span>
        </div>
        <div class="invoice-btn">
          <p @click="invoiceHide1">确定</p>
          <p @click="invoiceHide">取消</p>
        </div>
      </div>
      <el-button :plain="true" @click="open" v-show="false"></el-button>
    </div>
    <div class="serves-add1" v-show="addressListFlag"><!--选择地址-->
      <div class="choiceAddre">
        <div class="tittle">选择使用人</div>
        <div class="choiceAddressMain">
          <div v-for="(l,index) in servicepeopleList" @click="choiceAddress(index)"
               :class=" l.borderStyleFlag ? 'redBorder addressList' : 'addressList'">
            <div class="imfLine">
              <span class="name">使用人姓名:</span>
              <span class="key">{{l.name}}</span>
            </div>
            <div class="imfLine">
              <span class="name">使用人电话:</span>
              <span class="key">{{l.mobile}}</span>
            </div>
            <div class="imfLine">
              <span class="name">身份证号码:</span>
              <span class="key">{{l.idCardNum}}</span>
            </div>
            <div class="defaultAddress" v-show="l.default">默认地址</div>
          </div>
        </div>
        <div class="bottomDiv">
          <span @click="addressListFlag=false">取消</span>
          <span @click="addressListSure">确定</span>
        </div>
      </div>
    </div>
    <div class="serves-add1" v-show="updateImfFlag"><!--选择地址-->
      <div class="choiceAddre">
        <div class="tittle">修改使用人信息</div>
        <div class="choiceAddressMain">
          <div class="useImfLine">
            <div class="inputMain">
              <div class="tittle"><span class="man-im" style="font-size: 12px">*</span>姓名</div>
              <input placeholder="请输入姓名" v-model="changeImf.name"/>
            </div>
            <div class="inputMain">
              <div class="tittle"><span class="man-im" style="font-size: 12px">*</span>手机号</div>
              <input placeholder="请输入手机号" v-model="changeImf.mobile"/>
            </div>
          </div>
          <div class="useImfLine">
            <div class="inputMain">
              <div class="tittle"><span class="man-im" style="font-size: 12px">*</span>年龄</div>
              <input placeholder="请输入年龄" v-model="changeImf.age"/>
            </div>
            <div class="inputMain" style="border: 0px">
              <span class="man-im" style="font-size: 12px">*</span>
              <span class="man-label" style="font-size: 12px">性别&nbsp;:&nbsp;</span>
              <span class="man-info">
                <el-radio v-model="changeImf.sex" label="1">男</el-radio>
                <el-radio v-model="changeImf.sex" label="2">女</el-radio>
              </span>
            </div>
          </div>
          <div class="useImfLine">
            <div class="inputMain">
              <div class="tittle"><span class="man-im" style="font-size: 12px">*</span>身份证号</div>
              <input placeholder="请输入身份证号码" v-model="changeImf.idCardNum"/>
            </div>
            <div class="inputMain" style="border: 0px">

            </div>
          </div>
          <div style="margin-top: 20px"><span class="man-im" style="font-size: 12px">*</span><span class="man-label"
                                                                                                   style="font-size: 12px">身份证正面照&nbsp;:&nbsp;</span><span
            class="man-info3"><el-upload
            class="upload-demo"
            :action="getUrl"
            :headers="headers"
            :data="upData"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload></span></div>
        </div>
        <div class="bottomDiv">
          <span @click="closeUpdateImf">取消</span>
          <span @click="updateImfSure">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "orders",
    data() {
      return {
        addressListFlag: false,
        num: "12345678978945612",
        params: this.$route.params,
        pay_ace1: true,
        updateImfFlag: false,
        pay_ace2: false,
        checked: false,
        changeImf: {
          name: "",
          age: "",
          sex: "1",
          id: "",
          mobile: "",
          idCardNum: "",
          idCardUrl: "",
          default:""
        },
        headers: {
          token: this.Cookies.get("token")
        },
        upData: {
          type: 2
        },
        fileList: [],
        isShow: true,
        radio: '个人',
        radioSex: '1',
        invoiceShow: false,
        currentPage1: 1,
        currentSize: 100,
        age: "",
        url: this.$store.state.vuexs.url,
        servicepeopleList: [],
        orderInfo: {
          servicepeople: {
            name: "",
            age: "",
            sex: "1",
            id: "",
            mobile: "",
            idCardNum: "",
            idCardUrl: "",
            default:""
          },
          payType: "在线支付",
          isInvoice: false,
          invoice: {
            type: "增值税普通发票",
            title: "个人",
            name: "",
            content: "",
            number: ""
          },
          commodityId: this.$route.params.commodityId,
          specificationId: this.$route.params.specificationId,
          commodityType: this.$route.params.commodityType,
          source: "pc",
          count: 1
        },
        dataList: {},
        updataAddFlag: ""
      }
    },
    created() {
      /*if(self.orderInfo.servicepeople.sex){
        this.$store.state.vuexs.orderInfo=this.orderInfo
      }else{
        this.orderInfo=this.$store.state.vuexs.orderInfo
      }*/
      if (this.$route.params.commodityId) {
        this.params = this.$route.params;
        this.$store.state.vuexs.orderP = this.$route.params
      } else {
        this.params = this.$store.state.vuexs.orderP;
      }
    },
    methods: {
      updateData(type){
        this.updataAddFlag = type;
        this.updateImfFlag = true;
        this.changeImf = {
          name: this.orderInfo.servicepeople.name,
          age: this.orderInfo.servicepeople.age,
          sex: this.orderInfo.servicepeople.sex,
          id: this.orderInfo.servicepeople.id,
          mobile: this.orderInfo.servicepeople.mobile,
          idCardNum: this.orderInfo.servicepeople.idCardNum,
          idCardUrl: this.orderInfo.servicepeople.idCardUrl,
          default: this.orderInfo.servicepeople.default
        };
      },
      getUrl(){
        return this.url+"/file/upload";
      },
      addData(type) {
        this.updataAddFlag = type;
        this.updateImfFlag = true;
        this.changeImf = {
          name: "",
          age: "",
          sex: "1",
          id: "",
          mobile: "",
          idCardNum: "",
          idCardUrl: "",
          default:false,
        }
      },
      updateImfSure(){
        var obj = this.changeImf;
        let self = this;
        if (obj["name"] == "" || obj["name"] == undefined || obj["name"] == null){
          self.$message({
            showClose: true,
            message: "请填写姓名",
            type: 'error'
          });
          return;
        }
        if (obj["mobile"] == "" || obj["mobile"] == undefined || obj["mobile"] == null){
          self.$message({
            showClose: true,
            message: "请填写手机号",
            type: 'error'
          });
          return;
        }
        if (obj["age"] == "" || obj["age"] == undefined || obj["age"] == null){
          self.$message({
            showClose: true,
            message: "请填写年龄",
            type: 'error'
          });
          return;
        }
        if (obj["sex"] == "" || obj["sex"] == undefined || obj["sex"] == null){
          self.$message({
            showClose: true,
            message: "请填写性别",
            type: 'error'
          });
          return;
        }
        if (obj["idCardNum"] == "" || obj["idCardNum"] == undefined || obj["idCardNum"] == null){
          self.$message({
            showClose: true,
            message: "请填写身份证号",
            type: 'error'
          });
          return;
        }
        if (obj["idCardUrl"] == "" || obj["idCardUrl"] == undefined || obj["idCardUrl"] == null){
          self.$message({
            showClose: true,
            message: "请选择身份证正面照",
            type: 'error'
          });
          return;
        }

        if (self.updataAddFlag == "add"){
          self.axios.defaults.headers.post['token'] = self.Cookies.get("token");
          self.axios({
            method: "post",
            url: self.url + "/servicepeople/add",
            data: self.qs.stringify(obj)
          }).then(function (res) {
            if (res.data.code == 0) {
              self.getServes();
              self.updateImfFlag = false;
            } else {
              self.$message({
                showClose: true,
                message: '请正确填写信息',
                type: 'error'
              });
            }
          })
        }else if (self.updataAddFlag == "update") {
          self.axios.defaults.headers.post['token'] = self.Cookies.get("token");
          self.axios({
            method: "post",
            url: self.url + "/servicepeople/update",
            data: self.qs.stringify(obj)
          }).then(function (res) {
            if (res.data.code == 0) {
              self.updateImfFlag = false;
              self.getServes();
            } else {
              self.$message({
                showClose: true,
                message: '提交失败',
                type: 'error'
              });
            }
          })

        }


      },
      closeUpdateImf(){
        this.updateImfFlag = false;
        this.changeImf = {
          name: "",
          age: "",
          sex: "1",
          id: "",
          mobile: "",
          idCardNum: "",
          idCardUrl: "",
          default:false
        }
      },
      open() {
        this.$message({
          showClose: true,
          message: '请填写完整发票信息',
          type: 'error'
        });
      },
      payKindTab1() {
        const self = this;
        self.pay_ace1 = true;
        self.pay_ace2 = false;
        self.orderInfo.payType = "在线支付"
      },
      payKindTab2() {
        const self = this;
        self.pay_ace1 = false;
        self.pay_ace2 = true;
        self.orderInfo.payType = "对公转账"
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleSuccess(response, file, fileList) {
        console.log(response);
        const self = this;
        if (response.code == 0) {
          self.changeImf.idCardUrl = response.data.url;
        }
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        fileList = [];
        this.$message.warning(`当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      //
      tabChange() {
        const self = this;
        self.isShow = !self.isShow;
      },
      //是否开发票
      checkChange() {
        const self = this;
        self.orderInfo.invoice.content = "";
        self.orderInfo.invoice.name = "";
        self.orderInfo.invoice.number = "";
        console.log(self.orderInfo.isInvoice);
        if (self.orderInfo.isInvoice == true) {
          self.invoiceShow = true;
        } else {
          self.invoiceShow = false;

        }
      },
      //个人/单位
      radioChange() {
        const self = this;
        console.log(self.radio);

      },
      //
      invoiceHide() {
        const self = this;
        self.orderInfo.isInvoice = false
        self.invoiceShow = false;
        self.checked = false;
      },
      invoiceHide1() {
        const self = this;
        if (self.orderInfo.invoice.content == "") {
          self.open();
          return
        }
        ;
        if (self.orderInfo.invoice.title == '单位') {
          if (self.orderInfo.invoice.name == "" || self.orderInfo.invoice.number == "") {
            self.open();
            return
          }
        }
        self.invoiceShow = false;
        self.orderInfo.isInvoice = true;
        self.checked = false;
      },
      choiceAddress(i) {
        var list = this.servicepeopleList;
        list.forEach(function (v, k) {
          v["borderStyleFlag"] = false;
        });
        list[i]["borderStyleFlag"] = true;
        this.servicepeopleList = list;
      },
      addressListSure() {
        let self = this;
        var flag = true;
        this.servicepeopleList.forEach((v) => {
          if (v["borderStyleFlag"]) {
            flag = false;
            self.orderInfo.servicepeople.name = v.name;
            self.orderInfo.servicepeople.sex = v.sex;
            self.orderInfo.servicepeople.id = v.id;
            self.orderInfo.servicepeople.mobile = v.mobile;
            self.orderInfo.servicepeople.idCardNum = v.idCardNum;
            self.orderInfo.servicepeople.idCardUrl = v.idCardUrl;
            self.orderInfo.servicepeople.default = v.default;
            self.addressListFlag = false;
          }
          v["borderStyleFlag"] = false;
        });
        if (flag) {
          self.$message({
            showClose: true,
            message: "请选择一个地址",
            type: 'error'
          });
        }
      },
      getServes() {
        const self = this;
        const data = {
          pageNum: self.currentPage1,
          pageSize: self.currentSize
        }
        // self.axios.defaults.headers.post['token'] = self.token;
        self.axios.defaults.headers.post['token'] = self.Cookies.get("token");
        self.axios({
          method: "post",
          url: self.url + "/servicepeople/list",
          data: self.qs.stringify(data)
        }).then(function (res) {
          console.log(res);
          if (res.data.code == 0) {
            const data = res.data.data.rows;
            data.forEach((value) => {
              value["borderStyleFlag"] = false;
              if (value.default == true) {
                self.dataList = value
              }
            });
            self.servicepeopleList = data;
            console.log(self.dataList);
            if (JSON.stringify(self.dataList) == "{}") {
              self.isShow = false;
            } else {
              self.orderInfo.servicepeople.name = self.dataList.name;
              self.orderInfo.servicepeople.mobile = self.dataList.mobile;
              self.orderInfo.servicepeople.id = self.dataList.id;
              self.orderInfo.servicepeople.idCardNum = self.dataList.idCardNum;
              self.orderInfo.servicepeople.idCardFrontPicFileId = self.dataList.idCardUrl;
              self.orderInfo.servicepeople.idCardUrl = self.dataList.idCardUrl;
              self.orderInfo.servicepeople.default = self.dataList.default;
              self.orderInfo.servicepeople.age = self.dataList.age.toString();
              self.orderInfo.servicepeople.sex = self.dataList.sex.toString();
            }
          }

        })
      },
      //提交
      submitOrder() {
        const self = this;
        console.log(self.orderInfo.servicepeople);
        if (!self.orderInfo.servicepeople.name || !self.orderInfo.servicepeople.mobile || !self.orderInfo.servicepeople.idCardNum) {
          self.$message({
            message: '请填写完整信息',
            type: 'error'
          });
          return
        } else if (self.fileList == [] && !self.orderInfo.servicepeople.idCardUrl) {
          self.$message({
            message: '请上传图片',
            type: 'error'
          });
          return
        }
        self.orderInfo.servicepeople.sex = parseInt(self.orderInfo.servicepeople.sex);
        self.orderInfo.servicepeople.age = parseInt(self.orderInfo.servicepeople.age);
        self.orderInfo.count = parseFloat(self.params.num);
        console.log(self.orderInfo);
        this.$store.state.vuexs.orderInfo = self.orderInfo;
        // self.axios.defaults.headers.post['token'] = self.token;
        self.axios.defaults.headers.post['token'] = self.Cookies.get("token");
        self.axios({
          method: "post",
          url: self.url + "/purchaseorder/add",
          data: self.orderInfo
        }).then(function (res) {
          console.log(res);
          if (res.data.code == 0) {
            if (self.orderInfo.payType == "在线支付") {
              localStorage.setItem("price", self.params.num * self.params.specificationPrice)
              self.$router.push({
                name: 'pay',
                params: {
                  id: res.data.data.id,
                  price: self.params.num * self.params.specificationPrice,
                  no: res.data.data.no
                }
              })
            } else {
              self.$router.push({
                name: 'transfer',
                params: {
                  id: res.data.data.id,
                  price: self.params.num * self.params.specificationPrice,
                  no: res.data.data.no
                }
              })
            }
          }
        })
        /*.then(function (res) {
                      if (res.data.code == 0){
                        if (self.orderInfo.payType == "在线支付") {
                          self.axios.defaults.headers.post['token'] = self.Cookies.get("token");
                          self.axios({
                            method:"post",
                            url:self.url + "/purchaseorder/list",
                            data:{
                              pageNum:1,
                              pageSize:10
                            }
                          }).then(function (res) {
                            if (res.data.code == 0){
                              self.tableData3 = res.data.data.rows[0];
                            }
                          })
                        }
                      return res
                      }
                    })*/
      }
    },
    filters: {
      numFilter(value) {
        const frontLen = 5;
        const endLen = 4;
        const len = value.length - frontLen - endLen;
        var xing = '';
        for (var i = 0; i < len; i++) {
          xing += '*';
        }
        return value.substring(0, frontLen) + xing + value.substring(value.length - endLen);
      }
    },
    mounted() {
      this.getServes()
    }
  }
</script>

<style scoped>
  .redBorder {
    border-color: red !important;
  }

  .addressMain {
    width: 100%;
    height: auto;
  }

  .addressMain .tittle {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: left;
    font-size: 18px;
  }

  .addressMain .addressImfMain {
    width: 100%;
    height: 150px;
    border: 1px solid rgba(228, 228, 228, 1);
    padding: 15px;
    box-sizing: border-box;
    display: flex;
  }

  .addressMain .addressImfMain .addressNull, .addressDetailsMain {
    flex: 1;
    height: 120px;
    line-height: 120px;
    text-align: left;
    font-size: 20px;
    color: #1e1e1e;
  }

  .addressMain .addressImfMain .addressDetailsMain .addressDetail {
    width: auto;
    height: 40px;
    line-height: 40px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .addressMain .addressImfMain .bottomMain {
    width: auto;
    float: right;
    height: 120px;
    padding: 40px 0;
    box-sizing: border-box;
  }

  .addressMain .addressImfMain .bottomMain .bottom {
    width: 100px;
    height: 40px;
    float: right;
    background-color: rgba(245, 245, 245, 1);
    border: 1px solid rgba(228, 228, 228, 1);
    box-sizing: border-box;
    color: #aaaaaa;
    cursor: pointer;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    margin-left: 5px;
  }

  .addressMain .addressImfMain .bottomMain .bottom1 {
    width: 100px;
    height: 40px;
    float: right;
    color: #1abc9c;
    cursor: pointer;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
  }

  .addressMain .addressImfMain .bottomMain .bottom:hover {
    color: #000;
  }

  .serves-add1 {
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(89, 89, 89, 0.7);
    justify-content: center;
  }

  .serves-add1 .bottomDiv {
    width: 100%;
    height: 45px;
    margin-top: 20px;
    text-align: center;
  }

  .serves-add1 .bottomDiv span:first-child {
    width: 149px;
    height: 45px;
    border: 1px solid rgba(228, 228, 228, 1);
    background-color: rgba(245, 245, 245, 1);
    display: inline-block;
    text-align: center;
    line-height: 45px;
    box-sizing: border-box;
    cursor: pointer;
    margin-right: 10px;
    color: rgba(51, 51, 51, .8);
  }

  .serves-add1 .bottomDiv span:first-child:hover {
    color: black;
  }

  .serves-add1 .bottomDiv span:last-child {
    width: 149px;
    height: 45px;
    background-color: rgba(26, 188, 156, 1);
    text-align: center;
    line-height: 45px;
    color: white;
    display: inline-block;
    cursor: pointer;
  }

  .serves-add1 .bottomDiv span:last-child:hover {
    background-color: rgba(26, 188, 156, .8);
    text-align: center;
  }

  .serves-add1 .choiceAddre {
    width: 600px;
    height: 460px;
    position: fixed;
    left: 50%;
    top: 50%;
    margin: -230px 0 0 -300px;
    background: white;
    padding: 40px;
    padding-top: 0px;
    border-radius: 5px;
  }

  .serves-add1 .choiceAddre .tittle {
    position: relative;
    height: 50px;
    width: 100%;
    text-align: center;
    line-height: 50px;
    font-size: 24px;
    color: #333;
    margin-bottom: 0px;
    font-weight: bold;
  }

  .serves-add1 .choiceAddre .choiceAddressMain .useImfLine {
    width: 100%;
    height: 40px;
    display: flex;
    margin-top: 25px;
  }

  .serves-add1 .choiceAddre .choiceAddressMain .useImfLine .inputMain {
    height: 40px;
    flex: 1;
    border: 1px solid rgba(228, 228, 228, 1);
    box-sizing: border-box;
    position: relative;
  }

  .serves-add1 .choiceAddre .choiceAddressMain .useImfLine .inputMain:first-child {
    margin-right: 20px;
  }

  .serves-add1 .choiceAddre .choiceAddressMain .useImfLine .inputMain .tittle {
    width: 70px;
    height: 10px;
    position: absolute;
    top: -5px;
    left: 20px;
    background-color: white;
    z-index: 1;
    font-size: 12px;
    line-height: 10px;
    text-align: left;
    padding-left: 10px;
  }

  .serves-add1 .choiceAddre .choiceAddressMain .useImfLine .inputMain input {
    width: 100%;
    height: 100%;
    border: 0;
    box-sizing: border-box;
    text-indent: 10px;
    text-decoration: none;
    outline: none;
  }

  .serves-add1 .choiceAddre .choiceAddressMain {
    overflow: auto;
    width: 600px;
    height: 350px;
    margin-bottom: 0px;
  }

  .serves-add1 .choiceAddre .choiceAddressMain .addressList {
    width: 100%;
    height: 115px;
    border: 1px solid rgba(228, 228, 228, 1);
    padding: 10px 20px;
    box-sizing: border-box;
    position: relative;
    margin-bottom: 10px;
  }

  .serves-add1 .choiceAddre .choiceAddressMain .addressList .imfLine {
    width: 100%;
    height: 30px;
    text-align: left;
    line-height: 30px;
  }

  .serves-add1 .choiceAddre .choiceAddressMain .addressList .defaultAddress {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #f04844;
    font-size: 12px;
    position: absolute;
    right: 0px;
    bottom: 10px;
  }

  .serves-add1 .choiceAddre .choiceAddressMain .addressList .imfLine .name {
    color: rgb(153, 153, 153);
    font-size: 13px;
  }

  .serves-add1 .choiceAddre .choiceAddressMain .addressList .imfLine .key {
    color: rgb(102, 102, 102);
    font-size: 13px;
  }

  .orders-box {
    position: absolute;
    overflow: auto;
  }

  .orders-container {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 60px 160px;
  }

  .orders-title {
    font-size: 20px;
    font-family: MicrosoftYaHei;
    color: rgba(48, 48, 48, 1);
    line-height: 26px;
    margin-bottom: 16px;
  }

  .orders-man {
    display: flex;
    justify-content: space-between;
  }

  .man-desc {
    display: inline-flex;
    flex-direction: column;

  }

  .man-desc div {
    display: flex;
    align-items: center;
    margin-top: 24px;
  }

  .man-im {
    color: rgba(255, 101, 85, 1);
    font-size: 26px;
    margin-right: 5px;
  }

  .man-label {
    font-size: 24px;
    font-family: MicrosoftYaHei;
    color: rgba(48, 48, 48, 1);
    line-height: 31px;
  }

  .man-info {
    font-size: 24px;
    font-family: MicrosoftYaHei;
    color: rgba(48, 48, 48, 1);
    line-height: 31px;
    font-weight: 600;
  }

  .man-info3 {
    display: inline-flex;
    height: 35px;
  }

  .man-image div {
    display: flex;
    margin-top: 24px;
    margin-right: 240px;
  }

  .man-image img {
    width: 300px;
    height: 180px;
  }

  .space-line {
    display: flex;
    height: 2px;
    background: rgba(218, 218, 218, 1);
    margin-top: 60px;
  }

  .pay-title {
    font-size: 20px;
    font-family: MicrosoftYaHei;
    color: rgba(48, 48, 48, 1);
    line-height: 26px;
    margin-top: 60px;
  }

  .pay-kind {
    display: flex;
    align-items: center;
  }

  .pay-kind p {
    width: 250px;
    height: 60px;
    border-radius: 8px;
    font-size: 20px;
    font-family: MicrosoftYaHei;
    line-height: 60px;
    text-align: center;
    cursor: pointer;
    border: 1px solid rgba(131, 131, 131, 1);
    color: rgba(131, 131, 131, 1);
  }

  .pay-ace {
    border: 1px solid rgba(1, 143, 215, 1) !important;
    color: rgba(1, 143, 215, 1) !important;
  }

  .info-change {
    color: rgba(1, 143, 215, 1) !important;
    margin-left: 300px;
    cursor: pointer;
  }

  .pay-kind p:nth-child(1) {
    margin-right: 120px;
  }

  .pay-kind span {
    font-size: 16px;
    font-family: MicrosoftYaHei;
    color: rgba(131, 131, 131, 1);
    line-height: 21px;
    margin-left: 20px;
  }

  .pay-check {
    width: 24px;
    height: 24px;
    border: 1px solid rgba(151, 151, 151, 1);
  }

  .pay-cl {
    display: flex;
    align-items: center;
    font-size: 24px;
    font-family: MicrosoftYaHei;
    color: rgba(48, 48, 48, 1);
    line-height: 31px;
    margin-top: 40px;
  }

  .man-info2 {
    width: 100%;
    margin: 20px 0 0 0;
  }

  table {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(218, 218, 218, 1);
    border-bottom: none;
  }

  th {
    height: 60px;
    font-size: 20px;
    font-family: MicrosoftYaHei;
    color: rgba(48, 48, 48, 1);
    line-height: 26px;
    box-sizing: border-box;
    border-left: 1px solid rgba(218, 218, 218, 1);
    border-top: 1px solid rgba(218, 218, 218, 1);
    background: rgba(243, 243, 243, 1);
  }

  th:first-child {
    border-left: none;
  }

  td {
    height: 120px;
    font-size: 20px;
    font-family: MicrosoftYaHei;
    color: rgba(131, 131, 131, 1);
    /*line-height:26px;*/
    text-align: center;
    border-left: 1px solid rgba(218, 218, 218, 1);
    border-bottom: 1px solid rgba(218, 218, 218, 1);
  }

  td:first-child {
    border-left: none;
  }

  .pay-price {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    font-size: 24px;
    font-family: MicrosoftYaHei;
    color: rgba(48, 48, 48, 1);
    line-height: 31px;

  }

  .pay-price div {
    display: flex;
    margin-top: 24px;
    /*margin-right: 40px;*/
  }

  .pay-price div:nth-child(1) {
    margin-right: 42px;
  }

  .pay-price p {
    width: 250px;
    height: 60px;
    background: rgba(255, 101, 85, 1);
    border-radius: 8px;
    font-size: 24px;
    font-family: MicrosoftYaHei-Bold;
    color: rgba(255, 255, 255, 1);
    line-height: 60px;
    text-align: center;
    cursor: pointer;
  }

  .price1 {
    color: #FF6555;
  }

  .price2 {
    color: #FF6555;
    font-size: 36px;
  }

  .home-footer {
    width: 100%;
    height: 40px;
    background: #445057;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #889FAC;
    margin: 60px 0 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .invoice {
    position: fixed;
    display: flex;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(89, 89, 89, 0.7);
    align-items: center;
    justify-content: center;
  }

  .invoice-min {
    width: 700px;
    background: white;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }

  .invoice-btn {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }

  .invoice-btn p {
    background: #018fd7;
    font-size: 18px;
    color: white;
    width: 100px;
    height: 50px;
    border-radius: 5px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
  }

  .invoice-title {
    font-size: 24px;
    color: #303030;
    margin-top: 20px;
  }

  .invoice-btn p:nth-child(1) {
    margin-right: 100px;
  }

  .el-button--small {
    margin-bottom: 18px;
  }

  .el-upload__tip {
    margin-bottom: 28px;
  }

</style>
