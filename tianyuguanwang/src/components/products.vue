<template>
  <div style="">
    <div class="carousel-wrap" id="carousel" ref="carouselWrap" :style="slideStyle" @mouseenter="stop()" @mouseleave="go()">
      <transition-group tag="ul" class='slide-ul' name="list">
        <li v-for="(list,index) in productPicList" :key="index" v-show="index===currentIndex">
          <a href="#" >
            <img :src="list.img" :alt="list.desc" ref="img1" style="height: 100%;">
          </a>
        </li>
      </transition-group>
      <div class="carousel-items">
        <span v-for="(item,index) in productPicList.length" :class="{'active':index===currentIndex}" @mouseover="change(index)"></span>
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
    <!--产品与服务-->
    <div class="product-box">
      <!--抬头-->
        <div class="product-title">
          服务与产品
        </div>
      <!--详细信息-->
        <div class="product-info">
            <div class="info-min" v-for="(site,index) in productList" :key="index">
              <div class="info-image">
                <img :src="site.majorPath" alt="">
              </div>
              <div class="info-text">
                  <span class="info-package">{{site.name}}</span>
                  <span class="info-desc" :title="site.feature">{{site.feature}}</span>
              </div>
              <span class="space-line"></span>
              <div class="info-btn">
                  <div @click="getOrder(site.id)" >了解详情</div>
              </div>
            </div>
        </div>
    </div>
    <div class="" style="text-align: center">
      <el-pagination
        background
        layout="total,prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="total">
      </el-pagination>
    </div>
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
            "height":((document.body.clientWidth)*500/1920)+"px"
          },
          slideList: [
            {
              "clickUrl": "#",
              "desc": "nhwc",
              "image": "../../static/images/ps-1.jpg"
            },
            {
              "clickUrl": "#",
              "desc": "hxrj",
              "image": "../../static/images/ps-2.jpg"
            },
            {
              "clickUrl": "#",
              "desc": "rsdh",
              "image": "../../static/images/ps-3.jpg"
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
          productList:[],
          productPicList:[],
          relProductS:[],
          url:this.$store.state.vuexs.url,
          token:"",
          total:0,
          pageNum:1
        }
      },
      methods: {
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
          if (self.currentIndex > self.productPicList.length - 1) {
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
        getOrder(id){
         // console.log(index);
            console.log("1111");
          // this.$router.push({name:'/mainComponent/five',params:{task_id :id}})
          this.$router.push({name:'productDesc',params:{id :id}})
          window.scrollTo(0,0)
        },
        //获取商品列表
        getProductList(){
          const self = this;
         /* self.token=self.Cookies.get("token");
          self.axios.defaults.headers.post['token'] ="a61be8c2-9f25-424e-9f8d-d969550a56de";*/
          self.axios({
            method:"post",
            url:self.url + "/commodity/list",
            data:{
              pageSize:15,
              pageNum:self.pageNum,
            }
          }).then(function (res) {
            self.productList = res.data.data.rows;
            self.total = res.data.data.total;
            if(self.productList.length==15){
              self.total=1
            }
          })
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.pageNum = val;
          this.getProductList();
        },
      },
      filters:{
        numFilter(value){
            const num = value.length;
            if (num > 15){
              return value.slice(0,35) + "..."
            }else {
              return value;
            }
        }
      },
      beforeCreate(){
        //this.getProductList();
      },
      created() {
        this.$nextTick(() => {
          this.getMainHomePic(2);
          this.timer = setInterval(() => {
            this.autoPlay()
          }, 4000)
        })
      },
      mounted(){
        let self = this;
        window.onresize = () => {
          console.log(document.body.clientWidth);
          self.slideStyle = {
            "height":(document.body.clientWidth*500/1920)+"px"
          };
        }
        this.getProductList();
       /* console.log(this.$refs,this.$refs.carouselWrap);
        this.$refs.carouselWrap.height=this.$refs.img1.forEach((item,index)=>{
          if(item.clientHeight>10){
            return item.clientHeight
          }
        });
        console.log(this.$refs.carouselWrap.height);*/
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
    height: auto;
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
    justify-content:center;
    margin: 40px 0 0 0;
    font-family: MicrosoftYaHei;
    font-size: 30px;
    color: #303030;

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
  .info-min{
    width: 32%;
    background: #FFFFFF;
    border: 1px solid #DADADA;
    margin: 40px 0 0 0;
  }
  .info-min:hover{
    box-shadow: 0 4px 8px 2px rgba(233,233,233,0.50);
  }
  .info-image{
    width: 100%;
    box-sizing: border-box;
  }
  .info-image img{
    display: block;
    width: 100%;
    height: 250px;
  }
  .info-text{
    width: 100%;
    padding:0 0 0 28px;
    box-sizing: border-box;
  }
  .info-package{
    width: 100%;
    height: 100%;
    font-family: MicrosoftYaHei;
    font-size: 24px;
    color: #303030;
    margin: 24px 0 0 0;
    background: none;
  }
  .info-desc{
    width: 100%;
    height: 67px;
    padding: 0 28px 24px 0;
    display: block;
    box-sizing: border-box;
    margin: 16px 0 0 0 ;
    background: none;
  }
  .space-line{
    width: 100%;
    height:1px;
    border-bottom: 1px solid #DADADA;
    margin: 0px;
    background: none;
  }
  .info-btn{
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .info-btn div{
    background: #EBEBEB;
    border-radius: 6px;
    font-family: MicrosoftYaHei;
    font-size: 18px;
    color: #303030;
    margin-right: 34px;
    width: 120px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .info-btn div:hover{
    background: #018FD7;
    border-radius: 6px;
    font-family: MicrosoftYaHei;
    font-size: 18px;
    color: #FFFFFF;
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
