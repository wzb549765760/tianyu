<template>
  <div class="TY-content">
    <div class="TY-left">
      <div class="ty-bag">
        <div class="tyleft-img1">
          <!--<img src="../../assets/img/addleft.png" alt="">-->
          <p>基本信息</p>
        </div>
        <div class="tyleft-img2">
          <!--<img src="../../assets/img/addleft.png" alt="">-->
          <p>销售属性</p>
        </div>
        <div class="tyleft-img3">
          <!--<img src="../../assets/img/addleft.png" alt="">-->
          <p> 图片信息</p>
        </div>
      </div>
    </div>
    <div class="TY-right">
      <div class="ty-rig-top">
        <el-form :model="ruleForm1" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
          <!--<el-form-item label="商品编号" prop="no">
            <el-input v-model="ruleForm1.no"></el-input> &lt;!&ndash;从前一个页面传过来&ndash;&gt;
          </el-form-item>-->
          <el-form-item label="商品名称" prop="name" class="is-required">
            <el-input v-model="ruleForm1.name"></el-input>
          </el-form-item>
          <el-form-item label="商品特色" prop="feature" class="is-required">
            <el-input v-model="ruleForm1.feature"></el-input>
          </el-form-item>
          <el-form-item label="商品类别" prop="commodityType" class="is-required">
            <el-select v-model="ruleForm1.commodityType" placeholder="请选择商品类别">
              <el-option label="服务" value="服务"></el-option>
              <el-option label="货物" value="货物"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="适合人群" prop="applyPerson" class="is-required">
            <el-input v-model="ruleForm1.applyPerson"></el-input>
          </el-form-item>
          <el-form-item label="详细介绍" prop="name" class="is-required">
            <el-input type="textarea" v-model="ruleForm1.desc"></el-input>
          </el-form-item>
          <!--<el-form-item label="价格" prop="name">-->
          <!--<el-input v-model="ruleForm.name"></el-input>-->
          <!--</el-form-item>-->
          <div class="ty-xuanze">
            <el-form-item label="商品图片" class="is-required">
              <img :src="this.myInfo.idCardUrl" alt="">
              <!--<el-button @click="Uploadrig">选择图片</el-button>-->
              <!--上传图片右侧1个的-->
              <el-upload
                class="upload-demo"
                :action="actionUrl"
                :headers="headers"
                :data="upData"
                accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
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
            </el-form-item>
          </div>
          <!-- <el-form-item label="规格" prop="desc">
             <el-button  @click="dialogTableVisible = true" >+ 添加</el-button>
             &lt;!&ndash;<el-input type="textarea" v-model="ruleForm.desc"></el-input>&ndash;&gt;
             &lt;!&ndash;<el-button type="primary">立即创建</el-button>&ndash;&gt;
           </el-form-item>-->
          <el-form-item label="规格" prop="desc">
            <el-row v-for="(l,index) in standardsList" style="margin-bottom: 10px;">
              <el-button type="primary">{{l.data.name}}<i class="el-icon-edit el-icon--right"
                                                          @click="eidtStandard(index)"></i><i
                class="el-icon-delete el-icon--right" @click="delStandard(index)"></i></el-button>
            </el-row>
            <el-button @click="addStandard">+ 添加</el-button>
          </el-form-item>
          <!--  <el-form-item label="标签">
            </el-form-item>-->
        </el-form>
      </div>
      <div class="ty-rig-bottom">
        <el-upload
          :headers="headers"
          :limit="5"
          :action="actionUrl"
          :data="upData"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-success="handleSuccess2"
          :on-remove="handleRemove2">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

        <div class="ty-bottom-upload">
          <!--<el-button>上传图片</el-button>-->
          <span>最多可以上传5张图片，建议比例16:9</span>
        </div>
      </div>
      <div class="ty-right-anniu">
        <el-button @click="savebig">保存</el-button>
        <el-button @click="toBack">取消</el-button>
      </div>
    </div>

    <!--TODO 添加规格的弹窗  @click="dialogTableVisible = true"-->
    <el-dialog title="规格信息" :visible.sync="dialogTableVisible" :modal="false" :center="true">
      <el-form>
        <el-form-item label="规格名称:" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="价格:" prop="name">
          <el-input v-model="ruleForm.price" maxlength="7"></el-input>
        </el-form-item>
      </el-form>
      <span>服务信息</span>
      <el-table :data="addPlanRoute" border style="width:100%">

        <!--<el-table-column property="productId" label="服务id"></el-table-column>-->
        <el-table-column label="数量">
          <template slot-scope="scope">
            <el-input v-model="scope.row.count" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
        <el-table-column property="productId" label="服务名称">
          <template slot-scope="scope">
            <el-select placeholder="状态" v-model="scope.row.productId" valueKey="id" @change="getValue">
              <!--<el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>-->
              <el-option
                v-for="item in tableData"
                :value="item.id"
                :label="item.name"
                :key="item.id"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="delCol(scope.$index)">删除</el-button>
            <!--<span v-for="item in tableData">{{item.id}}</span>-->
          </template>
        </el-table-column>
      </el-table>
      <el-button @click="addCol">添加列按钮</el-button>
      <div class="ty-right-anniu">
        <el-button @click="standardSave" :disabled="standardSaveFlag">保存</el-button>
        <el-button @click="dialogTableVisible=false;editId=''">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        /*TODO 上传文件的参数单个*/
        upData: {
          type: 3
        },
        headers: {
          token: localStorage.getItem('currentUser_token')
        },
        standardSaveFlag: false,
        fileList: [],
        myInfo: {
          idCardUrl: "",
        },
        /* TODO 5张的上传图片*/

        dialogImageUrl: '',
        dialogVisible: false,

        /**/
        save: '',
        table1: [],//保存规格返回的链接
        table2: [],//保存图片返回的链接
//        to:'',
        id: '',
        tableData: [],
        baseURl: this.$store.state.url,
        actionUrl: this.$store.state.url+"/file/upload?token=" + localStorage.getItem('currentUser_token'),
        token: '',
        currentPage: 1,
        currentSize: 10,
        pageNum: 0,
        /**/
        addPlanRoute: [{  //表格中的编辑input框
          productId: '',
          count: '',
        }],
        optionty: '', //下拉的值
        selVal: '',
        standardsList: [],
        no: '',
        value: '',

        /**/
        centerDialogVisible: true,
        dialogTableVisible: false, //弹窗
        ruleForm: {
          commodityType: "",//必填 商品类别
          feature: "产品nb", //必填 特色
          desc: "",//必填 详细介绍
          applyPerson: "",//必填 适用人群
          majorPath: "",//必填 商品主图片路径
          picPath: "",//必填可空 图片信息，多个用;连接
          specificationIds: "",//必填 规格id， 多个用;连接
          name: '',
          price: "",
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        ruleForm1: {
          id: '',//
          name: '',//名称
          commodityType: '',//商品类别
          feature: '',//特色
          desc: '',//详细介绍
          applyPerson: '',//试用人群
          majorPath: '',//商品主图片的路径
          picPath: '',// 图片信息，多个用;连接
          specificationIds: '',//规格id， 多个用;连接
        },
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          region: [
            {required: true, message: '请选择活动区域', trigger: 'change'}
          ],
          date1: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          date2: [
            {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
          ],
          type: [
            {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
          ],
          resource: [
            {required: true, message: '请选择活动资源', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请填写活动形式', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      gettoken() {
        var self = this
        self.token = localStorage.getItem('currentUser_token');
      },

      submitForm(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },


      //获取select的值
      getValue(Vld) {
        var self = this;
        let obj = {}
        obj = this.tableData.find((item) => {
          return item.id === Vld
        })
//        console.log(obj.no)
//        self.addPlanRoute.push({no:obj.no})
      },
      toBack() {
        history.go(-1);
      },
//      TODO 规格添加中的动态创建列的添加按钮
      addCol() {
        this.addPlanRoute.push({count: ''})
      },
      delCol(index) {
        this.addPlanRoute.splice(index, 1);
      },
      addStandard() {
        let self = this;
        self.dialogTableVisible = true;
        self.addPlanRoute = [{  //表格中的编辑input框
          count: '',
        }];
        self.ruleForm.name = "";
        self.ruleForm.price = "";
      },

//      TODO 规格弹窗的下拉菜单的值 id 和name
      standardlist() {
        console.log('请求加载')
        var self = this;
        var token = localStorage.getItem('currentUser_token');
        var data = {
          pageSize: 10000,//页数量
          pageNum: 1, //第几页
//            token:token
        }
        axios.defaults.headers.post['token'] = token;
        axios({
          method: 'post',
          url: self.baseURl + '/product/list',
          data: data,
        }).then(res => {
          if (res.data['code'] == '0') {
            this.tableData = res.data.data.rows
          }
        })

      },
      checkVal(val) {
        if (val == "" || val == null || val == undefined) return false;
        return true;
      },
//      TODO 规格添加
      specificationADD() {

      },
//      TODO 规格弹窗的小保存按钮
      /*  mmmmm(){
          console.log(111)
        },*/
      eidtStandard(i) {
        var obj = this.standardsList[i];
        this.editId = obj["id"];
        this.addPlanRoute = obj["data"]["spec2prod"];
        this.ruleForm.name = obj["data"]["name"];
        this.ruleForm.price = obj["data"]["price"];
        this.dialogTableVisible = true;
      },
      delStandard(i) {
        this.standardsList.splice(i, 1);
        this.table1.splice(i, 1);
      },
      standardSave() {
//        console.log('3333')
        var self = this;
        if (self.ruleForm.name == "" || self.ruleForm.name == undefined || self.ruleForm.name == null) {
          self.$message({
            message: '规格名称不能为空',
            type: 'error'
          });
          return;
        }
        if (self.ruleForm.price == "" || self.ruleForm.price == undefined || self.ruleForm.price == null) {
          self.$message({
            message: '价格不能为空',
            type: 'error'
          });
          return;
        }
        for (var i = 0; i < self.addPlanRoute.length; i++) {
          var count = self.addPlanRoute[i]["count"];
          if (count == "" || count == undefined || count == null) {
            self.$message({
              message: '第' + (i + 1) + '条服务信息数量不能为空',
              type: 'error'
            });
            return;
          } else {
            if (Number.parseFloat(count) <= 0) {
              self.$message({
                message: '第' + i + 1 + '条服务信息数量大于零',
                type: 'error'
              });
              return;
            }
          }
        }
        if (self.standardSaveFlag) {
          return;
        }
        self.standardSaveFlag = true;
        axios({
          method: 'post',
          url: self.baseURl + '/specification/add',
          data: {
            spec2prod: self.addPlanRoute,
            name: self.ruleForm.name,
            price: Number(self.ruleForm.price)
          },

        }).then(res => {

          if (res.data['code'] == '0') {
            var flag = false;
            var index = "";
            if (self.editId != "" && self.editId != null && self.editId != undefined) {
              self.table1.forEach((v, k) => {
                if (v == self.editId) {
                  index = k;
                  flag = true;
                }
              })
            }
            if (flag) {
              self.table1[index] = res.data.data.specificationId;
            } else {
              self.table1.push(res.data.data.specificationId);
            }
            self.dialogTableVisible = false;
            self.$message({
              message: '成功',
              type: 'success'
            });
            if (flag) {
              self.standardsList[index] = {
                "id": res.data.data.specificationId,
                "data": {
                  "spec2prod": self.addPlanRoute,
                  "name": self.ruleForm.name,
                  "price": Number(self.ruleForm.price)
                }
              }
            } else {
              self.standardsList.push({
                "id": res.data.data.specificationId,
                "data": {
                  "spec2prod": self.addPlanRoute,
                  "name": self.ruleForm.name,
                  "price": Number(self.ruleForm.price)
                }
              });
            }
            setTimeout(() => {
              self.standardSaveFlag = false;
            }, 100);
            self.editId = "";
          } else {
            self.standardSaveFlag = false;
            self.$message({
              message: res.data["desc"],
              type: 'error'
            })
          }
//
        })
      },

//TODO 最大的保存按钮
      savebig() { //最下方的保存按钮
        var self = this, a = self.table2, obj1 = '', b = self.table1, obj2 = '';
        obj1 = a.join(";");
        obj2 = b.join(";");
        if (!self.checkVal(self.ruleForm1.majorPath)) {
          self.$message({
            type: 'error',
            message: '商品图片必填'
          });
          return;
        }
        if (!self.checkVal(self.ruleForm1.name)) {
          self.$message({
            type: 'error',
            message: '商品名称必填'
          });
          return;
        }
        if (!self.checkVal(self.ruleForm1.feature)) {
          self.$message({
            type: 'error',
            message: '商品特色必填'
          });
          return;
        }
        if (!self.checkVal(self.ruleForm1.commodityType)) {
          self.$message({
            type: 'error',
            message: '商品类别必填'
          });
          return;
        }
        if (!self.checkVal(self.ruleForm1.applyPerson)) {
          self.$message({
            type: 'error',
            message: '适合人群必填'
          });
          return;
        }
        if (!self.checkVal(self.ruleForm1.desc)) {
          self.$message({
            type: 'error',
            message: '详细介绍必填'
          });
          return;
        }
        axios({
          method: 'post',
          url: self.baseURl + '/commodity/add',
          data: {
//            id:'',
            name: self.ruleForm1.name,
            commodityType: self.ruleForm1.commodityType,
            feature: self.ruleForm1.feature,
            desc: self.ruleForm1.desc,
            applyPerson: self.ruleForm1.applyPerson,
            majorPath: self.ruleForm1.majorPath,
            picPath: obj1,
            specificationIds: obj2,
          },
        }).then(res => {
          if (res.data['code'] == '0') {
            self.$message({
              message: '添加成功',
              type: 'success'
            })
//            从创建成功跳转到商品列表
            self.$router.push({name: 'catalogue'})
          } else {
            self.$message({
              message: '添加失败从新输入',
              type: 'error'
            })
          }
//
        })

      },
      handleRemove2(file, fileList) {
        console.log(file, fileList);
        console.log(this.table2);
        let self = this;
        self.table2.forEach((k, v) => {
          if (k == file.response.data.url) {
            self.table2.splice(v, 1);
          }

        })
      },
// TODO 右侧的选择图片 为单个1张
      handleSuccess(response, file, fileList) { //上传单张成功的方法
        console.log(response);
        const self = this;
        if (response.code == 0) {
          self.myInfo.idCardUrl = response.data.url;
//          console.log(self.myInfo.idCardUrl )
//          self.table2.push(response.data.url)
//          console.log(self.table2);
          self.ruleForm1.majorPath = response.data.url;
        }
      },
      handlePreview(file) {
        console.log(file);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleExceed(files, fileList) {
        fileList = [];
        this.$message.warning(`当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },

      /* TODO 下侧5张的上传图片*/
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleSuccess2(response, file, fileList) { //上传单张成功的方法
        console.log(response);
        const self = this;
        if (response.code == 0) {
//          self.myInfo.idCardUrl = response.data.url
//          console.log(self.myInfo.idCardUrl )
          self.table2.push(response.data.url);
          console.log(self.table2);
        } else {
          self.$message({
            message: '上传失败请删除图片重新上传',
            type: 'error'
          })
        }
      },
    },
    mounted() {
      this.standardlist()  //规格弹窗的下拉菜单的值
    }
  }
</script>

<style scoped>
  .TY-left {
    position: absolute;
    left: 0;
    float: left;
    width: 250px;
    height: 100%;
  }

  .TY-right {
    position: absolute;
    left: 280px;
    top: 60px;
    float: left;
    /*margin-top: 60px;*/
  }

  .TY-content {
    height: 100%;
    /*padding-top: 60px;*/
  }

  .tyleft-img3 {
    margin-left: 30px;
    background: url("../../assets/img/addleft.png") no-repeat;
    /*background-size: 100%;*/
    width: 200px;
    height: 50px;
    position: absolute;
    top: 500px;
    line-height: 50px;
  }

  .tyleft-img2 {
    margin-left: 30px;
    background: url("../../assets/img/addleft.png") no-repeat;
    /*background-size: 100%;*/
    width: 200px;
    height: 50px;
    position: absolute;
    top: 380px;
    line-height: 50px;
  }

  .tyleft-img1 {
    background: url("../../assets/img/addleft.png") no-repeat;
    /*background-size: 100%;*/
    width: 200px;
    height: 50px;
    margin-left: 30px;
    line-height: 50px;
  }

  .ty-bag {
    width: 210px;
    background: rgba(252, 252, 252, 1);
    border-right: 1px solid rgba(228, 228, 228, 1);
    height: 100%;
    padding-top: 60px;
  }

  /*图片展示列表*/
  .el-row {
    width: 100%;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    border: rgba(228, 228, 228, 1);
    background: rgba(249, 250, 252, 1);
  }

  .bg-purple {

    background: rgba(249, 250, 252, 1);
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

  .ty-rig-top {
    width: 400px;
  }

  .ty-rig-bottom {
    width: 1280px;
  }

  .ty-rig-bottom img {
    height: 170px;
    width: 150px;
  }

  .bg-purple {
    width: 150px;
    /*width: 200px;*/
  }

  .ty-bottom-character {
    text-align: center;
    line-height: 37px;
    border-right: 1px solid rgba(228, 228, 228, 1);
    border-left: 1px solid rgba(228, 228, 228, 1);
    border-bottom: 1px solid rgba(228, 228, 228, 1);
    width: 150px;
    height: 37px;
    color: rgba(26, 188, 156, 0.8);
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

  .ty-bottom-upload {
    margin-top: 30px;
  }

  .ty-bottom-upload span {
    font-size: 12px;
    color: #999999;
  }

  .ty-bottom-upload .el-button {
    background: rgba(26, 188, 156, 0.8);
    color: white;
  }

  .ty-xuanze img {
    width: 150px;
    height: 150px;
  }

  .ty-xuanze {
    position: absolute;
    left: 600px;
    top: 0px;
  }

  /*增加弹窗的  保存和取消*/
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
  .el-form-item__content .el-input {
    width: 200px;
  }

  .el-form-item__content .el-input__inner {
    width: 200px;
  }
</style>
