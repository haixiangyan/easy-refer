<template>
    <Empty v-if="showEmpty" empty-text="目前还没有内推职位哦"/>
    <div v-else v-loading="loading">
        <div class="job-list">
            <JobItem v-for="job in publicJobs" :job="job" :key="job.jobId"></JobItem>
        </div>
        <div class="pages">
            <el-pagination
                hide-on-single-page
                :current-page.sync="page"
                background
                layout="prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component, Watch} from 'nuxt-property-decorator'
  import JobItem from '@/components/JobItem.vue'
  import Empty from '~/components/Empty.vue'

  @Component({
    auth: false,
    components: {JobItem, Empty}
  })
  export default class extends Vue {
    publicJobs: TJob[] = []
    page: number = 1
    limit: number = 10
    total: number = 0
    loading = true
    showEmpty = false

    mounted() {
      this.loadJobs(this.page)
    }

    async loadJobs(page: number) {
      this.loading = true
      const data = await this.$axios.$get('/jobs', {
        params: {page, limit: this.limit}
      })
      this.loading = false

      this.publicJobs = data.jobList
      this.total = data.total

      this.showEmpty = (this.total === 0)
    }

    @Watch('page')
    onPageChange(page: number) {
      this.loadJobs(page)
    }
  }
</script>

<style lang="scss">
    .job-list {
        height: 100%;
    }

    .pages {
        text-align: center;
        padding: 20px 0;
    }
</style>
