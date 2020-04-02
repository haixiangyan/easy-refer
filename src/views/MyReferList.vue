<template>
    <div class="my-refer-list">
        <div class="refers" v-loading="loading" element-loading-text="加载我的内推">
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
  import GetReferItemListGQL from '@/graphql/GetReferItemList.graphql'

  @Component({
    components: {ReferItem}
  })
  export default class MyReferList extends Vue {
    refers: TReferItem[] = []
    page: number = 0
    totalPages: number = 0
    loading = false

    get userId() {
      return this.$store.state.user.userId
    }

    mounted() {
      this.loadRefers(1)
    }

    async loadRefers(page: number) {
      try {
        this.loading = true

        const {data} = await this.$apollo.query({
          query: GetReferItemListGQL,
          variables: {userId: this.userId, page}
        })

        this.refers = data.referItemListPage.referItemList
        this.totalPages = data.referItemListPage.totalPages
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
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
