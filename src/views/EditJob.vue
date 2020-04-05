<template>
    <div>
        <JobForm @submit="onSubmit"/>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator'
  import JobForm from '@/components/JobForm.vue'
  import JobService from '@/service/JobService'

  @Component({
    components: {JobForm}
  })
  export default class AddJob extends Vue {
    get user() {
      return this.$store.state.user
    }

    async onSubmit(form: TJobForm) {
      await JobService.editJob(this.user.jobId, form)

      this.$message.success('已修改该职位')

      await this.$router.push('/job-list')
    }
  }
</script>

<style scoped lang="scss"></style>
