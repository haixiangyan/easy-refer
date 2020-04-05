<template>
    <div class="login">
        <el-card class="login-card" v-loading="loading">
            <el-form class="login-form" ref="loginForm" :model="loginForm" :rules="rules">
                <div class="login-form-header">
                    <img class="login-logo" src="../assets/img/logo.png" alt="logo">
                </div>
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
                <el-form-item class="login-form-footer">
                    <el-button @click="register" class="register-button" type="text">创建账号</el-button>
                    <el-button type="primary" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator'
  import {ElForm} from 'element-ui/types/form'
  import {LOGIN_RULES} from '@/constants/rules'
  import AuthService from '@/service/AuthService'

  @Component
  export default class Login extends Vue {
    loginForm: TLoginForm = {
      email: '',
      password: ''
    }
    rules = LOGIN_RULES

    get loading() {
      return this.$store.state.loading
    }

    register() {
      (<ElForm>this.$refs.loginForm).validate(async valid => {
        if (!valid) return this.$message.error('填写不正确')

        await AuthService.register(this.loginForm)

        this.login()
      })
    }

    login() {
      (<ElForm>this.$refs.loginForm).validate(async valid => {
        if (!valid) return this.$message.error('填写不正确')

        const {data} = await AuthService.login(this.loginForm)

        this.$store.commit('auth/setAuth', true)
        this.$store.commit('user/setUser', data.user)
        data.job && this.$store.commit('job/setJob', data.job)
        data.resume && this.$store.commit('resume/setResume', data.resume)

        this.$notify({title: '登录成功', message: '欢迎回来', type: 'success'})

        await this.$router.push('/job-list')
      })
    }
  }
</script>

<style scoped lang="scss">
    .login {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        background: url("../assets/img/login_bg.jpg");

        &-logo {
            width: 200px;
            height: 200px;
        }

        &-card {
            width: 448px;
            height: 500px;
            padding: 40px;
        }

        &-form {
            &-header {
                text-align: center;
            }

            &-footer {
                width: 100%;
                position: relative;
                text-align: right;

                .register-button {
                    padding-left: 0;
                    position: absolute;
                    left: 0;
                }
            }
        }
    }
</style>
