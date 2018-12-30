<template>
  <div class="sidebar">
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs" >
          <el-submenu :index="item.index">
            <template slot="title"><i :class="item.icon"></i>{{ item.title }}
              <el-badge is-dot class="item1" v-show="(item.title=='订单' && flag1)||(item.title=='服务' && flag2)"></el-badge>
            </template>
            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index"  @click.native="getMenu(subItem.title)" >{{ subItem.title }}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index">
            <i :class="item.icon"></i>{{ item.title }}
          </el-menu-item>
        </template>
        <!--<p :title="item.title">{{item.title }}</p>-->
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        flag1: false,
        flag2: false,
        items: [

          {
            icon: 'el-icon-menu',
            index: 'Readme',
            title: '首页',
            // subs: [
            //   {
            //     index: 'Readme',
            //     // title: '创建应用'
            //   },
            // ]
          },
          {
            icon: 'el-icon-date',
            index: '3',
            title: '商品',
            subs: [
              {
                index: 'catalogue',
                title: '商品列表'
              },
              {
                index: 'AddMerchandise',
                title: '添加商品'
              },
              {
                index: 'ServiceList',
                title: '服务列表'
              },
            ]
          },
          {
            icon: 'el-icon-setting',
            index: 'readme',
            title: '订单',
            subs: [
              {
                index: "orderlist",
                title: "订单列表",
              },
//              {
//                index:"AddOrder",
//                title:"新增订单",
//              },

            ]
          },
          {
            icon: 'el-icon-news',
            index: 'ServeOrderList',
            title: '服务',
            subs: [
              /* {
                 index:'AddServerCommodityOrder',
                 title:'新增商品服务订单'
               },*/
              {
                index: "ServeOrderList",
                title: "服务订单列表",
              },
              {
                index: "ServeMakeList",
                title: "服务预约列表",
              },
              {
                index: "ServeExecuteList",
                title: "服务执行排期列表",
              },
            ]
          },
          {
            icon: 'el-icon-star-on',
            index: '4',
            title: '用户',
            subs: [
              {
                index: 'UserList',
                title: '用户列表'
              },
              {
                index: 'AddUser',
                title: '新增用户'
              },
              {
                index: 'MessageLists',
                title: '待处理事项'
              }
            ]
          },
          {
            icon: 'el-icon-document',
            index: '5',
            title: '官网',
            subs: [
              {
                index: 'PicChange',
                title: '动图管理'
              },
              {
                index: 'DocHosManager',
                title: '医生/医院管理'
              }
            ]
          },
          {
            icon: 'el-icon-document',
            index: 'dialogue',
            title: '会话',
            // subs:[
            //   {
            //     index:'seventeen',
            //     title:'标签列表'
            //   }
            // ]
          }
        ]
      }
    },
    created() {

      var ws = new WebSocket("ws://apitest.tianyushangyi.com:8000/ws/register?token=" + localStorage.getItem('currentUser_token'));
      ws.onopen = function (evt) {
        console.log("Connection open ...");
        /*ws.send("Hello WebSockets!");*/
      };
      ws.onmessage = this.websocketonmessage;
      ws.onclose =this.websocketclose

    },
    mounted(){
      this.flag2 = localStorage.getItem("purchaseFlag") == "true" ? true : false;
      this.flag1 = localStorage.getItem("appointFlag") == "true" ? true : false;
    },
    methods: {
      getMenu(tittle){
        if (tittle == "订单列表"){
          window.localStorage.setItem("appointFlag","false");
          this.flag1 = false;
        }
        if (tittle == "服务预约列表"){
          this.flag2 = false;
          window.localStorage.setItem("purchaseFlag","false");
        }
      },
      websocketclose(evt){
        console.log("Connection closed.");
      },
      websocketonmessage(evt) {
        console.log("Received Message: " + evt.data);
        var data1 = evt.data;
        data1 = JSON.parse(data1);

        if(data1.type == "purchase"){//订单
          localStorage.setItem("purchaseFlag","true");
          this.flag1 = true;
        }
        if (data1.type == "appoint"){//服务
          localStorage.setItem("appointFlag","true");
          this.flag2 = true;
        }

        /*data1.type == "purchase" ? window.localStorage.setItem("flag1","1"): this.flag1 = false;
        data1.type == "appoint" ? window.localStorage.setItem("flag2","0") : this.flag2 = false;
        console.log(data1 == "purchase", this.flag1, this.flag2);*/
        /*ws.close();*/
      }
    },
    computed: {
      onRoutes() {
        return this.$route.path.replace('/', '');
      }
    }
  }
</script>

<style scoped>
  .sidebar {
    color: white;
    display: block;
    position: absolute;
    width: 155px;
    left: 0;
    top: 70px;
    bottom: 0;
    background: rgba(51, 51, 51, 1);
    z-index: 999;
  }

  .sidebar > ul {
    color: white;
    background: rgba(51, 51, 51, 1);
    height: 100%;
  }

  .sidebar .el-submenu {
    text-align: left;
  }
</style>
<style>
  .sidebar .el-submenu__title {
    color: white;
  }

  .sidebar .el-submenu__title:hover {
    background: rgba(255, 255, 255, 0.15);
    color: white;
  }

  .sidebar .el-menu-item {
    text-align: left;
    color: white!important;
    background: #303030;
    height: 50px;
    line-height: 50px;
    padding: 0;
    min-width: 155px
  }

  .sidebar .el-menu-item:hover {
    background: #303030;
    /*color: rgba(26, 188, 156, 0.8);*/
  }

  .sidebar .el-menu-item.is-active {
    background: rgba(26, 188, 156, 0.8);
  }

  .item1 {
    position: absolute;
    margin-top: -10px;
    border: 0;
  }
</style>
