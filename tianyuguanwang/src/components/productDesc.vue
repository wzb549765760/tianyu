<template>
  <div class="container">
    <div class="desc-container">
      <span class="desc-title">首页 〉服务与产品 〉<span>详细介绍</span></span>
      <span class="desc-titleNext">产品详情</span>
      <div class="desc-list">
        <div class="imgMain">
          <img :src="descObj.majorPath" alt="">
        </div>
        <div class="desc-inlist">
          <span class="list-tap1">{{descObj.name}}</span>
          <span class="list-tap2">{{descObj.feature}}</span>
          <div>
            <label>名称 :&nbsp;</label>
            <span>{{descObj.name}}</span>
          </div>
          <div>
            <label>规格 :&nbsp;</label>
            <span class="norm" v-for="(site,index) in specifications" :class="{isActiveM:site.isActive}" @click="getTabs(index,site.isActive)">{{site.name}}</span>
          </div>
          <div>
            <label>价格 :&nbsp;</label>
            <span class="price">¥{{specificationPrice}}</span>
          </div>
          <div>
            <label>适合人群 :&nbsp;</label>
            <span>{{descObj.applyPerson}}</span>
          </div>
          <div>
            <label>数量 :&nbsp;</label>
            <span class="upDown"><p @click="numReduce">-</p>{{num}}<p @click="numAdd">+</p></span>
          </div>
        </div>
        <div class="buyBtn">
          <span @click="submitPay">立即购买</span>
        </div>
      </div>
      <div class="desc-tap">
        <!--<img src="../../static/images/t-1.png" alt="">-->
        <div class="imgMain">产品简介</div>
      </div>
      <span class="word-desc">
        {{descObj.desc}}
      </span>
      <div class="desc-tap">
        <div class="imgMain">产品详情</div>
        <!--<img src="../../static/images/t-2.png" alt="">-->
      </div>
      <div class="desc-img">
        <img v-for="site in picPaths" :src="site" alt="" width="100%">
      </div>
    </div>
    <el-button type="text" @click="open2"></el-button>
    <div class="footer1">Copyright © 天宇尚医, All Rights Reserved.&nbsp&nbsp 备案号：京ICP备18045115号-1</div>
  </div>
</template>

<script>
    export default {
        name: "productDesc",
        data(){
          return {
            url:this.$store.state.vuexs.url,
            params:this.$route.params,
            descObj:{},
            specifications:[],
            isActive:0,
            specificationPrice:"",
            specificationId:"",
            specificationName:"",
            commodityType:"",
            num:1,
            picPaths:[]
          }
        },
        methods:{
          getdetails(){
            const self = this;
            self.axios({
              method:"post",
              url:self.url + "/commodity/edit?id="+self.params.id,
            }).then(function (res) {
              console.log(res);
              self.descObj =res.data.data;
              console.log(self.descObj);
              self.specifications = self.descObj.specifications;
              self.specifications[0]["isActive"] = true;
              self.specificationPrice = self.specifications[0]["price"];
              self.specificationName = self.specifications[0]["name"];
              self.specificationId = self.specifications[0].id;
              self.picPaths = self.descObj.picPath.split(";")
            })
          },
          getTabs(index,isActive){
            const self = this;
            console.log(self.specifications);
            self.specifications.forEach((value)=>{
              value.isActive = false;
            })
            self.specifications[index].isActive = true;
            self.specificationPrice = self.specifications[index].price;
            self.specificationId = self.specifications[index].id;
            self.specificationName = self.specifications[index].name;
            console.log(self.specificationName);
          },
          numAdd(){
            this.num++;
            return
          },
          numReduce(){
            if (this.num>1){
              this.num--;
            } else if(this.num==1) {
              return
            }
            return
          },
          submitPay(){
              const self = this;
            if(!self.Cookies.get("token")){
              self.open2()
              /*self.$router.push('/login');*/
              return;
            }
            // this.$router.push({name:'/mainComponent/five',params:{task_id :id}})
            if (self.descObj.commodityType == "服务"){
              self.$router.push({name:'orders',params:{id :self.params.id,commodityId:self.descObj.id,specificationId:self.specificationId,image:self.descObj.majorPath,name:self.descObj.name,specificationName:self.specificationName,num:self.num,specificationPrice:self.specificationPrice,commodityType:self.descObj.commodityType}})
            }else {
              self.$router.push({name:'orders2',params:{id :self.params.id,commodityId:self.descObj.id,specificationId:self.specificationId,image:self.descObj.majorPath,name:self.descObj.name,specificationName:self.specificationName,num:self.num,specificationPrice:self.specificationPrice,commodityType:self.descObj.commodityType}})

            }
          },
          open2() {
            this.$confirm('当前为未登录状态, 是否登录?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$router.push('/login')
              this.$message({
                type: 'success',
                message: '请登录!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消登录'
              });
            });
          }
        },
      created(){
          //this.$route.params.id? this.params=this.$route.params:null;
        if (this.$route.params.id) {
          this.params=this.$route.params;
          this.$store.state.vuexs.id=this.$route.params.id
        }else{
          this.params.id=this.$store.state.vuexs.id;
        }
        this.getdetails();
      },
      mounted(){
        this.getdetails();
      }
    }
</script>
<style>
  .desc-container{
    width: 100%;
    padding:60px 160px;
    border-top: 1px solid #EFEFEF;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }
  .desc-title{
    font-size:20px;
    font-family:MicrosoftYaHei;
    color:rgba(131,131,131,1);
    line-height:26px;
  }
  .desc-title span{
    color:rgba(1,143,215,1);
  }
  .desc-titleNext{
    width: 100%;
    text-align: center;
    margin: 40px 0 0 0;
    font-size:30px;
    font-family:MicrosoftYaHei;
    color:rgba(48,48,48,1);
  }
  .desc-list{
    display: flex;
    justify-content: flex-start;
    box-sizing: border-box;
    margin: 40px 0 60px 0;
  }

  .desc-list .imgMain{
    width: 300px;
    height: 300px;
    text-align: center;
    line-height: 300px;
  }
  .desc-list .imgMain img{
    width: 100%;
    height: auto;
    vertical-align: middle;
    display: inline-block;
  }
  .desc-inlist{
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    font-family:MicrosoftYaHei;
    color:rgba(48,48,48,1);
    justify-content: center;
    margin: 0 0 0 60px;
  }
  .desc-inlist  .list-tap1{
    font-size:28px;
  }
  .desc-inlist  .list-tap2{
    font-size:20px;
    margin: 12px 0 0 0;
  }
  .desc-inlist div{
    font-size: 16px;
    display: flex;
    align-items: center;
    margin: 16px 0 0 0;
  }
  .desc-inlist div label{
    color:#303030;
  }
  .desc-inlist div span{
    color:#838383;
  }
  .desc-inlist div .norm{
    margin: 0 30px 0 0;
    padding: 5px 8px;
    display: inline-flex;
    width:auto;
    height:30px;
    border-radius:6px;
    align-items: center;
    justify-content: center;
    border:1px solid rgba(131,131,131,1);
    cursor: pointer;
  }
  .isActiveM{
    border:1px solid rgba(1,143,215,1) !important;
    color:rgba(1,143,215,1) !important;
  }
  .desc-inlist div .price{
    color: #FF6555;
  }
  .desc-inlist div .upDown{
    width: 100px;
    height: 24px;
    border: 1px solid rgba(151, 151, 151, 1);
    display: flex;
    justify-content: space-between;
    text-align: center;
  }
  .desc-inlist div p{
    width: 24px;
    height: 24px;
    display: inline-flex;
    margin: 0;
    justify-content: center;
    cursor: pointer;
    -webkit-user-select: none;
    -ms-user-select: none;
    -moz-user-select:none;
    user-select: none;
  }
  .desc-inlist div p:nth-child(1){
     border-right:1px solid rgba(151,151,151,1);
   }
  .desc-inlist div p:nth-child(2){
     border-left:1px solid rgba(151,151,151,1);
   }
  .buyBtn {
    display: flex;
    align-items: flex-end;
  }
  .buyBtn span{
    display: flex;
    width:120px;
    height:40px;
    background:rgba(1,143,215,1);
    border-radius:6px;
    font-size:18px;
    font-family:MicrosoftYaHei;
    color:rgba(255,255,255,1);
    line-height:40px;
    justify-content: center;
    margin: 0 0 20px 80px;
    cursor: pointer;
  }
  .desc-tap {
    width: 100%;
    height: 60px;
    margin: 40px 0 0 0;
    display: flex;
    justify-content: flex-start;
    box-sizing: border-box;
  }

  .desc-tap .imgMain{
    width: 222px;
    height: 60px;
    background: url("../../static/images/t-back.png") no-repeat center;
    text-align: center;
    line-height: 60px;
    background-size: 100%;
    color: white;
    font-size: 24px;
  }


  .desc-tap img{
    height: 100%;
  }
  .word-desc{
    font-size:20px;
    font-family:MicrosoftYaHei;
    color:rgba(131,131,131,1);
    line-height:50px;
    margin: 24px 0 0 0;
    box-sizing: border-box;
    padding-bottom: 40px;
    border-bottom: solid 1px rgba(218,218,218,1);;
  }
  .desc-img{
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin: 108px 0 0 0;
  }
  .desc-img img{
    margin: 40px 0 0 0;
  }
  .footer1{
    width: 100%;
    height: 40px;
    background:rgba(68,80,87,1);
    font-size:14px;
    font-family:MicrosoftYaHei;
    color:rgba(136,159,172,1);
    line-height:19px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
