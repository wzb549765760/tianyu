<template>
  <el-container>
    <el-header>医生/医院管理
      <div class="ty-service-add">
        <el-button icon="el-icon-plus" @click="handleAdd">新增</el-button>
      </div>

    </el-header>

    <el-main>
      <el-radio-group v-model="radio3" @change="tabChange">
        <el-radio-button label="医生" style="width: 70px"></el-radio-button>
        <el-radio-button label="医院"></el-radio-button>
      </el-radio-group>
      <el-table
        :data="tableData2"
        border

        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="编号"
          :resizable='false'
          align="center"
          width="">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          :resizable='false'
          align="center"
          width="">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          :resizable='false'
          label="名称">
        </el-table-column>
        <el-table-column
          prop="detail"
          align="center"
          :resizable='false'
          label="特色">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="desc"
          align="center"
          :resizable='false'
          label="简介">
        </el-table-column>
        <el-table-column
          align="center"
          :resizable='false'
          label="图片">
          <template slot-scope="scope" style="width: 50px">
            <img :src="scope.row.img" alt="" style="width: 100px;height: 110px;">
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          align="center"
          :resizable='false'
          label="操作">
          <template slot-scope="scope">
            <span class="see-dd" @click="edit(scope.row)">编辑</span>
            <span class="see-dd" @click="delete1(scope.row)">删除</span>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <!--<el-dialog
      :modal="false"
      title="医生/医院信息"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form :model="formInline">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
      &lt;!&ndash;  <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio-group v-model="1">
            <el-radio  :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>&ndash;&gt;

        <el-form-item label="详情" :label-width="formLabelWidth">
          <el-input v-model="formInline.detail"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="">确 定</el-button>
  </span>
    </el-dialog>-->
    <div class="serves-add" v-show="addShow">
      <div>
        <div>
          <label style="text-align: center;width: 100%;font-size: 20px">医生/医院信息</label>

        </div>
        <div>
          <label>&nbsp&nbsp&nbsp类 &nbsp 型&nbsp;:&nbsp;</label>
            <el-radio v-model="docAdd.type" label="5"><span style="font-size: 18px !important;">医生</span></el-radio>
            <el-radio v-model="docAdd.type" label="6"><span style="font-size: 18px !important;">医院</span></el-radio>
        </div>
        <div>
          <label>&nbsp&nbsp&nbsp名 &nbsp 称&nbsp;:&nbsp;</label>
          <input type="text" v-model="docAdd.name"  placeholder="请输入医生姓名或医院名称">
        </div>
        <div>
          <label>&nbsp&nbsp&nbsp特 &nbsp 色&nbsp;:&nbsp;</label>
          <input type="text" maxlength="20" v-model="docAdd.detail" placeholder="请输入医生/医院特色（不超过20字）">
        </div>
        <div>
          <label>&nbsp&nbsp&nbsp简 &nbsp 介&nbsp;:&nbsp;</label>
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入医生/医院的简介（150字以内）"
            :maxlength="150"
            style="width: 360px;"
            v-model="docAdd.desc">
          </el-input>
        </div>
        <div>
          <label>&nbsp&nbsp&nbsp头像/照片&nbsp;:&nbsp;</label>
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
            <div slot="tip" class="el-upload__tip"></div>
          </el-upload>
        </div>
        <div class="add-btn">
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button type="info" @click="addTab">取消</el-button>
        </div>
      </div>
    </div>
    <div class="serves-add" v-show="editShow">
      <div>
        <div>
          <label style="text-align: center;width: 100%;font-size: 20px">医生/医院信息</label>

        </div>
        <div>
          <label>&nbsp&nbsp&nbsp类 &nbsp 型&nbsp;:&nbsp;</label>
          <el-radio v-model="docAdd.type" label="5" disabled><span style="font-size: 18px !important;">医生</span></el-radio>
          <el-radio v-model="docAdd.type" label="6" disabled><span style="font-size: 18px !important;">医院</span></el-radio>
        </div>
        <div>
          <label>&nbsp&nbsp&nbsp名 &nbsp 称&nbsp;:&nbsp;</label>
          <input type="text" v-model="docAdd.name"  placeholder="请输入医生姓名或医院名称">
        </div>
        <div>
          <label>&nbsp&nbsp&nbsp特 &nbsp 色&nbsp;:&nbsp;</label>
          <input type="text" maxlength="20" v-model="docAdd.detail" placeholder="请输入医生/医院特色（不超过20字）">
        </div>
        <div>
          <label>&nbsp&nbsp&nbsp简 &nbsp 介&nbsp;:&nbsp;</label>
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入医生/医院的简介（150字以内）"
            :maxlength="150"
            style="width: 360px;"
            v-model="docAdd.desc">
          </el-input>
        </div>
        <div>
          <label>&nbsp&nbsp&nbsp头像/照片&nbsp;:&nbsp;</label>
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
            <div slot="tip" class="el-upload__tip"></div>
          </el-upload>
        </div>
        <div class="add-btn">
          <el-button type="primary" @click="submit1">提交</el-button>
          <el-button type="info" @click="editTab">取消</el-button>
        </div>
      </div>
    </div>
    <el-footer>
      <el-pagination
        background
        layout="total,prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage1"
        :total="total">
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
  import axios from 'axios'
  import qs from "qs"

  export default {
    name: "momney",
    data() {
      return {
        formInline:{},
        docAdd: {
          name: "",
          detail: "",
          desc: "",
          img: "",
          isDelete:false,
          type: "5",
        },
        formLabelWidth:"100px",
        dialogVisible: false,
        addShow:false,
        editShow:false,
        tableData2: [],
        tableData3: [],
        radio3:"医生",
        fileList:[],
        token: "",
        url: this.$store.state.url,
        currentPage1: 1,
        currentSize: 10,
        total: 0,
        radio:"1",
        upData:{
          type:3
        },
        headers:{
          token:localStorage.getItem('currentUser_token')
        },
      }
    },
    methods: {
      getUrl(){
        return this.$store.state.url+"/file/upload"
      },
      handlePreview(file) {
        console.log(file);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleSuccess(response, file, fileList) {
        const self = this;
        if (response.code == 0) {
          self.docAdd.img = response.data.url
        }
      },
      beforeRemove(file, fileList) {
        /*return this.$confirm(`确定移除 ${ file.name }？`);*/
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
      handleExceed(files, fileList) {
        fileList = [];
        this.$message.warning(`当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        const self = this;
        self.currentPage1 = val;
        if(self.radio3==="医生"){
          self.getList();
        }else if(self.radio3==="医院"){
          self.getHosList()
        }
      },
      //切换医生医院
      tabChange(value){
        console.log(value);
        const self=this;
        self.currentPage1=1;
        if(value==="医院"){
          self.getHosList()
        }else if(value==="医生"){
          self.getList()
        }
      },
      //新增提交
      submit(){
        if(!this.docAdd.name||!this.docAdd.desc||!this.docAdd.detail||!this.docAdd.img){
          this.$message.error("请填写完整信息");
          return
        }
        var self = this;
        var token = localStorage.getItem('currentUser_token'),
            data = self.docAdd;
        axios.defaults.headers.get['token'] = token;
        axios({
          method: 'post',
          url: self.url + '/resource/add',
          data: qs.stringify(data),
        }).then(function (res) {
          if(res.data.code==0){
            self.$message.success("提交成功");
            self.docAdd = {
              name: "",
              detail: "",
              desc: "",
              img: "",
              isDelete:false,
              type: "5",
            };
            self.fileList = [];
            self.addShow = !self.addShow;
            self.getList()
            /*self.getHosList();*/
          }else{
            self.$message.error(res.data.desc)
          }
        })
      },
      //编辑提交
      submit1(){
        if(!this.docAdd.name||!this.docAdd.desc||!this.docAdd.detail||!this.docAdd.img){
          this.$message.error("请填写完整信息");
          return
        }
        const self=this,
          data=self.docAdd,
          token = localStorage.getItem('currentUser_token');
        axios({
          method: 'post',
          url: self.url + '/resource/update',
          data: qs.stringify(data),
        }).then(function (res) {
          if(res.data.code==0){
            self.$message.success("修改成功");
            self.editShow=!self.editShow;
            if (self.radio3 == "医院"){
              self.getHosList();
            } else {
              self.getList();
            }
            /*self.getHosList();*/
          }else{
            self.$message.error(res.data.desc)
          }
        })
      },
      //新增取消
      addTab() {
        this.docAdd = {
          name: "",
          detail: "",
          desc: "",
          img: "",
          isDelete:false,
          type: "5",
        };
        this.fileList = []
        this.addShow = !this.addShow
      },
      //编辑取消
      editTab() {
        this.editShow = !this.editShow;
        // this.getList();
        /*this.getHosList();*/
      },
      //点击编辑
      edit(list){
        const self=this;
        self.editShow=!self.editShow;
        self.docAdd["createTime"]=list["createTime"];
        self.docAdd["detail"]=list["detail"];
        self.docAdd["id"]=list["id"];
        self.docAdd["order"]=list["order"];
        self.docAdd["updateTime"]=list["updateTime"];
        self.docAdd["name"]=list["name"];
        self.docAdd["desc"]=list["desc"];
        self.docAdd["img"]=list["img"];
        self.docAdd["isDelete"]=list["isDelete"];
        self.docAdd["type"]=list["type"];
        list.type==="医生"?self.docAdd.type="5":self.docAdd.type="6";
          // console.log(self.docAdd);
        /* axios.defaults.headers.get['token'] = token;
         */
      },
      //点击删除
      delete1(list){
        const self=this,
          data={
          id:list.id
          },
          token = localStorage.getItem('currentUser_token');
        axios.defaults.headers.get['token'] = token;
        axios({
          method: 'post',
          url: self.url + '/resource/delete',
          data: qs.stringify(data),
        }).then(function (res) {
          if(res.data.code==0){
            self.$message.success("删除成功");
            self.getList();
            self.getHosList();
          }else{
            self.$message.error(res.data.desc)
          }
        })
      },
      getToken() {
        const self = this;
        self.token = localStorage.getItem('currentUser_token')
      },
      //医生列表
      getList() {
        const self = this;
        self.tableData2=[];
        const data = {
          type:5,
          pageNum: self.currentPage1,
          pageSize: self.currentSize
        }
        // self.axios.defaults.headers.post['token'] = self.token;
        axios.defaults.headers.post['token'] = localStorage.getItem('currentUser_token');
        axios({
          method: "post",
          url: self.url + "/resource/list",
          data: qs.stringify(data)
        }).then(function (res) {
          if (res.data.code == 0) {
            self.tableData2 = res.data.data.rows;
            console.log(self.tableData2);
           /* self.tableData2.forEach(function (item,index) {
              item.desc.length>46?item.desc=item.desc.slice(0,46)+"……":null;
            });*/
            self.total = res.data.data.total;
            console.log(self.tableData2);
            self.tableData2.forEach(function (item, index) {
              item.type = "医生";
              return item
            });
            self.tableData2.sort(function(a,b) {
              return Date.parse(a.createTime.replace(/-/g,"/"))-Date.parse(b.createTime.replace(/-/g,"/"));
            });
          }
        })/*.then(function () {
          self.getHosList()
        })*/
      },
      //医院列表
      getHosList() {
        const self = this;
        const data = {
          type:6,
          pageNum: self.currentPage1,
          pageSize: self.currentSize
        };
        // self.axios.defaults.headers.post['token'] = self.token;
        axios.defaults.headers.post['token'] = localStorage.getItem('currentUser_token');
        axios({
          method: "post",
          url: self.url + "/resource/list",
          data: qs.stringify(data)
        }).then(function (res) {
          if (res.data.code == 0) {
            self.tableData3 = res.data.data.rows;
            /*self.tableData3.forEach(function (item,index) {
              item.desc.length>46?item.desc=item.desc.slice(0,46)+"……":null;
            });*/
            self.total = res.data.data.total;

            self.tableData3.forEach(function (item, index) {
              item.type = "医院";
              /*self.tableData2.push(item);*/
            });
            self.tableData2=self.tableData3;
            self.tableData2.sort(function(a,b) {
              return Date.parse(a.createTime.replace(/-/g,"/"))-Date.parse(b.createTime.replace(/-/g,"/"));
            });
          }
        })
      },
      //点击新增
      handleAdd(row, index) {  //新增服务的弹窗开关
        this.docAdd = {
          name: "",
          detail: "",
          desc: "",
          img: "",
          isDelete:false,
          type: "5",
        };
        this.fileList = []
        this.addShow=true;
        this.dialogVisible = true;
      },
    },
    created() {
      this.getToken()
    },
    mounted() {
      this.getList();
      /*this.getHosList();*/
    }
  }
</script>

<style scoped>
  .el-header {
    font-size: 20px;
    font-family: MicrosoftYaHei;
    color: rgba(131, 131, 131, 1);
    line-height: 80px;
  }

  .el-footer {
    text-align: center;
  }

  .ty-service-add {
    float: right;
    margin-right: 20px;
  }
  .el-table--border::after, .el-table--group::after{
    width: 0;
    position: relative;
    z-index: 0;
  }
  th {
    font-size: 20px;
    font-family: MicrosoftYaHei;
    color: rgba(48, 48, 48, 1);
    line-height: 26px;
  }

  .see-dd {
    font-size: 16px;
    font-family: MicrosoftYaHei;
    color: rgba(1, 143, 215, 1);
    line-height: 26px;
    padding: 10px;
    cursor: pointer;
  }
  .serves-add {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 70px;
    bottom: 0;
    left: 154px;
    right: 0;
    background: rgba(89, 89, 89, 0.7);
    justify-content: center;
  }

  label {
    width: 210px;
    font-size: 18px;
    line-height: 35px;
  }

  .serves-add div {
    /*display: flex;*/
    background: #f2f6fc;
    padding: 30px;
    border-radius: 5px;
    /*flex-direction: column;*/
  }

  .serves-add div div {
    display: flex;
    padding: 0;
  }

  .serves-add div div input {
    width: 360px;
    height: 35px;
    box-sizing: border-box;
    padding-left: 20px;
  }
  .serves-add div div input::-webkit-input-placeholder{
    color: #d3d4d6;
    font-family: monospace;
  }
  /*.el-textarea__inner{
    width: 360px!important;
  }*/
  .serves-add div div {
    margin-bottom: 15px;
  }

  .add-btn {
    display: flex;
    justify-content: center;
  }

  .add-btn .el-button:nth-child(1) {
    margin-right: 100px;
  }
  .el-table .cell{
   /* overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;*/
  }
</style>
