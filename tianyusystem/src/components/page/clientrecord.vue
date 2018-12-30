<template>
  <el-container class="AddUser">
    <el-header>
      <div class="ty-header-div1" @click="getTabShow1"><p class="ty-headr-p"><span>基本信息</span></p></div>
      <div class="ty-header-div1" @click="getTabShow2"><p class="ty-headr-p"><span>档案信息</span></p></div>
      <div class="ty-header-div1" @click="getTabShow3"><p class="ty-headr-p"><span>新增特征</span></p></div>
    </el-header>
    <el-main v-show="informationShow">
      <div class="ty-el-main-list1">

        <div class="ty-content">
          <p class="ty-p-one">账户信息</p>
          <div class="ty-content-div-list">
            <span>  &#12288&#12288昵称：</span>
            <el-input v-model="nickName"></el-input>
            <span>  &#12288&#12288手机号码：</span>
            <el-input v-model="mobile"></el-input>
          </div>
          <div class="ty-content-div-list">
            <span>  &#12288&#12288密码：</span>
            <el-input v-model="pwd"></el-input>
          </div>
          <div :model="formInline" class="ty-content-div-list">
            <span>  &#12288&#12288用户类型：</span>
            <el-select v-model="formInline.region">
              <el-option v-for="item in options3"
                         :label="item.label"
                         :value="item.value"
                         :key="item.value"></el-option>
            </el-select>
          </div>
          <p class="ty-p-one">详细信息</p>
          <div class="ty-content-div-list">
            <span>  &#12288&#12288姓名：</span>
            <el-input v-model="name"></el-input>
            <span>  &#12288&#12288性别：</span>
            <el-radio v-model="sexRadio" label="1">男</el-radio>
            <el-radio v-model="sexRadio" label="2">女</el-radio>
            <span>  &#12288&#12288民族：</span>
            <el-input v-model="nationality"></el-input>
          </div>
          <div class="ty-content-div-list" :model="form">
            <span>  &#12288&#12288年龄：</span>
            <el-input v-model="age"></el-input>
            <span>  &#12288&#12288生日：</span>
            <el-date-picker type="date" placeholder="选择日期" v-model="birthday"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </div>
          <!--三级联动-->
          <!--现居住地-->
          <div class="distpicker-address-wrapper ty-distpicker">
            <span>&#12288&#12288现居地：</span>
            <el-cascader
              :options="options"
              v-model="selectedOptions"
            ><!--  @change="handleChange"-->
            </el-cascader>
            <el-input placeholder="详细地址" v-model="addDetail1"></el-input>
          </div>
          <!--户籍地-->
          <div class="distpicker-address-wrapper ty-distpicker">
            <span>&#12288&#12288户籍地：</span>
            <el-cascader
              :options="options2"
              v-model="selectedOptions2"
            ><!--@change="handleChange"-->
            </el-cascader>
            <el-input placeholder="详细地址" v-model="addDetail2"></el-input>
          </div>
          <!--身份证号-->
          <div class="ty-content-div-list" :model="form">
            <span>  &#12288&#12288身份证号：</span>
            <el-input v-model="idCardNumber"></el-input>
          </div>
          <!--身份证号-->
          <div class="ty-content-div-list" :model="form">
            <span>  &#12288&#12288身份证正面：</span>
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
              :file-list="fileList"
              style="display: inline-block"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
          <p class="ty-p-one">紧急联系人信息</p>
          <div class="ty-content-div-list">
            <span>  &#12288&#12288第一联系人姓名：</span>
            <el-input v-model="emergencyContact1"></el-input>
            <span>  &#12288&#12288联系方式：</span>
            <el-input v-model="emergencyMobile1"></el-input>
          </div>
          <div class="ty-content-div-list">
            <span>  &#12288&#12288第二联系人姓名：</span>
            <el-input v-model="emergencyContact2"></el-input>
            <span>  &#12288&#12288联系方式：</span>
            <el-input v-model="emergencyMobile2"></el-input>
          </div>
          <p class="ty-p-one">病史</p>
          <div class="ty-content-div-list">
            <span>  &#12288&#12288药物及过敏史：</span>
            <el-input v-model="allergyDiseaseHistory"></el-input>
            <span>  &#12288&#12288遗传病史：</span>
            <el-input v-model="geneticDiseaseHistroy"></el-input>
          </div>
          <div class="ty-content-div-list">
            <span>  &#12288&#12288手术史：</span>
            <el-input v-model="surgeryDiseaseHistory"></el-input>
          </div>
        </div>
      </div>
    </el-main>
    <el-main v-show="fileShow">
      <div>
        <el-button type="primary" @click="dangAnTab">新增档案</el-button>
      </div>
      <el-table
        :data="tableDataFile"
        style="width: 100%">
        <el-table-column
          prop="createDate"
          label="时间"
        >
        </el-table-column>
        <el-table-column
          prop="type"
          label="档案类型"
        >
          <template slot-scope="scope">
            <span>{{scope.row.type | typeChoose}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEditTable(scope.$index, scope.row)">下载
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteTable(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="serves-add" v-show="addShow">
        <div>
          <div>
            <label>档案类型&nbsp;:&nbsp;</label>
            <el-select v-model="filetypeSelect" placeholder="请选择">
              <el-option
                v-for="item in fileTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div>
            <label>档案上传&nbsp;:&nbsp;</label>
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
              :file-list="fileList2"
              style="display: inline-block"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
          <div class="add-btn">
            <el-button type="primary" @click="addNewFile">提交</el-button>
            <el-button type="info" @click="dangAnTab">取消</el-button>
          </div>
        </div>
      </div>
    </el-main>
    <el-main v-show="kindShow">
      <div>
        <el-button type="primary" @click="FeatureTab">新增特性</el-button>
      </div>
      <el-table
        :data="tableDataFeature"
        style="width: 100%">
        <el-table-column
          prop="createDate"
          label="时间"
        >
        </el-table-column>
        <el-table-column
          prop="content"
          label="用户特性"
        >
        </el-table-column>
      </el-table>
      <div class="serves-add" v-show="addShow2">
        <div>
          <div>
            <label>用户特征&nbsp;:&nbsp;</label>
            <el-input v-model="featureContent"></el-input>
          </div>
          <div class="add-btn">
            <el-button type="primary" @click="addNewFeature">提交</el-button>
            <el-button type="info" @click="FeatureTab">取消</el-button>
          </div>
        </div>
      </div>
    </el-main>
    <el-footer v-show="informationShow">
      <div class="ty-right-anniu">
        <el-button @click="userSubmit">保存</el-button>
        <el-button @click="toBack">取消</el-button>
      </div>
    </el-footer>
    <el-footer v-show="fileShow">
      <el-pagination
        background
        layout="total,prev, pager, next"
        @current-change="filehandleCurrentChange"
        :total="fileTotal">
      </el-pagination>
    </el-footer>
    <el-footer v-show="kindShow">
      <el-pagination
        background
        layout="total,prev, pager, next"
        @current-change="FeaturehandleCurrentChange"
        :total="featureTotal">
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
  import DISTRICTS from '../../assets/js/districts';
  import city from '../../assets/js/city';
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
  import axios from 'axios'
  import qs from "qs"

  const DEFAULT_CODE = 100000

  export default {
    components: {ElButton},
    name: 'v-bianji',
    props: {
      province: {type: [String, Number], default: ''},
      city: {type: [String, Number], default: ''},
      area: {type: [String, Number], default: ''},
      type: {type: String, default: ''},
      hideArea: {type: Boolean, default: false},
      onlyProvince: {type: Boolean, default: false},
      staticPlaceholder: {type: Boolean, default: false},
      placeholders: {
        type: Object,
        default() {
          return {
            province: '省',
            city: '市',
            area: '区',
          }
        }
      },
      disabled: {type: Boolean, default: false},
      addressHeader: {type: String, default: 'address-header'},
      addressContainer: {type: String, default: 'address-container'},
    },
    data() {
      return {
        params: this.$route.params,
        /* TODO 定义*/
        emergencyMobile1: '',
        surgeryDiseaseHistory: '',
        geneticDiseaseHistroy: '',
        emergencyContact1: '',
        emergencyContact2: '',
        emergencyMobile2: '',
        allergyDiseaseHistory: '',
        /* TODO 定义*/
        delivery: false,//账户启用状态按钮
        checked1: false, //男
        checked2: false, //女,
        informationShow: true,
        fileShow: false,
        kindShow: false,
        form: { //生日时间
          date1: '',
        },
        formInline: { //弹窗的 select
          user: '',
          region: 1
        },
        options3: [ //下拉
          {
            value: 1,
            label: '用户'
          }, {
            value: 2,
            label: '医生'
          },
          {
            value: 3,
            label: 'VIP用户'
          }],
//        三级联动
        tab: 1,
        options: CityInfo,
        options2: CityInfo,
        showCityTab: false,
        showAreaTab: false,
        provinces: [],
        cities: [],
        areas: [],
        fileList: [],
        fileList2: [],
        currentProvince: this.determineType(this.province) || this.placeholders.province,
        currentCity: this.determineType(this.city) || this.placeholders.city,
        currentArea: this.determineType(this.area) || this.placeholders.area,
        currentProvince2: this.determineType(this.province) || this.placeholders.province,
        currentCity2: this.determineType(this.city) || this.placeholders.city,
        currentArea2: this.determineType(this.area) || this.placeholders.area,
        //        三级联动,
        //用户信息
        nickName: "",
        mobile: "",
        pwd: "",
        name: "",
        sexRadio: "1",
        nationality: "",
        birthday: "",
        age: "",
        idCardNumber: "",
        idCardUrl: "",
        addDetail1: "",
        addDetail2: "",
        selectedOptions: [],
        selectedOptions2: [],
        upData: {
          type: 1
        },
        headers: {
          token: localStorage.getItem('currentUser_token')
        },
        baseURl: this.$store.state.url,
        params: this.$route.params,
        //档案
        tableDataFile: [],
        filePageNum: 1,
        filePageSize: 15,
        fileTotal: 0,
        addShow: false,
        filetypeSelect: 1,
        fileUrl: "",
        fileName: "",
        fileTypeOptions: [
          {
            value: 1,
            label: "病例"
          },
          {
            value: 2,
            label: "体检报告"
          },
          {
            value: 3,
            label: "健康报告"
          },
          {
            value: 4,
            label: "诊断报告"
          },
          {
            value: 5,
            label: "家属档案"
          },
        ],
        //特征
        tableDataFeature: [],
        addShow2: false,
        featurePageNum: 1,
        featureTotal: 0,
        featureContent: ""

      }
    },
    created() {
      if (this.type != 'mobile') {
        this.provinces = this.getDistricts()
        this.cities = this.province ? this.getDistricts(this.getAreaCode(this.determineType(this.province))) : []
        this.areas = this.city ? this.getDistricts(this.getAreaCode(this.determineType(this.city), this.area)) : []
      } else {
        if (this.area && !this.hideArea && !this.onlyProvince) {
          this.tab = 3
          this.showCityTab = true
          this.showAreaTab = true
          this.areas = this.getDistricts(this.getAreaCode(this.determineType(this.city), this.area))
        } else if (this.city && this.hideArea && !this.onlyProvince) {
          this.tab = 2
          this.showCityTab = true
          this.cities = this.getDistricts(this.getAreaCode(this.determineType(this.province)))
        } else {
          this.provinces = this.getDistricts()
        }
      }
    },
    watch: {

      currentProvince(vaule) {
        this.$emit('province', this.setData(vaule))
        if (this.onlyProvince) this.emit('selected')
      },
      currentCity(value) {
        this.$emit('city', this.setData(value, this.currentProvince))
        if (value != this.placeholders.city && this.hideArea) this.emit('selected')
      },
      currentArea(value) {
        this.$emit('area', this.setData(value, this.currentProvince))
        if (value != this.placeholders.area) this.emit('selected')
      },
      province(value) {
        this.currentProvince = this.province || this.placeholders.province
        this.cities = this.determineValue(this.currentProvince, this.placeholders.province)
      },
      city(value) {
        this.currentCity = this.city || this.placeholders.city
        this.areas = this.determineValue(this.currentCity, this.placeholders.city, this.currentProvince)
      },
      area(value) {
        this.currentArea = this.area || this.placeholders.area
      },
    },
    methods: {
      toBack() {
        history.go(-1);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleSuccess(response, file, fileList) {
        console.log(response);
        const self = this;
        if (response.code == 0) {
          self.idCardUrl = response.data.url
        }
      },
      handleSuccess2(response, file, fileList) {
        console.log(response);
        const self = this;
        if (response.code == 0) {
          self.fileUrl = response.data.url;
          self.fileName = response.data.name
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
      setData(value, check = '') {
        return {
          code: this.getAreaCode(value, check),
          value: value,
        }
      },
      emit(name) {
        let data = {
          province: this.setData(this.currentProvince)
        }

        if (!this.onlyProvince) {
          this.$set(data, 'city', this.setData(this.currentCity))
        }

        if (!this.onlyProvince || this.hideArea) {
          this.$set(data, 'area', this.setData(this.currentArea))
        }

        this.$emit(name, data)
      },
      getCities() {
        this.currentCity = this.placeholders.city
        this.currentArea = this.placeholders.area
        this.cities = this.determineValue(this.currentProvince, this.placeholders.province)
        this.cleanList('areas')
        if (this.cities.length === 0) {
          this.emit('selected')
          this.tab = 1
          this.showCityTab = false
        }
      },
      getAreas() {
        this.currentArea = this.placeholders.area
        this.areas = this.determineValue(this.currentCity, this.placeholders.city, this.currentProvince)
        if (this.areas.length === 0) {
          this.emit('selected')
          this.tab = 2
          this.showAreaTab = false
        }
      },
      resetProvince() {
        this.tab = 1
        this.provinces = this.getDistricts()
        this.showCityTab = false
        this.showAreaTab = false
      },
      resetCity() {
        this.tab = 2
        this.showCityTab = true
        this.showAreaTab = false
        this.getCities()
      },
      chooseProvince(name) {
        this.currentProvince = name
        if (this.onlyProvince) return
        this.tab = 2
        this.showCityTab = true
        this.showAreaTab = false
        this.getCities()
      },
      chooseCity(name) {
        this.currentCity = name
        if (this.hideArea) return
        this.tab = 3
        this.showCityTab = true
        this.showAreaTab = true
        this.getAreas()
      },
      chooseArea(name) {
        this.currentArea = name
      },
      getAreaCodeByPreCode(name, preCode) {
        let codes = []

        for (let x in DISTRICTS) {
          for (let y in DISTRICTS[x]) {
            if (name === DISTRICTS[x][y]) {
              codes.push(y)
            }
          }
        }

        if (codes.length > 1) {
          let index
          codes.forEach((item, i) => {
            if (item.slice(0, 2) == preCode) {
              index = i
            }
          })

          return codes[index]
        } else {
          return codes[0]
        }
      },
      getAreaCode(name, check = '') {
        for (let x in DISTRICTS) {
          for (let y in DISTRICTS[x]) {
            if (name === DISTRICTS[x][y]) {
              if (check.length > 0) {
                if (y.slice(0, 2) !== this.getAreaCodeByPreCode(check, y.slice(0, 2)).slice(0, 2)) {
                  continue
                } else {
                  return y
                }
              } else {
                return y
              }
            }
          }
        }
      },
      getCodeValue(code) {
        for (let x in DISTRICTS) {
          for (let y in DISTRICTS[x]) {
            if (code === parseInt(y)) {
              return DISTRICTS[x][y]
            }
          }
        }
      },
      getDistricts(code = DEFAULT_CODE) {
        return DISTRICTS[code] || []
      },
      determineValue(currentValue, placeholderValue, check = '') {
        if (currentValue === placeholderValue) {
          return []
        } else {
          return this.getDistricts(this.getAreaCode(currentValue, check))
        }
      },
      determineType(value) {
        if (typeof value === 'number') {
          return this.getCodeValue(value)
        }

        return value
      },
      cleanList(name) {
        this[name] = []
      },

      userSubmit() {
        const self = this;
        const data = {
          mobile: self.mobile,
          password: self.pwd,
          type: self.formInline.region,
          nickname: self.nickName,
          name: self.name,
          sex: parseInt(self.sexRadio),
          age: parseInt(self.age),
          birthday: self.birthday,
          nationality: self.nationality,
          idCardNumber: self.idCardNumber,
          idCardUrl: self.idCardUrl,
          birthAddress: self.selectedOptions.join("&") + "&" + self.addDetail1,
          lifeAddress: self.selectedOptions2.join("&") + "&" + self.addDetail2,
          status: "1",
          emergencyContact1: self.emergencyContact1,
          emergencyMobile1: self.emergencyMobile1,
          emergencyMobile2: self.emergencyMobile2,
          emergencyContact2: self.emergencyContact2,
          allergyDiseaseHistory: self.allergyDiseaseHistory,
          geneticDiseaseHistory: self.geneticDiseaseHistroy,
          surgeryDiseaseHistory: self.surgeryDiseaseHistory,
          doUserId: self.params.doUserId,
          detailType: self.params.detailType
        }
        axios.defaults.headers.post['token'] = self.headers.token;
        axios({
          method: "post",
          url: self.baseURl + "/user/update",
          data: qs.stringify(data)
        }).then(function (res) {
          console.log(res);
          if (res.data.code == 0) {
            self.$message({
              message: res.data.desc,
              type: 'success'
            });
            self.$router.push({name: 'UserList'})

          } else {
            self.$message({
              message: res.data.desc,
              type: 'error'
            });
          }

        })
      },
      getUrl(){
        return this.$store.state.url+"/file/upload"
      },
      getUserDetail() {
        const self = this;
        const data = {
          doUserId: self.params.doUserId
        };
        console.log(data);
        axios.defaults.headers.post['token'] = self.headers.token;
        axios({
          method: "post",
          url: self.baseURl + "/user/detail",
          data: qs.stringify(data)
        }).then(function (res) {
          console.log(res);
          if (res.data.code == 0) {
            const data = res.data.data;
            self.name = data.name;
            self.birthday = data.birthday;
            self.nationality = data.nationality;
            self.sexRadio = data.sex.toString();
            self.pwd = data.password;
            self.formInline.region = data.type;
            self.emergencyContact1 = data.emergencyContact1;
            self.emergencyContact2 = data.emergencyContact2;
            self.emergencyMobile1 = data.emergencyMobile1;
            self.emergencyMobile2 = data.emergencyMobile2;
            self.allergyDiseaseHistory = data.allergyDiseaseHistory;
            self.geneticDiseaseHistroy = data.geneticDiseaseHistory;
            self.surgeryDiseaseHistory = data.surgeryDiseaseHistory;
            self.idCardNumber = data.idCardNumber;
            self.idCardUrl = data.idCardUrl;
            self.mobile = data.mobile;
            self.age = data.age.toString();
            self.nickName = data.nickname;
            // self.addDetail1 = data.birthAddress;
            var birthAddressList = data.birthAddress.split("&");
            if (birthAddressList.length == 3) {
              self.selectedOptions.push(birthAddressList[0]);
              self.selectedOptions.push(birthAddressList[1]);
              self.selectedOptions.push(birthAddressList[2]);
            } else if (birthAddressList.length == 4) {
              self.selectedOptions.push(birthAddressList[0]);
              self.selectedOptions.push(birthAddressList[1]);
              self.selectedOptions.push(birthAddressList[2]);
              self.addDetail1 = birthAddressList[3];
            }
            var lifeAddressList = data.lifeAddress.split("&");
            if (birthAddressList.length == 3) {
              self.selectedOptions.push(lifeAddressList[0]);
              self.selectedOptions.push(lifeAddressList[1]);
              self.selectedOptions.push(lifeAddressList[2]);
            } else if (birthAddressList.length == 4) {
              self.selectedOptions.push(lifeAddressList[0]);
              self.selectedOptions.push(lifeAddressList[1]);
              self.selectedOptions.push(lifeAddressList[2]);
              self.addDetail2 = lifeAddressList[3];
            }
          }
        })

      },
      getTabShow1() {
        this.informationShow = true;
        this.fileShow = false;
        this.kindShow = false;
        this.getUserDetail();
      },
      getTabShow2() {
        this.informationShow = false;
        this.fileShow = true;
        this.kindShow = false;
        this.getFileList();
      },
      getTabShow3() {
        this.informationShow = false;
        this.fileShow = false;
        this.kindShow = true;
        this.getFeatureList();
      },
      //编辑档案
      handleEditTable(index, row) {
        console.log(index, row);
        window.location.href = row.fileId + "&token=" + this.headers.token
      },
      handleDeleteTable(index, row) {
        //console.log(index, row);
        const self = this;
        const data = {
          id: row.id,
        }
        axios.defaults.headers.post['token'] = self.headers.token;
        axios({
          method: "post",
          url: self.baseURl + "/archive/delete",
          data: qs.stringify(data)
        }).then(function (res) {
          console.log(res);
          if (res.data.code == 0) {
            self.getFileList();
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
      //获取全部档案
      filehandleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageNum = val;
      },
      getFileList() {
        const self = this;
        const data = {
          pageNum: self.filePageNum,
          doUserId: self.params.doUserId,
          pageSize: self.filePageSize
        }
        axios.defaults.headers.post['token'] = self.headers.token;
        axios({
          method: "post",
          url: self.baseURl + "/archive/list",
          data: qs.stringify(data)
        }).then(function (res) {
          console.log(res);
          if (res.data.code == 0) {
            self.tableDataFile = res.data.data.rows;
            self.fileTotal = res.data.data.total;
          } else {
            self.$message({
              message: res.data.desc,
              type: 'error'
            });
          }
        })
      },
      dangAnTab() {
        this.addShow = !this.addShow;
        this.fileList2 = [];
      },
      addNewFile() {
        const self = this;
        const data = {
          type: self.filetypeSelect,
          url: self.fileUrl,
          doUserId: self.params.doUserId,
          name: self.fileName
        };
        axios.defaults.headers.post['token'] = self.headers.token;
        axios({
          method: "post",
          url: self.baseURl + "/archive/add",
          data: qs.stringify(data)
        }).then(function (res) {
          console.log(res);
          if (res.data.code == 0) {
            self.getFileList();
            self.dangAnTab();
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
      //特征
      FeaturehandleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageNum = val;
      },
      FeatureTab() {
        this.addShow2 = !this.addShow2;
        this.featureContent = "";
      },
      getFeatureList() {
        const self = this;
        const data = {
          pageNum: self.featurePageNum,
          doUserId: self.params.doUserId,
          pageSize: self.filePageSize
        }
        axios.defaults.headers.post['token'] = self.headers.token;
        axios({
          method: "post",
          url: self.baseURl + "/feature/list",
          data: qs.stringify(data)
        }).then(function (res) {
          console.log(res);
          if (res.data.code == 0) {
            self.tableDataFeature = res.data.data.rows;
            self.featureTotal = res.data.data.total;
          } else {
            self.$message({
              message: res.data.desc,
              type: 'error'
            });
          }
        })
      },
      addNewFeature() {
        const self = this;
        const data = {
          content: self.featureContent,
          doUserId: self.params.doUserId,
        }
        axios.defaults.headers.post['token'] = self.headers.token;
        axios({
          method: "post",
          url: self.baseURl + "/feature/add",
          data: qs.stringify(data)
        }).then(function (res) {
          console.log(res);
          if (res.data.code == 0) {
            self.getFeatureList();
            self.FeatureTab();
            self.$message({
              message: res.data.desc,
              type: 'success'
            });
            self.featureContent = "";
          } else {
            self.$message({
              message: res.data.desc,
              type: 'error'
            });
          }
        })
      }
    },
    filters: {
      typeChoose(value) {
        switch (value) {
          case 1:
            return "病例";
            break;
          case 2:
            return "体检报告";
            break;
          case 3:
            return "健康报告";
            break;
          case 4:
            return "诊断报告";
            break;
          case 5:
            return "家属档案";
            break;
        }
      }
    },
    mounted() {
      this.getUserDetail();
      this.doUserId = this.params.doUser_Id;
      this.doUserId = this.params.doUserId;
      this.detailType = this.params.detailType;

      console.log(this.doUserId)
    }
  }
</script>

<style lang="scss">
  .ty-header-div1 {
    background: url("../../assets/img/userbg.png");
    background-repeat: no-repeat;
    /*background: yellow;*/
    margin-top: 25px;
    width: 102px;
    height: 32px;
    display: inline-block;
    cursor: pointer;
  }

  .ty-headr-p {
    text-align: center;
  }

  .ty-p-one {
    margin-bottom: 30px;
    font-size: 18px;
    text-align: left;
    color: #333333;
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
    font-weight: 700;
    font-style: normal;
  }

  .ty-content {
    margin: 30px;
  }

  .ty-content-div-list {
    margin-bottom: 30px;
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

  .serves-add {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 80px;
    bottom: 0;
    left: 154px;
    right: 0;
    background: rgba(89, 89, 89, 0.7);
    justify-content: center;
  }

  .serves-add div div {
    margin-bottom: 10px;
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

  label {
    width: 200px;
    font-size: 24px;
    line-height: 45px;
  }

  serves-add div div input {
    width: 400px;
    height: 45px;
    box-sizing: border-box;
    padding-left: 20px;
  }

  .add-btn {
    display: flex;
    justify-content: center;
  }

  .add-btn .el-button:nth-child(1) {
    margin-right: 100px;
  }

  /*
  三级联动
   */
  .distpicker-address-wrapper {
    color: #9caebf;
    select {
      padding: .5rem .75rem;
      height: 40px;
      font-size: 1rem;
      line-height: 1.25;
      color: #464a4c;
      background-color: #fff;
      background-image: none;
      -webkit-background-clip: padding-box;
      background-clip: padding-box;
      border: 1px solid rgba(0, 0, 0, .15);
      border-radius: .25rem;
      -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
      transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
      -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
      transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
      transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;

      option {
        font-weight: normal;
        display: block;
        white-space: pre;
        min-height: 1.2em;
        padding: 0px 2px 1px;
      }
    }
    ul {
      margin: 0;
      padding: 0;

      li {
        list-style: none;
      }
    }
    .address-header {
      background-color: #fff;

      ul {
        display: flex;
        justify-content: space-around;
        align-items: stretch;

        li {
          display: inline-block;
          padding: 10px 10px 7px;

          &.active {
            border-bottom: #52697f solid 3px;
            color: #52697f;
          }
        }
      }
    }
    .address-container {
      background-color: #fff;

      ul {
        height: 100%;
        overflow: auto;

        li {
          padding: 8px 10px;
          border-top: 1px solid #f6f6f6;

          &.active {
            color: #52697f;
          }
        }
      }
    }
  }

  .ty-distpicker {
    margin-bottom: 20px;
  }
</style>
<style>
  .AddUser .el-header {
    border: 1px solid rgba(228, 228, 228, 1);
    height: 80px;
    background-color: rgba(249, 249, 249, 1);
  }

  .ty-el-main-list1 .el-input {
    width: 200px;
  }

  .ty-el-main-list1 .el-input__inner {
    height: 30px;
  }

  .el-footer {
    text-align: right;
  }
</style>
