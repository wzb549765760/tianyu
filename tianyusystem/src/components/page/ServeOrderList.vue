<template>
  <el-container class="ServeOrderList">
    <el-header style="height: 100%">
      <el-row>
        <div class="ty-header-list1">
          <!--<el-col :span="2"><i class="el-icon-menu"></i> 商品列表</el-col>-->
          <!--<el-breadcrumb-item><i class="el-icon-menu"></i> 商品列表</el-breadcrumb-item>-->
          <!--<el-col :span="2"    class="ty-el-col-header"><div class="grid-content bg-purple ty-catalogue-list1">
            <span>全部<span></span></span>
          </div></el-col>-->
          <el-col :span="2" :offset="1" class="ty-el-col-header">
            <div class="grid-content bg-purple ty-catalogue-list1" @click="sublist('0')">
              <span>服务中<span></span></span>
            </div>
          </el-col>
          <el-col :span="2" :offset="1" class="ty-el-col-header">
            <div class="grid-content bg-purple ty-catalogue-list1" @click="sublist('1')">
              <span>已完成<span></span></span>
            </div>
          </el-col>
        </div>
        <div class="ty-header-list2">
          <el-col :span="24"><i class="el-icon-search"></i> 筛选查询</el-col>
        </div>
        <div class="ty-header-list3">
          <!--<el-form>-->
          <!--<el-form-item label="服务编号" class="ty-shaixuan-list1">-->
          <!--<el-input></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="服务编号" class="ty-shaixuan-list1">-->
          <!--<el-input></el-input>-->
          <!--</el-form-item>-->
          <!--</el-form>-->
          <div class="ty-shaoxuan-content">
            <div class="ty-shaixuan-list1">
              <span>服务订单：</span>
              <el-col :span="6">
                <div class="grid-content bg-purple"></div>
              </el-col>
              <el-input placeholder="请输入服务订单编号" class="searchBox" v-model="query.no"></el-input>
              <!--<el-button icon="el-icon-search" type="primary"></el-button>-->
            </div>
            <div class="ty-shaixuan-list1">
              <span>账号信息：</span>
              <el-col :span="6">
                <div class="grid-content bg-purple"></div>
              </el-col>
              <el-input placeholder="请输入电话/姓名" class="searchBox" v-model="query.mobile"></el-input>
              <el-button @click="sublist('')">筛选</el-button>
              <el-button @click="AddServerCommodityOrder">新增订单</el-button>
            </div>
          </div>
        </div>
      </el-row>

    </el-header>
    <el-main><!-- 編輯彈窗頁面 catalogueDialog"-->
      <div class="ty-header-list2">
        <el-col :span="2"><i class="el-icon-document"></i> 订单列表</el-col>
        <div class="ty-button">
          <el-button size="mini" @click="matter">待办事项</el-button>
          <!--<span class="ty-ico-1 ty-ico-list" @click="remarks"><i class="el-icon-document"></i></span>-->
          <el-button size="mini" @click="pushRemind">推送提醒</el-button>
          <!--<span class="ty-ico-2 ty-ico-list"><i class="el-icon-document"></i></span>-->
          <el-button size="mini" @click="ecord">记录服务</el-button>
          <!--<span class="ty-ico-3 ty-ico-list"><i class="el-icon-document"></i></span>-->
          <el-button size="mini" @click="Upload">上传报告</el-button>
          <!--<span class="ty-ico-4 ty-ico-list"><i class="el-icon-document"></i></span>-->
        </div>
      </div>

      <!--TODO 订单列表-->
      <el-table :data="tableData" style="width: 100%" highlight-current-row :row-class-name="tableRowClassName" @current-change="handleSelectionChange">
        <!--<el-table-column type="selection" width="50"></el-table-column>-->
        <el-table-column type="index" :index="indexMethod"></el-table-column>
        <el-table-column prop="commodityName" label="名称" width=""></el-table-column>
        <el-table-column prop="no" label="服务订单编号"></el-table-column>
        <el-table-column prop="createDate" label="时间"></el-table-column>
        <el-table-column prop="mobile" label="电话">
        </el-table-column>
        <el-table-column prop="resNo" label="商品订单编号"></el-table-column>
        <el-table-column prop="source" label="来源"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>

        <!--编辑-->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handlecompile(scope.$index, scope.row.id,scope.row.status)">查看订单
            </el-button>
          </template>
        </el-table-column>
        <!--删除-->
        <el-table-column label="">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="editformdelet(scope.$index, scope.row.id)">服务跟踪
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--TODO 页数标签-->
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
    <!--bution弹窗待办事项-->
    <div class="button-el-dialog">
      <el-dialog
        :modal="false"
        title="代办理事项"
        :visible.sync="centerDialogVisible"
        width="25%"
        center>
        <el-form :model="formInline">
          <el-form-item prop="date1" label="时间" :label-width="formLabelWidth">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" :picker-options="pickerOptions0"
                            value-format="yyyy-MM-dd"></el-date-picker>
            <!--<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>-->
          </el-form-item>
          <el-form-item label="服务内容" :label-width="formLabelWidth">
            <el-input v-model="ruleForm.content"></el-input>
          </el-form-item>
          <el-form-item label="提醒时间" :label-width="formLabelWidth">
            <el-select placeholder="状态" v-model="ruleForm.warmPreDay">
              <!--<el-option label="区域一" value="shanghai"></el-option>-->
              <!--<el-option label="区域二" value="beijing"></el-option>-->
              <el-option
                v-for="item in optionsruleForm"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="clickmatter">确 定</el-button>
    </span>
      </el-dialog>
    </div>
    <!--button推送提醒弹窗-->
    <div class="button-el-dialog">
      <el-dialog
        :modal="false"
        title="推送信息"
        :visible.sync="centerDialogVisibletuisong"
        width="25%"
        center>
        <el-form :model="formInline">
          <el-form-item label="推送时间" :label-width="formLabelWidth">
            <!--<el-input></el-input>-->
            <el-date-picker v-model="updataOrder.time" type="datetime" :picker-options="pickerBeginDateBefore"
                            placeholder="选择日期时间" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="推送内容" :label-width="formLabelWidth">
            <el-input v-model="updataOrder.notice"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisibletuisong = false">取 消</el-button>
      <el-button type="primary" @click="confirmbutton">确 定</el-button>
    </span>
      </el-dialog>
    </div>
    <!--button记录服务-->
    <div class="button-el-dialog">
      <el-dialog
        :modal="false"
        title="记录服务"
        :visible.sync="centerDialogVisiblejilu"
        width="25%"
        center>
        <el-form :model="formInline">
          <el-form-item label="时间" :label-width="formLabelWidth">
            <el-date-picker v-model="updataOrder1.time" type="datetime" placeholder="选择日期时间" format="yyyy-MM-dd HH:mm"
                            value-format="yyyy-MM-dd HH:mm">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="名称" :label-width="formLabelWidth">
            <!--<el-input v-model="updataOrder1.productName"></el-input>-->
            <el-select placeholder="状态" v-model="updataOrder1.productName">
              <!--<el-option label="区域一" value="shanghai"></el-option>-->
              <!--<el-option label="区域二" value="beijing"></el-option>-->
              <el-option
                v-for="item in optionsajax"
                :label="item.productName"
                :value="item.productName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="updataOrder1.remark"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisiblejilu = false">取 消</el-button>
      <el-button type="primary" @click="confirmecord">确 定</el-button>
    </span>
      </el-dialog>
    </div>
    <!--button上传报错-->
    <div class="button-el-dialog">
      <el-dialog
        :modal="false"
        title="上传档案"
        :visible.sync="centerDialogVisibleuplodat"
        width="25%"
        center>
        <el-form :model="formInline">
          <el-form-item label="档案类型" :label-width="formLabelWidth">
            <el-select placeholder="状态" v-model="idtype">
              <!--<el-option label="区域一" value="shanghai"></el-option>-->
              <!--<el-option label="区域二" value="beijing"></el-option>-->
              <el-option
                v-for="item in optionsuplodat"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          </el-form-item>
          <el-form-item label="档案附件" :label-width="formLabelWidth">
            <el-upload
              class="upload-demo"
              ref='idCardUrl'
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
          </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
      <el-button @click="closeNew1">取 消</el-button>
      <el-button type="primary" @click="confirmupload">确 定</el-button>
    </span>
      </el-dialog>
    </div>

    <!--新增订单弹窗  新增商品服务订单 AddServerCommodityOrder-->
    <el-dialog
      title="新增商品服务订单"
      :visible.sync="centerDialogVisibleAdd"
      width="600px"
      :modal-append-to-body='false'
      center>
      <!--<span>需要注意的是内容是默认不居中的</span>-->
      <div class="ty-el-main-list1">

        <div class="ty-content">
          <p class="ty-p-one">服务使用人信息</p>
          <div class="ty-content-div-list">
            <span>  &#12288&#12288昵称：</span>
            <el-input v-model="servicepeople.name"></el-input>
          </div>
          <div class="ty-content-div-list">
            <span>  &#12288&#12288电话：</span>
            <el-input v-model="servicepeople.mobile"></el-input>
          </div>
          <div class="ty-content-div-list">
            <span>  &#12288&#12288身份证号：</span>
            <el-input v-model="servicepeople.idCardNum"></el-input>
          </div>
          <div class="ty-content-div-list">
            <span>  &#12288&#12288性别：</span>
            <el-radio v-model="servicepeople.sex" label=1>男</el-radio>
            <el-radio v-model="servicepeople.sex" label=2>女</el-radio>
          </div>
          <div class="ty-content-div-list">
            <span>  &#12288&#12288年龄：</span>
            <el-input v-model="servicepeople.age"></el-input>
          </div>
          <!--身份证-->
          <div class="ty-content-div-list">
            <span>  &#12288&#12288身份证正面：</span>
            <el-upload
              class="upload-demo"
              ref='idCardUrl'
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
          <p class="ty-p-one">商品信息</p>
          <div class="ty-content-div-list">
            <!--<span>  &#12288&#12288数量：</span><el-input v-model="nickName"></el-input>-->
            <span>  &#12288&#12288商品：</span>
            <el-select placeholder="状态" v-model="commodityId" @change="callspecification">
              <!--<el-option label="区域一" value="shanghai"></el-option>-->
              <!--<el-option label="区域二" value="beijing"></el-option>-->
              <el-option
                v-for="item in commodity"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>

            <el-select placeholder="状态" v-model="specificationId">
              <!--<el-option label="区域一" value="shanghai"></el-option>-->
              <!--<el-option label="区域二" value="beijing"></el-option>-->
              <el-option
                v-for="item in Specification"
                :label="item.name"
                :value="item.id">
              </el-option>

            </el-select>

          </div>
          <div class="ty-content-div-list">
            <span>  &#12288&#12288数量：</span>
            <el-input v-model="count"></el-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="closeNew">取 消</el-button>
    <el-button type="primary" @click="addnew">确 定</el-button>
  </span>
    </el-dialog>

  </el-container>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";

  export default {
    components: {ElButton},
    name: "orderlist",
    data() {
      return {
        pickerBeginDateBefore: {
          disabledDate(time) {
            return time.getTime() <= Date.now();
          }
        },
        fileList: [],
        upData: {
          type: 1
        },
        optionsuplodat: [ //
          {
            value: 1,
            label: '病例'
          }, {
            value: 2,
            label: '体检报告'
          },
          {
            value: 3,
            label: '健康报告'
          },
          {
            value: 4,
            label: '诊断报告'
          },
          {
            value: 5,
            label: '家属档案'
          }],
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        ruleForm: {
          date1: new Date(),
          content: '',
          warmPreDay: '',
        },
        optionsruleForm: [ //
          {
            value: 1,
            label: '提前一天'
          }, {
            value: 3,
            label: '提前3天'
          },
          {
            value: 7,
            label: '提前一周'
          }],
        updataOrder: {
          time: "",
          updataOrder: '',
        },
        updataOrder1: {
          time: "",
          remark: '',
          productName: '',
        },
        formInline: { //弹窗的 select
          user: '',
          region: ''
        },
        formLabelWidth: '100px',
        searchWorld: '',
        centerDialogVisible: false,//新增弹窗 待办事项的弹窗
//        dialogVisiblespan1:false,//待办事项 span 弹窗
        centerDialogVisibletuisong: false,//推送提醒弹窗
        centerDialogVisiblejilu: false, //记录服务弹窗
        centerDialogVisibleuplodat: false,//上传弹窗
        centerDialogVisibleAdd: false,//新增服务商品订单
        optionsajax: [],//动态获取规格名称
        options: [ //
          {
            value: 'success',
            label: '提前一天'
          }, {
            value: 'pending',
            label: '提前3天'
          },
          {
            value: 'pendi',
            label: '提前一周'
          }],
        /*todo 列表*/
        tableData: [], //列表容器
        //URL前缀
        baseURl: this.$store.state.url,
        token: '',
        currentPage: 1,
        currentSize: 10,
        pageNum: 0,
        multipleSelection: "",
        /*新增商品服务订单弹窗*/
        sexRadio: "1",
        upData: {
          type: 1
        },
        headers: {
          token: localStorage.getItem('currentUser_token')
        },
        fileList: [],

        servicepeople: {
          name: '',
          age: '',
          sex: '1',
          mobile: '',
          idCardNum: '',
          idCardUrl: '',
        },
        commodityType: '服务',
        payType: '对公转账',
        isInvoice: false,
        count: '',
        commodityId: '',
        specificationId: '',
        source: '后台管理',
        commodity: [],
        Specification: [],
        idCardUrl: '',
        idname: '',
        idtype: 1,
        doUserid: '',
        query: {
          status: '',
          mobile: '',
          no: '',
        }
      }
    },
    methods: {
      getUrl(){
        return this.$store.state.url+"/file/upload"
      },
      /*获取select的值*/
      handleSelectionChange(val) {
        this.multipleSelection = val.id;
        this.doUserid = val.userId;
      },
      tableRowClassName(row){
        if (row.number === 1 && this.isActive) {
          return "first-row"
        }else{
          return "";
        }
      },
      gettoken() {
        var self = this
        self.token = localStorage.getItem('currentUser_token');
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
      sublist(status) {//列表的方法
        var self = this;
        var token = localStorage.getItem('currentUser_token');
        var data = {
          pageSize: self.currentSize,//页数量
          pageNum: self.currentPage, //第几页
//            token:token
          query: {
            status: status,
            mobile: self.query.mobile,
            no: self.query.no
          }
        }
        axios.defaults.headers.post['token'] = token
        axios({
          method: 'post',
          url: self.baseURl + '/serviceorder/list',
          data: data,
        }).then(res => {
          if (res.data['code'] == '0') {
            this.tableData = res.data.data.rows
            this.pageNum = parseInt(res.data.data["total"])
            console.log(this.tableData)
//              console.log( this.pageNum )
          }
        })

      },
      handlecompile(index, id, status) { //表单编辑按钮
        var self = this
        self.$router.push({name: 'ServiceOrderDetails', params: {task_id: id, token_TO: this.token, status_TO: status}})
      },
      editformdelet(index, id) {//服务跟踪
        var self = this
        self.$router.push({name: 'Servertracking', params: {task_id: id, token_TO: this.token}})
      },

      matter() { //待办事项点击的
        if (!this.checkVal(this.multipleSelection)) {
          this.$message({
            message: '请选中一条数据',
            type: 'error'
          });
          return;
        }
        this.ruleForm={
          date1: "",
          content: '',
          warmPreDay: '',
        };
        this.centerDialogVisible = true;
        console.log("按钮点击");
      },
      clickmatter() {//代办理事项确定按钮
        var self = this;
        var token = localStorage.getItem('currentUser_token');
        axios.defaults.headers.post['token'] = token
        console.log(token);
        if (!this.checkVal(self.multipleSelection)) {
          self.$message({
            message: '请选中一条数据',
            type: 'error'
          });
          return;
        }
        if (!this.checkVal(self.ruleForm.content)) {
          self.$message({
            message: '服务内容不能为空',
            type: 'error'
          });
          return;
        }
        if (!this.checkVal(self.ruleForm.warmPreDay)) {
          self.$message({
            message: '提醒时间不能为空',
            type: 'error'
          });
          return;
        }
        var data = {
          serviceOrderId: self.multipleSelection,
          content: self.ruleForm.content,
          serviceDate: self.ruleForm.date1,
          warmPreDay: self.ruleForm.warmPreDay
        }
        axios({
          method: 'post',
          url: self.baseURl + '/todolist/add',
          data: data
        }).then(res => {
          console.log(res)
          self.centerDialogVisible = false
        })
      },


      pushRemind() {//推送提醒点击的
        if (!this.checkVal(this.multipleSelection)) {
          this.$message({
            message: '请选中一条数据',
            type: 'error'
          });
          return;
        }
        this.centerDialogVisibletuisong = true;
      },
//        TODO 推送提醒 确定按钮点击事件
      confirmbutton() {
        var self = this;
        var token = localStorage.getItem('currentUser_token');
        axios.defaults.headers.post['token'] = token
        console.log(token);
        if (!this.checkVal(self.multipleSelection)) {
          self.$message({
            message: '请选中一条数据',
            type: 'error'
          });
          return;
        }
        var data = {
          serviceOrderId: self.multipleSelection,
          warmDate: self.updataOrder.time,
          notice: self.updataOrder.notice,//推送的内容
        };
        axios({
          method: 'post',
          url: self.baseURl + '/serviceorder/addpushwarm',
          data: data
        }).then(res => {
          if (res.data.code == "0") {
            self.centerDialogVisibletuisong = false;
            self.$message({
              message: "推送成功",
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

      ecord() {//TODO 记录服务弹窗
        if (!this.checkVal(this.multipleSelection)) {
          this.$message({
            message: '请选中一条数据',
            type: 'error'
          });
          return;
        }
        this.Datails() //调规格详情
        this.centerDialogVisiblejilu = true
      },
      checkVal(val) {
        if (val == "" || val == null || val == undefined) return false;
        return true;
      },

      Datails() { //TODO  请求页面数据
        var self = this;
        if (!this.checkVal(self.multipleSelection)) {
          self.$message({
            message: '请选中一条数据',
            type: 'error'
          });
          return;
        }
        var token = localStorage.getItem('currentUser_token');
//        console.log(token)
        axios.defaults.headers.post['token'] = token
        axios({
          method: 'post',
          url: self.baseURl + '/serviceorder/detail?id=' + self.multipleSelection,
          data: '',
        }).then(res => {
//          console.log(res)
          if (res.data['code'] == '0') {
            self.$message({
              message: '请求规格详情成功',
              type: 'success'
            });
            self.optionsajax = res.data.data.purchaseInfo.specificationDetail.spec2prod
//            console.log( self.optionsajax)
            self.optionsajax.push({productName: '其他'})
//            console.log( self.optionsajax)
          } else {
            self.$message({
              message: '请求规格详情失败失败',
              type: 'error'
            });
          }

//          插入数据进行页面渲染
        })

      },
      confirmecord() {//TODO 记录服务确认按钮
        var self = this;
        var token = localStorage.getItem('currentUser_token');
        axios.defaults.headers.post['token'] = token
        console.log(token);
        if (!this.checkVal(self.multipleSelection)) {
          self.$message({
            message: '请选中一条数据',
            type: 'error'
          });
          return;
        }
        var data = {
          serviceOrderId: self.multipleSelection,
          serviceDate: self.updataOrder1.time,
          remark: self.updataOrder1.remark,
          productName: self.updataOrder1.productName,//推送的内容
        }
        axios({
          method: 'post',
          url: self.baseURl + '/serviceorder/addservicelog',
          data: data
        }).then(res => {
          console.log(res)
          if (res.data['code'] == '0') {
            self.$message({
              message: '添加详情成功',
              type: 'success'
            });
            this.centerDialogVisiblejilu = false
          }

        })
      },

      Upload() {//TODO 档案弹窗
        if (!this.checkVal(this.multipleSelection)) {
          this.$message({
            message: '请选中一条数据',
            type: 'error'
          });
          return;
        }
        this.centerDialogVisibleuplodat = true;
      },
      confirmupload() {
        var self = this;
        var token = localStorage.getItem('currentUser_token');
        axios.defaults.headers.post['token'] = token;
        console.log(token);
        if (!this.checkVal(self.multipleSelection)) {
          self.$message({
            message: '请选中一条数据',
            type: 'error'
          });
          return;
        }
        if (!this.checkVal(self.idtype)) {
          self.$message({
            message: '档案类型不能为空',
            type: 'error'
          });
          return;
        }
        if (!this.checkVal(self.idCardUrl)) {
          self.$message({
            message: '档案附件不能为空',
            type: 'error'
          });
          return;
        }
        var data = {
          serviceOrderId: self.multipleSelection,
          name: self.idname,
          type: self.idtype,//推送的内容
          doUserId: self.doUserid,
          url: self.idCardUrl,
        };
        axios({
          method: 'post',
          url: self.baseURl + '/archive/add',
          data: qs.stringify(data),
        }).then(res => {
          self.centerDialogVisibleuplodat = false;
          self.$refs.idCardUrl.clearFiles();
          self.formInline.region = "";
          /*self.$message({
            type:'success',
            message:'请求成功'
          })*/
        })

      },//TODO  档案上传确定按钮
      handlePreview(file) {
        console.log(file);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleSuccess(response, file, fileList) {
        console.log(response);
        const self = this;
        if (response.code == 0) {
          self.idCardUrl = response.data.url;

        }
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleExceed(files, fileList) {
        fileList = [];
        this.$message.warning(`当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      /*TODO 新增商品服务订单*/
      AddServerCommodityOrder() {
        this.centerDialogVisibleAdd = true
        this.Addcommodity()  //TODO 弹窗打开调用商品列表
      },
      /*上传身份证号*/
      handlePreview(file) {
        console.log(file);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleSuccess(response, file, fileList) {
        console.log(response);
        const self = this;
        if (response.code == 0) {
          self.idCardUrl = response.data.url
          self.idname = response.data.name;
          /*self.idtype = response.data.type;*/
        }
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleExceed(files, fileList) {
        fileList = [];
        this.$message.warning(`当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },

      Addcommodity() { //TODO  获取商品的下拉列表  就要名称和id
        var self = this
        var token = localStorage.getItem('currentUser_token');
        axios.defaults.headers.post['token'] = token
        axios({
          method: 'post',
          url: self.baseURl + '/commodity/list',
          data: {
            pageSize: 10000,
            pageNum: 1
          }
        }).then(res => {
          if (res.data['code'] == '0') {
            /* self.$message({
               message: '成功',
               type: 'success'
             });*/
            self.commodity = res.data.data.rows
            console.log(self.commodity)
          } else {
            self.$message({
              message: '失败',
              type: 'error'
            });
          }

        })

      },
      callspecification() {/*TODO select下拉更改值触发事件事件*/
//        console.log('6666666666666')
//        console.log(this.commodityId)

        var self = this
        self.specificationId = "";
        var token = localStorage.getItem('currentUser_token');
        axios.defaults.headers.post['token'] = token
        axios({
          method: 'post',
          url: self.baseURl + '/commodity/edit?id=' + self.commodityId,
          data: ""
        }).then(res => {
          if (res.data['code'] == '0') {
            /* self.$message({
               message: '成功',
               type: 'success'
             });*/
            self.Specification = res.data.data.specifications
//            console.log( self.Specification)
          } else {
            self.$message({
              message: '失败',
              type: 'error'
            });
          }

        })
      },
      closeNew() {
        this.$refs.idCardUrl.clearFiles();
        this.centerDialogVisibleAdd = false;
        this.idCardUrl = "";
        this.specificationId = "";
        this.commodityId = "";
        this.count = "";
        this.servicepeople = {
          name: '',
          age: '',
          sex: "1",
          mobile: '',
          idCardNum: '',
          idCardUrl: ''
        };
      },
      closeNew1() {
        this.$refs.idCardUrl.clearFiles();
        this.centerDialogVisibleuplodat = false;
        this.formInline.region = "";
      },


//      TODO 新增商品订单确定按钮
      addnew() {
        var self = this
        var token = localStorage.getItem('currentUser_token');
        axios.defaults.headers.post['token'] = token;

        axios({
          method: 'post',
          url: self.baseURl + '/purchaseorder/add',
          data: {
            servicepeople: {
              name: self.servicepeople.name,
              age: parseInt(self.servicepeople.age),
              sex: parseInt(self.servicepeople.sex),
              mobile: self.servicepeople.mobile,
              idCardNum: self.servicepeople.idCardNum,
              idCardUrl: self.idCardUrl,
            },
            commodityType: self.commodityType,
            payType: self.payType,
            isInvoice: self.isInvoice,
            count: parseInt(self.count),
            commodityId: self.commodityId,
            specificationId: self.specificationId,
            source: self.source,
          }
        }).then(res => {
          if (res.data['code'] == '0') {
            self.servicepeople = {
              name: '',
              age: '',
              sex: "1",
              mobile: '',
              idCardNum: '',
              idCardUrl: ''
            };
            self.specificationId = "";
            self.commodityId = "";
            self.count = "";
            this.$refs.idCardUrl.clearFiles();
            self.centerDialogVisibleAdd = false
            /*      self.commodity=res.data.data.rows
                  console.log(self.commodity)*/
          } else {
            self.$message({
              message: '失败',
              type: 'error'
            });
          }

        })
      }

    },
    mounted() {
      this.sublist(); //
      this.gettoken()
    },
    created() {
      // if (this.$route.params.id) {
      //   this.params=this.$route.params;
      //   this.$store.state.vuexs.id=this.$route.params.id
      // }else{
      //   this.params.id=this.$store.state.vuexs.id;
      // }
    }
  }
</script>

<style scoped>

  /*.ty-catalogue-list1:nth-child(1){*/
  /*background: rgba(26, 188, 156, 0.8);*/
  /*color: white;*/
  /*}*/
  .current-row{
    background-color: red;
  }

  .ty-catalogue-list1 {
    text-align: center;
    height: 30px;
    line-height: 30px;
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid rgba(228, 228, 228, 1);
  }

  .ty-header-list1 {
    font-size: 13px;
    height: 80px;
    background: rgba(249, 249, 249, 1);
    /*line-height: 80px;*/
  }

  .ty-el-col-header {
    height: 30px;
    padding: 25px 0;
  }

  .ty-el-col-header span {
    cursor: pointer;
  }

  .ty-header-list2 {
    padding-left: 20px;
    line-height: 50px;
    height: 50px;
    background-color: rgba(243, 243, 243, 1);
    border: 1px solid rgba(228, 228, 228, 1);
    width: 100%;
    font-size: 12px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .ty-shaixuan-list1 {
    height: 80px;
    display: inline-block;
  }

  .ty-shaoxuan-content {
    height: 80px;
    line-height: 80px;
    background-color: rgba(255, 255, 255, 1);
    font-size: 14px;
    border: 1px solid rgba(228, 228, 228, 1);
    padding-left: 20px;
  }

  .ty-button .el-button {
    margin-right: 15px;
  }

  .ty-ico-1 {
    position: absolute;
    top: -15px;
    left: 67px;
  }

  .ty-ico-2 {
    position: absolute;
    top: -15px;
    left: 166px;
  }

  .ty-ico-3 {
    position: absolute;
    top: -15px;
    left: 266px;
  }

  .ty-ico-4 {
    position: absolute;
    top: -15px;
    left: 366px;
  }

  .ty-button {
    float: right;
    position: relative;
    padding-right: 30px;
  }

  .ty-ico-list .el-icon-document {
    background: #138CDD;
    color: white;
    width: 13px;
    height: 12px;
  }

  /*.ty-ico-list{*/
  /*width: 13px;*/
  /*height: 12px;*/
  /*}*/
  .ty-content-div-list {
    margin-bottom: 30px;
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
</style>
<style>

  .current-row > td {
    background-color: #CCE8FF !important;
  }
  .ServeOrderList .el-header {
    padding: 0px;
  }

  .ServeOrderList .el-input {
    width: 200px;
  }

  .ty-shaixuan-list1 .el-input__inner {
    height: 35px;
  }

  .ServeOrderList .el-header {
    height: 100%;
  }

  .ServeOrderList .el-main {
    padding: 0;
    overflow: hidden;
  }

  .ServeOrderList .button-el-dialog .el-dialog {
    background-color: rgba(215, 215, 215, 1);
    /*width: 300px;*/
    /*height: 202px;*/
  }

  .ServeOrderList .el-dialog .el-input {
    /*width: 165px;*/
    padding-bottom: 3px;
  }

  .ServeOrderList .el-dialog .el-input__inner {
    height: 30px;
    padding-bottom: 3px;
  }

  .ServeOrderList .span-el-dialog .el-dialog__header {
    background: #8f949a;
    min-width: 580px;
    padding: 0px 19px 6px;
  }

  .ServeOrderList .span-el-dialog.el-dialog__headerbtn .el-dialog__close {
    color: #303030;
  }

  .ServeOrderList .span-el-dialog .el-dialog__headerbtn {
    position: absolute;
    top: 0px;
    right: 0px;
  }
</style>
