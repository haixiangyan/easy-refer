<template>
    <div class="login">
        <el-card class="card">
            <div class="header">
                <img class="logo" src="@/assets/img/single_logo.png" alt="logo">
            </div>
            <login-form v-if="formType === 'login'" @action="onAction"/>
            <registration-form v-if="formType === 'register'" @action="onAction"/>
            <activation-form v-if="formType === 'activate'" @action="onAction"/>
        </el-card>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'nuxt-property-decorator'
  import LoginForm from '~/forms/LoginForm.vue'
  import RegistrationForm from '~/forms/RegistrationForm.vue'
  import ActivationForm from '~/forms/ActivationForm.vue'

  type TFormType = 'login' | 'register' | 'activate'

  @Component({
    components: {
      LoginForm,
      RegistrationForm,
      ActivationForm
    }
  })
  export default class Login extends Vue {
    formType: TFormType = 'login'

    onAction(formType: TFormType) {
      this.formType = formType
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
        background: url("../../assets/img/login_bg.jpg");

        .header {
            text-align: center;
            .logo {
                width: 200px;
            }
        }

        .card {
            width: 448px;
            padding: 40px;
        }
    }
</style>
