<template>
    <div v-loading="loading" element-loading-text="加载该简历">
        <div>
            <JobItem :job-item="jobItem"/>
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
  import {Component} from 'vue-property-decorator'
  import JobItem from '@/components/JobItem.vue'
  import {REFER_FIELDS_MAPPER} from '@/constants/referFields'
  import {LEVEL_MAPPER} from '@/constants/level'
  import ReferService from '@/service/ReferService'

  @Component({
    components: {JobItem}
  })
  export default class RefereeRequest extends Vue {
    jobItem: TJobItem = {
      jobId: '',
      company: '',
      referer: {
        name: '',
        avatarUrl: ''
      },
      deadline: new Date().toISOString(),
      expiration: 3,
      referredCount: 0,
      referTotal: 0,
      requiredFields: [],
      source: '',
    }
    referForm: TReferForm = {
      email: '',
      experience: 0,
      intro: '',
      leetCodeUrl: '',
      name: '',
      phone: '',
      referLinks: '',
      resumeId: '',
      thirdPersonIntro: ''
    }
    loading = false

    get referId() {
      return this.$route.params.referId
    }

    get job() {
      return this.$store.state.job
    }

    get user() {
      return this.$store.state.user
    }

    get resume() {
      return this.$store.state.resume
    }

    get referTable() {
      return Object.entries(this.referForm)
        .filter(([key, _]) => this.jobItem.requiredFields.includes(key))
        .map(([key, value]) => ({
          key: REFER_FIELDS_MAPPER[key],
          value: key === 'experience' ? LEVEL_MAPPER[value as number] : value
        }))
    }

    mounted() {
      this.initJobItem()
      this.loadRefer()
    }

    initJobItem() {
      this.jobItem = {
        jobId: this.job.jobId,
        company: this.job.company,
        referer: {
          name: this.user.name,
          avatarUrl: this.user.avatarUrl
        },
        deadline: this.job.deadline,
        expiration: this.job.expiration,
        referredCount: this.job.referredCount,
        referTotal: this.job.referTotal,
        requiredFields: this.job.requiredFields,
        source: this.job.source
      }
    }

    async loadRefer() {
      const {data: refer} = await ReferService.getReferById(this.referId)
      Object.keys(this.referForm).forEach((key: string) => {
        this.referForm[key] = refer[key]
      })
    }

    async updateStatus(status: TStatus) {
      await ReferService.patchRefer(this.referId, {status})

      this.$message.success(status === 'rejected' ? '不推此简历' : '已推此简历')

      await this.$router.push('/refer-list/other')
    }
  }
</script>

<style scoped lang="scss">
    .buttons {
        padding: 20px 0;
        text-align: center;
    }
</style>
