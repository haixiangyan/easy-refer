<template>
    <div>
        <div v-loading="loading" element-loading-text="加载我的内推">
            <ReferItem v-for="refer in refers" :key="refer.id" :refer="refer"/>
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
  import Vue from 'vue'
  import {Component, Watch} from 'vue-property-decorator'
  import ReferItem from '@/components/ReferItem.vue'
  import ReferService from '@/service/ReferService'

  @Component({
    components: {ReferItem}
  })
  export default class MyReferList extends Vue {
    refers: TMyRefer[] = []
    page: number = 0
    totalPages: number = 0
    loading = false

    mounted() {
      this.loadRefers(this.page)
    }

    async loadRefers(page: number) {
      const {data} = await ReferService.getReferList('my', page)

      this.refers = data.referList as TMyRefer[]
      this.totalPages = data.totalPages
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
