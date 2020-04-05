<template>
    <div class="job-list">
        <div class="jobs" v-loading="loading" element-loading-text="加载内推职位中">
            <JobItem v-for="jobItem in publicJobs" :job-item="jobItem" :key="jobItem.jobId"></JobItem>
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
  import Vue from 'vue'
  import {Component, Watch} from 'vue-property-decorator'
  import JobItem from '@/components/JobItem.vue'
  import JobService from '@/service/JobService'

  @Component({
    components: {JobItem}
  })
  export default class JobList extends Vue {
    publicJobs: TJobItem[] = []
    page: number = 1
    limit: number = 10
    totalPages: number = 0
    loading = false

    mounted() {
      this.loadJobs(this.page)
    }

    async loadJobs(page: number) {
      const {data} = await JobService.getJobItemList(page, this.limit)

      this.publicJobs = data.jobItemList
      this.totalPages = data.totalPages
    }

    @Watch('page')
    onPageChange(page: number) {
      this.loadJobs(page)
    }
  }
</script>

<style lang="scss">
    .jobs {
        height: 100%;
    }

    .pages {
        text-align: center;
        padding: 20px 0;
    }
</style>
