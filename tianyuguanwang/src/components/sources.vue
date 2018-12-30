<template>
  <div style="">
    <div class="carousel-wrap" id="carousel" :style="slideStyle" @mouseenter="stop()" @mouseleave="go()">
      <transition-group tag="ul" class='slide-ul' name="list">
        <li v-for="(list,index) in doctorPicList" :key="index" v-show="index===currentIndex">
          <a href="#" >
            <img :src="list.img" :alt="list.desc"  style="height: 100%;">
          </a>
        </li>
      </transition-group>
      <div class="carousel-items">
        <span v-for="(item,index) in doctorPicList.length" :class="{'active':index===currentIndex}" @mouseover="change(index)"></span>
      </div>
    </div>
    <!--<div class="carousel-wrap2" id="carousel2">-->
      <!--<transition-group tag="ul" class='slide-ul' name="list2">-->
        <!--<li v-for="(list,index) in slideList2" :key="index" v-show="index===currentIndex">-->
          <!--<a :href="list.clickUrl"  style="width: 80%">-->
            <!--<div class="list-text">{{list.text}}</div>-->
          <!--</a>-->
        <!--</li>-->
      <!--</transition-group>-->
    <!--</div>-->
    <div style="clear: both"></div>
    <!--医疗资源-->
    <div class="product-box" style="padding-top: 40px">
      <div class="product-title">
        医院&专家
      </div>
      <el-radio-group v-model="radio3" @change="tabChange" style="float: right">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="医院"></el-radio-button>
        <el-radio-button label="医生"></el-radio-button>
      </el-radio-group>
      <div class="product-info">
          <div class="doctor-min" v-for="(site,index) in tableData2" :key="index">
            <div class="doctor-image" :class="{'hos-image':site.type==='医院'}" :style="{backgroundImage: 'url(' + site.img + ')', backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center'}">
              <!--<img :src="site.avatarUrl" alt="">-->
            </div>
            <div class="doctor-name">{{site.name}}</div>
            <div class="doctor-from">{{site.department}}</div>
            <div class="doctor-from" style="padding: 0 30px">{{site.detail}}</div>
            <div class="doctorView" ref='index'>{{site.desc}}</div>
            <div class="doctor-desc" @mouseover="textShow(index)" @mouseout="textShow1(index)">{{site.desc | numFilter}}</div>
          </div>
      </div>
    </div>
    <!---->
    <div class="home-footer">
      Copyright © 天宇尚医, All Rights Reserved.&nbsp&nbsp 备案号：京ICP备18045115号-1
    </div>
  </div>

</template>

<script>
    export default {
      name: "mainhome",
      data(){
        return {
          slideStyle:{
            "height":(document.body.clientWidth*500/1920)+"px"
          },
          tableData2:[],
          tableData3:[],
          doctorPicList:[],
          radio3:'全部',
          slideList: [
            {
              "clickUrl": "#",
              "desc": "nhwc",
              "image": "../../static/images/s-1.jpg"
            },
            {
              "clickUrl": "#",
              "desc": "hxrj",
              "image": "../../static/images/s-2.jpg"
            },
            {
              "clickUrl": "#",
              "desc": "rsdh",
              "image": "../../static/images/s-3.jpg"
            }
          ],
          currentIndex: 0,
          timer: '',
          slideList2:[
            {
                "text":"成为最尊敬的企业是我们的愿景目标"
            },
            {
              "text":"成为最尊敬的企业是我们的愿景目标"
            },
            {
              "text":"成为最尊敬的企业是我们的愿景目标"
            },
            {
              "text":"成为最尊敬的企业是我们的愿景目标"
            }
          ],
          newText:"到了杨梅时节。如果你看到杨梅却迟迟不敢心动是不是因为听过这些“吃杨梅前一定要知道的事杨梅里面泡出！…",
          doctorList:[],
          url:this.$store.state.vuexs.url,
          pageNum:1
        }
      },
      methods: {
        textShow(index){
          this.$refs.index[index].style.display='block'
        },
        textShow1(index){
          this.$refs.index[index].style.display='none'
        },
        getMainHomePic(type) {
          var self = this,
            data = {
              type:type,
              pageNum:1,
              pageSize:10
            };
          self.axios({
            method: 'post',
            url: self.url + '/resource/list',
            data:self.qs.stringify(data),
          }).then(function (res) {
            if(res.data.code==0){
              if(type==1){
                self.mainHomePicList=res.data.data.rows
              }else if(type==2){
                self.productPicList=res.data.data.rows;
              }else if(type==3){
                self.doctorPicList=res.data.data.rows;
              }
            }else{
              self.$message({
                showClose: true,
                message: '获取失败',
                type: 'error'
              });
            }
            console.log(res);
          })
        },
        go() {
          const self = this;
          self.timer = setInterval(() => {
            self.autoPlay()
          }, 4000)
        },
        stop() {
          clearInterval(this.timer)
          this.timer = null
        },
        change(index) {
          this.currentIndex = index
        },
        autoPlay() {
          const self = this;
          self.currentIndex++;
          if (self.currentIndex > self.doctorPicList.length - 1) {
            self.currentIndex = 0
          }
        },
        //样式改变
        changeColor(active,index){
          const self = this;
          self.productList.forEach((value) =>{
            value.isActive = false;
          })
          self.productList[index].isActive = true;
        },
        changeNone(active,index){
          const self = this;
          self.productList.forEach((value) =>{
            value.isActive = false;
          })
        },
        // getDoctorList(){
        //   const self = this;
        //   //self.axios.defaults.headers.post['token'] = self.Cookies.get("token");
        //   const data = {
        //     pageSize:300,
        //     pageNum:self.pageNum,
        //   }
        //   self.axios({
        //     method:"post",
        //     url:self.url + "/user/docker",
        //     data:self.qs.stringify(data)
        //   }).then(function (res) {
        //     console.log(res);
        //     if (res.data.code == 0){
        //       self.doctorList = res.data.data.rows;
        //     }
        //   })
        // },
        //医生列表
        getList() {
          const self = this;
          const data = {
            type:5,
            pageNum: 1,
            pageSize: 300
          }
          // self.axios.defaults.headers.post['token'] = self.token;
          self.axios({
            method: "post",
            url: self.url + "/resource/list",
            data: self.qs.stringify(data)
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
          }).then(function () {
            if(self.radio3=="全部"){
              self.getHosList()
            }
          })
        },
        //医院列表
        getHosList() {
          const self = this;
          const data = {
            type:6,
            pageNum: 1,
            pageSize: 300
          };
          // self.axios.defaults.headers.post['token'] = self.token;
          self.axios({
            method: "post",
            url: self.url + "/resource/list",
            data: self.qs.stringify(data)
          }).then(function (res) {
            if (res.data.code == 0) {
              self.tableData3 = res.data.data.rows;

              /*self.tableData3.forEach(function (item,index) {
                item.desc.length>46?item.desc=item.desc.slice(0,46)+"……":null;
              });*/
              /*self.total = res.data.data.total;*/
              self.tableData3.forEach(function (item, index) {
                item.type = "医院";
                /*self.tableData2.push(item);*/
              });
              self.tableData2=self.tableData2.concat(self.tableData3);
              self.tableData2.sort(function(a,b) {
                return Date.parse(a.createTime.replace(/-/g,"/"))-Date.parse(b.createTime.replace(/-/g,"/"));
              });
            }
          })
        },
        tabChange(value){
          console.log(value);
          const self=this;
          if(value==="全部"){
            self.tabAll()
          }else if(value==="医院"){
            self.tabHospital()
          }else if(value==="医生"){
            self.tabDoctor()
          }
        },
        //全部
        tabAll(){
          this.tableData2=[];
          this.tableData3=[];
          this.getList();
          /*this.getHosList()*/
        },
        tabHospital(){
          this.tableData2=[];
          this.tableData3=[];
          this.getHosList()
        },
        tabDoctor(){
          this.tableData2=[];
          this.tableData3=[];
          this.getList()
        }
      },
      filters:{
        numFilter(value){
            const num = value.length;
            if (num > 68){
              return value.slice(0,68) + "..."
            }else{
              return value
            }
        }
      },
      beforeCreate(){

      },
      created() {
        this.$nextTick(() => {
          this.getMainHomePic(3)
          this.timer = setInterval(() => {
            this.autoPlay()
          }, 4000)
        })
      },
      mounted(){
        this.tabAll();
        let self = this;
        window.onresize = () => {
          self.slideStyle = {
            "height":(document.body.clientWidth*500/1920)+"px"
          };
        }
      },
      updated(){
        /*const self=this;
        if(self.radio3==="全部"){
          self.$refs.doctorImage.style.borderRadius=0
        }*/
      }
    }
</script>

<style scoped>
  .carousel-wrap {
    position: relative;
    height: 630px;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
  // 删除
  background-color: #fff;
  }
  .carousel-wrap2 {
    position: relative;
    height: 64px;
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
  // 删除
  background-color: red;
    top: -30px;
  }
  .slide-ul {
    width: 100%;
    height: 100%;
    border: none;
  }
  li {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  img {
    width: 100%;
    height: 630px;
    display: flex;
    margin: 0 auto;
  }

  .carousel-items {
    position: absolute;
    z-index: 10;
    bottom: 20px;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    font-size: 0;
  }
  span {
    display: inline-block;
    height: 6px;
    width: 30px;
    margin: 0 3px;
    background-color: #b2b2b2;
    cursor: pointer;
  }
  .active {
    background-color:grey;
    }
  .list-enter-to {
    transition: all 1s ease;
    transform: translateX(0);
  }
  .list2-enter-to {
    transition: all 1s ease;
    transform: translateY(0);
  }
  .list-leave-active {
    transition: all 1s ease;
    transform: translateX(-100%)
  }
  .list2-leave-active {
    transition: all 1s ease;
    transform: translateY(-100%)
  }
  .list-enter {
    transform: translateX(100%)
  }
  .list2-enter {
    transform: translateY(100%)
  }
  .list-leave {
    transform: translateX(0)
  }
  .list2-leave {
    transform: translateY(0)
  }
  .list-text{
    width: 80% !important;
    height: 60px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    background: #FFFFFF;
    box-shadow: 0 4px 8px 2px rgba(233,233,233,0.50);
    padding: 0 180px;
    font-family: MicrosoftYaHei;
    font-size: 20px;
    color: #303030;
    box-sizing: border-box;
  }

  /*产品与服务样式*/
  .product-box{
    width: 100%;
    height:100%;
    padding: 0 10%;
    /*background: red;*/
    box-sizing: border-box;
  }

  .product-title{
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    /*margin: 40px 0 0 0;*/
    font-family: MicrosoftYaHei;
    font-size: 30px;
    color: #303030;
  }
  .product-title img{
    width: auto;
    height: 70px;
    display: block;
    margin: 0 auto;
  }

  .product-info{
    width: 100%;
    /*background: pink;*/
    display: flex;
    justify-content: space-between;
    flex-wrap:wrap;
    margin: 0 0 60px 0;
  }
  .product-info:after {
    content: "";
    width: 32%;
  }
  /*医疗样式*/
  .doctor-min{
    width: 32%;
    background: red;
    margin: 40px 0 0 0;
    background: #FFFFFF;
    border: 1px solid #DADADA;
    position: relative;
  }
  .doctor-min:hover{
    box-shadow: 0 4px 8px 2px rgba(233, 233, 233, 0.50);
  }
  .doctor-image{
    width: 160px;
    height: 160px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    margin: 40px auto;
  }
  .hos-image{
    width: 100%;
    margin: 0;
    height: 220px;
    border-radius: 0;
  }
  .doctor-image img{
    /*width: 160px;*/
  }
  .doctor-name{
    font-family: MicrosoftYaHei;
    font-size: 24px;
    color: #303030;
    margin: 24px 0 0 0;
    text-align: center;
  }
  .doctor-from{
    font-family: MicrosoftYaHei;
    font-size: 20px;
    color: #838383;
    margin: 10px 0 0 0;
    text-align: center;
  }
  .doctor-desc{
    width: 90%;
    margin: 10px auto 33px;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    color: #838383;
    height: 100px;
    line-height: 30px;
  }
  .doctorView{
    display: none;
    position: absolute;
    width: 300px;
    left: 50% ;
    text-align: center;
    background: rgba(0,0,0,.6);
    color: #fff;
    border-radius: 5px;
    margin-left: -150px;
    bottom: 160px;
  }
  .home-footer{
    width: 100%;
    height: 40px;
    background: #445057;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #889FAC;
    margin: 60px 0 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
