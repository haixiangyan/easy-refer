<template>
    <div class="my-refer-list">
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
  import GetRefersGQL from '@/graphql/GetRefers.graphql'

  @Component({
    components: {ReferItem}
  })
  export default class MyReferList extends Vue {
    refers: TReferItem[] = []
    page: number = 0
    totalPages: number = 0

    get userId() {
      return this.$store.state.user.userId
    }

    mounted() {
      this.loadRefers(1)
    }

    async loadRefers(page: number) {
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
      this.loadRefers(page)
    }
  }
</script>

<style scoped lang="scss">

</style>
