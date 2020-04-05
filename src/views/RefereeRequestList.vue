<template>
    <div class="referee-request-list">
        <div class="resumes">
            <el-table
                v-loading="loading"
                element-loading-text="加载所有简历中"
                :data="refers"
                style="width: 100%">
                <el-table-column prop="referer.name" label="姓名" width="180"/>
                <el-table-column prop="createdAt" label="提交日期" width="180">
                    <template slot-scope="scope">
                        {{getCreatedAt(scope.row.createdAt)}}
                    </template>
                </el-table-column>
                <el-table-column label="经验">
                    <template slot-scope="scope">
                        <span>{{getLevel(scope.row.experience)}}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <router-link tag="span" :to="`/referee-request/${scope.row.job.jobId}/${scope.row.referId}/${scope.row.resume.resumeId}`">
                            <el-link type="primary">查看</el-link>
                        </router-link>
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
  import {LEVEL_MAPPER} from "@/constants/level"
  import dayjs from 'dayjs'
  import {DATETIME_FORMAT} from '@/constants/format'
  import ReferService from '@/service/ReferService'

  @Component
  export default class RefereeRequestListList extends Vue {
    refers: TOtherRefer[] = []
    page: number = 1
    totalPages: number = 0
    loading = false

    get userId() {
      return this.$store.state.user.userId
    }

    mounted() {
      this.loadResumes(this.page)
    }

    getLevel(experience: number) {
      return LEVEL_MAPPER[experience]
    }

    getCreatedAt(createdAt: string) {
      return dayjs(createdAt).format(DATETIME_FORMAT)
    }

    async loadResumes(page: number) {
      try {
        this.loading = true

        const {data} = await ReferService.getReferList('other', page)

        this.refers = data.referList as TOtherRefer[]
        this.totalPages = data.totalPages
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
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
