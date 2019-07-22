<template>
  <el-container>
    <el-aside width="auto">
      <!-- 左边上边的是Logo -->
      <div class="logo" />
      <el-menu
        background-color="#545c64"
        class="el-menu-vertical-demo"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        unique-opened
        router
        :default-active="active"
      >
        <el-submenu index="/">
          <template slot="title">
            <i class="el-icon-location" />
            <span slot="title">用户管理</span>
          </template>
          <el-menu-item index="/layout/user/list">
            <i class="el-icon-menu" />用户列表
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location" />
            <span slot="title">课程管理</span>
          </template>
          <el-menu-item index="/layout/course/list">
            <i class="el-icon-menu" />课程列表
          </el-menu-item>
          <el-menu-item index="/layout/video/list">
            <i class="el-icon-menu" />视频列表
          </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location" />
            <span slot="title">订单管理</span>
          </template>
          <el-menu-item index="/layout/order/list">
            <i class="el-icon-menu" />订单列表
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <!-- 菜单图标 -->
        <i
          :class="['iconfont icon-left-indent',isCollapse ? 'my-menu-active' : 'my-menu']"
          @click="toggleMenu"
        />
        <!-- 标题 -->
        <div class="stitle">
          蘑菇在线后台管理系统
        </div>
        <!-- 退出的链接 -->
        <a href="javascript:void(0);" class="logoutbtn" @click="logout">退出</a>
      </el-header>
      <el-main>
        <nuxt-child />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  middleware: 'auth',
  data() {
    return {
      isCollapse: false, // 是否收缩
      active: '/layout/course/list' // 当前激活的路由
    }
  },
  created() {
    this.active = this.$route.fullPath
  },
  methods: {
    ...mapMutations({
      setToken: 'user/setToken',
      setUser: 'user/setUser'
    }),
    // 左边菜单的展开和收起
    toggleMenu() {
      this.isCollapse = !this.isCollapse
    },
    // 退出登录
    logout() {
      this.$confirm('确认退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await this.$axios.get('/admin/user/logout')
          if (res.data.status === 0) {
            this.$message({
              type: 'success',
              message: res.data.message
            })

            // 清空store/user中的state数据
            this.setToken(null)
            this.setUser(null)

            this.$router.push('/login')
          }
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  height: 60px;
  background-image: url(~assets/images/logo.png);
  background-size: cover;
  background-color: #989898;
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #545c64;
  color: #333;
  text-align: left;
  line-height: 60px;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: left;
  height: 100%;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  // text-align: center;
  // line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.stitle {
  position: absolute;
  font-size: 28px;
  overflow: hidden;
  width: 300px;
  color: #fff;
  left: 600px;
  top: 0px;
}

.logoutbtn {
  position: absolute;
  right: 10px;
  color: #ffd04b;
}

.el-menu {
  border-right: none;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  // height: 100%;
  min-height: 400px;
}
.my-menu,
.my-menu-active {
  font-size: 25px;
  color: #ffd04b;
}

.my-menu-active:before {
  display: inline-block;
  transition: all 0.2s;
  transform: rotateY(0deg);
}

.my-menu:before {
  display: inline-block;
  transition: all 0.2s;
  transform: rotateY(-180deg);
}
</style>
