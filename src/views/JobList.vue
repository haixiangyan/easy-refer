<template>
    <div class="job-list">
        <div class="jobs">
            <JobItem v-for="job in publicJobs" :job="job" :key="job.id"></JobItem>
        </div>
        <div class="pages">
            <el-pagination
                v-show="totalPages !== 0"
                :current-page.sync="page"
                background
                layout="prev, pager, next"
                :total="totalPages">
            </el-pagination>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component, Watch} from "vue-property-decorator"
  import GetJobsGQL from '@/graphql/GetJobs.graphql'
  import JobItem from "@/components/JobItem.vue"

  @Component({
    components: {JobItem}
  })
  export default class JobList extends Vue {
    publicJobs: TJob[] = []
    page: number = 1
    totalPages: number = 0

    mounted() {
      this.loadJobs(this.page)
    }

    async loadJobs(page: number) {
      try {
        const {data} = await this.$apollo.query({
          query: GetJobsGQL,
          variables: {page}
        })

        console.log(data)

        this.publicJobs = data.jobsPage.jobs
        this.totalPages = data.jobsPage.totalPages
      } catch (error) {
        this.$message.error(error.message)
      }
    }

    @Watch("page")
    onPageChange(page: number) {
      this.loadJobs(page)
    }
  }
</script>

<style lang="scss">
    .pages {
        text-align: center;
        padding: 20px 0;
    }
</style>
