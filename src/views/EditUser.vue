<template>
    <div class="edit-user" v-loading="loading" :element-loading-text="loadingText">
        <el-row type="flex" align="middle">
            <el-col :span="6">
                <el-avatar class="avatar" :src="form ? form.avatarUrl : ''" :size="100"/>
            </el-col>
            <el-col>
                <el-button size="small" type="success" plain round>修改头像</el-button>
            </el-col>
        </el-row>
        <div v-if="form">
            <EditUserForm :form="form" @submit="onSubmit"/>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"
  import UpdateUserGQL from "@/graphql/UpdateUser.graphql"
  import GetUserGQL from '@/graphql/GetUser.graphql'
  import {EDIT_USER_RULES} from "@/constants/rules"
  import EditUserForm from "@/components/EditUserForm.vue"

  @Component({
    components: {EditUserForm}
  })
  export default class EditUser extends Vue {
    form: TUserForm | null = null
    rules = EDIT_USER_RULES
    loading = false
    loadingText = '加载中'

    get userId() {
      return this.$store.state.user.userId
    }

    mounted() {
      this.loadUser()
    }

    async loadUser() {
      try {
        this.loading = true
        this.loadingText = '加载用户中'
        const {data} = await this.$apollo.query({
          query: GetUserGQL,
          variables: {userId: this.userId}
        })

        this.form = data.user
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    }

    async onSubmit(editUserForm: TUserForm) {
      try {
        this.loading = true
        this.loadingText = '提交中'
        await this.$apollo.mutate({
          mutation: UpdateUserGQL,
          variables: {
            userId: this.userId,
            userForm: editUserForm
          }
        })

        this.$message.success("已更新用户信息")
        await this.$router.push("/user")
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    }
  }
</script>

<style scoped lang="scss"></style>
