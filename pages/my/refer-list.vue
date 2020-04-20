<template>
    <div>
        <div>
            <ReferItem v-for="refer in refers" :key="refer.id" :refer="refer"/>
        </div>
        <div class="pages">
            <el-pagination
                v-show="total !== 0"
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
  import ReferItem from '~/components/ReferItem.vue'

  @Component({
    components: {ReferItem}
  })
  export default class extends Vue {
    refers: TMyRefer[] = []
    page: number = 0
    limit: number = 10
    total: number = 0

    mounted() {
      this.loadRefers(this.page)
    }

    async loadRefers(page: number) {
      const data = await this.$axios.$get('/refers', {
        params: {role: 'my', page, limit: this.limit}
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
