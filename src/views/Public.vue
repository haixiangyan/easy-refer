<template>
    <div class="public">
        <div class="jobs">
            <JobItem v-for="item in publicJobs" :item="item" :key="item.id"></JobItem>
        </div>
        <div class="pages">
            <el-pagination
                :current-page.sync="page"
                background
                layout="prev, pager, next"
                :total="1000">
            </el-pagination>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component, Watch} from "vue-property-decorator"
  import JobItem from "@/components/JobItem.vue"
  import JobService from "@/services/JobService"

  @Component({
    components: {JobItem}
  })
  export default class Home extends Vue {
    publicJobs: Job[] = []
    page: number = 1

    mounted() {
      this.loadJobs(this.page)
    }

    async loadJobs(page: number) {
      this.page = page

      try {
        const {data} = await JobService.getJobs(this.page)

        if (!data.success) return this.$message.error(data.message)

        this.publicJobs = data.content
      } catch (error) {
        this.$message.error(error.message)
      }
    }

    @Watch('page')
    onPageChange(page: number) {
      this.loadJobs(page)
    }
  }
</script>

<style lang="scss">
    .public {
        margin: 0 auto;
        width: 80%;
    }
    .pages {
        text-align: center;
        padding: 20px 0;
    }
</style>
