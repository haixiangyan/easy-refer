<template>
    <div class="user" v-loading="loading" element-loading-text="加载用户中">
        <el-row type="flex" align="middle">
            <el-avatar class="avatar" :src="avatarUrl" :size="100"/>
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
  import {LEVEL_MAPPER} from "@/constants/level"
  import {REFER_FIELDS_MAPPER} from '@/constants/referFields'

  @Component
  export default class User extends Vue {
    user: TUser = {
      jobId: "",
      email: "",
      name: "",
      experience: 0,
    }
    avatarUrl = ''
    userTable: TELTableItem[] = []
    hiddenFields = ["avatarUrl", "jobId"]
    loading = false

    get level() {
      return LEVEL_MAPPER[this.user.experience]
    }

    mounted() {
      this.loadUser()
    }

    async loadUser() {
      try {
        this.loading = true

        const {data} = await this.$apollo.query({
          query: GetUserGQL,
          variables: {userId: this.$store.state.user.userId}
        })

        const {avatarUrl, ...user} = data.user
        this.user = user
        this.avatarUrl = avatarUrl

        this.userTable = Object.entries(data.user)
          .filter(([key, _]) => !this.hiddenFields.includes(key))
          .map(([key, value]) => ({
              key: REFER_FIELDS_MAPPER[key],
              value: key === "experience" ? LEVEL_MAPPER[value as number] : value
          })) as TELTableItem[]
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    }
  }
</script>

<style scoped lang="scss">
    .user-edit {
        margin-top: 12px;
        text-align: center;
    }
</style>
