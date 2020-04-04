<template>
    <div v-loading="loading" element-loading-text="提交中" class="edit-job">
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
    loading = false

    get user() {
      return this.$store.state.user
    }

    async onSubmit(jobForm: TJobForm) {
      const {refererName, ...form} = jobForm
      try {
        this.loading = true

        await this.$apollo.mutate({
          mutation: UpdateJobGQL,
          variables: {
            refererId: this.user.userId,
            jobId: this.user.jobId,
            jobForm: form
          }
        })

        this.$message.success("已修改该职位")

        await this.$router.push("/jobItem-list")
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    }
  }
</script>

<style scoped lang="scss"></style>
