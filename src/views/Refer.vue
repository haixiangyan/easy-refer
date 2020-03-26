<template>
    <div class="refer">
        <div class="refers">
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
  import Vue from "vue"
  import {Component, Watch} from "vue-property-decorator"
  import ReferItem from '@/components/ReferItem.vue'
  import RefersService from '@/services/ReferService'

  @Component({
    components: {ReferItem}
  })
  export default class Refer extends Vue {
    refers: TRefer[] = []
    page: number = 0
    totalPages: number = 0
    userId: string = '1'

    mounted() {
      this.loadRefers(1)
    }

    async loadRefers(page: number) {
      try {
        const {data} = await RefersService.getRefers(this.userId, page)

        if (!data.success) return this.$message.error(data.message)

        this.refers = data.content.refers
        this.totalPages = data.content.totalPages
      } catch (error) {
        this.$message.error(error.message)
      }
    }

    @Watch("page")
    onPageChange(page: number) {
      this.loadRefers(page)
    }
  }
</script>

<style scoped lang="scss">

</style>
