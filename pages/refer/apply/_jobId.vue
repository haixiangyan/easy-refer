<template>
    <div v-if="job">
        <div>
            <JobItem :job="job"/>
        </div>

        <el-divider>填写你的信息</el-divider>

        <ReferForm
            @submit="apply"
            @back="$router.push('/job/list')"
            :required-fields="job.requiredFields"
        />
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'nuxt-property-decorator'
  import JobItem from '~/components/JobItem.vue'
  import ReferForm from '~/components/ReferForm.vue'
  import {Context} from '@nuxt/types'

  @Component({
    auth: false,
    components: {JobItem, ReferForm}
  })
  export default class extends Vue {
    job: TJob | null = null

    get jobId() {
      return this.$route.params.jobId
    }

    async asyncData({$axios, route}: Context) {
      const job = await $axios.$get(`/jobs/${route.params.jobId}`)
      return {job}
    }

    async apply(form: TReferForm) {
      await this.$axios.$post(`/refers/${this.jobId}`, form)

      this.$message.success('已提交内推信息')

      await this.$router.push('/my/refer-list')
    }
  }
</script>

<style scoped lang="scss"></style>
