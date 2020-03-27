<template>
    <div class="login">
        <el-card class="login-card">
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
  import Vue from "vue"
  import {Component} from "vue-property-decorator"
  import AuthService from "@/services/AuthService"
  import {ElForm} from "element-ui/types/form"
  import {LOGIN_RULES} from "@/contents/rules"

  @Component
  export default class Login extends Vue {
    loginForm: TLoginForm = {
      email: "",
      password: ""
    }

    rules = LOGIN_RULES

    register() {
      (<ElForm>this.$refs.loginForm).validate(async valid => {
        if (!valid) return this.$message.error('填写不正确')

        try {
          const {data} = await AuthService.register(this.loginForm)

          if (data.success) {
            this.login()
          } else {
            this.$message.error(data.message)
          }
        } catch (error) {
          this.$message.error(error.message)
        }
      })
    }

    login() {
      (<ElForm>this.$refs.loginForm).validate(async valid => {
        if (!valid) return this.$message.error('填写不正确')

        try {
          const {data} = await AuthService.login(this.loginForm)
          if (data.success) {
            this.$store.commit("auth/setAuth", data.success)
            this.$store.commit("user/setUser", data.content)

            this.$notify({title: "登录成功", message: data.message, type: "success"})

            await this.$router.push("/job-list")
          } else {
            this.$message.error(data.message)
          }
        } catch(error) {
          this.$message.error(error.message)
        }
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
