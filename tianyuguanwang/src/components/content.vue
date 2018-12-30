<template>
  <div style="">
    <div class="carousel-wrap" id="carousel" :style="slideStyle" @mouseenter="stop()" @mouseleave="go()">
      <transition-group tag="ul" class='slide-ul' name="list">
        <li v-for="(list,index) in connectPicList" :key="index" v-show="index===currentIndex">
          <a href="#" >
            <img :src="list.img" :alt="list.desc"  style="height: 100%;">
          </a>
        </li>
      </transition-group>
      <div class="carousel-items">
        <span v-for="(item,index) in connectPicList.length" :class="{'active':index===currentIndex}" @mouseover="change(index)"></span>
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
    <!---->
    <div class="product-box" style="padding-top: 40px">
      <div class="product-title">
        联系我们
      </div>
      <div class="contact-box">
          <div class="contact-left">
            <span class="left-1">天宇尚医（北京）健康咨询有限公司</span>
            <div class="left-2">
              <div class="c-te">
                <span class="contact-min">地址：北京市西城区西绒线胡同28号天安国汇611室</span>
                <span class="contact-min">邮编：100031</span>
                <span class="contact-min">电话：010-59739113</span>
              </div>
              <!--<div class="c-te">-->
                <!--<span class="contact-min">手机：13312345678／13312345678</span>-->
                <!--<span class="contact-min">传真：88888888</span>-->
                <!--<span class="contact-min">邮箱：666@88.com</span>-->
              <!--</div>-->
            </div>
          </div>
          <div class="contact-right">
            <img src="../../static/images/20180813204241.png" alt="">
          </div>
      </div>
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
              "image": "../../static/images/c-1.jpg"
            },
            {
              "clickUrl": "#",
              "desc": "hxrj",
              "image": "../../static/images/c-2.jpg"
            },
            {
              "clickUrl": "#",
              "desc": "rsdh",
              "image": "../../static/images/c-3.jpg"
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
          productList:[
            {
              imgUrl:"../../static/images/p-1.jpg",
              name:"套餐A",
              desc:"到了杨梅时节。如果你看到杨梅却迟迟不敢心动是不是因为听过这些“吃杨梅前一定要知道的事杨梅里面泡出！…",
              isActive:false
            },{
              imgUrl:"../../static/images/p-2.jpg",
              name:"套餐A",
              desc:"到了杨梅时节。如果你看到杨梅却迟迟不敢心动是不是因为听过这些“吃杨梅前一定要知道的事杨梅里面泡出！…",
              isActive:false
            },{
              imgUrl:"../../static/images/p-3.jpg",
              name:"套餐A",
              desc:"到了杨梅时节。如果你看到杨梅却迟迟不敢心动是不是因为听过这些“吃杨梅前一定要知道的事杨梅里面泡出！…",
              isActive:false
            },{
              imgUrl:"../../static/images/p-4.jpg",
              name:"套餐A",
              desc:"到了杨梅时节。如果你看到杨梅却迟迟不敢心动是不是因为听过这些“吃杨梅前一定要知道的事杨梅里面泡出！…",
              isActive:false
            },{
              imgUrl:"../../static/images/p-5.jpg",
              name:"套餐A",
              desc:"到了杨梅时节。如果你看到杨梅却迟迟不敢心动是不是因为听过这些“吃杨梅前一定要知道的事杨梅里面泡出！…",
              isActive:false
            },{
              imgUrl:"../../static/images/p-6.jpg",
              name:"套餐A",
              desc:"到了杨梅时节。如果你看到杨梅却迟迟不敢心动是不是因为听过这些“吃杨梅前一定要知道的事杨梅里面泡出！…",
              isActive:false
            },
          ],
          url:this.$store.state.vuexs.url,
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
          connectPicList: [],
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
              }else if(type==4){
                self.connectPicList=res.data.data.rows;
              }
            }else{
              self.$message({
                showClose: true,
                message: '获取失败',
                type: 'error'
              });
            }
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
          if (self.currentIndex > self.connectPicList.length - 1) {
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
        }
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
        let self = this;
        window.onresize = () => {
          self.slideStyle = {
            "height":(document.body.clientWidth*500/1920)+"px"
          };
        };
        this.$nextTick(() => {
          this.getMainHomePic(4)
          this.timer = setInterval(() => {
            this.autoPlay()
          }, 4000)
        })
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
    /*height: 770px;*/
    display: flex;
    margin: -50px 0 auto;
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
    /*width: 50%;*/
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
</style>
