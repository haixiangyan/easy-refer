<template>
    <div class="resume">
        <div class="resumes">
            <el-table
                :data="resumes"
                style="width: 100%">
                <el-table-column prop="name" label="姓名" width="180"/>
                <el-table-column prop="createdAt" label="提交日期" width="180"/>
                <el-table-column label="经验">
                    <template slot-scope="scope">
                        <span>{{getLevel(scope.row.experience)}}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="showResume(scope.row)" type="text">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
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
  import ResumeService from "@/services/ResumeService"
  import {getLevel} from "@/utils/generator"

  @Component
  export default class Resume extends Vue {
    resumes: TResume[] = []
    page: number = 1
    totalPages: number = 0
    userId: string = '1'

    mounted() {
      this.loadResumes(this.page)
    }

    getLevel(experience: number) {
      return getLevel(experience)
    }

    async loadResumes(page: number) {
      try {
        const {data} = await ResumeService.getResumes(this.userId, page)

        if (!data.success) return this.$message.error(data.message)

        this.resumes = data.content.resumes
        this.totalPages = data.content.totalPages
      } catch (error) {
        this.$message.error(error.message)
      }
    }

    showResume(x) {
      console.log(x)
    }

    @Watch("page")
    onPageChange(page: number) {
      this.loadResumes(page)
    }
  }
</script>

<style scoped lang="scss">
.pages {
    text-align: center;
    padding: 20px 0;
}
</style>
