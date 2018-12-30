<template>
  <el-container class="AddUser">
    <el-header>
      <div class="ty-header-div1"><p class="ty-headr-p"><span>基本信息</span></p></div>
    </el-header>
    <el-main>
      <div class="ty-el-main-list1">

        <div class="ty-content">
          <p class="ty-p-one">账户信息</p>
          <div class="ty-content-div-list">
            <span>  &#12288&#12288昵称：</span>
            <el-input v-model="nickName" placeholder="*必填请输入"></el-input>
            <span>  &#12288&#12288手机号码：</span>
            <el-input v-model="mobile" placeholder="*必填请输入"></el-input>
          </div>
          <div class="ty-content-div-list">
            <span>  &#12288&#12288密码：</span>
            <el-input v-model="pwd" placeholder="必填请输入"></el-input>
          </div>
          <div :model="formInline" class="ty-content-div-list">
            <span>  &#12288&#12288用户类型：</span>
            <el-select v-model="formInline.region">
              <el-option v-for="item in options3"
                         :value="item.value"
                         :label="item.label"></el-option>
            </el-select>
          </div>
          <p class="ty-p-one">详细信息</p>
          <div class="ty-content-div-list">
            <span>  &#12288&#12288姓名：</span>
            <el-input v-model="name" placeholder="*必填请输入"></el-input>
            <span>  &#12288&#12288性别：</span>
            <el-radio v-model="sexRadio" label="1">男</el-radio>
            <el-radio v-model="sexRadio" label="2">女</el-radio>
            <span>  &#12288&#12288民族：</span>
            <el-input v-model="nationality"></el-input>
          </div>
          <div class="ty-content-div-list" :model="form">
            <span>  &#12288&#12288年龄：</span>
            <el-input v-model="age" placeholder="*必填请输入"></el-input>
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
              @change="handleChange">
            </el-cascader>
            <el-input placeholder="详细地址" v-model="addDetail1"></el-input>
          </div>
          <!--户籍地-->
          <div class="distpicker-address-wrapper ty-distpicker">
            <span>&#12288&#12288户籍地：</span>
            <el-cascader
              :options="options2"
              v-model="selectedOptions2"
              @change="handleChange">
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
          <!--<p class="ty-p-one">紧急联系人信息</p>
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
          </div>-->
        </div>
      </div>
    </el-main>
    <el-footer>
      <div class="ty-right-anniu">
        <el-button @click="userSubmit">保存</el-button>
        <el-button @click="backToOne">取消</el-button>
      </div>
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
    name: 'v-distpicker',
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
        delivery: false,//账户启用状态按钮
        checked1: false, //男
        checked2: false, //女
        form: { //生日时间
          date1: '',
        },
        formInline: { //弹窗的 select
          user: '',
          region: "1"
        },
        options3: [ //下拉
          {
            value: "1",
            label: '用户'
          }, {
            value: "2",
            label: '医生'
          },
          {
            value: "3",
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
      getUrl(){
        return this.$store.state.url+"/file/upload"
      },
      backToOne(){
        this.$router.back()
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
      checkVal(val) {
        if (val == null || val == "" || val == undefined) return false;
        return true;
      },

      userSubmit() {
        const self = this;
        if (!self.checkVal(self.nickName)) {
          self.$message({
            message: "昵称不能为空",
            type: 'error'
          });
          return;
        }
        if (!self.checkVal(self.mobile)) {
          self.$message({
            message: "手机号码不能为空",
            type: 'error'
          });
          return;
        }
        if (!self.checkVal(self.name)) {
          self.$message({
            message: "姓名不能为空",
            type: 'error'
          });
          return;
        }
        if (!self.checkVal(self.age)) {
          self.$message({
            message: "年龄不能为空",
            type: 'error'
          });
          return;
        }
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
          surgeryDiseaseHistory: self.surgeryDiseaseHistory
        }
        axios.defaults.headers.post['token'] = self.headers.token;
        axios({
          method: "post",
          url: self.baseURl + "/user/add",
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
</style>
