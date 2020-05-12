<template>
    <el-form class="registration-form" ref="form" :model="form" :rules="rules">
        <el-form-item prop="email">
            <el-input type="email" v-model="form.email" placeholder="输入邮箱以激活账号">
                <template slot="prepend">
                    <i class="el-icon-message"></i>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="form.password" placeholder="输入密码以激活账号">
                <template slot="prepend">
                    <i class="el-icon-key"></i>
                </template>
            </el-input>
        </el-form-item>
        <div class="footer">
            <div>
                <el-button @click="register" class="register-button" type="text">创建账号</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button @click="login" class="register-button" type="text">已有账号</el-button>
            </div>
            <el-button type="primary" @click="activate" :loading="submitting">激活</el-button>
        </div>
    </el-form>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator'
  import {ACTIVATE_RULES} from '~/constants/rules'
  import {ElForm} from 'element-ui/types/form'

  @Component
  export default class ActivationForm extends Vue {
    form: TActivationForm = {
      email: '',
      password: '',
    }
    submitting = false
    rules = ACTIVATE_RULES

    register() {
      this.$emit('action', 'register')
    }

    login() {
      this.$emit('action', 'login')
    }

    activate() {
      (<ElForm>this.$refs.form).validate(async valid => {
        this.submitting = true

        if (!valid) return this.$message.error('填写不正确')

        await this.$axios.$post('/auth/activate', this.form)

        this.submitting = false
        this.$message.success('激活成功')

        this.login()
      })
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
