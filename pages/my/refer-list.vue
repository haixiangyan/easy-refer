<template>
    <div v-if="total !== 0">
        <div>
            <ReferItem v-for="refer in refers" :key="refer.id" :refer="refer"/>
        </div>
        <div class="pages">
            <el-pagination
                :current-page.sync="page"
                background
                layout="prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
    </div>
    <Empty v-else empty-text="你还没有申请任何内推哦"/>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component, Watch} from 'nuxt-property-decorator'
  import ReferItem from '~/components/ReferItem.vue'
  import Empty from '~/components/Empty.vue'

  @Component({
    components: {ReferItem, Empty}
  })
  export default class extends Vue {
    refers: TMyRefer[] = []
    page: number = 1
    limit: number = 10
    total: number = 0

    mounted() {
      this.loadRefers(this.page)
    }

    async loadRefers(page: number) {
      const data = await this.$axios.$get('/refers', {
        params: {role: 'my', page: page, limit: this.limit}
      })

      this.refers = data.referList as TMyRefer[]
      this.total = data.total
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
</style>
