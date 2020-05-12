<template>
    <div>
        <el-divider>个人信息</el-divider>
        <UserForm @submit="onSubmit"/>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'nuxt-property-decorator'
  import UserForm from '~/forms/UserForm.vue'

  @Component({
    components: {UserForm}
  })
  export default class extends Vue {
    get job() {
      return this.$auth.user.job
    }

    async onSubmit(form: TUserForm) {
      await this.$axios.$put('/users', form)

      await this.$auth.fetchUser()

      this.$message.success('已更新用户信息')

      await this.$router.push('/user')
    }
  }
</script>

<style scoped lang="scss">
</style>
