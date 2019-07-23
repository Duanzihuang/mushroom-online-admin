<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/layout' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
      <el-breadcrumb-item>课程列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-input v-model="keyword" placeholder="请输入内容" style="width:300px;" @keyup.native.enter="searchByKeyword">
      <el-button slot="append" icon="el-icon-search" @click="searchByKeyword" />
    </el-input>
    <el-button style="margin-left:5px" type="success" @click="$router.push('/layout/course/add')">
      添加课程
    </el-button>
    <el-table :data="courseList" border style="width: 100%">
      <el-table-column prop="title" label="课程名称" width="180" />
      <el-table-column label="副标题(hover看简介)" width="200">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="课程介绍"
            width="200"
            trigger="hover"
            :content="scope.row.introduction"
          >
            <span slot="reference">{{ scope.row.subtitle }}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="level" label="课程级别" width="80" :formatter="formatterLevel" />
      <el-table-column prop="update_time" label="更新时间" width="150" :formatter="formatterTime" />
      <el-table-column label="评级" width="200">
        <template slot-scope="scope">
          <el-rate
            v-model="scope.row.score"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格(￥)" width="80" />
      <el-table-column label="操作">
        <template>
          <el-button size="small" type="primary" icon="el-icon-edit" />
          <el-button size="small" type="danger" icon="el-icon-delete" />
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
      courseList: [],
      total: 0
    }
  },
  async asyncData() {
    const res = await myAxios.get('course/list', {
      params: {
        keyword: '',
        pageIndex: 1,
        pageSize: 5
      }
    })

    return { courseList: res.data.message, total: res.data.total }
  },
  methods: {
    async getCourseListData() {
      const res = await this.$axios.get('/admin/course/list', {
        params: {
          keyword: this.keyword,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })

      if (res.data.status === 0) {
        this.courseList = res.data.message
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
    formatterLevel(row, column) {
      switch (row.level) {
        case 1:
          return <el-tag type="success">初级</el-tag>

        case 2:
          return <el-tag tpye="primary">中级</el-tag>

        case 3:
          return <el-tag type="danger">高级</el-tag>

        default:
          return <el-tag tpye="success">初级</el-tag>
      }
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.pageIndex = 1

      this.getCourseListData()
    },
    handleCurrentChange(currentPage) {
      this.pageIndex = currentPage

      this.getCourseListData()
    },
    // 搜索
    searchByKeyword() {
      this.pageIndex = 1
      this.pageSize = 5
      this.getCourseListData()
    }
  }
}
</script>
