<template>
    <Modal v-model="show" draggable scrollable title="登录">
        <Form ref="formInline" :model="loginForm" :rules="ruleInline">
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
        </Form>
    </Modal>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"
  import AuthService from "@/services/AuthService"

  @Component
  export default class LoginModal extends Vue {
    show = true
    loginForm = {
      user: "",
      password: ""
    }
    ruleInline = {
      user: [
        {required: true, message: "输入你的邮箱", trigger: "blur"}
      ],
      password: [
        {required: true, message: "输入你的密码", trigger: "blur"},
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

</style>
