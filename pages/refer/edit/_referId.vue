<template>
    <div>
        <div v-if="jobItem">
            <JobItem :job-item="jobItem"/>
        </div>

        <el-divider>修改你的信息</el-divider>

        <ReferForm
            v-if="refer"
            @submit="edit"
            :refer="refer"
            @back="$router.push('/my/refer-list')"
            :required-fields="jobItem.requiredFields"/>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'nuxt-property-decorator'
  import JobItem from '~/components/JobItem.vue'
  import ReferForm from '~/components/ReferForm.vue'
  import JobService from '~/service/JobService'
  import ReferService from '~/service/ReferService'

  @Component({
    components: {JobItem, ReferForm}
  })
  export default class extends Vue {
    jobItem: TJobItem | null = null
    refer: TRefer | null = null

    get referId() {
      return this.$route.params.referId
    }

    mounted() {
      this.load()
    }

    async load() {
      const {data: refer} = await ReferService.getReferById(this.referId)
      const {data: jobItem} = await JobService.getJobItemById(refer.jobId)

      this.refer = refer
      this.jobItem = jobItem
    }

    async edit(form: TReferForm) {
      await ReferService.editRefer(this.referId, form)

      this.$message.success('已修改内推信息')

      await this.$router.push('/my/refer-list')
    }
  }
</script>

<style scoped lang="scss"></style>
