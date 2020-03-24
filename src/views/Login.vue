<template>
    <div class="login">
        <Card class="login-card">
            <Form class="login-form" ref="formInline" :model="loginForm" :rules="ruleInline">
                <div class="login-form-header">
                    <img class="login-logo" src="../assets/img/logo.png" alt="logo">
                    <p>请先登录</p>
                </div>
                <FormItem prop="user">
                    <Input type="text" v-model="loginForm.user" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="loginForm.password" placeholder="Password">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem class="login-form-footer">
                    <Button class="register-button" type="text">创建账号</Button>
                    <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"
  import AuthService from "@/services/AuthService"

  @Component
  export default class Login extends Vue {
    show = true
    loginForm = {
      user: "",
      password: ""
    }
    ruleInline = {
      user: [
        {required: true, message: "Please fill in the user name", trigger: "blur"}
      ],
      password: [
        {required: true, message: "Please fill in the password.", trigger: "blur"},
        {type: "string", min: 6, message: "The password length cannot be less than 6 bits", trigger: "blur"}
      ]
    }

    async login() {
      try {
        const {data} = await AuthService.login("yyy", "xxx")
        if (data.success) {
          AuthService.isLogin = data.success
          await this.$router.replace("/public")
        } else {
          this.$Message.error(data.message)
        }
      } catch (error) {
        this.$Message.error(error.message)
      }
    }

    handleSubmit(name: string) {
      const ref = this.$refs[name]
      if (ref) {
        // ref.validate((valid: boolean) => {
        //   if (valid) {
        //     this.$Message.success("Success!")
        //   } else {
        //     this.$Message.error("Fail!")
        //   }
        // })
      }
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
