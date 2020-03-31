<template>
    <el-form class="edit-form"
             ref="editUserForm" :model="editUserForm"
             label-width="120px"
             label-position="left"
             :rules="rules">
        <el-divider>修改个人信息</el-divider>
        <el-form-item required prop="name" label="个人姓名">
            <el-input v-model="editUserForm.name"></el-input>
        </el-form-item>
        <!--必填-->
        <el-form-item required label="工作经验">
            <el-select v-model="editUserForm.experience" placeholder="请选择">
                <el-option v-for="[value, label] in levels" :key="value" :label="label" :value="value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item required label="联系邮箱">
            <el-input type="email" disabled v-model="editUserForm.email"></el-input>
        </el-form-item>
        <!--选填-->
        <el-form-item prop="phone" label="联系电话">
            <el-input type="tel" v-model.number="editUserForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="个人简介">
            <el-input type="textarea" :rows="4" v-model="editUserForm.intro"></el-input>
        </el-form-item>
        <el-form-item label="第三人称">
            <el-input type="textarea" :autosize="true" :rows="4" v-model="editUserForm.thirdPersonIntro"></el-input>
        </el-form-item>
        <el-form-item label="LeetCode">
            <el-input type="url" v-model="editUserForm.leetCodeUrl"></el-input>
        </el-form-item>
        <el-form-item label="简历链接">
            <el-input type="url" v-model="editUserForm.resumeUrl"></el-input>
        </el-form-item>

        <el-form-item class="edit-form-submit">
            <el-button class="submit-button" round type="primary" @click="saveChange">保存</el-button>
            <router-link tag="span" to="/user">
                <el-button round>返回</el-button>
            </router-link>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"
  import GetUserGQL from '@/graphql/GetUser.graphql'
  import UpdateUserGQL from '@/graphql/UpdateUser.graphql'
  import {LEVEL_MAPPER} from "@/contents/level"
  import {EDIT_USER_RULES} from "@/contents/rules"
  import {ElForm} from 'element-ui/types/form'

  @Component
  export default class EditUser extends Vue {
    editUserForm: TUser = {
      userId: "",
      jobId: "",
      email: "",
      name: "",
      experience: 0,
      intro: "",
      phone: "",
      leetCodeUrl: "",
      thirdPersonIntro: "",
      resumeUrl: ""
    }
    rules = EDIT_USER_RULES

    get userId() {
      return this.$store.state.user.userId
    }
    get levels() {
      return Object.entries(LEVEL_MAPPER).map(([value, label]) => [parseInt(value), label])
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

        this.editUserForm = data.user
      } catch (error) {
        this.$message.error(error.message)
      }
    }

    saveChange() {
      (<ElForm>this.$refs.editUserForm).validate(async valid => {
        if (!valid) return this.$message.error('填写不正确')

        try {
          await this.$apollo.mutate({
            mutation: UpdateUserGQL,
            variables: {
              userId: this.userId,
              userForm: this.editUserForm
            }
          })

          this.$message.success('已更新用户信息')
          await this.$router.push('/user')
        } catch (error) {
          this.$message.error(error.message)
        }
      })
    }
  }
</script>

<style scoped lang="scss">
    .edit-form {
        &-submit {
            text-align: right;

            .submit-button {
                margin-right: 8px;
            }
        }
    }
</style>
