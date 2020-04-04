<template>
    <div class="edit-refer" v-loading="jobLoading" element-loading-text="加载职位中">
        <div class="job-description">
            <JobItem :job-item="jobItem"/>
        </div>

        <el-divider v-if="resumeId">修改你的信息</el-divider>

        <ResumeForm
            v-if="resumeId"
            v-loading="editLoading"
            element-loading-text="提交中"
            @submit="edit"
            @loading="resumeLoading = $event"
            @back="$router.push('/my-refer-list')"
            :required-fields="jobItem.requiredFields"
            :resume-id="resumeId"/>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator'
  import JobItem from '@/components/JobItem.vue'
  import ResumeForm from '@/components/ResumeForm.vue'
  import UpdateResumeGQL from '@/graphql/UpdateResume.graphql'
  import JobService from '@/service/JobService'

  @Component({
    components: {JobItem, ResumeForm}
  })
  export default class EditRefer extends Vue {
    jobItem: TJobItem = {
      jobId: '',
      referer: {
        name: '',
        avatarUrl: '',
      },
      company: '',
      deadline: new Date().toISOString(),
      expiration: 3,
      referredCount: 0,
      referTotal: 0,
      requiredFields: [],
      source: '',
    }
    resumeId = ''
    jobLoading = false
    editLoading = false

    mounted() {
      this.loadReferDetails()
    }

    async loadReferDetails() {
      //TODO
      const {data} = await JobService.getJobItemById('123123')

      this.jobItem = data
      // TODO
      this.resumeId = ''
    }

    async edit(resumeForm: TResumeForm) {
      try {
        this.editLoading = true
        await this.$apollo.mutate({
          mutation: UpdateResumeGQL,
          variables: {
            resumeId: this.resumeId,
            resumeForm
          }
        })

        this.$message.success('已修改内推信息')
        await this.$router.push('/my-refer-list')
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.editLoading = false
      }
    }
  }
</script>

<style scoped lang="scss"></style>
