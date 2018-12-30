<template>
  <el-container class="AddOrder">
    <el-header>
      <div class="ty-el-header">
        <el-col :span="24"><i class="el-icon-date"></i> 当前订单状态：已付款</el-col>
      </div>
    </el-header>
    <el-main>
      <div class="ty-listone">
        <div class="ty-el-main">
          <el-col :span="12"><i class="el-icon-date"></i>订单信息</el-col>
        </div>
        <el-table
          :data="tableData6"
          border
          style="width: 100%; margin-top: 20px">
          <el-table-column
            prop="id"
            label="订单编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="用户账号">
          </el-table-column>
          <el-table-column
            prop="amount1"
            label="提交时间">
          </el-table-column>
          <el-table-column
            prop="amount2"
            label="订单状态">
          </el-table-column>
          <el-table-column
            prop="amount3"
            label="订单来源">
          </el-table-column>
        </el-table>
      </div>
      <div class="ty-listone">
        <div class="ty-el-main">
          <el-col :span="12"><i class="el-icon-date"></i>订单信息</el-col>
        </div>
        <el-table
          :data="tableData6"
          border
          style="width: 100%; margin-top: 20px">
          <el-table-column
            prop="id"
            label="订单编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="用户账号">
          </el-table-column>
          <el-table-column
            prop="amount1"
            label="提交时间">
          </el-table-column>
          <el-table-column
            prop="amount2"
            label="订单状态">
          </el-table-column>
          <el-table-column
            prop="amount3"
            label="订单来源">
          </el-table-column>
        </el-table>
      </div>
      <div class="ty-listone">
        <div class="ty-el-main">
          <el-col :span="12"><i class="el-icon-date"></i>订单信息</el-col>
        </div>
        <el-table
          :data="tableData6"
          border
          style="width: 100%; margin-top: 20px">
          <el-table-column
            prop="id"
            label="订单编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="用户账号">
          </el-table-column>
          <el-table-column
            prop="amount1"
            label="提交时间">
          </el-table-column>
          <el-table-column
            prop="amount2"
            label="订单状态">
          </el-table-column>
          <el-table-column
            prop="amount3"
            label="订单来源">
          </el-table-column>
        </el-table>
      </div>
      <div class="ty-listone">
        <div class="ty-el-main">
          <el-col :span="12"><i class="el-icon-date"></i>订单信息</el-col>
        </div>
        <el-table
          :data="tableData6"
          border
          style="width: 100%; margin-top: 20px">
          <el-table-column
            prop="id"
            label="订单编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="用户账号">
          </el-table-column>
          <el-table-column
            prop="amount1"
            label="提交时间">
          </el-table-column>
          <el-table-column
            prop="amount2"
            label="订单状态">
          </el-table-column>
          <el-table-column
            prop="amount3"
            label="订单来源">
          </el-table-column>
        </el-table>
      </div>

      <div class="ty-listone">
        <div class="ty-el-main">
          <el-col :span="12"><i class="el-icon-date"></i>预约人信息</el-col>
        </div>
        <div class="el-el-main-input">
          <el-form>
            <el-form-item label="预约人姓名：">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="预约人手机号：">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="预约人手机号：">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <div class="ty-listone">
        <div class="ty-el-main">
          <el-col :span="12"><i class="el-icon-date"></i>其他信息</el-col>
        </div>
        <div class="el-el-main-input">
          <el-form>
            <el-form-item label="备注：">
              <el-input placeholder="备注信息"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>

    </el-main>
    <el-footer>
      <div class="ty-right-anniu">
        <el-button>确认下单</el-button>
        <el-button>取消</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        tableData6: [{
          id: '12987122',
          name: '18000000000',
          amount1: '2018-6-18 13:00:00',
          amount2: '已付款',
          amount3: 'APP订单'
        },]
      };
    },
    methods: {}
  };
</script>

<style scoped>
  .ty-el-header {
    padding-left: 30px;
    height: 80px;
    line-height: 80px;
    background-color: rgba(243, 243, 243, 1);
    border: 1px solid rgba(228, 228, 228, 1);
    color: red;
    font-size: 16px;
  }

  .ty-el-main {
    padding-left: 20px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #333333;
  }

  .ty-listone {
    /*padding-left: 5px;*/
    height: 100%;
  }

  .el-el-main-input {
    padding-left: 100px;
  }

  .ty-right-anniu {
    text-align: center;
  }

  .ty-right-anniu .el-button:nth-child(1) {
    color: white;
    background: rgba(26, 188, 156, 0.8);
  }

  .ty-right-anniu .el-button:nth-child(2) {
    color: rgba(26, 188, 156, 0.8);
    background: white;
    border: 1px solid rgba(26, 188, 156, 0.8);
  }
</style>
<style>
  .AddOrder .el-header {
    padding: 0;
    height: 100%;
  }

  .AddOrder .is-leaf {
    background-color: #E9EEF3;
  }

  .AddOrder .el-input {
    width: 200px;

  }

  .AddOrder .el-input__inner {
    height: 30px;
    line-height: 30px;
  }
</style>
