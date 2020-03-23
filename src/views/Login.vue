<template>
    <div>
        Login Page
        <Button @click="login">登录</Button>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"
  import AuthService from "@/services/AuthService"

  @Component
  export default class Login extends Vue {
    async login() {
      try {
        const {data} = await AuthService.login('yyy', 'xxx')
        if (data.success) {
          AuthService.isLogin = data.success
          await this.$router.replace('/public')
        } else {
          this.$Message.error(data.message)
        }
      } catch (error) {
        this.$Message.error(error.message)
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
