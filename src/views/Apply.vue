<template>
    <div class="apply">
        <div class="job-description">
            <JobItem :job="job"/>
        </div>

        <el-divider>填写你的信息</el-divider>

        <el-form ref="referForm" :model="application" label-width="120px">
            <el-form-item label="活动名称">
                <el-input v-model="application.email"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"
  import JobItem from "@/components/JobItem.vue"
  import JobService from "@/services/JobService"

  @Component({
    components: {JobItem}
  })
  export default class Apply extends Vue {
    job: TJob = {
      jobId: "",
      company: "",
      deadline: new Date(),
      expiration: 3,
      referredCount: 0,
      referTotal: 0,
      referer: "",
      requiredFields: []
    }

    application: TApplication = {
      applicationId: "undefined",
      jobId: '',
      userId: "",
      email: "",
      experience: 0,
      name: "",
      referLinks: [],
    }

    mounted() {
      this.loadJob()
    }

    get jobId() {
      return this.$route.params.jobId
    }

    async loadJob() {
      try {
        const {data} = await JobService.getJob(this.jobId)

        if (!data.success) return this.$message.error(data.message)

        this.job = data.content
        this.application.jobId = data.content.jobId
      } catch (error) {
        this.$message.error(error.message)
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
