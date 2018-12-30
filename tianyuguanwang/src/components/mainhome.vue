<template>
  <div style="">
    <div class="carousel-wrap" id="carousel" :style="slideStyle"  @mouseenter="stop()" @mouseleave="go()">
      <transition-group tag="ul" class='slide-ul' name="list">
        <li v-for="(list,index) in mainHomePicList" :key="index" v-show="index===currentIndex">
          <a href="#" >
            <img :src="list.img" :alt="list.desc" style="height: 100%;">
          </a>
        </li>
      </transition-group>
      <div class="carousel-items">
        <span v-for="(item,index) in mainHomePicList.length" :class="{'active':index===currentIndex}" @mouseover="change(index)"></span>
      </div>
    </div>
    <div class="main-box">
      <img src="../../static/images/ss-2.jpg" alt="">
      <img src="../../static/images/ss-4.jpg" alt="">
      <img src="../../static/images/ss-3.jpg" alt="">
      <img src="../../static/images/ss-5.jpg" alt="">
      <img src="../../static/images/ss-6.jpg" alt="">
      <img src="../../static/images/ss-7.jpg" alt="">
      <img src="../../static/images/localText.jpg" alt="">
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
            "height":(document.body.clientWidth*500/1920)+"px"
          },
          slideList: [
            {
              "clickUrl": "#",
              "desc": "nhwc",
              "image": "../../static/images/sss-1.png"
            },
            {
              "clickUrl": "#",
              "desc": "hxrj",
              "image": "../../static/images/sss-2.png"
            },
            {
              "clickUrl": "#",
              "desc": "rsdh",
              "image": "../../static/images/sss-3.png"
            },
            {
              "clickUrl": "#",
              "desc": "rsdh",
              "image": "../../static/images/sss-4.png"
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
          mainHomePicList:[],
          doctorList:[
            {
              imgUrl:"../../static/images/d-1.jpg",
              name:"江晓琪",
              department:"急诊科",
              desc:"燕京大学国际医院急诊科副主任医师,急救医学博士。"
            },
            {
              imgUrl:"../../static/images/d-1.jpg",
              name:"何建一",
              department:"急诊科",
              desc:"燕京大学国际医院急诊科主任医师。"
            },
            {
              imgUrl:"../../static/images/d-1.jpg",
              name:"刘慧敏",
              department:"急诊科",
              desc:"燕京大学国际医院急诊科副主任医师。"
            },
            {
              imgUrl:"../../static/images/d-1.jpg",
              name:"赵蕾",
              department:"急诊科",
              desc:"燕京大学国际医院医务处主任。"
            },
            {
              imgUrl:"../../static/images/d-1.jpg",
              name:"乔娜",
              department:"急诊科",
              desc:"燕京大学国际医院急诊科医生。"
            },
            {
              imgUrl:"../../static/images/d-1.jpg",
              name:"张泠",
              department:"急诊科",
              desc:"燕京大学国际医院急诊科护士。"
            },
            {
              imgUrl:"../../static/images/d-1.jpg",
              name:"海洋",
              department:"急诊科",
              desc:"燕京大学国际医院急诊科医生。"
            },
            {
              imgUrl:"../../static/images/d-1.jpg",
              name:"方志军",
              department:"急诊科",
              desc:"燕京大学国际医院急诊科医生。"
            },
          ],
          itemTextArr2:this.$store.state.vuexs.itemTextArr,
          url:this.$store.state.vuexs.url,
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
                self.mainHomePicList=res.data.data.rows;
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
          if (self.currentIndex > self.mainHomePicList.length - 1) {
            self.currentIndex = 0
          }
        },
        //样式改变
        changeColor(index){
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
        pushToUrl2(url){
          this.$store.state.vuexs.itemTextArr.forEach((value) =>{
            value.isActive = false;
          })
          this.$store.state.vuexs.itemTextArr[1].isActive = true;
          this.$router.push({path:url});
          window.scrollTo(0,0)
        },
        pushToUrl3(url){
          this.$store.state.vuexs.itemTextArr.forEach((value) =>{
            value.isActive = false;
          })
          this.$store.state.vuexs.itemTextArr[2].isActive = true;
          this.$router.push({path:url});
          window.scrollTo(0,0)
        },
        getProductList(){
          const self = this;
          self.token=self.Cookies.get("token");
          self.axios.defaults.headers.post['token'] =self.token;
          self.axios({
            method:"post",
            url:self.url + "/commodity/list",
            data:{
              pageSize:6,
              pageNum:1,
            }
          }).then(function (res) {
            console.log(res);
            self.productList = res.data.data.rows;
            self.total = res.data.data.total
          })
        },
        getOrder(id){
          // console.log(index);
          console.log("1111");
          // this.$router.push({name:'/mainComponent/five',params:{task_id :id}})
          this.$router.push({name:'productDesc',params:{id :id}})
          window.scrollTo(0,0)
        },
      },
      filters:{
        numFilter(value){
            const num = value.length;
            if (num > 15){
              return value.slice(0,35) + "..."
            }
        }
      },
      created() {
        this.$nextTick(() => {
          this.getMainHomePic(1)
          this.timer = setInterval(() => {
            this.autoPlay()
          }, 4000)
        })
      },
      mounted(){
        let self = this;
        window.onresize = () => {
          self.slideStyle = {
            "height":(document.body.clientWidth*500/1920)+"px"
          };
        }
        /*this.getProductList()*/
      }
    }
</script>

<style scoped>
  .carousel-wrap {
    position: relative;
    height: auto;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    background-color: #fff;
  }
  .carousel-wrap2 {
    position: relative;
    height: 64px;
    width: 80%;
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
    height: 100%;
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
    justify-content: flex-end;
    margin: 40px 0 0 0;

  }
  .product-title img{
    width: auto;
    height: 70px;
    display: block;
    margin: 0 auto;
  }
  .product-btn{
    width: 60px;
    height: 30px;
    background: #018FD7;
    border-radius: 6px;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    color: #FFFFFF;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
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
    /*background: hotpink;*/
  }
  .info-min:hover{
    box-shadow: 0 4px 8px 2px rgba(233,233,233,0.50);
  }
  .info-img{
    width: 100%;
    box-sizing: border-box;
  }
  .info-img img{
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
    height: 100%;
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
  .isActive{
    box-shadow: 0 4px 8px 2px rgba(233,233,233,0.50);
  }
  /*医疗样式*/
  .doctor-min{
    width: 23%;
    background: red;
    margin: 40px 0 0 0;
    background: #FFFFFF;
    border: 1px solid #DADADA;
  }
  .doctor-image{
    width: 100%;
    height: 160px;
    display: flex;
    justify-content: center;
    margin: 40px 0 0 0;
  }
  .doctor-image img{
    width: 160px;
    height: 160px;
    border-radius: 50%;
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
    margin: 33px auto;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    color: #838383;
    height: 60px;
  }
  /*联系我们*/
  .contact-box{
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 40px 0 0 0;
  }
  .contact-left{
    width: 50%;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .contact-left span{
    background: #ffffff;
  }
  .contact-right{
    width: 40%;
  }
  .contact-right img{
    width: 100%;
    height: auto;
  }
  .left-1{
    width: 100%;
    height: auto;
    font-family: MicrosoftYaHei;
    font-size: 24px;
    color: #303030;
    margin: 0;
  }
  .left-2{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .c-te{
    width: 50%;
    display: flex;
    flex-direction: column;
  }
  .contact-min{
    width: auto;
    height: auto;
    font-family: MicrosoftYaHei;
    font-size: 20px;
    color: #838383;
    display: flex;
    margin: 20px 0 0 0;
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
  .main-box{
    display: flex;
    flex-direction: column;
    flex: 100%;
  }
  .main-box img{
    width: 100%;
    height: auto;
  }
</style>
