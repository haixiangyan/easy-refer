<template>
    <div>
        <el-row type="flex" align="middle">
            <el-col :span="4">
                <el-avatar v-if="$auth.loggedIn" class="avatar" :src="$auth.user.info.avatarUrl" :size="100"/>
            </el-col>
            <el-col>
                <div class="job">
                    <el-button v-if="job" type="primary" size="small" round plain @click="$router.push('/job/edit')">
                        修改内推职位
                    </el-button>
                    <el-button v-else type="primary" size="small" round plain @click="$router.push('/job/add')">
                        添加内推职位
                    </el-button>
                </div>
                <div v-if="job" class="job-link">
                    <span>内推链接: </span>
                    <el-link type="primary" :href="`/refer/apply/${job.jobId}`">
                        {{jobLink}}
                    </el-link>
                    <el-tooltip effect="dark" :content="copyText" placement="bottom">
                        <i v-clipboard:copy="jobLink" v-clipboard:success="() => copyText = '已复制'"
                           class="el-icon-document-copy"/>
                    </el-tooltip>
                </div>
            </el-col>
        </el-row>
        <el-table
            :data="userTable"
            style="width: 100%">
            <el-table-column
                prop="key"
                label=""
                width="140">
            </el-table-column>
            <el-table-column
                prop="value"
                label="">
            </el-table-column>
        </el-table>
        <div class="user-edit">
            <el-button type="primary" round @click="$router.push('/user/edit')">修改信息</el-button>
            <el-button type="danger" @click="$auth.logout()" round>退出登录</el-button>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'nuxt-property-decorator'
  import {LEVEL_MAPPER} from '~/constants/level'
  import {REFER_FIELDS_MAPPER} from '~/constants/referFields'

  @Component
  export default class extends Vue {
    fields = ['email', 'name', 'experience', 'intro', 'phone', 'leetCodeUrl', 'thirdPersonIntro']
    copyText = '复制'

    get jobLink() {
      return `${process.env.baseUrl}/refer/apply/${this.job.jobId}`
    }

    get job() {
      return this.$auth.user.job
    }

    get userTable() {
      const {loggedIn, user} = this.$auth
      return !loggedIn ? [] : Object.entries(user.info)
        .filter(([key, _]) => this.fields.includes(key))
        .map(([key, value]) => ({
          key: REFER_FIELDS_MAPPER[key],
          value: key === 'experience' ? LEVEL_MAPPER[value as number] : value
        }))
    }
  }
</script>

<style scoped lang="scss">
    .user-edit {
        padding: 20px 0;
        text-align: center;
    }

    .job-link {
        margin-top: 16px;
        .el-icon-document-copy {
            cursor: pointer;
        }
    }
</style>
