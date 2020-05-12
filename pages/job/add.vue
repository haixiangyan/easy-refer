<template>
    <div class="add-job">
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
      const {data: job} = await this.$axios.$post('/jobs', form)
      this.submitting = false

      await this.$router.push('/job/list')

      await this.$auth.fetchUser()

      await this.$alert(
        `你的内推链接是 <strong>/apply-refer/${job.jobId}</strong> ，把它分享给需要内推人吧~`,
        '提交成功',
        {
          confirmButtonText: '确定',
          dangerouslyUseHTMLString: true
        })
    }
  }
</script>

<style scoped lang="scss"></style>
