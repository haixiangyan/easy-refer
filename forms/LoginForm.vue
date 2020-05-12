<template>
    <el-form class="login-form" ref="form" :model="form" :rules="rules">
        <el-form-item prop="email">
            <el-input type="email" v-model="form.email" placeholder="输入邮箱">
                <template slot="prepend">
                    <i class="el-icon-message"></i>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="form.password" placeholder="输入密码">
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
            <el-button type="primary" @click="login" :loading="submitting">登录</el-button>
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
    form: TLoginForm = {
      email: '',
      password: ''
    }
    rules = LOGIN_RULES
    submitting = false

    register() {
      this.$emit('action', 'register')
    }

    activate() {
      this.$emit('action', 'activate')
    }

    login() {
      (<ElForm>this.$refs.form).validate(async valid => {
        if (!valid) return this.$message.error('填写不正确')

        // 登录成功后，自动获取用户
        this.submitting = true
        await this.$auth.loginWith('local', {
          data: this.form
        })
        this.submitting = false

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
