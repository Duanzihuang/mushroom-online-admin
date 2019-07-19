<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm login-container">
    <h3 class="title">
      蘑菇在线后台管理系统
    </h3>
    <el-form-item prop="username">
      <el-input prefix-icon="iconfont icon-login_user" v-model="ruleForm.username" />
    </el-form-item>
    <el-form-item prop="password">
      <el-input prefix-icon="iconfont icon-login_password" v-model="ruleForm.password" type="password" />
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button
        type="primary"
        style="width:100%;"
        :loading="logining"
        @click.native.prevent="login"
      >
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import md5 from '../utils/md5'
export default {
  data() {
    return {
      logining: false, // 是否正在加载
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          this.logining = true

          const res = await this.$axios.post('/admin/user/login', {
            username: this.ruleForm.username,
            password: md5(this.ruleForm.password)
          })

          this.logining = false
          if (res.data.status !== 0) {
            this.$message.error(res.data.message)
          } else {
            // 把token 保存到本地
            localStorage.setItem('token', res.data.token)

            // 进行路由跳转
            this.$router.push('/layout')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 400px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>
