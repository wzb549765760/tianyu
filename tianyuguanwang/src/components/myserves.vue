<template>
    <div class="server-box">
        <div class="title">我的服务订单</div>
      <!---->
      <div class="dd-content" v-for="site in servesList">
        <div class="dd-number">服务订单编号 : <span>{{site.info.no}}</span></div>
        <span class="dd-info">订单信息</span>
        <!--订单详细信息-->
        <div class="dd-decB">
          <table cellspacing="0">
              <tr>
                <th>服务订单编号</th>
                <th>订单生成时间</th>
                <th>商品名称</th>
                <th>商品规格</th>
                <th>商品图片</th>
              </tr>
              <tr>
                <td class="dd-infoTr">{{site.info.no}}</td>
                <td class="dd-infoTr">{{site.info.createDate}}</td>
                <td class="dd-infoTr">{{site.info.commodityName}}</td>
                <td class="dd-infoTr">{{site.info.specificationName}}</td>
                <td class="dd-infoTr"><img :src="site.info.majorPath" alt=""></td>
              </tr>
          </table>
        </div>
        <!--服务信息-->
        <div class="fu-info">服务信息<span class="fu-infoMin">服务使用须知：体检需提前一周预约，其它健康服务项目需提前2-3个工作日预约</span></div>
        <div class="fu-dec">
            <table cellspacing="0">
              <tr>
                <th>服务项</th>
                <th>总次数</th>
                <th>可用次数</th>
                <th>服务详情</th>
                <th>操作</th>
              </tr>
              <tr v-for="site2 in site.serviceInfos">
                <td>{{site2.productName}}</td>
                <td>{{site2.total}}</td>
                <td>{{site2.count}}</td>
                <td>{{site2.productDetail}}</td>
                <td>
                  <el-button type="primary" @click="reservation(site2)">预约</el-button>
                </td>
              </tr>
            </table>
        </div>
      </div>
      <div class="serves-add" v-show="isShow">
        <div>
          <div v-show="showData.consultationType=='需要'">
            <label>咨询类别&nbsp;:&nbsp;</label>
            <el-select v-model="serviceData.consultationType" filterable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div v-show="showData.needTimeOfAppointment">
            <label>预约时间&nbsp;:&nbsp;</label>
            <el-date-picker
              v-model="serviceData.appointDate"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm"
              format="yyyy-MM-dd HH:mm"
              :picker-options="pickerOptions0"
              :focus="pickerOptions0.disabledDate"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
          <div v-show="showData.usedByFamily">
            <label>就诊人员&nbsp;:&nbsp;</label>
            <el-select v-model="serviceData.isSelf" filterable placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div v-show="showData.needCaseAppendage">
            <label>既往病例&nbsp;:&nbsp;</label>
            <el-upload
              class="upload-demo"
              :action="getUrl"
              :headers="headers"
              :data="upData"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :before-remove="beforeRemove"
              multiple
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip"></div>
            </el-upload>
          </div>
          <div v-show="showData.needConditionComplaint">
            <label>病情主诉&nbsp;:&nbsp;</label>
            <el-input
              placeholder="请输入内容"
              v-model="serviceData.conditionComplaint"
              clearable>
            </el-input>
          </div>
          <div class="add-btn">
            <el-button type="primary" @click="resSubmit">预约</el-button>
            <el-button type="info" @click="removeObj(serviceData)">取消</el-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "myserves",
        data(){
          return {
            pickerOptions0: {
              disabledDate(time) {

              }
            },
            tt:2,
            servesList:[],
            serviceInfos:[],
            token:"",
            num:0,
            url:this.$store.state.vuexs.url,
            upData:{
              type:1
            },
            headers:{
              token:this.Cookies.get("token")
            },
            options:[{
              value: "线下",
              label: '线下'
              },
              {
                value:"线上(APP)",
                label:"线上(APP)"
              }
            ],
            options2:[{
              value: true,
              label: '本人'
            },
              {
                value:false,
                label:"家属"
              }
            ],
            fileList:[],
            isShow:false,
            showData:{

            },
            serviceData:{
              serviceInfoId:"",
              productId:"",
              isSelf:true,
              consultationType:"线下",
              conditionComplaint:"",
              caseAppendagePath:"",
              appointDate:""
            }
          }
        },
        methods:{
          getToken(){
            const self = this;
            self.token =  self.Cookies.get("token")
          },
          getTab(){
            this.isShow = !this.isShow
          },
          getServers(){
            const self = this;
            self.token=self.Cookies.get("token");
            // self.axios.defaults.headers.post['token'] = self.token;
            self.axios.defaults.headers.post['token'] = self.token;
            self.axios({
              method:"post",
              url:self.url + "/serviceorder/personallist"
            }).then(function (res) {
              console.log(res);
              if (res.data.code == 0){
                self.servesList = res.data.data.rows;
              }
            })
          },
          reservation(site2){
            console.log(site2);
            const self = this;
            self.fileList=[];
            self.serviceData={}
            self.token=self.Cookies.get("token");
            self.serviceData.serviceInfoId = site2.id;
            self.serviceData.productId = site2.productId;
            self.axios.defaults.headers.get['token'] =self.token;
            self.axios({
              method:"get",
              url:self.url + "/product/edit?id="+ site2.productId,
            }).then(function (res) {
              console.log(res,site2.productId);
              if (res.data.code == 0){
                self.showData = res.data.data;
                console.log(self.showData.preDayOfAppointment);
                self.pickerOptions0.disabledDate =  function(time) {
                  return time.getTime() < Date.now()+ 3600 * 1000 * 24 * self.showData.preDayOfAppointment - 8.64e7;
                },
                self.getTab()
              }
            })
          },
          resSubmit(){
            const self  = this;
            self.token=self.Cookies.get("token");
            console.log(self.serviceData);
            console.log(self.token);
            self.axios.defaults.headers.post['token'] =self.token;
            self.axios({
              method:"post",
              url:self.url + "/appointservice/personalappoint",
              data:self.serviceData
            }).then(function (res) {
              console.log(res);
              if (res.data.code == 0){
                self.$message({
                  message: res.data.desc,
                  type: 'success'
                });
              }else {
                self.$message({
                  message: res.data.desc,
                  type: 'error'
                });
              }
              self.getTab();
            })

          },
          handleRemove(file, fileList) {
            console.log(file, fileList);
          },
          handleSuccess(response, file, fileList){
            console.log(response);
            const self = this;
            if (response.code == 0){
              self.serviceData.caseAppendagePath = response.data.url
            }
          },
          getUrl(){
            return this.url+"/file/upload";
          },
          handlePreview(file) {
            console.log(file);
          },
          handleExceed(files, fileList) {
            fileList = [];
            /*this.$message.warning(`当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);*/
          },
          beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
          },
          removeObj(obj){
            Object.keys(obj).forEach(function(key){
              console.log(key,obj[key]);
              obj[key] = ""
            });
            console.log(this.serviceData);
            this.getTab();
          }

        },
      created(){
          this.getToken();
          this.getServers();
      }
    }
</script>

<style scoped>
  .server-box{
    /*width: 100%;*/
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0 0 0 60px;
    /*position: absolute;*/
    overflow: auto;
  }
  .title{
    width:100%;
    font-size:20px;
    /*font-family:MicrosoftYaHei;*/
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    color:rgba(131,131,131,1);
    line-height:26px;
    letter-spacing: 1px;
    margin: 60px 0 0 ;
  }
  .dd-content{
    width: 79%;
    /*display: flex;*/
    flex-direction: column;
    padding-bottom: 40px;
    border-bottom: 1px solid rgba(131,131,131,1);
  }
  .dd-number{
    width: 100%;
    height: 60px;
    background:rgba(243,243,243,1);
    margin: 40px 0 40px 0;
    padding: 0 0 0 60px;
    box-sizing: border-box;
    font-size:20px;
    font-family:MicrosoftYaHei;
    color:#303030;
    line-height:26px;
    line-height: 60px;
  }
  .dd-number span{
    color: #838383;
  }
  .dd-info{
    font-family:MicrosoftYaHei;
    color:rgba(48,48,48,1);
    line-height:31px;
    font-size:24px;
    margin: 40px 0 0 0;
  }
  .dd-decB{
    width: 100%;
    margin: 20px 0 0 0;
  }
  .dd-decB tr img{
    width: 100px;
  }
  table{
    width: 100%;
    box-sizing: border-box;
    border:1px solid rgba(218,218,218,1);
    border-bottom:none;
  }
  th{
    width: 20%;
    height: 60px;
    font-size:20px;
    font-family:MicrosoftYaHei;
    color:rgba(48,48,48,1);
    line-height:26px;
    box-sizing: border-box;
    border-left:1px solid rgba(218,218,218,1);
    background:rgba(243,243,243,1);
  }
  th:first-child{
    border-left: none;
  }
  .dd-infoTr{
    height: 140px;
    font-size:20px;
    font-family:MicrosoftYaHei;
    color:rgba(131,131,131,1);
    line-height:26px;
    border-left:1px solid rgba(218,218,218,1);
    text-align: center;
    box-sizing: border-box;
  }
  .dd-infoTr:nth-child(4) img{
    width: 100px;
    height: 100px;
  }
  .dd-infoTr:first-child{
    border-left: none;
  }
  .fu-info{
    font-size:24px;
    font-family:MicrosoftYaHei;
    color:rgba(48,48,48,1);
    line-height:31px;
    margin: 40px 0 0 0;
  }
  .fu-infoMin{
    font-size:20px;
    font-family:MicrosoftYaHei;
    color:rgba(131,131,131,1);
    line-height:20px;
    margin: 0 0 0 60px;
  }
  .fu-dec{
    margin: 20px 0 0 0;
  }
  td{
    height: 60px;
    font-size:20px;
    font-family:MicrosoftYaHei;
    color:rgba(131,131,131,1);
    /*line-height:26px;*/
    text-align: center;
    border-left:1px solid rgba(218,218,218,1);
    border-bottom:1px solid rgba(218,218,218,1);
  }
  td:first-child{
    border-left: none;
  }
  .serves-add{
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 80px;
    bottom: 0;
    left: 200px;
    right: 0;
    background: rgba(89,89,89,0.7);
    justify-content: center;
  }
  label{
    width: 200px;
    font-size: 24px;
    line-height: 45px;
  }
  .serves-add div{
    /*display: flex;*/
    background: white;
    padding: 40px;
    border-radius: 5px;
    /*flex-direction: column;*/
  }
  .serves-add div div{
    display: flex;
    padding: 0;
  }
  .serves-add div div input{
    width: 400px;
    height: 45px;
    box-sizing: border-box;
    padding-left: 20px;
  }
  .serves-add div div{
    margin-bottom: 15px;
  }
  .add-btn{
    display: flex;
    justify-content: center;
  }
  .add-btn .el-button:nth-child(1){
    margin-right: 100px;
  }
  .el-radio__label{

  }
  .image-btn{
    cursor: pointer;
  }
</style>
