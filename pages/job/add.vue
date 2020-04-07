<template>
    <div class="add-job">
        <JobForm @submit="onSubmit"/>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'nuxt-property-decorator'
  import JobForm from '~/components/JobForm.vue'
  import JobService from '~/service/JobService'
  import {USER_MODULE} from '~/store/user'

  @Component({
    components: {JobForm}
  })
  export default class extends Vue {
    @USER_MODULE.Mutation('setJob') setJob!: Function
    @USER_MODULE.Mutation('setUser') setUser!: Function

    async onSubmit(form: TJobForm) {
      const {data: job} = await JobService.addJob(form)

      this.$alert(`你的内推链接是 <strong>/apply-refer/${job.jobId}</strong> ，把它分享给需要内推人吧~`, '提交成功', {
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true,
        callback: () => {
          this.setJob(job)
          this.setUser({jobId: job.jobId})
          this.$router.push('/job-list')
        }
      })
    }
  }
</script>

<style scoped lang="scss"></style>
