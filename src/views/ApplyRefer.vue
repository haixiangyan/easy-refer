<template>
    <div class="apply">
        <div class="job-description">
            <JobItem :job="job"/>
        </div>

        <el-divider>填写你的信息</el-divider>

        <ResumeForm @submit="apply" :required-fields="job.requiredFields"/>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"
  import JobItem from "@/components/JobItem.vue"
  import ResumeForm from "@/components/ResumeForm.vue"
  import GetJobByIdGQL from "@/graphql/GetJobById.graphql"
  import AddResumeGQL from "@/graphql/AddResume.graphql"

  @Component({
    components: {JobItem, ResumeForm}
  })
  export default class ApplyRefer extends Vue {
    job: TJobInResume = {
      jobId: "",
      company: "",
      refererName: "",
      deadline: new Date().toISOString(),
      expiration: 3,
      referredCount: 0,
      referTotal: 0,
      requiredFields: [],
      imageUrl: "",
      source: ""
    }

    mounted() {
      this.loadJob()
    }

    async loadJob() {
      try {
        const {data} = await this.$apollo.query({
          query: GetJobByIdGQL,
          variables: {jobId: this.$route.params.jobId}
        })

        this.job = data.job
      } catch (error) {
        this.$message.error(error.message)
      }
    }

    async apply(resume: TResumeForm) {
      try {
        await this.$apollo.mutate({
          mutation: AddResumeGQL,
          variables: {
            refereeId: this.$store.state.user.userId,
            jobId: resume.jobId,
            resumeForm: resume
          }
        })

        this.$message.success("已提交内推信息")
        await this.$router.push("/my-refer-list")
      } catch (error) {
        this.$message.error(error.message)
      }
    }
  }
</script>

<style scoped lang="scss"></style>
