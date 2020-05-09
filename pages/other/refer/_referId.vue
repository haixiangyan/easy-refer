<template>
    <div>
        <div>
            <JobItem :job="job"/>
        </div>

        <el-divider>申请信息</el-divider>

        <el-table :data="referTable">
            <el-table-column prop="key" label="内推项" width="120"/>
            <el-table-column prop="value" label="内容"/>
        </el-table>

        <div class="buttons">
            <el-button @click="updateStatus('referred')" round type="primary">推完了</el-button>
            <el-button @click="updateStatus('rejected')" round type="danger">不推了</el-button>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'nuxt-property-decorator'
  import JobItem from '~/components/JobItem.vue'
  import {REFER_FIELDS_MAPPER} from '~/constants/referFields'
  import {LEVEL_MAPPER} from '~/constants/level'

  @Component({
    components: {JobItem}
  })
  export default class extends Vue {
    refer: TRefer | null = null

    get job() {
      return this.$auth.user.job
    }

    get referId() {
      return this.$route.params.referId
    }

    get referTable() {
      if (!this.refer) return []

      return Object.entries(this.refer)
        .filter(([key, _]) => this.job.requiredFields.includes(key)) // 只需要必填内容
        .map(([rawKey, rawValue]) => {
          let key = REFER_FIELDS_MAPPER[rawKey]
          let value = rawValue

          // 特殊处理某些字段
          if (key === 'experience') {
            value = LEVEL_MAPPER[value as number]
          }
          if (key === 'resumeId') {
            value = rawValue!.resumeUrl
          }

          return {key, value}
        })
    }

    mounted() {
      this.loadRefer()
    }

    async loadRefer() {
      this.refer = await this.$axios.$get(`/refers/${this.referId}`)
    }

    async updateStatus(status: TStatus) {
      await this.$axios.$patch(`/refers/status/${this.referId}`, {status})

      this.$message.success(status === 'rejected' ? '不推此简历' : '已推此简历')

      await this.$router.push('/other/refer-list')
    }
  }
</script>

<style scoped lang="scss">
    .buttons {
        padding: 20px 0;
        text-align: center;
    }
</style>
