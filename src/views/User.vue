<template>
    <div>
        <el-row type="flex" align="middle">
            <el-avatar class="avatar" :src="user.avatarUrl" :size="100"/>
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
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator'
  import {LEVEL_MAPPER} from '@/constants/level'
  import {REFER_FIELDS_MAPPER} from '@/constants/referFields'

  @Component
  export default class User extends Vue {
    avatarUrl = ''
    fields = ['email', 'name', 'experience', 'intro', 'phone', 'leetCodeUrl', 'thirdPersonIntro']

    get level() {
      return LEVEL_MAPPER[this.user.experience]
    }

    get user() {
      return this.$store.state.user
    }

    get resume() {
      return this.$store.state.resume
    }

    get userTable() {
      return [
        ...Object.entries(this.user)
          .filter(([key, _]) => this.fields.includes(key))
          .map(([key, value]) => ({
            key: REFER_FIELDS_MAPPER[key],
            value: key === 'experience' ? LEVEL_MAPPER[value as number] : value
          })),
        {key: REFER_FIELDS_MAPPER.resumeUrl, value: this.resume.url}
      ]
    }
  }
</script>

<style scoped lang="scss">
    .user-edit {
        padding: 20px 0;
        text-align: center;
    }
</style>
