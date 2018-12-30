<template>
  <el-container>
    <el-header>我的聊天</el-header>
    <el-main id="dialogue_box">
      <div style="width: 900px">
        <div class="talk-box first-talk"  :class="{'talk-Left':true}" v-show="firstLineShow">
          <img src="../../static/images/20180904172542.png" alt="">
          <span> 您好，我叫小天，是天宇尚医的人工智能助手，可以回答一些健康方面的问答内容（医学名词解释，用药建议等），您可以这样问我“什么是高血压”</span>
         </div>
        <div class="talk-box"  v-for="site in textList" :class="{'talk-Left':site.isLeft,'talk-right':site.isRight}">
          <img :src="site.imageUrl" alt="">
          <span>{{site.text}}</span>
        </div>
      </div>
    </el-main>
    <el-footer>
      <input type="text" class="talk-input" v-model="textIn" @keyup.enter="getIn">
      <el-button type="primary" @click="getIn">发送</el-button>
    </el-footer>
  </el-container>
</template>

<script>
  export default {
    name: "momney",
    data(){
      return {
        url:this.$store.state.vuexs.url,
        textIn:"",
        textList:[],
        imageUrlL:"../../static/images/20180904172542.png",
        imageUrlR:"../../static/images/20180904172504.png",
        firstLineShow:false
      }
    },
    methods: {
      getIn(){
        const self  = this;
        const  obj = {
          text:self.textIn,
          imageUrl:self.imageUrlR,
          isLeft:false,
          isRight:true
        };
        if (obj.text == ""){
          self.$message.error('请输入您的问题');
        } else {
          self.textList.push(obj)
          const data = {
            id: self.Cookies.get("random"),
            message: self.textIn
          }
          self.textIn = ""
          self.axios({
            method: "post",
            url: self.url + "/chat/bot",
            data: self.qs.stringify(data)
          }).then(function (res) {
            if (res.data.code == 0) {
              const obj = {
                text: res.data.data,
                isLeft: true,
                isRight: false,
                imageUrl:self.imageUrlL
              };
              self.textList.push(obj)
            }
          })
        }
      },
    },
    created(){
      window.setTimeout(()=>{
        this.firstLineShow=true;
      },1000)
    },
    mounted(){

    },
    updated:function(){
      this.$nextTick(function(){
        var div = document.getElementById('dialogue_box');
        div.scrollTop = div.scrollHeight;
      })
    }
  }
</script>

<style scoped>
  .el-header{
    font-size:20px;
    font-family:MicrosoftYaHei;
    color:rgba(131,131,131,1);
    line-height:80px;
  }
  .el-main{
   position: absolute;
    width: 100%;
    top: 140px;
    bottom: 80px;
    background: #F3F3F3;
    justify-content: center;
    display: flex;
  }
  .el-footer{
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  th{
    font-size:20px;
    font-family:MicrosoftYaHei;
    color:rgba(48,48,48,1);
    line-height:26px;
  }
  .see-dd{
    font-size:20px;
    font-family:MicrosoftYaHei;
    color:rgba(1,143,215,1);
    line-height:26px;
    cursor: pointer;
  }
  .talk-input{
    width: 700px;
    height: 41px;
    border-radius:6px;
    border:1px solid rgba(131,131,131,1);
    box-sizing: border-box;
    padding: 0 40px;
  }
  .talk-box{
    width: 100%;
    display: flex;
    margin: 60px 0 0 0;
  }
  .talk-box img{
    width: 80px;
    height: 80px;
  }
  .talk-box span{
    width: 500px;
    box-sizing: border-box;
    padding: 24px 32px;
    border-radius:6px;
    margin: 0 25px;
    font-size: 18px;
    word-wrap: break-word;
    line-height: 30px;
  }
  .talk-Left{
    flex-direction: row;
  }
  .talk-Left span{
    background:rgba(85,148,215,1);
    color:rgba(255,255,255,1);
  }
  .talk-right{
    flex-direction: row-reverse;

  }
  .talk-right span{
    background:rgba(255,255,255,1);
    color:rgba(48,48,48,1);
  }
  /*.first-talk{
    position: absolute;
    left: 30%;
  }*/
</style>
