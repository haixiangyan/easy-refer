<template>
    <div class="apply">
        <div class="job-description" v-loading="jobLoading" element-loading-text="加载职位中">
            <JobItem :job-item="jobItem"/>
        </div>

        <el-divider>填写你的信息</el-divider>

        <ResumeForm
            v-loading="applyLoading"
            element-loading-text="提交中"
            @submit="apply"
            @back="$router.push('/jobItem-list')"
            :required-fields="jobItem.requiredFields"
        />
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator'
  import JobItem from '@/components/JobItem.vue'
  import ResumeForm from '@/components/ResumeForm.vue'
  import AddResumeGQL from '@/graphql/AddResume.graphql'
  import JobService from '@/service/JobService'

  @Component({
    components: {JobItem, ResumeForm}
  })
  export default class ApplyRefer extends Vue {
    jobItem: TJobItem = {
      jobId: '',
      referer: {
        avatarUrl: '',
        name: ''
      },
      company: '',
      deadline: new Date().toISOString(),
      expiration: 3,
      referredCount: 0,
      referTotal: 0,
      requiredFields: [],
      source: ''
    }
    applyLoading = false
    jobLoading = false

    mounted() {
      this.loadJob()
    }

    async loadJob() {
      const {data} = await JobService.getJobItemById(this.$route.params.jobId)

      this.jobItem = data
    }

    async apply(resumeForm: TResumeForm) {
      try {
        this.applyLoading = true
        await this.$apollo.mutate({
          mutation: AddResumeGQL,
          variables: {resumeForm}
        })

        this.$message.success('已提交内推信息')
        await this.$router.push('/my-refer-list')
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.applyLoading = false
      }
    }
  }
</script>

<style scoped lang="scss"></style>
