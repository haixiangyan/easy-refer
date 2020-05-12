<template>
    <Empty v-if="showEmpty" empty-text="还没有申请任何内推哦~">
        <nuxt-link to="/job/list">
            <el-button type="primary" size="small" round>申请内推</el-button>
        </nuxt-link>
    </Empty>
    <div v-else>
        <el-table :data="refers" style="width: 100%" v-loading="loading">
            <el-table-column prop="job.company" label="公司"/>
            <el-table-column prop="referer.name" label="内推人"/>
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <span class="status" :class="scope.row.status">
                        {{getStatusName(scope.row.status)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="updatedOn" label="更新日期">
                <template slot-scope="scope">
                    {{getDate(scope.row.updatedOn)}}
                </template>
            </el-table-column>
            <el-table-column prop="source" label="原贴">
                <template slot-scope="scope">
                    <el-link v-if="scope.row.job.source" :href="scope.row.job.source">
                        原贴
                        <i class="el-icon-top-right"></i>
                    </el-link>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope" v-if="scope.row.status === 'processing'">
                    <nuxt-link :to="`/refer/edit/${scope.row.referId}`" tag="span">
                        <el-link class="edit-button" type="primary" icon="el-icon-edit">修改</el-link>
                    </nuxt-link>
                    <el-link @click="withdraw(scope.row)" type="danger" icon="el-icon-close" class="withdraw-icon">撤销
                    </el-link>
                </template>
            </el-table-column>
        </el-table>
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
  import Empty from '~/components/Empty.vue'
  import dayjs from 'dayjs'
  import {DATETIME_FORMAT} from '~/constants/format'
  import {STATUS_NAMES_MAPPER} from '~/constants/status'

  @Component({
    components: {Empty}
  })
  export default class extends Vue {
    refers: TRefer[] = []
    page: number = 1
    limit: number = 10
    total: number = 0
    loading = true
    showEmpty = false

    mounted() {
      this.loadRefers(this.page)
    }

    getDate(createdAt: string) {
      return dayjs(createdAt).format(DATETIME_FORMAT)
    }

    getStatusName(status: string) {
      return STATUS_NAMES_MAPPER[status]
    }

    async loadRefers(page: number) {
      this.loading = true
      const data = await this.$axios.$get('/refers', {
        params: {role: 'my', page: page, limit: this.limit}
      })
      this.loading = false

      this.refers = data.referList as TRefer[]
      this.total = data.total

      this.showEmpty = (this.total === 0)
    }

    async withdraw(refer: TRefer) {
      await this.$alert('确定撤回该内推？', '撤回内推', {
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '撤回吧',
        cancelButtonText: '再想想',
        cancelButtonClass: 'cancel-withdraw',
        confirmButtonClass: 'confirm-withdraw',
        callback: action => {
          if (action === 'confirm') {
            this.confirmWithdraw(refer)
          }
        }
      })
    }

    async confirmWithdraw(refer: TRefer) {
      await this.$axios.$delete(`/refers/${refer.referId}`)

      await this.loadRefers(this.page)

      this.$message.success('已撤回')
    }

    @Watch('page')
    onPageChange(page: number) {
      this.loadRefers(page)
    }
  }
</script>

<style scoped lang="scss">
    .pages {
        padding: 20px 0;
        text-align: center;
    }

    .status {
        font-weight: bold;
        font-size: 1.1em;

        &.processing {
            color: $warning-color;
        }

        &.rejected {
            color: $danger-color;
        }

        &.referred {
            color: $success-color;
        }
    }
</style>
