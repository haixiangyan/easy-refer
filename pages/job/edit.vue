<template>
    <div>
        <JobForm @submit="onSubmit" :submitting="submitting"/>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'nuxt-property-decorator'
  import JobForm from '~/forms/JobForm.vue'

  @Component({
    components: {JobForm}
  })
  export default class extends Vue {
    submitting = false

    async onSubmit(form: TJobForm) {
      this.submitting = true
      await this.$axios.$put(`/jobs/${this.$auth.user.job.jobId}`, form)
      this.submitting = false

      this.$message.success('已修改该职位')

      await this.$auth.fetchUser()

      await this.$router.push('/job/list')
    }
  }
</script>

<style scoped lang="scss"></style>
