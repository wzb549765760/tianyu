<template>
  <div style="position: absolute;overflow: auto">
    <div class="file-box">
      <div class="file-title">我的档案</div>
      <!--切换组件-->
      <div class="file-tab">
        <span class="file-tabBtn" :class="{'isActive':isActive}" @click="getTab2">基本信息</span><span class="file-tabBtn"
                                                                                                   :class="{'isActive':isActive2}"
                                                                                                   @click="getTab">健康档案</span>
      </div>
      <div class="jbxx" v-show="show">
        <!--title-->
        <span class="file-info">个人信息</span>
        <!--desc-->
        <div class="info-box info-t1">
          <span class="info-label">姓名：</span>
          <input type="text" class="info-text" v-model="myInfo.name">
          <!---->
          <span class="info-label">性别：</span>
          <el-radio-group v-model="myInfo.sex">
            <el-radio  :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>

          <!---->
          <span class="info-label">民族：</span>
          <input type="text" class="info-text2" v-model="myInfo.nationality">
        </div>
        <!--desc2-->
        <div class="info-box info-t1">
          <span class="info-label">年龄：</span>
          <input type="text" class="info-text" v-model="myInfo.age">
          <!---->
          <span class="info-label">生日：</span>
          <el-date-picker
            v-model="myInfo.birthday"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <!--desc2-->
        <div class="info-box info-t1">
          <span class="info-label">现居地：</span>
          <el-cascader
            :options="options"
            v-model="selectedOptions"
            :change-on-select="true"
            @change="handleChange"
            v-if="!AdressShow">
          </el-cascader>
          <input type="text" class="info-text" v-model="myInfo.lifeAddress.replace(/&/g,'/')" v-if="AdressShow" @click="showEdit">
        </div>
        <!--desc3-->
        <div class="info-box info-t1">
          <span class="info-label">户籍地：</span>
          <el-cascader
            :options="options2"
            v-model="selectedOptions2"
            :change-on-select="true"
            @change="handleChange2"
            v-if="!AdressShow1">
          </el-cascader>
          <input type="text" class="info-text" v-model="myInfo.birthAddress.replace(/&/g,'/')" v-if="AdressShow1" @click="showEdit1">
        </div>
        <!--desc4-->
        <div class="info-box info-t1">
          <span class="info-label">身份证号：</span>
          <input type="text" class="info-text2" v-model="myInfo.idCardNumber">
        </div>
        <!--desc4-->
        <div class="info-box info-t1">
          <span class="info-label">身份证正面：</span>
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
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <img :src="myInfo.idCardUrl+'&token='+headers.token" alt="" style="width: 100px;height: 100px">
        </div>

        <!---->
        <span class="file-info">紧急联系人信息</span>
        <div class="info-box info-t1">
          <span class="info-label3">第一联系人姓名：</span>
          <input type="text" class="info-text2" v-model="myInfo.emergencyContact1">
          <span class="info-label3">联系方式：</span>
          <input type="text" class="info-text2" v-model="myInfo.emergencyMobile1">
        </div>
        <div class="info-box info-t1">
          <span class="info-label3">第二联系人姓名：</span>
          <input type="text" class="info-text2" v-model="myInfo.emergencyContact2">
          <span class="info-label3">联系方式：</span>
          <input type="text" class="info-text2" v-model="myInfo.emergencyMobile2">
        </div>
        <!---->
        <span class="file-info">病史</span>
        <div class="info-box info-t1">
          <span class="info-label3">药物及过敏史：</span>
          <input type="text" class="info-text2" v-model="myInfo.allergyDiseaseHistory">
          <span class="info-label3">遗传病史：</span>
          <input type="text" class="info-text2" v-model="myInfo.geneticDiseaseHistory">
        </div>
        <div class="info-box info-t1">
          <span class="info-label3">手术史：</span>
          <input type="text" class="info-text2" v-model="myInfo.surgeryDiseaseHistory">
        </div>
        <!---->
        <div class="submit-box" @click="submitInfo">
          保存
        </div>
      </div>
      <div class="jkda" v-show="!show">
        <div>
          <el-select v-model="typeOption" placeholder="请选择" @change="changeOption(typeOption)">
            <el-option
              v-for="item in options3"
              :key="item.value"
              :change-on-select="true"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="man-info">
          <table cellspacing="0">
            <tr>
              <th>档案名</th>
              <th>操作</th>
            </tr>
            <tr v-for="site in fileList2">
              <td>{{site.name}}</td>
              <td>
                <el-button type="primary" @click="downLoad(site.url)">下载</el-button>
              </td>
            </tr>
          </table>
        </div>

        <div class="" style="text-align: center;margin-top: 30px">
          <el-pagination
            background
            layout="total,prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import city from "../../static/city"

  export default {
    name: "myfile",
    data() {
      return {
        isActive: true,
        isActive2: false,
        show: true,
        options: CityInfo,
        options2: CityInfo,
        selectedOptions: [],
        selectedOptions2: [],
        fileList: [],
        AdressShow:false,
        AdressShow1:false,
        upData: {
          type: 2
        },
        url: this.$store.state.vuexs.url,
        headers: {
          token: this.Cookies.get("token")
        },
        radio: '1',
        age: "",
        myInfo: {
          mobile: this.Cookies.get("username"),
          password: this.Cookies.get("pwd"),
          type: 1,
          name: "",
          sex: "",
          age: "",
          birthday: "",
          nationality: "",
          idCardNumber: "",
          idCardUrl: "",
          birthuser: "",
          lifeuser: "",
          status: "1",
          emergencyContact1: "",
          emergencyMobile1: "",
          emergencyContact2: "",
          emergencyMobile2: "",
          allergyDiseaseHistory: "",
          geneticDiseaseHistroy: "",
          surgeryDiseaseHistory: "",
        },
        total: 1,
        pageNum: 1,
        fileList2: [],
        typeOption: "",
        options3: [
          {
            value: "",
            label: '全部'
          },
          {
            value: 1,
            label: '病例'
          },
          {
            value: 2,
            label: '体检报告'
          },
          {
            value: 3,
            label: '健康报告'
          },
          {
            value: 5,
            label: '家属档案'
          },
        ]
      }
    },
    methods: {
      getTab() {
        const self = this;
        self.isActive = false;
        self.isActive2 = true;
        self.show = false;
        const data = {
          pageSize: 15,
          pageNum: self.pageNum,
          type: self.typeOption,
          serviceOrderId: ""
        }
        self.axios.defaults.headers.post['token'] = self.Cookies.get("token");
        self.axios({
          method: "post",
          url: self.url + "/archive/list",
          data: self.qs.stringify(data)
        }).then(function (res) {
          console.log(res);
          if (res.data.code == 0) {
            self.fileList2 = res.data.data.rows;
            /*self.fileList2 = self.fileList*/
          }
        })
      },
      getUrl(){
        return this.url+"/file/upload";
      },
      showEdit(){
        this.AdressShow=false;
      },
      showEdit1(){
        this.AdressShow1=false;
      },
      getTab2() {
        this.fileList2=[];
        const self = this;
        self.isActive = true;
        self.isActive2 = false;
        self.show = true;
      },
      handleChange(value) {
        console.log(value);
      },
      handleChange2(value) {
        console.log(value);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleSuccess(response, file, fileList) {
        console.log(response);
        const self = this;
        if (response.code == 0) {
          self.myInfo.idCardUrl = response.data.url
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
      getMyInfo() {
        const self = this;
        self.axios.defaults.headers.post['token'] = self.Cookies.get("token");
        self.axios({
          method: "post",
          url: self.url + "/user/detail",
        }).then(function (res) {
          console.log(res);
          if (res.data.code == 0) {
            console.log(res.data);
            self.myInfo.nickName=res.data.data.nickName;
            self.myInfo.name=res.data.data.name;
            self.myInfo.age=res.data.data.age;
            self.myInfo.sex=res.data.data.sex;
            self.myInfo.nationality=res.data.data.nationality;
            self.myInfo.birthday=res.data.data.birthday;
            self.myInfo.idCardNumber=res.data.data.idCardNumber;
            self.myInfo.idCardUrl=res.data.data.idCardUrl;
            self.myInfo.lifeAddress=res.data.data.lifeAddress;
            self.myInfo.lifeAddress=res.data.data.lifeAddress.replace(/\/undefined/g,"");
            self.myInfo.birthAddress=res.data.data.birthAddress;
            self.myInfo.birthAddress=res.data.data.birthAddress.replace(/\/undefined/g,"");
            self.myInfo.emergencyContact1=res.data.data.emergencyContact1;
            self.myInfo.emergencyMobile1=res.data.data.emergencyMobile1;
            self.myInfo.emergencyContact2=res.data.data.emergencyContact2;
            self.myInfo.emergencyMobile2=res.data.data.emergencyMobile2;
            self.myInfo.emergencyMobile2=res.data.data.emergencyMobile2;
            self.myInfo.allergyDiseaseHistory=res.data.data.allergyDiseaseHistory;
            self.myInfo.geneticDiseaseHistory=res.data.data.geneticDiseaseHistory;
            self.myInfo.surgeryDiseaseHistory=res.data.data.surgeryDiseaseHistory;
            self.AdressShow=true;
            self.AdressShow1=true;
            console.log(self.myInfo);
          }
        })
      },
      submitInfo() {
        const self = this;
        /*self.myInfo.age = self.age;
        self.myInfo.sex = self.radio;*/
        console.log(self.myInfo.birthAddress);
        console.log(self.myInfo.lifeAddress);
        if(!self.AdressShow){
          self.myInfo.lifeAddress= self.selectedOptions.join("&");
        }else{
          self.myInfo.lifeAddress=self.myInfo.lifeAddress.replace("/","&")
        }
        if(!self.AdressShow1){
          self.myInfo.birthAddress  = self.selectedOptions2.join("&");
        }else{
          self.myInfo.birthAddress=self.myInfo.birthAddress.replace("/","&")
        }
        self.axios.defaults.headers.post['token'] = self.Cookies.get("token");
        self.axios({
          method: "post",
          url: self.url + "/user/update",
          data: self.qs.stringify(self.myInfo)
        }).then(function (res) {
          console.log(res);
          if (res.data.code == 0) {
            self.$message({
              message: res.data.desc,
              type: 'success'
            });
          } else {
            self.$message({
              message: res.data.desc,
              type: 'error'
            });
          }
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageNum = val;
      },
      downLoad(url) {
        window.open(url + "&token=" + this.Cookies.get("token"),"_self",'top=300,left=300,width=500,height=400');
      },
      changeOption(type) {
        this.getTab()
        const arr = [];
        const self = this;
        if (type == 5) {
          self.fileList2 = self.fileList;
        } else {
          self.fileList.forEach((value) => {
            if (value.type == type) {
              arr.push(value)
            }
          })
          self.fileList2 = arr
        }

      }
    },
    mounted() {
      console.log(this.myInfo);
    },
    created(){
      const self=this;
      self.$nextTick(()=>{
        self.getMyInfo();
      });
    }
  }
</script>

<style scoped>
  input {
    padding-left: 20px;
    box-sizing: border-box;
  }

  .file-box {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0 60px;
    position: absolute;
    /*height: 1000px;*/
    overflow: auto;
    width: 100%;
  }

  .file-title {
    font-size: 20px;
    font-family: MicrosoftYaHei;
    color: rgba(131, 131, 131, 1);
    line-height: 26px;
    margin: 40px 0 0 0;
  }

  .file-tabBtn {
    font-size: 20px;
    display: inline-flex;
    font-family: MicrosoftYaHei;
    color: rgba(48, 48, 48, 1);
    line-height: 26px;
    margin: 40px 60px 0 0;
    cursor: pointer;
  }

  .file-info {
    font-size: 24px;
    font-family: MicrosoftYaHei;
    color: rgba(48, 48, 48, 1);
    line-height: 31px;
    margin: 40px 0 0 0;
  }

  .info-box {
    display: flex;
    align-items: center;
  }

  .info-label {
    width: 120px;
    display: inline-flex;
    justify-content: flex-end;
    font-size: 20px;
    font-family: MicrosoftYaHei;
    color: rgba(131, 131, 131, 1);
    line-height: 26px;
  }

  .info-text {
    width: 200px;
    height: 40px;
    margin-right: 40px;
    border: 1px solid rgba(218, 218, 218, 1);
  }

  .radio-1 {
    font-size: 20px;
    font-family: MicrosoftYaHei;
    color: rgba(131, 131, 131, 1);
    line-height: 26px;
  }

  .radio-1 {
    margin-right: 40px;
  }

  .info-text2 {
    width: 100px;
    height: 25px;
    border: 1px solid rgba(218, 218, 218, 1);
  }

  .info-t1 {
    margin: 30px 0 0 0;
  }

  .info-text2 {
    width: 300px;
    height: 40px;
    /*margin: 0 150px 0 0;*/
  }

  .info-label2 {
    width: 140px;
    display: inline-flex;
    justify-content: flex-end;
    font-size: 20px;
    font-family: MicrosoftYaHei;
    color: rgba(131, 131, 131, 1);
    line-height: 26px;
  }

  .info-label3 {
    width: 160px;
    display: inline-flex;
    justify-content: flex-end;
    font-size: 20px;
    font-family: MicrosoftYaHei;
    color: rgba(131, 131, 131, 1);
    line-height: 26px;
  }

  .submit-box {
    width: 200px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30px 400px;
    background: rgba(1, 143, 215, 1);
    border-radius: 8px;
    font-size: 24px;
    font-family: MicrosoftYaHei-Bold;
    color: rgba(255, 255, 255, 1);
    line-height: 37px;
    cursor: pointer;
  }

  .isActive {
    font-size: 20px;
    font-family: MicrosoftYaHei;
    color: rgba(1, 143, 215, 1);
    line-height: 26px;
  }

  .jbxx {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .jkda {
    margin: 40px 0 0 0;
  }

  .fli-title span {
    font-size: 24px;
    font-family: MicrosoftYaHei;
    color: rgba(48, 48, 48, 1);
    line-height: 31px;
    margin: 0 80px 0 0;
  }

  .fli-box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .fli-boxMin {
    display: flex;
    flex-direction: column;
    margin: 40px 80px 0 0;
  }

  .fli-img {
    width: 200px;
    height: 260px;
    background: rgba(216, 216, 216, 1);
  }

  .fli-boxMin span {
    font-size: 20px;
    font-family: MicrosoftYaHei;
    color: rgba(48, 48, 48, 1);
    line-height: 26px;
    text-align: center;
    margin: 18px 0 0 0;
  }

  .man-info {
    width: 100%;
    margin: 20px 0 0 0;
  }

  table {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(218, 218, 218, 1);
    border-bottom: none;
    margin: 30px 0 0 0;
  }

  th {
    height: 60px;
    font-size: 20px;
    font-family: MicrosoftYaHei;
    color: rgba(48, 48, 48, 1);
    line-height: 26px;
    box-sizing: border-box;
    border-left: 1px solid rgba(218, 218, 218, 1);
    background: rgba(243, 243, 243, 1);
  }

  th:first-child {
    border-left: none;
  }

  td {
    padding: 10px 0;
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
</style>
