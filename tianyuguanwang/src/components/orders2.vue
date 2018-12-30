<template>
  <div class="orders-box">
    <div class="orders-container">
      <!--<span class="orders-title">收货人信息<span class="info-change" @click="tabChange">修改信息</span></span>
      <div class="orders-man" v-show="isShow">
          <div class="man-desc">
              <div><span class="man-im">*</span><span class="man-label">姓&nbsp&nbsp&nbsp名&nbsp;:&nbsp;</span><span class="man-info">{{orderInfo.address.name}}</span> </div>
              <div><span class="man-im">*</span><span class="man-label">手机号&nbsp;:&nbsp;</span><span class="man-info">{{orderInfo.address.mobile}}</span> </div>
              <div><span class="man-im">*</span><span class="man-label">地&nbsp&nbsp&nbsp址&nbsp;:&nbsp;</span><span class="man-info">{{orderInfo.address.address|numFilter}}</span> </div>
          </div>
      </div>
      <div class="orders-man" v-show="!isShow">
          <div class="man-desc">
              <div><span class="man-im">*</span><span class="man-label">姓&nbsp&nbsp&nbsp名&nbsp;:&nbsp;</span><span class="man-info3"><input
                type="text" v-model="orderInfo.address.name"> </span> </div>
            <div><span class="man-im">*</span><span class="man-label">手机号&nbsp;:&nbsp;</span><span class="man-info3"><input
                type="text" v-model="orderInfo.address.mobile"></span> </div>
              <div><span class="man-im">*</span><span class="man-label">地&nbsp&nbsp&nbsp址&nbsp;:&nbsp;</span><span class="man-info3"><input
                type="text" v-model="orderInfo.address.address"></span> </div>
          </div>
      </div>-->
      <div class="addressMain">
        <div class="tittle">收货地址</div>
        <div class="addressImfMain">
          <div class="addressNull" v-show="dataAddressLists.length == 0">暂无可用的收货地址，请添加</div>
          <div class="addressDetailsMain" v-show="dataAddressLists.length != 0">
            <div class="addressDetail">收 货 人: {{orderInfo.address.name}}</div>
            <div class="addressDetail">联系方式: {{orderInfo.address.mobile}}</div>
            <div class="addressDetail">收货地址: {{orderInfo.address.address|numFilter}}</div>
          </div>
          <div class="bottomMain">
            <div class="bottom" @click="addData('add')">添加地址</div>
            <div class="bottom" @click="addressListFlag=true" v-show="dataAddressLists.length != 0">切换地址</div>
            <div class="bottom1" @click="updateData('update')" v-show="dataAddressLists.length != 0">修改地址</div>
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
      <span class="pay-title">商品</span>
      <div class="man-info2">
        <table cellspacing="0">
          <tr>
            <th>商品图</th>
            <th>商品名称</th>
            <th>商品规格</th>
            <th>单价</th>
            <th>数量</th>
            <th>合计</th>
          </tr>
          <tr>
            <td><img style="width: 160px;height: 100px" :src="params.image" alt=""></td>
            <td>{{params.name}}</td>
            <td>{{params.specificationName}}</td>
            <td>{{params.specificationPrice}}</td>
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
        <span class="invoice-title">发票内容&nbsp;:&nbsp;<input style="height: 30px;width: 300px" type="text"
                                                            v-model="orderInfo.invoice.content"></span>
        <div v-show="orderInfo.invoice.title == '单位'" class="invoice-title">
          <span class="invoice-title"><span style="color:#FF6555 ">*</span>单位名称&nbsp;:&nbsp;<input style="height: 30px"
                                                                                                   type="text"
                                                                                                   v-model="orderInfo.invoice.name"></span>
          <span class="invoice-title"><span style="color:#FF6555 ">*</span>纳税人识别号&nbsp;:&nbsp;<input
            style="height: 30px" type="text" v-model="orderInfo.invoice.number"></span>
        </div>
        <div class="invoice-btn">
          <p @click="invoiceHide">确定</p>
          <p @click="invoiceHide1">取消</p>
        </div>
      </div>
    </div>
    <div class="serves-add" v-show="addOrAddFlag"><!--新增修改收货人-->
      <div style="width: 600px;height: 300px;position: fixed;left: 50%;top: 50%;margin: -150px 0 0 -300px">
        <div>
          <label>收货人名称&nbsp;:&nbsp;</label>
          <input type="text" v-model="updateName">
        </div>
        <div>
          <label>收货人手机号&nbsp;:&nbsp;</label>
          <input type="text" v-model="updateMobile">
        </div>
        <div>
          <label>收货人地址&nbsp;:&nbsp;</label>
          <input type="text" v-model="updateAddress">
        </div>
        <div class="add-btn">
          <el-button type="primary" @click="updateDataSubmit">提交</el-button>
          <el-button type="info" @click="updateDataClose">取消</el-button>
        </div>
      </div>
    </div>

    <div class="serves-add1" v-show="addressListFlag"><!--选择地址-->
      <div class="choiceAddre">
        <div class="tittle">选择收货地址</div>
        <div class="choiceAddressMain">

          <div v-for="(l,index) in dataAddressLists" @click="choiceAddress(index)" :class=" l.borderStyleFlag ? 'redBorder addressList' : 'addressList'">
            <div class="imfLine">
              <span class="name">收 货 人 :</span>
              <span class="key">{{l.name}}</span>
            </div>
            <div class="imfLine">
              <span class="name">联系方式 :</span>
              <span class="key">{{l.mobile}}</span>
            </div>
            <div class="imfLine">
              <span class="name">收货地址 :</span>
              <span class="key">{{l.address|numFilter}}</span>
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

  </div>
</template>

<script>
  export default {
    name: "orders",
    data() {
      return {
        updateName:"",
        updateMobile:"",
        updateAddress:"",
        num: "12345678978945612",
        params: this.$route.params,
        addOrAddFlag:false,
        pay_ace1: true,
        pay_ace2: false,
        checked: false,
        headers: {
          token: this.Cookies.get("token")
        },
        upData: {
          type: 1
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
        dataAddressLists:[],
        addressListFlag:false,
        updataAddFlag:"",
        orderInfo: {
          address: {
            id: "",
            mobile: "",
            name: "",
            address: ""
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
          commodityType: "",
          commodityId: this.$route.params.commodityId,
          specificationId: this.$route.params.specificationId,
          commodityType: this.$route.params.commodityType,
          source: "pc",
          count: 1
        },
        dataList: {}
      }
    },
    created() {
      /* this.$store.state.vuexs.orderP1=this.$route.params*/
      if (this.$route.params.commodityId) {
        this.params = this.$route.params;
        this.$store.state.vuexs.orderP1 = this.$route.params
      } else {
        this.params = this.$store.state.vuexs.orderP1;
      }
    },
    methods: {
      payKindTab1() {
        const self = this;
        self.pay_ace1 = true;
        self.pay_ace2 = false;
        self.orderInfo.payType = "在线支付"
      },
      updateData(type){
        this.updataAddFlag = type;
        this.addOrAddFlag = true;
        this.updateName = this.orderInfo.address.name;
        this.updateMobile = this.orderInfo.address.mobile;
        this.updateAddress = this.orderInfo.address.address;
      },
      addData(type){
        this.updataAddFlag = type;
        this.addOrAddFlag = true;
        this.updateName = "";
        this.updateMobile = "";
        this.updateAddress = "";
      },
      addDataSubmit(){
        const self = this;
        var obj = {};
        obj["name"] = this.updateName;
        obj["mobile"] = this.updateMobile;
        obj["address"] = this.updateAddress;
        obj["default"] = false;
        self.axios.defaults.headers.post['token'] = self.Cookies.get('token');
        self.axios({
          method: 'post',
          url: self.url + '/address/add',
          data: self.qs.stringify(obj)
        }).then(function (res) {
          if (res.data.code == 0) {
            self.addOrAddFlag = false;
            self.updateName = "";
            self.updateMobile = "";
            self.updateAddress = "";
            self.getServes();
          }
        })
      },
      updateDataSubmit(){
        const self = this;
        if (this.updateName == '' || this.updateName == null || this.updateName == undefined){
          self.$message({
            showClose: true,
            message: '收货人姓名不能为空',
            type: 'error'
          });
          return;
        }
        if (this.updateMobile == '' || this.updateMobile == null || this.updateMobile == undefined){
          self.$message({
            showClose: true,
            message: '收货人手机号不能为空',
            type: 'error'
          });
          return;
        }
        if (this.updateAddress == '' || this.updateAddress == null || this.updateAddress == undefined){
          self.$message({
            showClose: true,
            message: '收货人地址不能为空',
            type: 'error'
          });
          return;
        }
        if (this.updataAddFlag == "add"){
          this.addDataSubmit();
        }
        var id = this.orderInfo.address.id;
        var obj ={};
        this.dataAddressLists.forEach((v)=>{
          if (v.id == id){
            obj = v;
          }
        });
        obj["name"] = this.updateName;
        obj["mobile"] = this.updateMobile;
        obj["address"] = this.updateAddress;
        self.axios.defaults.headers.post['token'] = self.Cookies.get('token');
        self.axios({
          method: 'post',
          url: self.url + '/address/update',
          data: self.qs.stringify(obj)
        }).then(function (res) {
          if (res.data.code == 0) {
            self.addOrAddFlag = false;
            self.updateName = "";
            self.updateMobile = "";
            self.updateAddress = "";
            self.getServes();
          } else {
            self.$message({
              showClose: true,
              message: '请更改信息',
              type: 'error'
            })
          }
        })
      },
      updateDataClose(){
        this.addOrAddFlag = false;
        this.updateName = "";
        this.updateMobile = "";
        this.updateAddress = "";
      },
      payKindTab2() {
        const self = this;
        self.pay_ace1 = false;
        self.pay_ace2 = true;
        self.orderInfo.payType = "对公转账"
      },
      choiceAddress(i){
        var list =  this.dataAddressLists;
        list.forEach(function (v,k) {
          v["borderStyleFlag"] = false;
        });
        list[i]["borderStyleFlag"] = true;
        this.dataAddressLists = list;
      },
      addressListSure(){
        let self = this;
        var falg = true;
        this.dataAddressLists.forEach((v)=>{
          if ( v["borderStyleFlag"]){
            falg = false;
            self.orderInfo.address.name = v.name;
            self.orderInfo.address.id = v.id;
            self.orderInfo.address.mobile = v.mobile;
            self.orderInfo.address.address = v.address;
            self.addressListFlag = false;
          }
          v["borderStyleFlag"] = false;
        });
        if (falg){
          self.$message({
            showClose: true,
            message: "请选择一个地址",
            type: 'error'
          });
        }
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleSuccess(response, file, fileList) {
        console.log(response);
        const self = this;
        if (response.code == 0) {
          self.orderInfo.servicepeople.idCardFrontPicFileId = response.data.url
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
        self.invoiceShow = false;
        self.checked = false;
      },
      invoiceHide1() {
        const self = this;
        self.invoiceShow = false;
        self.orderInfo.isInvoice = false;
        self.checked = false;
        self.orderInfo.invoice = {
          type: "增值税普通发票",
          title: "",
          name: "",
          content: "",
          number: ""
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
          url: self.url + "/address/list",
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
            self.dataAddressLists = data;
            console.log(self.dataList);
            if (JSON.stringify(self.dataList) == "{}") {
              self.isShow = false;
            } else {
              self.orderInfo.address.name = self.dataList.name
              self.orderInfo.address.id = self.dataList.id
              self.orderInfo.address.mobile = self.dataList.mobile
              self.orderInfo.address.address = self.dataList.address
            }
          }

        })
      },
      //提交
      submitOrder() {
        const self = this;
        console.log(self.orderInfo.address.name);
        if (!(self.orderInfo.address.name && self.orderInfo.address.mobile && self.orderInfo.address.address)) {
          self.$message({
            showClose: true,
            message: "请填写完整信息",
            type: 'error'
          });
          return
        }
        ;
        self.orderInfo.count = parseFloat(self.params.num)
        console.log(self.orderInfo);
        // self.axios.defaults.headers.post['token'] = self.token;
        self.axios.defaults.headers.post['token'] = self.Cookies.get("token");
        self.axios({
          method: "post",
          url: self.url + "/purchaseorder/addwithaddress",
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
          } else {
            self.$message({
              showClose: true,
              message: res.data.desc,
              type: 'error'
            });
          }

        })
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
  .redBorder{
     border-color: red !important;
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

  .serves-add {
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
  .serves-add1{
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

  .serves-add1 .bottomDiv{
    width: 100%;
    height: 45px;
    margin-top: 20px;
    text-align: center;
  }

  .serves-add1 .bottomDiv span:first-child{
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

  .serves-add1 .bottomDiv span:first-child:hover{
    color: black;
  }

  .serves-add1 .bottomDiv span:last-child{
    width: 149px;
    height: 45px;
    background-color: rgba(26, 188, 156, 1);
    text-align: center;
    line-height: 45px;
    color: white;
    display: inline-block;
    cursor: pointer;
  }

  .serves-add1 .bottomDiv span:last-child:hover{
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

  .serves-add1 .choiceAddre .tittle{
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

  .serves-add1 .choiceAddre  .choiceAddressMain{
    overflow: auto;
    width: 600px;
    height: 350px;
    margin-bottom: 0px;
  }

  .serves-add1 .choiceAddre  .choiceAddressMain .addressList{
    width: 100%;
    height: 115px;
    border: 1px solid rgba(228, 228, 228, 1);
    padding: 10px 20px;
    box-sizing: border-box;
    position: relative;
    margin-bottom: 10px;
  }

  .serves-add1 .choiceAddre  .choiceAddressMain .addressList .imfLine{
    width: 100%;
    height: 30px;
    text-align: left;
    line-height: 30px;
  }

  .serves-add1 .choiceAddre  .choiceAddressMain .addressList .defaultAddress{
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

  .serves-add1 .choiceAddre  .choiceAddressMain .addressList .imfLine .name{
    color: rgb(153, 153, 153);
    font-size: 13px;
  }

  .serves-add1 .choiceAddre  .choiceAddressMain .addressList .imfLine .key{
    color: rgb(102, 102, 102);
    font-size: 13px;
  }

  .add-btn .el-button:nth-child(1) {
    margin-right: 100px;
    margin-left: 200px;
  }

  label {
    width: 200px;
    font-size: 24px;
    line-height: 45px;
  }

  .serves-add div {
    /*display: flex;*/
    background: white;
    padding: 40px;
    border-radius: 5px;
    /*flex-direction: column;*/
  }

  .serves-add div div {
    display: flex;
    padding: 0;
  }

  .serves-add div div input {
    width: 400px;
    height: 45px;
    box-sizing: border-box;
    padding-left: 20px;
  }

  .serves-add div div {
    margin-bottom: 30px;
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
</style>
