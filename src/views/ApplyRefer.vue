<template>
    <div class="apply">
        <div class="job-description" v-loading="jobLoading" element-loading-text="加载职位中">
            <JobItem :job="job"/>
        </div>

        <el-divider>填写你的信息</el-divider>

        <ResumeForm
            v-loading="applyLoading"
            element-loading-text="提交中"
            @submit="apply"
            @back="$router.push('/job-list')"
            :required-fields="job.requiredFields"
        />
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"
  import JobItem from "@/components/JobItem.vue"
  import ResumeForm from "@/components/ResumeForm.vue"
  import GetJobItemGQL from "@/graphql/GetJobItem.graphql"
  import AddResumeGQL from "@/graphql/AddResume.graphql"

  @Component({
    components: {JobItem, ResumeForm}
  })
  export default class ApplyRefer extends Vue {
    job: TJobItem = {
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
    applyLoading = false
    jobLoading = false

    mounted() {
      this.loadJob()
    }

    async loadJob() {
      try {
        this.jobLoading = true
        const {data} = await this.$apollo.query({
          query: GetJobItemGQL,
          variables: {jobId: this.$route.params.jobId}
        })

        this.job = data.jobItem
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.jobLoading = false
      }
    }

    async apply(resumeForm: TResumeForm) {
      try {
        this.applyLoading = true
        await this.$apollo.mutate({
          mutation: AddResumeGQL,
          variables: {resumeForm}
        })

        this.$message.success("已提交内推信息")
        await this.$router.push("/my-refer-list")
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.applyLoading = false
      }
    }
  }
</script>

<style scoped lang="scss"></style>
