<template>
    <el-form class="login-form" ref="loginForm" :model="loginForm" :rules="rules">
        <el-form-item prop="email">
            <el-input type="email" v-model="loginForm.email" placeholder="输入邮箱">
                <template slot="prepend">
                    <i class="el-icon-message"></i>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" placeholder="输入密码">
                <template slot="prepend">
                    <i class="el-icon-key"></i>
                </template>
            </el-input>
        </el-form-item>
        <div class="footer">
            <div>
                <el-button @click="register" class="register-button" type="text">创建账号</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button @click="activate" class="register-button" type="text">激活账号</el-button>
            </div>
            <el-button type="primary" @click="login">登录</el-button>
        </div>
    </el-form>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator'
  import {LOGIN_RULES} from '~/constants/rules'
  import {ElForm} from 'element-ui/types/form'

  @Component
  export default class LoginForm extends Vue {
    loginForm: TLoginForm = {
      email: '',
      password: ''
    }
    rules = LOGIN_RULES

    register() {
      (<ElForm>this.$refs.loginForm).validate(async valid => {
        if (!valid) return this.$message.error('填写不正确')

        await this.$axios.$post('/auth/register', this.loginForm)

        this.$message.success('注册成功')

        this.login()
      })
    }

    activate() {
      (<ElForm>this.$refs.loginForm).validate(async valid => {
        if (!valid) return this.$message.error('填写不正确')

        await this.$axios.$post('/auth/activate', this.loginForm)

        this.$message.success('激活成功')

        this.login()
      })
    }

    login() {
      (<ElForm>this.$refs.loginForm).validate(async valid => {
        if (!valid) return this.$message.error('填写不正确')

        // 登录成功后，自动获取用户
        await this.$auth.loginWith('local', {
          data: this.loginForm
        })

        this.$notify({title: '登录成功', message: '欢迎回来', type: 'success'})

        await this.$router.push('/job/list')
      })
    }
  }
</script>

<style scoped lang="scss">
    .login-form {
        .footer {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
    }
</style>
