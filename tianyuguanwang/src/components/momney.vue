<template>
  <el-container>
    <el-header>我的订单</el-header>
    <el-main>
      <el-table
        v-loading="loading"
        :data="tableData2"
        border
        style="width: 100%"
        >
        <el-table-column
          prop="no"
          label="订单编号"
          width="">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="提交时间"
          width="">
        </el-table-column>
        <el-table-column
          prop="picPath"
          label="商品图">
          <template slot-scope="scope" style="width: 50px">
            <img  :src="scope.row.picPath" alt="" style="width: 50px;height: 50px;margin-left: 24px">
          </template>
        </el-table-column>
        <el-table-column
          prop="commodityName"
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="count"
          label="购买数量">
        </el-table-column>
        <el-table-column
          prop="specificationName"
          label="商品规格">
        </el-table-column>
        <el-table-column
          prop="totalPrice"
          label="订单金额">
        </el-table-column>
        <el-table-column
          prop="status"
          label="订单状态">
        </el-table-column>
        <el-table-column
          prop=""
          label="操作">
          <template slot-scope="scope">
            <span class="see-dd" @click="getOrder(scope.row.id)">查看订单</span>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination
        background
        layout="total,prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage1"
        :total="total">
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
    export default {
        name: "momney",
        data(){
          return {
            tableData2: [],
            token:"",
            url:this.$store.state.vuexs.url,
            currentPage1:1,
            currentSize:10,
            total:0,
            loading: true
          }
        },
      methods: {
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          const self=this;
          self.currentPage1=val;
          self.getList()
        },
        getOrder(index){
          // this.$router.push({name:'/mainComponent/five',params:{task_id :id}})
          this.$router.push({name:'orderInfo',params:{id :index}})
        },
        getToken(){
          const self = this;
          self.token =  self.Cookies.get("token")
        },
        getList(){
          const self = this;
          const data = {
            pageNum:self.currentPage1,
            pageSize:self.currentSize
          }
          // self.axios.defaults.headers.post['token'] = self.token;
          self.axios.defaults.headers.post['token'] = self.Cookies.get("token");
          self.axios({
            method:"post",
            url:self.url + "/purchaseorder/list",
            data:data
          }).then(function (res) {
            if (res.data.code == 0){
              self.tableData2 = res.data.data.rows;
              self.total = res.data.data.total;
            }
          })
        }
      },
      created(){
          this.getToken()
      },
      mounted(){
          this.getList()
      },
      updated(){
          this.tableData2.length>0?this.loading=false:this.loading=true
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
  .el-footer{
    text-align: center;
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
</style>
