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
            @back="$router.push('/job-list')"
            :required-fields="jobItem.requiredFields"
        />
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator'
  import JobItem from '@/components/JobItem.vue'
  import ResumeForm from '@/components/ResumeForm.vue'
  import JobService from '@/service/JobService'
  import ReferService from '@/service/ReferService'

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

    get jobId() {
      return this.$route.params.jobId
    }

    mounted() {
      this.loadJob()
    }

    async loadJob() {
      const {data} = await JobService.getJobItemById(this.jobId)

      this.jobItem = data
    }

    async apply(form: TReferForm) {
      await ReferService.applyRefer(this.jobId, form)

      this.$message.success('已提交内推信息')

      await this.$router.push('/my/refer-list')
    }
  }
</script>

<style scoped lang="scss"></style>
