<template>
    <div class="login">
        <el-card class="card">
            <div class="header">
                <img class="logo" src="@/assets/img/logo.png" alt="logo">
            </div>
            <login-form></login-form>
        </el-card>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'nuxt-property-decorator'
  import LoginForm from '~/forms/LoginForm.vue'

  @Component({
    components: {LoginForm}
  })
  export default class Login extends Vue {

  }
</script>

<style scoped lang="scss">
    .login {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        background: url("../../assets/img/login_bg.jpg");

        .header {
            text-align: center;
            .logo {
                width: 200px;
                height: 200px;
            }
        }

        .card {
            width: 448px;
            height: 500px;
            padding: 40px;
        }
    }
</style>
