<template>
    <div class="refer">
        <ReferItem v-for="refer in refers" :key="refer.id" :refer="refer"/>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"
  import ReferItem from '@/components/ReferItem.vue'
  import RefersService from '@/services/ReferService'

  @Component({
    components: {ReferItem}
  })
  export default class Refer extends Vue {
    refers: TRefer[] = []

    mounted() {
      this.loadRefers('1')
    }

    async loadRefers(userId: string) {
      try {
        const {data} = await RefersService.getRefers(userId, 1)

        if (!data.success) return this.$message.error(data.message)

        this.refers = data.content.refers
      } catch (error) {
        this.$message.error(error.message)
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
