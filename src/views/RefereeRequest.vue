<template>
    <div class="resume" v-loading="loading" element-loading-text="加载该简历">
        <div class="job-description">
            <JobItem :job="job"/>
        </div>

        <el-divider>申请信息</el-divider>

        <el-table class="resume-table" :data="resumeTable">
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
  import GetJobItemGQL from '@/graphql/GetJobItem.graphql'
  import GetResumeBodyGQL from '@/graphql/GetResumeBody.graphql'
  import UpdateReferGQL from '@/graphql/UpdateRefer.graphql'
  import {REFER_FIELDS_MAPPER} from '@/constants/referFields'
  import {LEVEL_MAPPER} from '@/constants/level'

  @Component({
    components: {JobItem}
  })
  export default class RefereeRequest extends Vue {
    job: TJobItem = {
      jobId: '',
      company: '',
      refererName: '',
      deadline: new Date().toISOString(),
      expiration: 3,
      referredCount: 0,
      referTotal: 0,
      requiredFields: [],
      source: '',
      avatarUrl: ''
    }
    resume: TResumeBody = {
      // 必填
      jobId: '',
      refereeId: this.user.userId,
      email: '',
      name: '',
      experience: 0,
      // 选填
      intro: '',
      leetCodeUrl: '',
      phone: '',
      referLinks: '',
      resumeUrl: '',
      thirdPersonIntro: '',
    }
    loading = false

    get jobId() {
      return this.$route.params.jobId
    }

    get referId() {
      return this.$route.params.referId
    }

    get resumeId() {
      return this.$route.params.resumeId
    }

    get user() {
      return this.$store.state.user
    }

    get resumeTable() {
      return Object.entries(this.resume)
        .filter(([key, _]) => this.job.requiredFields.includes(key))
        .map(([key, value]) => ({
          key: REFER_FIELDS_MAPPER[key],
          value: key === 'experience' ? LEVEL_MAPPER[value as number] : value
        }))
    }

    mounted() {
      this.loading = true
      const jobPromise = this.loadJob()
      const resumePromise = this.loadResume()
      Promise.all([jobPromise, resumePromise]).then(() => this.loading = false)
    }

    async loadJob() {
      try {
        const {data} = await this.$apollo.query({
          query: GetJobItemGQL,
          variables: {jobId: this.jobId}
        })

        this.job = data.jobItem
      } catch (error) {
        this.$message.error(error.message)
      }
    }

    async loadResume() {
      try {
        const {data} = await this.$apollo.query({
          query: GetResumeBodyGQL,
          variables: {resumeId: this.resumeId}
        })

        this.resume = data.resumeBody
      } catch (error) {
        this.$message.error(error.message)
      }
    }

    async updateStatus(status: string) {
      try {
        await this.$apollo.mutate({
          mutation: UpdateReferGQL,
          variables: {
            referId: this.referId,
            referForm: {status}
          }
        })

        this.$message.success(status === 'rejected' ? '不推此简历' : '已推此简历')

        await this.$router.push('/referee-request-list')
      } catch (error) {
        this.$message.error(error.message)
      }
    }
  }
</script>

<style scoped lang="scss">
    .resume-table {
        margin-bottom: 24px;
    }

    .buttons {
        margin-top: 16px;
        text-align: center;
    }
</style>
