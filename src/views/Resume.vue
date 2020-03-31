<template>
    <div class="resume">
        <div class="job-description">
            <JobItem :job="job"/>
        </div>

        <el-divider>申请信息</el-divider>

        <div class="apply">
            <div class="apply-item" v-for="field in job.requiredFields" :key="field">
                <h3>{{referFieldsMapper[field]}}</h3>
                <p v-if="field !== 'experience'">{{resume[field]}}</p>
                <p v-if="field === 'experience'">{{levelMapper[resume[field]]}}</p>
            </div>
        </div>

        <div class="buttons">
            <el-button @click="updateStatus('referred')" round type="primary">推完了</el-button>
            <el-button @click="updateStatus('rejected')" round type="danger">不推了</el-button>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"
  import JobItem from "@/components/JobItem.vue"
  import GetJobByIdGQL from '@/graphql/GetJobById.graphql'
  import GetResumeByIdGQL from '@/graphql/GetResumeById.graphql'
  import UpdateReferGQL from '@/graphql/UpdateRefer.graphql'
  import {REFER_FIELDS_MAPPER} from "@/contents/refer"
  import {LEVEL_MAPPER} from "@/contents/level"

  @Component({
    components: {JobItem}
  })
  export default class Resume extends Vue {
    job: TJobInResume = {
      jobId: "",
      company: "",
      refererName: "",
      deadline: new Date().toISOString(),
      expiration: 3,
      referredCount: 0,
      referTotal: 0,
      requiredFields: [],
      imageUrl: '',
      source: ''
    }
    resume: TResumeDetails = {
      // 必填
      resumeId: '',
      jobId: "",
      refereeId: this.user.userId,
      email: "",
      name: "",
      experience: 0,
      // 选填
      intro: "",
      leetCodeUrl: "",
      phone: "",
      referLinks: '',
      resumeUrl: "",
      thirdPersonIntro: "",
    }
    referFieldsMapper = REFER_FIELDS_MAPPER
    levelMapper = LEVEL_MAPPER

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

    mounted() {
      this.loadJob()
      this.loadResume()
    }

    async loadJob() {
      try {
        const {data} = await this.$apollo.query({
          query: GetJobByIdGQL,
          variables: {jobId: this.jobId}
        })

        this.job = data.job
      } catch (error) {
        this.$message.error(error.message)
      }
    }

    async loadResume() {
      try {
        const {data} = await this.$apollo.query({
          query: GetResumeByIdGQL,
          variables: {resumeId: this.resumeId}
        })

        this.resume = data.resume
      } catch (error) {
        this.$message.error(error.message)
      }
    }

    async updateStatus(status: string) {
      try {
        await this.$apollo.mutate({
          mutation: UpdateReferGQL,
          variables: {
            referForm: {
              referId: this.referId,
              refereeId: this.user.userId,
              status
            }
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
    .apply-item {
        margin-bottom: 10px;
    }
    .buttons {
        margin-top: 16px;
        text-align: center;
    }
</style>
