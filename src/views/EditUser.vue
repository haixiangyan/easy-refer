<template>
    <div class="edit-user">
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
    form: TUser | null = null
    rules = EDIT_USER_RULES

    get userId() {
      return this.$store.state.user.userId
    }

    mounted() {
      this.loadUser()
    }

    async loadUser() {
      try {
        const {data} = await this.$apollo.query({
          query: GetUserGQL,
          variables: {userId: this.userId}
        })

        this.form = data.user
      } catch (error) {
        this.$message.error(error.message)
      }
    }

    async onSubmit(editUserForm: TUserForm) {
      try {
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
      }
    }
  }
</script>

<style scoped lang="scss"></style>
