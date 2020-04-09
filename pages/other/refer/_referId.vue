<template>
    <div>
        <div>
            <JobItem :job-item="jobItem"/>
        </div>

        <el-divider>申请信息</el-divider>

        <el-table :data="referTable">
            <el-table-column prop="key" label="内推项" width="120"/>
            <el-table-column prop="value" label="内容"/>
        </el-table>

        <div class="buttons">
            <el-button @click="updateStatus('referred')" round type="primary">推完了</el-button>
            <el-button @click="updateStatus('rejected')" round type="danger">不推了</el-button>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'nuxt-property-decorator'
  import JobItem from '~/components/JobItem.vue'
  import {REFER_FIELDS_MAPPER} from '~/constants/referFields'
  import {LEVEL_MAPPER} from '~/constants/level'
  import {USER_MODULE} from '~/store/user'

  @Component({
    components: {JobItem}
  })
  export default class extends Vue {
    @USER_MODULE.State('job') job!: TJob
    @USER_MODULE.State('details') user!: TUser
    @USER_MODULE.State('resume') resume!: TResume
    @USER_MODULE.Getter('jobItem') jobItem!: TJobItem

    referForm: TReferForm = {
      email: '',
      experience: 0,
      intro: '',
      leetCodeUrl: '',
      name: '',
      phone: '',
      referLinks: '',
      resumeId: '',
      thirdPersonIntro: ''
    }

    get referId() {
      return this.$route.params.referId
    }

    get referTable() {
      return Object.entries(this.referForm)
        .filter(([key, _]) => this.jobItem.requiredFields.includes(key))
        .map(([key, value]) => ({
          key: REFER_FIELDS_MAPPER[key],
          value: key === 'experience' ? LEVEL_MAPPER[value as number] : value
        }))
    }

    mounted() {
      this.loadRefer()
    }

    async loadRefer() {
      const refer = await this.$axios.$get(`/refers/${this.referId}`)
      Object.keys(this.referForm).forEach((key: string) => {
        this.referForm[key] = refer[key]
      })
    }

    async updateStatus(status: TStatus) {
      await this.$axios.$patch(`/refers/${this.referId}`, {status})

      this.$message.success(status === 'rejected' ? '不推此简历' : '已推此简历')

      await this.$router.push('/other/refer-list')
    }
  }
</script>

<style scoped lang="scss">
    .buttons {
        padding: 20px 0;
        text-align: center;
    }
</style>
