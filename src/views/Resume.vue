<template>
    <div class="job">
        <div class="jobs">
            <ResumeItem v-for="resume in resumes" :resume="resume" :key="resume.id"></ResumeItem>
        </div>
        <div class="pages">
            <el-pagination
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
  import ResumeItem from "@/components/ResumeItem.vue"
  import ResumeService from "@/services/ResumeService"

  @Component({
    components: {ResumeItem}
  })
  export default class Resume extends Vue {
    resumes: TResume[] = []
    page: number = 1
    totalPages: number = 0

    mounted() {
      this.loadJobs(this.page)
    }

    async loadJobs(page: number) {
      this.page = page

      try {
        const {data} = await ResumeService.getResumes('1', this.page)

        if (!data.success) return this.$message.error(data.message)

        this.resumes = data.content.resumes
        this.totalPages = data.content.totalPages
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

<style scoped lang="scss">
.pages {
    text-align: center;
    padding: 20px 0;
}
</style>
