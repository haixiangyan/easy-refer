<template>
    <div class="referee-request-list">
        <div class="resumes">
            <el-table
                :data="refers"
                style="width: 100%">
                <el-table-column prop="refereeName" label="姓名" width="180"/>
                <el-table-column prop="createdAt" label="提交日期" width="180"/>
                <el-table-column label="经验">
                    <template slot-scope="scope">
                        <span>{{getLevel(scope.row.experience)}}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <router-link tag="span" :to="`/referee-request/${scope.row.jobId}/${scope.row.referId}/${scope.row.resumeId}`">
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
  import GetRefersGQL from '@/graphql/GetRefers.graphql'
  import {LEVEL_MAPPER} from "@/contents/level"

  @Component
  export default class RefereeRequestListList extends Vue {
    refers: TReferRow[] = []
    page: number = 1
    totalPages: number = 0

    get userId() {
      return this.$store.state.user.userId
    }

    mounted() {
      this.loadResumes(this.page)
    }

    getLevel(experience: number) {
      return LEVEL_MAPPER[experience]
    }

    async loadResumes(page: number) {
      try {
        const {data} = await this.$apollo.query({
          query: GetRefersGQL,
          variables: {userId: this.userId, page}
        })

        this.refers = data.refersPage.refers
        this.totalPages = data.refersPage.totalPages
      } catch (error) {
        this.$message.error(error.message)
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
