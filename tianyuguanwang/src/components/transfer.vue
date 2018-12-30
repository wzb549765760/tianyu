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
            <div class="pay-desc1Min-Title2">请在<span>2小时0分</span>内完成支付</div>
          </div>
        </div>
        <div class="pay-desc2">应付金额 ： <span>¥{{params.price}}</span></div>
      </div>
      <span class="border-line"></span>
      <span class="pay-info">对公账号信息如下</span>
      <div class="pay-image">
          <span class="min-title">户名&nbsp;:&nbsp;<span>天宇尚医（北京）健康咨询有限公司</span></span>
          <span class="min-title">账号&nbsp;:&nbsp;<span>110912155510301</span></span>
          <span class="min-title">开户行&nbsp;:&nbsp;<span>招商银行北京德胜门支行</span></span>
          <span class="min-txt">备注：为了确认您的付款信息，请在汇款时备注订单编号 <p class="min-btn" @click="toProduct">我知道了</p> </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "transfer",
    data(){
      return{
        params:this.$route.params
      }
    },
    methods:{
      toProduct(){
        this.$router.push('/products')
      }

    }
  }
</script>

<style scoped>
  /*.pay-box{*/
    /*position: absolute;*/
    /*overflow: auto;*/
  /*}*/
  .pay-container{
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding:120px 160px;
  }
  .pay-title{
    font-size:20px;
    font-family:MicrosoftYaHei;
    color:rgba(131,131,131,1);
    line-height:26px;
  }
  .pay-desc{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 40px 0 0 0;
  }
  .pay-desc1{
    display: flex;
  }
  .pay-desc1 img{
    width: 80px;
    height: 80px;
  }
  .pay-desc1Min{
    display: inline-flex;
    flex-direction: column;
    justify-content: flex-end;
    margin: 0 0 0 20px;
  }
  .pay-desc1Min-Title1{
    font-size:36px;
    font-family:MicrosoftYaHei;
    color:rgba(48,48,48,1);
    line-height:47px;
  }
  .pay-desc1Min-Title2{
    display: flex;
    font-size:24px;
    font-family:MicrosoftYaHei;
    color:rgba(131,131,131,1);
    line-height:31px;
  }
  .pay-desc1Min-Title2 span{
    color:#FF6555;
  }
  .pay-desc2{
    display: inline-flex;
    align-items: flex-end;
    font-size:24px;
    font-family:MicrosoftYaHei;
    color:rgba(48,48,48,1);
    line-height:31px;
  }
  .pay-desc2 span{
    font-size: 36px;
    color: #FF6555;
  }
  .border-line{
    height:1px;
    background:rgba(218,218,218,1);
    margin: 60px 0 0 0;
  }
  .pay-info{
    font-size:20px;
    font-family:MicrosoftYaHei;
    color:rgba(48,48,48,1);
    line-height:26px;
    margin: 60px 0 0 0;
  }
  .pay-image{
    display: flex;
    margin: 40px 0 0 0;
    flex-direction: column;
  }
  .min-title{
    font-size:24px;
    font-family:MicrosoftYaHei;
    color:rgba(48,48,48,1);
    line-height:31px;
    margin-top: 24px;
  }
  .min-title span{
    font-weight: 600;
  }
  .min-txt{
    font-size:16px;
    font-family:MicrosoftYaHei;
    color:rgba(131,131,131,1);
    line-height:21px;
    margin-top: 10px;
    display: flex;
    align-items: flex-end;
  }
  .min-btn{
    display: inline-flex;
    margin: 0;
    width:120px;
    height:40px;
    border-radius:6px;
    border:1px solid rgba(1,143,215,1);
    justify-content: center;
    line-height: 40px;
    color:rgba(1,143,215,1);
    margin-left: 250px;
    cursor: pointer;
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
