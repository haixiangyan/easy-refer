<template>
    <div>
        <div v-if="job">
            <JobItem :job="job"/>
        </div>

        <el-divider>修改你的信息</el-divider>

        <ReferForm
            v-if="refer && job"
            @submit="edit"
            :refer="refer"
            @back="$router.push('/my/refer-list')"
            :required-fields="job.requiredFields"/>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'nuxt-property-decorator'
  import JobItem from '~/components/JobItem.vue'
  import ReferForm from '~/components/ReferForm.vue'
  import {Context} from '@nuxt/types'

  @Component({
    components: {JobItem, ReferForm}
  })
  export default class extends Vue {
    job: TJob | null = null
    refer: TRefer | null = null
    referId: string | null = null

    async asyncData({$axios, route}: Context) {
      const referId = route.params.referId

      const refer = await $axios.$get(`/refers/${referId}`)
      const job = await $axios.$get(`/jobs/${refer!.jobId}`)

      return {
        referId,
        refer,
        job
      }
    }

    async edit(form: TReferForm) {
      await this.$axios.$patch(`/refers/${this.referId}`, form)

      this.$message.success('已修改内推信息')

      await this.$router.push('/my/refer-list')
    }
  }
</script>

<style scoped lang="scss"></style>
