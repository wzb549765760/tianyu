<template>
  <el-container class="ServiceList">
    <el-header>
      <el-row :gutter="20">
        <el-col :span="2"><i class="el-icon-menu"></i> 服务列表</el-col>
        <div class="ty-service-add">
          <el-button icon="el-icon-plus" @click="handleAdd">新增服务</el-button>
        </div>
      </el-row>
    </el-header>
    <el-main>
      <!--列表数据-->
      <el-table :data="tableData" style="width: 100%"> //v-for="item in items"
        <el-table-column type="index" :index="indexMethod"></el-table-column>
        <el-table-column prop="name" label="名称" width=""></el-table-column>
        <el-table-column prop="no" label="编号"></el-table-column>
        <el-table-column prop="needDoctor" label="医生" :formatter="judege">
        </el-table-column>
        <el-table-column prop="usedByFamily" label="家属" :formatter="famege"></el-table-column>
        <el-table-column prop="needTimeOfAppointment" label="预约" :formatter="judege"></el-table-column>
        <el-table-column prop="preDayOfAppointment" label="提前天数"></el-table-column>

        <el-table-column prop="consultationType" label="咨询类别"></el-table-column>
        <el-table-column prop="needConditionComplaint" label="病情主诉" :formatter="judege"></el-table-column>
        <el-table-column prop="needCaseAppendage" label="病例附件" :formatter="judege"></el-table-column>
        <el-table-column prop="detail" label="服务详情"></el-table-column>

        <el-table-column prop="updateDate" label="时间"></el-table-column>
        <!--编辑-->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handlecompile(scope.$index, scope.row)">编辑
            </el-button>
          </template>
        </el-table-column>
        <!--删除-->
        <el-table-column label="">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="editformdelet(scope.$index, scope.row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--页数标签-->
      <div class="pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          background
          layout="sizes,prev, pager, next"
          :total="pageNum">
        </el-pagination>
      </div>
    </el-main>
    <!--新建彈窗頁面 "-->
    <el-dialog
      :modal="false"
      title="服务信息"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form :model="formInline">
        <span>基本信息：</span>
        <!--<el-form-item label="服务编号" :label-width="formLabelWidth">-->
        <!--<el-input></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="详情" :label-width="formLabelWidth">
          <el-input v-model="formInline.detail"></el-input>
        </el-form-item>
        <el-form-item label="保健医" :label-width="formLabelWidth">
          <el-select placeholder="状态" v-model="formInline.needDoctor">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="家属可用" :label-width="formLabelWidth">
          <el-select placeholder="状态" v-model="formInline.usedByFamily">
            <el-option
              v-for="item in optionyesno"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

        </el-form-item>
        <span>预约时间：</span>
        <el-form-item label="需要预约" :label-width="formLabelWidth">
          <el-select placeholder="状态" v-model="formInline.needTimeOfAppointment">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="预约提前时间" :label-width="formLabetimelWidth">
          <el-select placeholder="状态" v-model="formInline.preDayOfAppointment">
            <el-option
              v-for="item in optionsday"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="咨询类别" :label-width="formLabelWidth">
          <el-select placeholder="状态" v-model="formInline.consultationType">
            <el-option
              v-for="item in consult"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="病情主诉" :label-width="formLabelWidth">
          <el-select placeholder="状态" v-model="formInline.needConditionComplaint">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="病例附件" :label-width="formLabelWidth">
          <el-select placeholder="状态" v-model="formInline.needCaseAppendage">
            <!--<el-option label="区域一" value="shanghai"></el-option>-->
            <!--<el-option label="区域二" value="beijing"></el-option>-->
            <el-option
              v-for="item in options"
              :value="item.value"
              :label="item.label"
            >
            </el-option>
          </el-select>

        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="newserve">确 定</el-button>
  </span>
    </el-dialog>

    <!--编辑弹窗-->
    <el-dialog
      :modal="false"
      title="服务信息"
      :visible.sync="dialogVisiblecompile"
      width="30%"
    >
      <el-form :model="formInline2">
        <span>基本信息：</span>
        <!--<el-form-item label="服务编号" :label-width="formLabelWidth">-->
        <!--<el-input></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="formInline2.name"></el-input>
        </el-form-item>
        <el-form-item label="保健医" :label-width="formLabelWidth">
          <el-select placeholder="状态" v-model="formInline2.needDoctor">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="家属可用" :label-width="formLabelWidth">
          <el-select placeholder="状态" v-model="formInline2.usedByFamily">
            <el-option
              v-for="item in optionyesno"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

        </el-form-item>
        <span>预约时间：</span>
        <el-form-item label="需要预约" :label-width="formLabelWidth">
          <el-select placeholder="状态" v-model="formInline2.needTimeOfAppointment">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="预约提前时间" :label-width="formLabetimelWidth">
          <el-select placeholder="状态" v-model="formInline2.preDayOfAppointment">
            <el-option
              v-for="item in optionsday"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="咨询类别" :label-width="formLabelWidth">
          <el-select placeholder="状态" v-model="formInline2.consultationType">
            <el-option
              v-for="item in consult"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="病情主诉" :label-width="formLabelWidth">
          <el-select placeholder="状态" v-model="formInline2.needConditionComplaint">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="病例附件" :label-width="formLabelWidth">
          <el-select placeholder="状态" v-model="formInline2.needCaseAppendage">
            <!--<el-option label="区域一" value="shanghai"></el-option>-->
            <!--<el-option label="区域二" value="beijing"></el-option>-->
            <el-option
              v-for="item in options"
              :value="item.value"
              :label="item.label"
            >
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="详情" :label-width="formLabelWidth">
          <el-input v-model="formInline2.detail"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisiblecompile = false">取 消</el-button>
    <el-button type="primary" @click="handleEdit">确 定</el-button>
  </span>
    </el-dialog>
  </el-container>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "service-list",
    data() {
      return {
        //URL前缀
        baseURl: this.$store.state.url,
        token: '',
        currentPage: 1,
        currentSize: 10,
        pageNum: 0,
        tableData: [], //列表数据总管理
        formInline: { //弹窗的 select
          needCaseAppendage: '',//是否需要病例附件
          needConditionComplaint: '', //是否需要病情主诉
          consultationType: '',//咨询类别
          preDayOfAppointment: '', //预约提前天数
          needTimeOfAppointment: '',//是否需要预约
          usedByFamily: '',//家属是否可用
          needDoctor: '', //保健医生 需要、不惜要
          detail: '',//详情
          name: '',//名称
          productType: '',//服务类型
        },
        formInline2: { //用于编辑弹窗的饿拷贝
          needCaseAppendage: '',//是否需要病例附件
          needConditionComplaint: '', //是否需要病情主诉
          consultationType: '',//咨询类别
          preDayOfAppointment: '', //预约提前天数
          needTimeOfAppointment: '',//是否需要预约
          usedByFamily: '',//家属是否可用
          needDoctor: '', //保健医生 需要、不惜要
          detail: '',//详情
          name: '',//名称
          productType: '',//服务类型
        },
        formLabelWidth: '100px',
        formLabetimelWidth: '100px',
        dialogVisible: false,  //新增弹窗
        dialogVisiblecompile: false, //编辑弹窗
        //
        options: [
          {
            value: true,
            label: '需要'
          }, {
            value: false,
            label: '不需要'
          }],

        //预约时间
        optionsday: [
          {
            value: 1,
            label: '1天'
          }, {
            value: 3,
            label: '3天'
          }, {
            value: 7,
            label: '7天'
          },
        ],
        //家属是否可用
        optionyesno: [
          {
            value: false,
            label: '否'
          }, {
            value: true,
            label: '是'
          },
        ],
//            咨询类别
        consult: [
          {
            value: '需要',
            label: '需要'
          },
          {
            value: '不需要',
            label: '不需要'
          }
        ]
        // rules: { //弹窗的验证
        //   order_number: [
        //     {
        //       required: true,
        //       message: "请输入订单名",
        //       trigger: 'blur'
        //     }],
        //   company: [
        //     {
        //       required: true,
        //       message: "请输入company名",
        //       trigger: 'blur'
        //     }
        //   ],
        //   status: [
        //     {
        //       required: true,
        //       message: "请输入status",
        //       trigger: 'change'
        //     }
        //   ]
        //
        // },
      }
    },
    methods: {
      gettoken() {
        var self = this
        self.token = localStorage.getItem('currentUser_token');
      },
//  TODO 后台返回的true 、false
      judege(row, column, cellValue, index) {
//          debugger
//          console.log(cellValue)
        return cellValue ? '需要' : '不需要';
      },

      famege(row, column, cellValue, index) { //家属是否可用
        return cellValue ? '是' : '否';
      },
      handleAdd(row, index) {  //新增服务的弹窗开关
        this.formInline = { //弹窗的 select
          needCaseAppendage: '',//是否需要病例附件
          needConditionComplaint: '', //是否需要病情主诉
          consultationType: '',//咨询类别
          preDayOfAppointment: '', //预约提前天数
          needTimeOfAppointment: '',//是否需要预约
          usedByFamily: '',//家属是否可用
          needDoctor: '', //保健医生 需要、不惜要
          detail: '',//详情
          name: '',//名称
          productType: '',//服务类型
        };
        this.dialogVisible = true;
      },
      handlecompile(index, row) { //编辑的弹窗开关
        var self = this
        self.dialogVisiblecompile = true;
        self.formInline2 = Object.assign({}, row);
//          console.log(index,row,555)
//          console.log( this.formInline2)
      },
//TODO   新建服务确定按钮
      newserve() {
        var self = this
//          var token=localStorage.getItem('currentUser_token')
        var data = {
          needCaseAppendage: self.formInline.needCaseAppendage,//病例附件
          needConditionComplaint: self.formInline.needConditionComplaint,//病情主诉
          consultationType: self.formInline.consultationType, //咨询类别
          preDayOfAppointment: self.formInline.preDayOfAppointment, //预约提前天数
          needTimeOfAppointment: self.formInline.needTimeOfAppointment, //需要预约
          usedByFamily: self.formInline.usedByFamily, //家属是否可用
          needDoctor: self.formInline.needDoctor, //是否需要医生
          detail: self.formInline.detail,   // 详情
          name: self.formInline.name, // 名称
          productType: '', //服务类别

        };
        axios.defaults.headers.post['token'] = self.token
        axios({
          method: 'post',
          url: self.baseURl + '/product/add',
          data: data
        }).then(res => {
          if (res.data['code'] == '0') {
            console.log(res)
            self.dialogVisible = false  //关闭弹窗
            self.sublist() //刷新列表 在此请求数据
            self.formInline = {}
            self.$message({
              message: '创建新增成功',
              type: 'success'
            });
          } else {
            self.$message({
              message: '创建新增失败请从新填写',
              type: 'error'
            });
          }
        })
      },
//TODO 列表信息
      indexMethod(index) {
        return index * 1+1;
      },
//TODO 页数管理
      handleSizeChange(val) {
        this.currentSize = val;
        this.sublist()
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.sublist()
      },
//TODO 请求页面表单数据
      sublist() {
//          console.log('请求加载')
        var self = this;
        var token = localStorage.getItem('currentUser_token');
        var data = {
          pageSize: self.currentSize,//页数量
          pageNum: self.currentPage, //第几页
//            token:token
        }
        axios.defaults.headers.post['token'] = token
        axios({
          method: 'post',
          url: self.baseURl + '/product/list',
          data: data,
        }).then(res => {
          if (res.data['code'] == '0') {
            this.tableData = res.data.data.rows
            this.pageNum = parseInt(res.data.data["total"])
//              console.log(this.tableData)
//              console.log( this.pageNum )
          }
        })

        /*          console.log('请求加载')
                  var self =this;
                  var token=localStorage.getItem('currentUser_token');
                  var data={
                    pageSize:self.currentSize ,//页数量
                    pageNum:self.currentPage, //第几页
        //            token:token
                  }
                    axios({
                    method:'post',
                    url:self.baseURl+'/product/list?token='+token,
                    data:data,
                    hedaes:{'Authorization':token}
                  }).then(res=>{
                     if(res.data['code']=='0'){
                       this.tableData=res.data.data.rows
                       this.pageNum = parseInt(res.data.data["total"])
                       console.log(this.tableData)
                       console.log( this.pageNum )
                       console.log(this)
                     }
                  })*/
      },

//TODO 表单编辑确定按钮
      handleEdit(index, row) {
        var self = this
        console.log(index, row)
//          this.dialogVisible=true;
//          this.formInline2= Object.assign({}, row);
//          console.log( this.formInline)
        axios.defaults.headers.post['token'] = self.token
        axios({
          method: 'post',
          url: self.baseURl + '/product/update',
          data: self.formInline2,

        }).then(res => {
          if (res.data['code'] == '0') {
//              console.log('编辑成功')
            this.$message({
              showClose: true,
              type: 'success',
              message: '編輯成功'
            });
            this.dialogVisiblecompile = false
            this.sublist()
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: '编辑失败请检车从新编辑'
            });
          }
        })
      },
//TODO 表单的删除
      editformdelet(index, id) {
        var self = this
        var id = id
        console.log(id)
        axios.defaults.headers.post['token'] = self.token
        axios({
          method: 'post',
          url: self.baseURl + '/product/delete?id=' + id,
          data: ''
        }).then(res => {
          if (res.data['code'] == '0') {
            console.log('删除成功')
            this.sublist() //调用列表
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          } else {
            console.log(res.data.desc)
          }
        })
      },
    },
    mounted() {
      this.sublist(); //
      this.gettoken()
    }
  }
</script>

<style scoped>
  .el-header {
    background: rgba(252, 252, 252, 1);
    padding: 8px 20px;
    border: 1px solid rgba(228, 228, 228, 1);
    /*border-bottom: 1px solid #cccccc;*/
    height: 50px;
  }

  .el-row {
    background: rgba(252, 252, 252, 1);
    height: 50px;
  }

  .el-col {
    border-radius: 4px;
  }

  .catalogue .el-input {
    width: 200px;
  }

  .grid-content :hover {
    /*background: rgba(26, 188, 156, 0.8);*/
    color: rgba(26, 188, 156, 0.8);;
  }

  .ty-service-add {
    float: right;
    margin-right: 200px;
  }

  .pages {
    /*position: fixed;*/
    bottom: 50px;
    right: 50px;
    line-height: 0 !important;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>
<style>
  .ServiceList .el-input {
    height: 30px;
  }

  .ServiceList .el-input__inner {
    /*width: 200px;*/
    height: 30px;
    line-height: 30px;
  }

  .ServiceList .el-form-item__label {
    height: 30px;
    line-height: 30px;
  }

  .ServiceList .el-form-item {
    margin: 0;
  }

  .ServiceList .el-input__icon {
    line-height: 30px;
  }
</style>
