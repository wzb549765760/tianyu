<template>
  <div>
    <div key="2">
      <!--<div class="info-box">
        <span class="info-status">当前订单状态：{{orderInfo.orderInfo.status}}</span>
        <span class="info-title">订单信息</span>
        <div class="ddxx">
          <table cellspacing="0">
            <tr>
              <th>订单编号</th>
              <th>用户账号</th>
              <th>提交时间</th>
              <th>订单状态</th>
              <th>订单金额</th>
            </tr>
            <tr>
              <td>{{orderInfo.orderInfo.no}}</td>
              <td>{{orderInfo.orderInfo.mobile}}</td>
              <td>{{orderInfo.orderInfo.createDate}}</td>
              <td>{{orderInfo.orderInfo.status}}</td>
              <td>{{orderInfo.orderInfo.totalPrice}}</td>
            </tr>
          </table>
        </div>
        <span class="info-title">服务信息</span>
        <div class="ddxx">
          <table cellspacing="0">
            <tr>
              <th>商品编号</th>
              <th>商品图</th>
              <th>商品名称</th>
              <th>规格</th>
              <th>规格详细信息</th>
              <th>数量</th>
            </tr>
            <tr>
              <td>{{orderInfo.purchaseInfo.specificationDetail.spec2prod[0].no}}</td>
              <td>
                <img :src="orderInfo.purchaseInfo.picPath" alt=""style="width:120px;height: 80px">
              </td>
              <td>{{orderInfo.purchaseInfo.commodityName}}</td>
              <td>{{orderInfo.purchaseInfo.specificationDetail.name}}</td>
              <td>
                <div v-for="site2 in orderInfo.purchaseInfo.specificationDetail.spec2prod">{{site2.productName}}：{{site2.count}}次</div>
              </td>
              <td>{{orderInfo.purchaseInfo.count}}</td>
            </tr>
          </table>
        </div>
        <span class="info-title">产品使用人信息</span>
        <div class="ddxx">
          <table cellspacing="0">
            <tr>
              <th>产品使用人</th>
              <th>性别</th>
              <th>年龄</th>
              <th>手机号码</th>
              <th>身份证号</th>
              <th>身份证正面</th>
            </tr>
            <tr>
              <td>{{orderInfo.servicePeople.name}}</td>
              <td>{{orderInfo.servicePeople.sex==1?'男':'女'}}</td>
              <td>{{orderInfo.servicePeople.age}}</td>
              <td>{{orderInfo.servicePeople.mobile}}</td>
              <td>{{orderInfo.servicePeople.idCardNum}}</td>
              <td><img :src="orderInfo.servicePeople.idCardUrl" alt="" style="width: 50px;height: 50px"></td>
            </tr>
          </table>
        </div>
        &lt;!&ndash;<button @click="getNext">支付</button>&ndash;&gt;
      </div>-->
    </div>
    <!--<div v-if="orderInfo.address.name" key="1" style="width: 100%">-->
      <div key="1" style="width: 100%">
      <div class="info-box" style="width: 90%">
      <span class="info-status">当前订单状态：{{orderInfo.orderInfo.status}}</span>
      <span class="info-title">订单信息</span>
      <div class="ddxx">
        <table cellspacing="0">
          <tr>
            <th>订单编号</th>
            <th>用户账号</th>
            <th>提交时间</th>
            <th>订单状态</th>
            <th>订单金额</th>
          </tr>
          <tr>
            <td>{{orderInfo.orderInfo.no}}</td>
            <td>{{orderInfo.orderInfo.mobile}}</td>
            <td>{{orderInfo.orderInfo.createDate}}</td>
            <td>{{orderInfo.orderInfo.status}}</td>
            <td>{{orderInfo.orderInfo.totalPrice}}</td>
          </tr>
        </table>
      </div>
      <span class="info-title">服务信息</span>
      <div class="ddxx">
        <table cellspacing="0">
          <tr>
            <th>商品编号</th>
            <th>商品图</th>
            <th>商品名称</th>
            <th>规格</th>
            <th>规格详细信息</th>
            <th>数量</th>
          </tr>
          <tr>
            <td>{{orderInfo.purchaseInfo.specificationDetail.spec2prod[0].no}}</td>
            <td>
              <img :src="orderInfo.purchaseInfo.picPath" alt=""style="width:120px;height: 80px">
            </td>
            <td>{{orderInfo.purchaseInfo.commodityName}}</td>
            <td>{{orderInfo.purchaseInfo.specificationDetail.name}}</td>
            <td>
              <div v-for="site2 in orderInfo.purchaseInfo.specificationDetail.spec2prod">{{site2.productName}}：{{site2.count}}次</div>
            </td>
            <td>{{orderInfo.purchaseInfo.count}}</td>
          </tr>
        </table>
      </div>
      <span class="info-title">产品使用人信息</span>
      <div class="ddxx">
        <table cellspacing="0">
          <tr>
            <th>产品使用人</th>
            <th>手机号码</th>
            <th v-if="orderInfo.address">地址</th>
            <th v-if="orderInfo.servicePeople">年龄</th>
            <th v-if="orderInfo.servicePeople">身份证号</th>
            <th v-if="orderInfo.servicePeople">身份证图片</th>
          </tr>
          <tr>
            <td v-if="orderInfo.address">{{orderInfo.address.name}}</td>
            <td v-if="orderInfo.address">{{orderInfo.address.mobile}}</td>
            <td v-if="orderInfo.address">{{orderInfo.address.address}}
            <td v-if="orderInfo.servicePeople">{{orderInfo.servicePeople.name}}</td>
            <td v-if="orderInfo.servicePeople">{{orderInfo.servicePeople.mobile}}</td>
            <td v-if="orderInfo.servicePeople">{{orderInfo.servicePeople.age}}</td>
            <td v-if="orderInfo.servicePeople">{{orderInfo.servicePeople.idCardNum}}</td>
            <td v-if="orderInfo.servicePeople"><img :src="orderInfo.servicePeople.idCardUrl+'&token='+token" alt="" style="width: 50px;height: 50px"></td>
          </tr>
        </table>
      </div>
      <!--<button @click="getNext">支付</button>-->
    </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "info",
        data(){
          return {
            params:this.$route.params,
            url:this.$store.state.vuexs.url,
            orderInfo:{},
            token:""
          }
        },
        methods:{
          getOrderInfo(){
            const self = this;
            // self.axios.defaults.headers.post['token'] = self.token;
            self.token=self.Cookies.get("token");
            self.axios.defaults.headers.get['token'] = self.token;
            self.axios({
              method:"get",
              url:self.url + "/purchaseorder/detail?id=" + self.params.id
            }).then(function (res) {
              console.log(res);
              if (res.data.code == 0){
                self.orderInfo = res.data.data;
              }
            })
          },
          getNext(){
            this.$router.push({path:'/pay2'});
          }
        },
      created(){

      },
        mounted(){
          this.getOrderInfo();
          console.log(this.orderInfo);
        }
    }
</script>

<style scoped>
    .info-box{
      position: absolute;
      overflow: auto;
      display: flex;
      padding: 60px;
      box-sizing: border-box;
      flex-direction: column;
    }
    .info-status{
      font-size:24px;
      font-family:MicrosoftYaHei;
      color:rgba(255,101,85,1);
      line-height:31px;
    }
    .info-title{
      font-size:24px;
      font-family:MicrosoftYaHei;
      color:rgba(48,48,48,1);
      line-height:31px;
      margin: 40px 0 0 0;
    }
    .ddxx{
      width: 100%;
    }
  table{
    width: 100%;
    border:1px solid rgba(218,218,218,1);
    margin: 20px 0 0 0;
  }
  th{
    height: 60px;
    font-size:20px;
    font-family:MicrosoftYaHei;
    color:rgba(48,48,48,1);
    line-height:26px;
    border-left:1px solid rgba(218,218,218,1);
    border-top:1px solid rgba(218,218,218,1);
    background-color: #F3F3F3;
  }
    th:last-child{
      border-right:1px solid rgba(218,218,218,1);
    }
  td{
    padding: 25px 0;
    font-size:20px;
    font-family:MicrosoftYaHei;
    color:rgba(131,131,131,1);
    line-height:26px;
    border-left:1px solid rgba(218,218,218,1);
    text-align: center;
  }
</style>
