<template>
  <div class="pay-box">
    <div class="pay-container" >
      <span class="pay-title">支付状态</span>
      <div class="pay-desc">
        <div class="pay-desc1" style="margin: 0 auto">
          <img src="../../static/images/paysuccess.png" alt="">
          <div class="pay-desc1Min">
            <span class="pay-desc1Min-Title1">恭喜您！订单支付成功</span>
            <div class="pay-desc1Min-Title2">我们将尽快为您服务，请保持手机畅通</div>
          </div>
        </div>
      </div>
      <div class="pay-desc2" style="margin: 30px auto">支付金额 ： <span>¥{{price}}</span></div>
    </div>
    <el-button type="success" size="medium" round style="display:block;margin: 0 auto;" @click="backToHome">返回首页</el-button>
  </div>
</template>

<script>
  export default {
    name: "pay",
    data() {
      return {
        price:localStorage.getItem("price")
      }
    },
    created() {
    },
    methods: {
      backToHome(){
        this.$router.push("/mainhome")
      }
    },
    mounted() {
    },
    watch: {

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
    margin-right: 200px;
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
