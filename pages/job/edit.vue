<template>
    <div>
        <JobForm @submit="onSubmit"/>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'nuxt-property-decorator'
  import JobForm from '~/components/JobForm.vue'
  import {USER_MODULE} from '~/store/user'

  @Component({
    components: {JobForm}
  })
  export default class extends Vue {
    @USER_MODULE.State(state => state.job.jobId) jobId!: string

    async onSubmit(form: TJobForm) {
      await this.$axios.$put(`/jobs/${this.jobId}`, form)

      this.$message.success('已修改该职位')

      await this.$router.push('/job/list')
    }
  }
</script>

<style scoped lang="scss"></style>
