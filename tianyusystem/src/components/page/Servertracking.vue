<template>
  <!--新建的页面-->
  <div class="historyMain">
    <div class="historyList" v-for="(l,index) in historyList">
      <i :class="index==0?'focus':'nomal'"></i>
      <span class="historyAddress" v-for="lc in l.msg" v-if="lc != ''">
        {{lc}}
      </span>
      <div class="historyTime">
        {{l.date}}
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        params: this.$route.params,
        historyList: [],
        baseURl: this.$store.state.url,
        token: "",
      }
    },
    methods: {
      getHistoryById() {
        var self = this;
        this.historyVisible = true;
        var token = localStorage.getItem('currentUser_token');
        var id = self.params.task_id;
        axios.defaults.headers.get['token'] = token;
        axios({
          method: 'post',
          url: self.baseURl + '/serviceorder/servicefollowing?id=' + id,
        }).then(res => {
          if (res.data['code'] == '0') {
            self.historyList = res.data.data;
            console.log(self.historyList)
          }
        })
      },
    },
    mounted() {
      this.getHistoryById()
    }
  }
</script>
<style>
  /*历史记录*/

  .historyMain {
    width: 100%;
    /*height: 200px;*/
    overflow: auto;
    padding: 100px;
    box-sizing: border-box;
  }

  .historyMain .historyList {
    width: 100%;
    height: 100px;
    border-left: 1px solid #e5e5e5;
    box-sizing: border-box;
    position: relative;
    padding-left: 20px;
  }

  .historyMain .historyList:last-child {
    border-left-color: white;
  }

  .historyMain .historyList i {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    position: absolute;
    left: -10px;
    top: 0px;
  }

  .historyMain .historyList i.focus {
    background: rgba(26, 188, 156, 0.8);
  }

  .historyMain .historyList i.nomal {
    background-color: #e5e5e5;
  }

  .historyMain .historyList .historyAddress {
    width: 100%;
    height: 35px;
    font-size: 14px;
  }

  .historyMain .historyList .historyTime {
    width: 100%;
    height: 35px;
    font-size: 12px;
  }
</style>
