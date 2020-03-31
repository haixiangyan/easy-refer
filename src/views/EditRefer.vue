<template>
    <div class="edit-refer">
        <div class="job-description">
            <JobItem :job="job"/>
        </div>

        <el-divider>修改你的信息</el-divider>

        <ResumeForm
            @submit="edit"
            @back="$router.push('/my-refer-list')"
            :required-fields="job.requiredFields"
            :resume-id="resumeId"/>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"
  import JobItem from "@/components/JobItem.vue"
  import ResumeForm from "@/components/ResumeForm.vue"
  import GetReferDetailsGQL from '@/graphql/GetReferDetails.graphql'
  import UpdateResumeGQL from "@/graphql/UpdateResume.graphql"

  @Component({
    components: {JobItem, ResumeForm}
  })
  export default class EditRefer extends Vue {
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
    resumeId = ''

    mounted() {
      this.loadReferDetails()
    }

    async loadReferDetails() {
      try {
        const {data} = await this.$apollo.query({
          query: GetReferDetailsGQL,
          variables: {referId: this.$route.params.referId}
        })

        this.job = data.referDetails.job
        this.resumeId = data.referDetails.resume.resumeId
      } catch (error) {
        this.$message.error(error.message)
      }
    }

    async edit(resumeForm: TResumeForm) {
      try {
        await this.$apollo.mutate({
          mutation: UpdateResumeGQL,
          variables: {
            resumeId: this.resumeId,
            resumeForm: resumeForm
          }
        })

        this.$message.success("已修改内推信息")
        await this.$router.push("/my-refer-list")
      } catch (error) {
        this.$message.error(error.message)
      }
    }
  }
</script>

<style scoped lang="scss"></style>
