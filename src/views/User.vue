<template>
    <div class="user">
        <el-row class="user-header">
            <el-avatar class="avatar" :src="user.avatarUrl" :size="100"/>
            <el-button size="small" type="success" plain round>修改头像</el-button>
        </el-row>
        <el-table
            :data="userTable"
            style="width: 100%">
            <el-table-column
                prop="key"
                label=""
                width="180">
            </el-table-column>
            <el-table-column
                prop="value"
                label="">
            </el-table-column>
        </el-table>
        <div class="user-edit">
            <router-link to="/edit-user" tag="span">
                <el-button type="primary" round>修改信息</el-button>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"
  import GetUserGQL from "@/graphql/GetUser.graphql"
  import {LEVEL_MAPPER} from "@/contents/level"
  import {FIELD_MAPPER} from "@/contents/fields"

  @Component
  export default class User extends Vue {
    user: TUserForm = {
      userId: this.$store.state.user.userId,
      jobId: "",
      email: "",
      name: "",
      experience: 0
    }
    userTable: any[] = []
    hiddenFields = ["avatarUrl", "jobId", ""]

    get level() {
      return LEVEL_MAPPER[this.user.experience]
    }

    mounted() {
      this.loadUser()
    }

    async loadUser() {
      try {
        const {data} = await this.$apollo.query({
          query: GetUserGQL,
          variables: {userId: this.user.userId}
        })

        this.user = data.user

        this.userTable = Object.entries(data.user)
          .filter(([key, _]) => !this.hiddenFields.includes(key))
          .map(([key, value]) => {
            return {
              key: FIELD_MAPPER[key],
              value: key === 'experience' ? LEVEL_MAPPER[value as number] : value
            }
          })
      } catch (error) {
        this.$message.error(error.message)
      }
    }
  }
</script>

<style scoped lang="scss">
    .user {
        &-header {
            display: flex;
            align-items: center;

            .avatar {
                margin-right: 64px;
            }
        }

        &-edit {
            margin-top: 12px;
            text-align: center;
        }
    }
</style>
