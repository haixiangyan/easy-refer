<template>
    <div v-if="total !== 0">
        <el-table :data="refers" style="width: 100%">
            <el-table-column prop="name" label="姓名" width="180"/>
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
                    <nuxt-link tag="span" :to="`/other/refer/${scope.row.referId}`">
                        <el-link type="primary">查看</el-link>
                    </nuxt-link>
                </template>
            </el-table-column>
        </el-table>
        <div class="pages">
            <el-pagination
                :current-page.sync="page"
                background
                layout="prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
    </div>
    <Empty v-else empty-text="还没有人申请内推哦"/>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component, Watch} from 'nuxt-property-decorator'
  import dayjs from 'dayjs'
  import {LEVEL_MAPPER} from '~/constants/level'
  import {DATETIME_FORMAT} from '~/constants/format'
  import Empty from '~/components/Empty.vue'

  @Component({
    components: {Empty}
  })
  export default class extends Vue {
    refers: TRefer[] = []
    page: number = 1
    limit: number = 10
    total: number = 0

    mounted() {
      this.loadOtherReferList(this.page)
    }

    getLevel(experience: number) {
      return LEVEL_MAPPER[experience]
    }

    getCreatedAt(createdAt: string) {
      return dayjs(createdAt).format(DATETIME_FORMAT)
    }

    async loadOtherReferList(page: number) {
      const data = await this.$axios.$get('/refers', {
        params: {role: 'other', page, limit: this.limit}
      })

      this.refers = data.referList as TRefer[]
      this.total = data.total
    }

    @Watch('page')
    onPageChange(page: number) {
      this.loadOtherReferList(page)
    }
  }
</script>

<style scoped lang="scss">
    .pages {
        text-align: center;
        padding: 20px 0;
    }
</style>
