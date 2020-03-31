<template>
    <div class="edit-job">
        <JobForm @submit="onSubmit"/>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"
  import JobForm from "@/components/JobForm.vue"
  import UpdateJobGQL from "@/graphql/UpdateJob.graphql"

  @Component({
    components: {JobForm}
  })
  export default class AddJob extends Vue {
    async onSubmit(jobForm: TJobForm) {
      try {
        await this.$apollo.mutate({
          mutation: UpdateJobGQL,
          variables: {
            refererId: this.$store.state.user.userId,
            jobId: jobForm.jobId,
            jobForm
          }
        })

        this.$message.success("已修改该职位")

        await this.$router.push("/job-list")
      } catch (error) {
        this.$message.error(error.message)
      }
    }
  }
</script>

<style scoped lang="scss"></style>
