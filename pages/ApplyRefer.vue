<template>
    <div v-if="jobItem">
        <div>
            <JobItem :job-item="jobItem"/>
        </div>

        <el-divider>填写你的信息</el-divider>

        <ReferForm
            @submit="apply"
            @back="$router.push('/job-list')"
            :required-fields="jobItem.requiredFields"
        />
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'nuxt-property-decorator'
  import JobItem from '@/components/JobItem.vue'
  import ReferForm from '@/components/ReferForm.vue'
  import JobService from '@/service/JobService'
  import ReferService from '@/service/ReferService'

  @Component({
    components: {JobItem, ReferForm}
  })
  export default class ApplyRefer extends Vue {
    jobItem: TJobItem | null = null

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
