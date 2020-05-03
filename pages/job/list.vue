<template>
    <div v-if="total !== 0">
        <div class="job-list">
            <JobItem v-for="job in publicJobs" :job="job" :key="job.jobId"></JobItem>
        </div>
        <div class="pages" v-if="limit < total">
            <el-pagination
                :current-page.sync="page"
                background
                layout="prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
    </div>
    <Empty v-else empty-text="目前还没有内推职位哦"/>
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

    mounted() {
      this.loadJobs(this.page)
    }

    async loadJobs(page: number) {
      const data = await this.$axios.$get('/jobs', {
        params: {page, limit: this.limit}
      })

      this.publicJobs = data.jobList
      this.total = data.total
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
