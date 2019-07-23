<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/layout' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-input v-model="keyword" placeholder="请输入内容" style="width:300px;" @keyup.native.enter="searchByKeyword">
      <el-button slot="append" icon="el-icon-search" @click="searchByKeyword" />
    </el-input>
    <el-table :data="orderList" border style="width: 100%">
      <el-table-column prop="order_number" label="订单编号" width="230" />
      <el-table-column prop="title" label="课程名称" />
      <el-table-column prop="price" label="价格(￥)" width="100" />
      <el-table-column prop="create_time" label="下单时间" :formatter="formatterTime" width="150" />
      <el-table-column prop="nickname" label="下单人" width="120" />
      <el-table-column label="支付状态" width="100">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.pay_status === 0 ? 'danger' : 'success'"
            disable-transitions
          >
            {{ scope.row.pay_status === 0 ? '未支付' : '已支付' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template>
          <el-button size="small" type="success">
            通知付款
          </el-button>
          <el-button size="small" type="primary">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="pageIndex"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import myAxios from '@/common/myAxios'
export default {
  data() {
    return {
      keyword: '',
      pageIndex: 1,
      pageSize: 5,
      orderList: [],
      total: 0
    }
  },
  async asyncData() {
    const res = await myAxios.get('order/list', {
      params: {
        keyword: '',
        pageIndex: 1,
        pageSize: 5
      }
    })

    return { orderList: res.data.message, total: res.data.total }
  },
  methods: {
    async getOrderListData() {
      const res = await this.$axios.get('/admin/order/list', {
        params: {
          keyword: this.keyword,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })

      if (res.data.status === 0) {
        this.orderList = res.data.message
        this.total = res.data.total
      }
    },
    formatNumber(n) {
      const str = n.toString()
      return str[1] ? str : `0${str}`
    },
    formatterTime(row, column) {
      const date = new Date(row.create_time)

      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()

      const hour = date.getHours()
      const minute = date.getMinutes()
      const second = date.getSeconds()

      const t1 = [year, month, day].map(this.formatNumber).join('-')
      const t2 = [hour, minute, second].map(this.formatNumber).join(':')

      return `${t1} ${t2}`
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.pageIndex = 1

      this.getOrderListData()
    },
    handleCurrentChange(currentPage) {
      this.pageIndex = currentPage

      this.getOrderListData()
    },
    // 搜索
    searchByKeyword() {
      this.pageIndex = 1
      this.pageSize = 5
      this.getOrderListData()
    }
  }
}
</script>
