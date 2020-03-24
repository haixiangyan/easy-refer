<template>
    <div class="public">
        <JobItem v-for="item in publicJobs" :item="item" :key="item.id"></JobItem>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"
  import JobItem from "@/components/JobItem.vue"
  import JobService from "@/services/JobService"

  @Component({
    components: {JobItem}
  })
  export default class Home extends Vue {
    publicJobs: Job[] = []

    mounted() {
      this.loadJobs(1)
    }

    async loadJobs(page: number) {
      try {
        const {data} = await JobService.getJobs(page)

        if (!data.success) return this.$message.error(data.message)

        this.publicJobs = this.publicJobs.concat(data.content)
      } catch (error) {
        this.$message.error(error.message)
      }
    }
  }
</script>

<style lang="scss">
    .public {
        margin: 0 auto;
        width: 80%;
    }
</style>
