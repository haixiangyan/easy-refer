<template>
    <div v-loading="jobLoading" element-loading-text="加载职位中">
        <div>
            <JobItem :job-item="jobItem"/>
        </div>

        <el-divider v-if="refer.resumeId">修改你的信息</el-divider>

        <ResumeForm
            v-if="refer.resumeId"
            v-loading="editLoading"
            element-loading-text="提交中"
            @submit="edit"
            :refer="refer"
            @loading="resumeLoading = $event"
            @back="$router.push('/my/refer-list')"
            :required-fields="jobItem.requiredFields"
            :resume-id="refer.resumeId"/>
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
    refer: TRefer = {
      createdAt: '',
      email: '',
      experience: 0,
      intro: '',
      jobId: '',
      leetCodeUrl: '',
      name: '',
      phone: '',
      referId: '',
      refereeId: '',
      refererId: '',
      resumeId: '',
      referLinks: '',
      status: 'processing',
      thirdPersonIntro: '',
      updatedAt: ''
    }
    jobLoading = false
    editLoading = false

    get referId() {
      return this.$route.params.referId
    }

    mounted() {
      this.load()
    }

    async load() {
      const {data: refer} = await ReferService.getReferById(this.referId)
      const {data: jobItem} = await JobService.getJobItemById(refer.jobId)

      this.refer = refer
      this.jobItem = jobItem
    }

    async edit(form: TReferForm) {
      await ReferService.editRefer(this.referId, form)

      this.$message.success('已修改内推信息')

      await this.$router.push('/refer-list/me')
    }
  }
</script>

<style scoped lang="scss"></style>
