<template>
  <div>
    <el-container class="catalogue">
      <el-row style="width: 100%">
        <h3>首页动图管理</h3>
        <el-col :span="4" v-for="(o, index) in mainHomePicList" :key="index" :offset="index > 0 ? .8 : 0">
          <el-card :body-style="{ padding: '0px' }" style="max-height: 230px;position: relative">
            <img :src="o.img" class="image" >
            <div style="padding: 8px;">
              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="delete1(o.id,1)">X</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-upload
          :action="getUrl"
          list-type="picture-card"
          :headers="headers"
          :data="upData"
          :limit="1"
          :before-upload="beforeAvatarUpload"
          :on-preview="handlePictureCardPreview"
          :on-success="(response, file, fileList) => { handleUrlSuccess(response, file, fileList, 1)}"
          :on-remove="handleRemove"
          :on-exceed="handleError"
          :file-list="fileList">
          <i class="el-icon-plus"></i>
        </el-upload>

        <el-dialog :visible.sync="dialogVisible" :append-to-body='true'>
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-button type="primary" class="upload1" @click="upload1(1)">上传</el-button>
      </el-row>

    </el-container>
    <el-container class="catalogue">
      <el-row style="width: 100%">
        <h3>产品与服务页动图</h3>
        <el-col :span="4" v-for="(o, index) in productPicList" :key="index" :offset="index > 0 ? .8 : 0">
          <el-card :body-style="{ padding: '0px' }"  style="max-height: 230px;position: relative">
            <img :src="o.img" class="image">
            <div style="padding: 8px;">
              <div class="bottom clearfix" >
                <span style="font-size: 12px;color: #333333"></span>
                <el-button type="text" class="button" @click="delete1(o.id,2)">X</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-upload
          :action="getUrl"
          list-type="picture-card"
          :headers="headers"
          :data="upData"
          :limit="1"
          :before-upload="beforeAvatarUpload"
          :on-preview="handlePictureCardPreview"
          :on-success="(response, file, fileList) => { handleUrlSuccess(response, file, fileList, 2)}"
          :on-remove="handleRemove"
          :on-exceed="handleError"
          :file-list="fileList">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" :append-to-body='true'>
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-button type="primary" class="upload1" @click="upload1(2)">上传</el-button>
      </el-row>
    </el-container>
    <el-container class="catalogue">
      <el-row style="width: 100%">
        <h3>医生与医院动图管理</h3>
        <el-col :span="4" v-for="(o, index) in doctorPicList" :key="index" :offset="index > 0 ? .8 : 0">
          <el-card :body-style="{ padding: '0px' }"  style="max-height: 230px;position: relative">
            <img :src="o.img" class="image">
            <div style="padding: 8px;">
              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="delete1(o.id,3)">X</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-upload
          :action="getUrl"
          list-type="picture-card"
          :headers="headers"
          :data="upData"
          :limit="1"
          :before-upload="beforeAvatarUpload"
          :on-preview="handlePictureCardPreview"
          :on-success="(response, file, fileList) => { handleUrlSuccess(response, file, fileList, 3)}"
          :on-remove="handleRemove"
          :on-exceed="handleError"
          :file-list="fileList">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" :append-to-body='true'>
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-button type="primary" class="upload1" @click="upload1(3)">上传</el-button>
      </el-row>
    </el-container>
    <el-container class="catalogue">
      <el-row style="width: 100%">
        <h3>联系我们动图管理</h3>
        <el-col :span="4" v-for="(o, index) in connectPicList" :key="index" :offset="index > 0 ? .8 : 0">
          <el-card :body-style="{ padding: '0px' }"  style="max-height: 230px;position: relative">
            <img :src="o.img" class="image">
            <div style="padding: 8px;">
              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="delete1(o.id,4)">X</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-upload
          :action="getUrl"
          list-type="picture-card"
          :headers="headers"
          :data="upData"
          :limit="1"
          :before-upload="beforeAvatarUpload"
          :on-preview="handlePictureCardPreview"
          :on-success="(response, file, fileList) => { handleUrlSuccess(response, file, fileList, 4)}"
          :on-remove="handleRemove"
          :on-exceed="handleError"
          :file-list="fileList">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" :append-to-body='true'>
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-button type="primary" class="upload1" @click="upload1(4)">上传</el-button>
      </el-row>
    </el-container>
  </div>

</template>

<script>
  import axios from 'axios'
  import qs from "qs"

  export default {
    data() {
      return {
        order:0,
        fileList:[],
        dialogImageUrl: '',
        dialogVisible: false,
        mainHomePicList: [],
        productPicList: [],
        doctorPicList: [],
        connectPicList: [],
        baseURl: this.$store.state.url,
        headers: {
          token: localStorage.getItem('currentUser_token')
        },
        upData: {
          type: 3
        },
        flag:false
      }
    },
    name: "PicChange",
    methods: {
      getUrl(){
        return this.$store.state.url+"/file/upload"
      },
      handleUrlSuccess(response, file, fileList, type) {
        const self = this;
        if (response.code == 0) {
          if (type == 1) {
            self.mainHomePicList.push({img: response.data.url});
            self.flag=true;
          } else if (type == 2) {
            self.productPicList.push({img: response.data.url});
            self.flag=true;
          } else if (type == 3) {
            self.doctorPicList.push({img: response.data.url});
            self.flag=true;
          }else if (type == 4) {
            self.connectPicList.push({img: response.data.url});
            self.flag=true;
          }
        }
      },
      handleError(files, fileList){
        this.$message.warning(`当前限制选择 1个文件，请上传后添加`);
      },
      handleRemove(file, fileList) {
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
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      getMainHomePic(type) {
        var self = this;
        var token = localStorage.getItem('currentUser_token'),
          data = {
            type: type,
            pageNum: 1,
            pageSize: 100
          };
        axios.defaults.headers.get['token'] = token;
        axios({
          method: 'post',
          url: self.baseURl + '/resource/list',
          data: qs.stringify(data),
        }).then(function (res) {
          if (res.data.code == 0) {
            if (type == 1) {
              self.mainHomePicList = res.data.data.rows;
              self.order=self.mainHomePicList[self.mainHomePicList.length - 1].order
            } else if (type == 2) {
              self.productPicList = res.data.data.rows;
              self.order=self.productPicList[self.productPicList.length - 1].order
            } else if (type == 3) {
              self.doctorPicList = res.data.data.rows;
              self.order=self.doctorPicList[self.doctorPicList.length - 1].order
            }else if (type == 4) {
              self.connectPicList = res.data.data.rows;
              self.order=self.connectPicList[self.connectPicList.length - 1].order
            }
          } else {
            self.$message({
              showClose: true,
              message: '获取失败',
              type: 'error'
            });
          }
        })
      },
      upload1(type) {
        const self = this;
        self.order++;
        if(!self.flag){
          self.$message({
            showClose: true,
            message: '请先上传图片',
            type: 'error'
          });
          return
        }
        self.fileList=[];
        var token = localStorage.getItem('currentUser_token');
        var img = "";
        if (type == 1) {
          img = self.mainHomePicList[self.mainHomePicList.length - 1].img;
        } else if (type == 2) {
          img = self.productPicList[self.productPicList.length - 1].img;
        } else if (type == 3) {
          img = self.doctorPicList[self.doctorPicList.length - 1].img;
        } else if (type == 4) {
          img = self.connectPicList[self.connectPicList.length - 1].img;
        }
        var data = {
          type: type,//上传类型
          img: img, //上传图片
          order:self.order
        };
        axios.defaults.headers.post['token'] = token;
        axios({
          method: 'post',
          url: self.baseURl + '/resource/add',
          data: qs.stringify(data)
        }).then(function (res) {
          if (res.data.code == 0) {
            self.$message({
              showClose: true,
              message: '上传成功',
              type: 'success'
            });
            self.getMainHomePic(type);
            self.flag=false;
          } else {
            self.$message({
              showClose: true,
              message: '上传失败',
              type: 'error'
            });
          }
        })
      },
      delete1(id, type) {
        const self = this;
        var token = localStorage.getItem('currentUser_token');
        var data = {
          id: id
        };
        axios.defaults.headers.post['token'] = token;
        axios({
          method: 'post',
          url: self.baseURl + '/resource/delete',
          data: qs.stringify(data)
        }).then(function (res) {
          /* self.getMainHomePic(1);
           self.getMainHomePic(2);
           self.getMainHomePic(3);*/
          if (type == 1) {
            self.getMainHomePic(1)
          } else if (type == 2) {
            self.getMainHomePic(2)
          } else if (type == 3) {
            self.getMainHomePic(3)
          }else if (type == 4) {
            self.getMainHomePic(4)
          }
        })
      }
    },
    mounted() {
      for (var i = 0; i < 4; i++) {
        this.getMainHomePic(i + 1);
      }
    },
    updated() {
      console.log(this.mainHomePicList);
    }
  }

</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    position: absolute;
    right: 5px;
    bottom: 5px;
    z-index: 1999;
    padding: 0;
    /*float: right;*/
  }

  .el-col {
    margin: 0 10px;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  h3 {
    padding: 20px 10px;
  }

  .upload1 {
    float: right;
    margin: 10px;
  }
</style>
