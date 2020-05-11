<template>
    <el-form class="registration-form" ref="registrationForm" :model="form" :rules="rules">
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
        <el-form-item prop="confirmPassword">
            <el-input type="password" v-model="form.confirmPassword" placeholder="确认密码">
                <template slot="prepend">
                    <i class="el-icon-key"></i>
                </template>
            </el-input>
        </el-form-item>
        <div class="footer">
            <div>
                <el-button @click="login" class="register-button" type="text">已有账号</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button @click="activate" class="register-button" type="text">激活账号</el-button>
            </div>
            <el-button type="primary" @click="register">注册</el-button>
        </div>
    </el-form>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator'
  import {REGISTER_RULES} from '~/constants/rules'
  import {ElForm} from 'element-ui/types/form'

  @Component
  export default class RegistrationForm extends Vue {
    form: TRegistrationForm = {
      email: '',
      password: '',
      confirmPassword: ''
    }
    rules = REGISTER_RULES

    register() {
      (<ElForm>this.$refs.registrationForm).validate(async valid => {
        if (this.form.password !== this.form.confirmPassword) return this.$message.error('两次密码输入不匹配')
        if (!valid) return this.$message.error('填写不正确')

        await this.$axios.$post('/auth/register', this.form)

        this.$message.success('注册成功')

        this.login()
      })
    }

    login() {
      this.$emit('action', 'login')
    }

    activate() {
      this.$emit('action', 'activate')
    }
  }
</script>

<style scoped lang="scss">
    .registration-form {
        .footer {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
    }
</style>
