<template>
  <el-container>
    <el-header>
      <span class="man-title">服务（收货）人信息</span>
      <!--信息tab切换-->
      <div class="info-tab">
        <span :class="{'isActive':isActive}" @click="getTab('first')">服务人信息</span>
        <span :class="{'isActive':isActive2}" @click="getTab('none')">收货人信息</span>
      </div>
    </el-header>
    <el-main>
      <div class="man-info" v-show="isShow">
        <el-button type="primary" @click="addTab">新增服务人</el-button>
        <table cellspacing="0">
          <tr>
            <th>姓名</th>
            <th>手机号码</th>
            <th>性别</th>
            <th>年龄</th>
            <th>身份证号</th>
            <th>身份证正面</th>
            <th>设为默认</th>
            <th>操作</th>
          </tr>
          <tr v-for="site in serves">
            <td>{{site.name}}</td>
            <td>{{site.mobile}}</td>
            <td>{{site.sex>1? '女':'男'}}</td>
            <td>{{site.age}}</td>
            <td>{{site.idCardNum}}</td>
            <td>
              <img :src="site.idCardUrl +'&token='+ headers.token" alt="" style="width: 120px;height: 80px">
            </td>
            <td>
              <img class="image-btn" src="../../static/images/20180516162000.png" v-show="site.default" alt=""
                   @click="addMo(site)">
              <img class="image-btn" src="../../static/images/20180516161301.png" v-show="!site.default" alt=""
                   @click="addMo(site)">
            </td>
            <td>
              <el-button type="primary" @click="editTab(site)">编辑</el-button>
              <el-button type="danger" @click="servesDelete(site)">删除</el-button>
            </td>
          </tr>
        </table>
      </div>
      <div class="man-info" v-show="isShow2">
        <el-button type="primary" @click="addTab2">新增收货人</el-button>
        <table cellspacing="0">
          <tr>
            <th>姓名</th>
            <th>手机号码</th>
            <th>详细地址</th>
            <th>设为默认</th>
            <th>操作</th>
          </tr>
          <tr v-for="site in address">
            <td>{{site.name}}</td>
            <td>{{site.mobile}}</td>
            <td>{{site.address}}</td>
            <td>
              <img class="image-btn" src="../../static/images/20180516162000.png" v-show="site.default"
                   @click="addMo2(site)" alt="">
              <img class="image-btn" src="../../static/images/20180516161301.png" v-show="!site.default"
                   @click="addMo2(site)" alt=""></td>
            <td>
              <el-button type="primary" @click="editTab2(site)">编辑</el-button>
              <el-button type="danger" @click="productDelete(site)">删除</el-button>
            </td>
          </tr>
        </table>
      </div>
      <div class="serves-add" v-show="addShow">
        <div style="height: 70%;overflow-y: auto;box-sizing: border-box">
          <div>
            <label>服务人姓名&nbsp;:&nbsp;</label>
            <input type="text" v-model="servesAdd.name">
          </div>
          <div>
            <label>服务人性别&nbsp;:&nbsp;</label>
            <el-radio v-model="radio" label="1"><span style="font-size: 21px !important;">男</span></el-radio>
            <el-radio v-model="radio" label="2"><span style="font-size: 21px !important;">女</span></el-radio>
          </div>
          <div>
            <label>服务人手机号&nbsp;:&nbsp;</label>
            <input type="text" v-model="servesAdd.mobile">
          </div>
          <div>
            <label>服务人年龄&nbsp;:&nbsp;</label>
            <input type="text" v-model="servesAdd.age">
          </div>
          <div>
            <label>身份证号码&nbsp;:&nbsp;</label>
            <input type="text" v-model="servesAdd.idCardNum">
          </div>
          <div>
            <label>身份证正面照&nbsp;:&nbsp;</label>
            <el-upload
              class="upload-demo"
              :action="getUrl"
              :headers="headers"
              :data="upData"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :before-remove="beforeRemove"
              :before-upload="beforeAvatarUpload"
              multiple
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
          <div class="add-btn">
            <el-button type="primary" @click="addSubmit">提交</el-button>
            <el-button type="info" @click="addTab">取消</el-button>
          </div>
        </div>
      </div>
      <div class="serves-add" v-show="editShow">
        <div  style="height: 70%;overflow-y: auto;box-sizing: border-box">
          <div>
            <label>服务人名称&nbsp;:&nbsp;</label>
            <input type="text" v-model="servesEdit.name">
          </div>
          <div>
            <label>服务人性别&nbsp;:&nbsp;</label>
            <el-radio v-model="radio2" label="1"><span style="font-size: 21px !important;">男</span></el-radio>
            <el-radio v-model="radio2" label="2"><span style="font-size: 21px !important;">女</span></el-radio>
          </div>
          <div>
            <label>服务人手机号&nbsp;:&nbsp;</label>
            <input type="text" v-model="servesEdit.mobile">
          </div>
          <div>
            <label>服务人年龄&nbsp;:&nbsp;</label>
            <input type="text" v-model="servesEdit.age">
          </div>
          <div>
            <label>身份证号码&nbsp;:&nbsp;</label>
            <input type="text" v-model="servesEdit.idCardNum">
          </div>
          <div>
            <label>身份证正面照&nbsp;:&nbsp;</label>
            <el-upload
              class="upload-demo"
              :action="getUrl"
              :headers="headers"
              :data="upData"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess2"
              :before-remove="beforeRemove"
              multiple
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList2">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
          <div class="add-btn">
            <el-button type="primary" @click="editSubmit">提交</el-button>
            <el-button type="info" @click="editTab">取消</el-button>
          </div>
        </div>
      </div>
      <div class="serves-add" v-show="addShow2">
        <div style="height: 70%;overflow-y: auto;box-sizing: border-box">
          <div>
            <label>收货人姓名&nbsp;:&nbsp;</label>
            <input type="text" v-model="productAdd.name">
          </div>
          <div>
            <label>收货人电话&nbsp;:&nbsp;</label>
            <input type="text" v-model="productAdd.mobile">
          </div>
          <div>
            <label>收货地址&nbsp;:&nbsp;</label>
            <input type="text" v-model="productAdd.address">
          </div>
          <div class="add-btn">
            <el-button type="primary" @click="addSubmit2">提交</el-button>
            <el-button type="info" @click="addTab2">取消</el-button>
          </div>
        </div>
      </div>
      <div class="serves-add" v-show="editShow2">
        <div style="height: 70%;overflow-y: auto;box-sizing: border-box">
          <div>
            <label>收货人名称&nbsp;:&nbsp;</label>
            <input type="text" v-model="productEdit.name">
          </div>
          <div>
            <label>收货人手机号&nbsp;:&nbsp;</label>
            <input type="text" v-model="productEdit.mobile">
          </div>
          <div>
            <label>收货人地址&nbsp;:&nbsp;</label>
            <input type="text" v-model="productEdit.address">
          </div>
          <div class="add-btn">
            <el-button type="primary" @click="editSubmit2">提交</el-button>
            <el-button type="info" @click="editTab3">取消</el-button>
          </div>
        </div>
      </div>

    </el-main>
    <el-footer v-show="isShow">
      <el-pagination
        background
        layout="total,prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="total1">
      </el-pagination>
    </el-footer>
    <el-footer v-show="isShow2">
      <el-pagination
        background
        layout="total,prev, pager, next"
        @size-change="handleSizeChange2"
        @current-change="handleCurrentChange2"
        :total="total2">
      </el-pagination>
    </el-footer>
  </el-container>

</template>

<script>
  export default {
    name: "servesMan",
    data() {
      return {
        isActive: true,
        isActive2: false,
        isShow: true,
        isShow2: false,
        url: this.$store.state.vuexs.url,
        currentPage: 1,
        currentPage1: 1,
        currentSize: 10,
        total1: 0,
        total2: 0,
        serves: [],
        address: [],
        headers: {
          token: this.Cookies.get("token")
        },
        upData: {
          type: '2'
        },
        addShow: false,
        addShow2: false,
        editShow: false,
        editShow2: false,
        radio: "1",
        radio2: "1",
        fileList: [],
        fileList2: [],
        servesAdd: {
          name: "",
          mobile: "",
          sex: 1,
          age: '',
          default: false,
          idCardNum: "",
          idCardUrl: "",
        },
        servesEdit: {
          name: "",
          mobile: "",
          sex: 1,
          age: 0,
          default: false,
          idCardNum: "",
          idCardUrl: "",
        },
        productAdd: {
          name: "",
          mobile: "",
          address: "",
          default: false
        },
        productEdit: {
          name: "",
          mobile: "",
          address: "",
          default: false
        }
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'||file.type ==='image/png'||file.type ==='image/jpg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG/JPEG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getServes()
      },
      handleSizeChange2(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange2(val) {
        console.log(`当前页: ${val}`);
        this.currentPage1 = val;
        this.getAddress();
      },
      //文件
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleSuccess(response, file, fileList) {
        const self = this;
        if (response.code == 0) {
          self.servesAdd.idCardUrl = response.data.url
        }
      },
      getUrl(){
        return this.url+"/file/upload";
      },
      handleSuccess2(response, file, fileList) {
        const self = this;
        console.log(response);
        if (response.code == 0) {
          self.servesEdit.idCardUrl = response.data.url
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
      getTab(tab) {
        const self = this;
        if (tab == "first") {
          self.isActive = true;
          self.isActive2 = false;
          self.isShow = true;
          self.isShow2 = false;
          self.getServes();
        } else {
          self.isActive = false;
          self.isActive2 = true;
          self.isShow = false;
          self.isShow2 = true;
          self.getAddress();
        }
      },
      getServes() {
        const self = this;
        const data = {
          pageNum: self.currentPage,
          pageSize: self.currentSize
        };
        // self.axios.defaults.headers.post['token'] = self.token;
        self.axios.defaults.headers.post['token'] = self.Cookies.get("token");
        self.axios({
          method: "post",
          url: self.url + "/servicepeople/list",
          data: self.qs.stringify(data)
        }).then(function (res) {
          if (res.data.code == 0) {
            self.serves = res.data.data.rows;
            console.log(res.data);
            self.total1 = res.data.data.total;
          }
        })
      },
      getAddress() {
        const self = this;
        const data = {
          pageNum: self.currentPage1,
          pageSize: self.currentSize
        }
        // self.axios.defaults.headers.post['token'] = self.token;
        self.axios.defaults.headers.post['token'] = self.Cookies.get('token');
        self.axios({
          method: "post",
          url: self.url + "/address/list",
          data: self.qs.stringify(data)
        }).then(function (res) {
          console.log(res);
          if (res.data.code == 0) {
            self.address = res.data.data.rows;
            self.total2 = res.data.data.total;
          }
        })
      },
      //添加
      addTab() {
        this.servesAdd = {
          name: "",
          mobile: "",
          sex: 1,
          age: '',
          default: false,
          idCardNum: "",
          idCardUrl: "",
        };
        this.fileList = []
        this.addShow = !this.addShow
      },
      addTab2() {
        this.productAdd={};
        this.addShow2 = !this.addShow2
      },
      editTab(site) {
        this.fileList2=[];
        this.getServes();
        this.editShow = !this.editShow;
        this.radio2 = site.sex.toString()
        this.servesEdit = site;
      },
      editTab2(site) {
        this.editShow2 = !this.editShow2;
        this.productEdit = site;
      },
      editTab3() {
        /* const self=this
         async function closeEA() {
           await self.getAddress();
           self.editShow2 = !self.editShow2;
         }
         closeEA()*/
        this.getAddress();
        this.editShow2 = !this.editShow2;
      },
      addSubmit() {
        const self = this;
        self.servesAdd.sex = parseInt(self.radio)
        self.servesAdd.age = parseInt(self.servesAdd.age)
        self.axios.defaults.headers.post['token'] = self.Cookies.get("token");
        self.axios({
          method: "post",
          url: self.url + "/servicepeople/add",
          data: self.qs.stringify(self.servesAdd)
        }).then(function (res) {
          console.log(self.servesAdd, res);
          if (res.data.code == 0) {
            self.addTab();
            self.getServes();
            self.addShow = false
          } else {
            self.$message({
              showClose: true,
              message: '请正确填写信息',
              type: 'error'
            });
          }
        })
      },
      addSubmit2() {
        const self = this;
        self.axios.defaults.headers.post['token'] = self.Cookies.get('token');
        self.axios({
          method: 'post',
          url: self.url + '/address/add',
          data: self.qs.stringify(self.productAdd)
        }).then(function (res) {
          console.log(self.productAdd);
          if (res.data.code == 0) {
            self.addTab2();
            self.getAddress();
            self.addShow2 = false
          }
        })
      },
      editSubmit() {
        const self = this;
        self.servesEdit.sex = parseInt(self.radio2)
        self.axios.defaults.headers.post['token'] = self.Cookies.get("token");
        self.axios({
          method: "post",
          url: self.url + "/servicepeople/update",
          data: self.qs.stringify(self.servesEdit)
        }).then(function (res) {
          if (res.data.code == 0) {
            self.editShow = false;
            self.getServes();
          } else {
            self.$message({
              showClose: true,
              message: '提交失败',
              type: 'error'
            });
          }
        })
      },
      editSubmit2() {
        const self = this;
        self.axios.defaults.headers.post['token'] = self.Cookies.get('token');
        self.axios({
          method: 'post',
          url: self.url + '/address/update',
          data: self.qs.stringify(self.productEdit)
        }).then(function (res) {
          if (res.data.code == 0) {
            self.editShow2 = false;
            self.getAddress();
          } else {
            self.$message({
              showClose: true,
              message: '请更改信息',
              type: 'error'
            })
          }
        })
      },
      //设置默认
      addMo(site) {
        const self = this;
        console.log(site);
        self.openFullScreen2();
        site.default = !site.default;
        self.axios.defaults.headers.post['token'] = self.Cookies.get("token");
        self.axios({
          method: "post",
          url: self.url + '/servicepeople/update',
          data: self.qs.stringify(site)
        }).then(function (res) {
          if (res.data.code == 0) {
            self.getServes();
          }
        })

      },
      openFullScreen2() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.9)'
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
      },
      addMo2(site) {
        const self = this;
        site.default = !site.default
        self.axios.defaults.headers.post['token'] = self.Cookies.get('token');
        self.axios({
          method: 'post',
          url: self.url + '/address/update',
          data: self.qs.stringify(site)
        }).then(function (res) {
          if (res.data.code == 0) {
            self.getAddress();
          }
        })
      },
      //
      servesDelete(site) {
        const self = this;
        self.axios.defaults.headers.post['token'] = self.Cookies.get('token');
        const data = {
          id: site.id
        }
        self.axios({
          method: 'post',
          url: self.url + '/servicepeople/delete',
          data: self.qs.stringify(data)
        }).then(function (res) {
          if (res.data.code == 0) {
            self.getServes();
          }
        })
      },
      productDelete(site) {
        const self = this;
        self.axios.defaults.headers.post['token'] = self.Cookies.get('token');
        const data = {
          id: site.id
        }
        self.axios({
          method: 'post',
          url: self.url + '/address/delete',
          data: self.qs.stringify(data)
        }).then(function (res) {
          if (res.data.code == 0) {
            self.getAddress();
          }
        })
      }

    },
    mounted() {
      this.getServes();
      this.getAddress();
    }
  }
</script>

<style scoped>
  .el-header {
    margin-top: 20px;
  }

  .el-footer {
    text-align: center;
  }

  .man-box {
    position: absolute;
    overflow: auto;
  }

  .man-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 60px;
  }

  .man-title {
    font-size: 20px;
    font-family: MicrosoftYaHei;
    color: rgba(131, 131, 131, 1);
    line-height: 26px
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

  .info-tab {
    margin: 20px 0 20px 0;
    font-size: 20px;
    font-family: MicrosoftYaHei;
    color: rgba(48, 48, 48, 1);
    line-height: 26px;
  }

  .info-tab span {
    margin: 0 60px 20px 0;
    cursor: pointer;
  }

  .info-title {
    display: flex;
    margin: 40px 0 0 0;
    align-items: center;
  }

  .info-title span {
    font-size: 24px;
    font-family: MicrosoftYaHei;
    color: rgba(48, 48, 48, 1);
    line-height: 31px;
  }

  .info-title div {
    width: 100px;
    height: 40px;
    border: 1px solid rgba(218, 218, 218, 1);
    text-align: center;
    font-size: 20px;
    font-family: MicrosoftYaHei;
    color: rgba(131, 131, 131, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0 0 120px;
  }

  .isActive {
    color: rgba(1, 143, 215, 1);
  }

  .serves-add {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    bottom: 0;
    left: 0px;
    right: 0;
    background: rgba(89, 89, 89, 0.7);
    justify-content: center;
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

  .add-btn {
    display: flex;
    justify-content: center;
  }

  .add-btn .el-button:nth-child(1) {
    margin-right: 100px;
  }

  .el-radio__label {

  }

  .image-btn {
    cursor: pointer;
  }
</style>
