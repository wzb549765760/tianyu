<template>
  <div class="pay-box">
    <div class="pay-container">
      <span class="pay-title">支付订单</span>
      <span style="font-size: 26px;">{{params.no}}</span>
      <div class="pay-desc">
        <div class="pay-desc1">
          <img src="../../static/images/paysuccess.png" alt="">
          <div class="pay-desc1Min">
            <span class="pay-desc1Min-Title1">订单提交成功！请尽快完成支付</span>
            <div class="pay-desc1Min-Title2">请在<span>{{ hours }}小时{{ minute }}分</span>内完成支付</div>
          </div>
        </div>
        <div class="pay-desc2">应付金额 ： <span>¥{{params.price}}</span></div>
      </div>
      <span class="border-line"></span>
      <span class="pay-info">请选择以下支付方式付款<el-button type="success"
                                                   style="width: 100px;margin-left: 30px" @click="getErImage">微信支付</el-button>
      <el-button type="primary" style="width: 120px" @click="aliPay">支付宝支付</el-button></span>

      <div class="pay-image">
        <div class="pay-imageMin">
          <img :src="payImg" alt="">
          <span v-show="payImg">微信扫一扫</span>
        </div>
        <!--<div class="pay-imageMin">
          <img src="../../static/images/logo.png" alt="">
          <span>支付宝扫一扫</span>
        </div>-->
        <el-button type="text" @click="open"></el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "pay",
    data() {
      return {
        tableData3: {},
        params: this.$route.params,
        url: this.$store.state.vuexs.url,
        payImg: "",
        hours: 2,
        minute: 0,
        dataTimer: null,
        type:"wechat"
      }
    },
    created() {
      if (this.$route.params.id) {
        this.params = this.$route.params;
        this.$store.state.vuexs.pay = this.$route.params
      } else {
        this.params = this.$store.state.vuexs.pay;
      }
    },
    methods: {
      getErImage() {
        const self = this;
        self.type="wechat";
        self.axios.defaults.headers.get['token'] = self.Cookies.get("token");
        self.axios({
          method: "get",
          url: self.url + "/order/order?id=" + self.params.id+"&type="+self.type,
        }).then(function (res) {
          console.log(res);
          if(res.data.code==0){
            self.payImg = res.data.data.payImg;
            self.payTimer()
          }else{
            self.$message.error("获取支付信息失败")
          }
        })
      },
      aliPay(){
        const self = this;
        self.type="aliWeb";
        self.axios.defaults.headers.get['token'] = self.Cookies.get("token");
        self.axios({
          method: "get",
          url: self.url + "/order/order?id=" + self.params.id+"&type="+self.type,
        }).then(function (res) {
          console.log(res);
          if(res.data.code==0){
            console.log(res);
            window.location.href =res.data.data
          }else{
            self.$message.error("获取支付信息失败")
          }
        })
      },
      open() {
        const self = this;
        this.$alert('支付成功', '支付状态', {
          confirmButtonText: '确定'
        }).then(function () {
          self.$router.push('/products')
        });
      },
      payTimer() {
        const self = this;
        self.dataTimer = window.setTimeout(() => {
          self.axios.defaults.headers.post['token'] = self.Cookies.get("token");
          self.axios({
            method: "post",
            url: self.url + "/purchaseorder/list",
            data: {
              pageNum: 1,
              pageSize: 10
            }
          }).then(function (res) {
            if (res.data.code == 0) {
              if (res.data.data.rows[0].status == '已付款') {
                /*self.open();*/
                self.$router.push("/paySuccess")
                return
              } else {
                self.$route.params.id ? self.payTimer() : null;
                return
              }
            }
            ;
          })
        }, 3000)
      }
    },
    mounted() {
      /*this.getErImage();*/
      /*this.payTimer();*/
    },
    watch: {
      /* $route(to,from){
         console.log(to);
         if(to.name=="mainhome"||"sources"||"content"||"myserves"||"products"){
           this.payTimer=null
         }
       }*/
    }
  }
</script>

<style scoped>
  .pay-box {
    position: absolute;
    overflow: auto;
  }

  .pay-container {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 120px 160px;
  }

  .pay-title {
    font-size: 20px;
    font-family: MicrosoftYaHei;
    color: rgba(131, 131, 131, 1);
    line-height: 26px;
  }

  .pay-desc {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 40px 0 0 0;
  }

  .pay-desc1 {
    display: flex;
  }

  .pay-desc1 img {
    width: 80px;
    height: 80px;
  }

  .pay-desc1Min {
    display: inline-flex;
    flex-direction: column;
    justify-content: flex-end;
    margin: 0 0 0 20px;
  }

  .pay-desc1Min-Title1 {
    font-size: 36px;
    font-family: MicrosoftYaHei;
    color: rgba(48, 48, 48, 1);
    line-height: 47px;
  }

  .pay-desc1Min-Title2 {
    display: flex;
    font-size: 24px;
    font-family: MicrosoftYaHei;
    color: rgba(131, 131, 131, 1);
    line-height: 31px;
  }

  .pay-desc1Min-Title2 span {
    color: #FF6555;
  }

  .pay-desc2 {
    display: inline-flex;
    align-items: flex-end;
    font-size: 24px;
    font-family: MicrosoftYaHei;
    color: rgba(48, 48, 48, 1);
    line-height: 31px;
  }

  .pay-desc2 span {
    font-size: 36px;
    color: #FF6555;
  }

  .border-line {
    height: 1px;
    background: rgba(218, 218, 218, 1);
    margin: 60px 0 0 0;
  }

  .pay-info {
    font-size: 20px;
    font-family: MicrosoftYaHei;
    color: rgba(48, 48, 48, 1);
    line-height: 26px;
    margin: 60px 0 0 0;
  }

  .pay-image {
    display: flex;
    margin: 40px 0 0 0;
  }

  .pay-imageMin {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    margin: 0 200px 0 0;
  }

  .pay-imageMin img {
    width: 200px;
    height: 200px;
  }

  .pay-imageMin span {
    font-size: 18px;
    font-family: MicrosoftYaHei;
    color: rgba(48, 48, 48, 1);
    line-height: 24px;
    margin: 13px 0 0 0;
  }
</style>
