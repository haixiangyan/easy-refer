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
    get user() {
      return this.$store.state.user
    }

    async onSubmit(jobForm: TJobForm) {
      const {refererName, ...form} = jobForm
      try {
        await this.$apollo.mutate({
          mutation: UpdateJobGQL,
          variables: {
            refererId: this.user.userId,
            jobId: this.user.jobId,
            jobForm: form
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
