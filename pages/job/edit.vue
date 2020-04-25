<template>
    <div>
        <JobForm @submit="onSubmit"/>
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
    async onSubmit(form: TJobForm) {
      await this.$axios.$put(`/jobs/${this.$auth.user.job.jobId}`, form)

      this.$message.success('已修改该职位')

      await this.$auth.fetchUser()

      await this.$router.push('/job/list')
    }
  }
</script>

<style scoped lang="scss"></style>
