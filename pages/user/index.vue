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
  import {Mutation} from 'vuex-class'

  @Component({
    components: {UserForm}
  })
  export default class extends Vue {
    @Mutation('setLoading') setLoading!: Function

    get job() {
      return this.$auth.user.job
    }

    async onSubmit(form: TUserForm) {
      // 添加 resume 和 avatarUrl
      await this.$axios.$put('/users', {
        ...form,
        avatarUrl: this.$auth.user.info.avatarUrl
      })

      await this.$auth.fetchUser()

      this.$message.success('已更新用户信息')

      await this.$router.push('/user')
    }
  }
</script>

<style scoped lang="scss">
    .avatar {
        margin-bottom: 24px;
    }
</style>
