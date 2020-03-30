<template>
    <div class="resume">
        <div class="job-description">
            <JobItem :job="job"/>
        </div>

        <el-divider>申请信息</el-divider>

        <div class="apply">
            <div class="apply-item" v-for="field in job.requiredFields" :key="field">
                <h3>{{referFieldsMapper[field]}}</h3>
                <p v-if="field !== 'experience'">{{application[field]}}</p>
                <p v-if="field === 'experience'">{{levelMapper[application[field]]}}</p>
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
  import {REFER_FIELDS_MAPPER} from "@/contents/refer"
  import {LEVEL_MAPPER} from "@/contents/level"
  import ResumeService from "@/services/ResumeService"

  @Component({
    components: {JobItem}
  })
  export default class Resume extends Vue {
    job: TJob = {
      jobId: "",
      company: "",
      deadline: new Date(),
      expiration: 3,
      referredCount: 0,
      referTotal: 0,
      referer: "",
      requiredFields: []
    }
    application: TApplication = {
      // 必填
      applicationId: "undefined",
      jobId: "",
      userId: "",
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

    get resumeId() {
      return this.$route.params.resumeId
    }
    get jobId() {
      return this.$store.state.user.jobId
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

        this.application = data.resume
      } catch (error) {
        this.$message.error(error.message)
      }
    }

    async updateStatus(status: string) {
      try {
        const {data} = await ResumeService.updateResumeStatus(this.resumeId, status)

        if (!data.success) return this.$message.error(data.message)

        this.$message.success(data.message)

        await this.$router.push('/resume-list')
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
