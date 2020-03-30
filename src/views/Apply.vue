<template>
    <div class="apply">
        <div class="job-description">
            <JobItem :job="job"/>
        </div>

        <el-divider>填写你的信息</el-divider>

        <el-form ref="applyForm" :model="resume" label-width="120px" label-position="left">
            <!--必填-->
            <el-form-item required prop="name" label="姓名">
                <el-input :disabled="isLogin" v-model="resume.name"></el-input>
            </el-form-item>
            <el-form-item required prop="experience" label="工作经验">
                <el-select v-model="resume.experience" placeholder="请选择">
                    <el-option v-for="[value, label] in levels" :key="value" :label="label" :value="value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item required prop="email" label="邮箱">
                <el-input type="email" :disabled="isLogin" v-model="resume.email"></el-input>
            </el-form-item>
            <!--选填-->
            <el-form-item v-if="isShowField('phone')" required prop="phone" label="电话">
                <el-input type="tel" v-model.number="resume.phone"></el-input>
            </el-form-item>
            <el-form-item v-if="isShowField('intro')" required prop="intro" label="个人简介">
                <el-input type="textarea" autosize v-model="resume.intro"></el-input>
            </el-form-item>
            <el-form-item v-if="isShowField('thirdPersonIntro')" required prop="thirdPersonIntro" label="第三人称介绍">
                <el-input type="textarea" autosize v-model="resume.thirdPersonIntro"></el-input>
            </el-form-item>
            <el-form-item v-if="isShowField('referLinks')" required prop="referLinks" label="内推链接">
                <el-input type="textarea" autosize v-model="resume.referLinks"></el-input>
            </el-form-item>
            <el-form-item v-if="isShowField('leetCodeUrl')" required prop="leetCodeUrl" label="LeetCode">
                <el-input type="url" v-model="resume.leetCodeUrl"></el-input>
            </el-form-item>
            <el-form-item v-if="isShowField('resumeUrl')" required prop="resumeUrl" label="简历链接">
                <el-input type="url" v-model="resume.resumeUrl"></el-input>
            </el-form-item>

            <div class="submit">
                <el-button @click="apply" type="primary" round>提交</el-button>
            </div>
        </el-form>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"
  import JobItem from "@/components/JobItem.vue"
  import GetJobByIdGQL from '@/graphql/GetJobById.graphql'
  import AddResumeGQL from '@/graphql/AddResume.graphql'
  import {LEVEL_MAPPER} from '@/contents/level'
  import {ElForm} from 'element-ui/types/form'

  @Component({
    components: {JobItem}
  })
  export default class Apply extends Vue {
    job: TJobInResume = {
      jobId: "",
      company: "",
      refererName: "",
      deadline: new Date().toISOString(),
      expiration: 3,
      referredCount: 0,
      referTotal: 0,
      requiredFields: [],
      imageUrl: '',
      source: ''
    }
    resume: TResume = {
      // 必填
      resumeId: "undefined",
      jobId: "",
      refereeId: "",
      email: "",
      name: "",
      experience: 0,
      // 选填
      intro: "",
      leetCodeUrl: "",
      phone: "",
      referLinks: '',
      resumeUrl: "",
      thirdPersonIntro: "",
    }
    rules = {}

    mounted() {
      this.initApplication()

      this.loadJob()
    }

    get jobId() {
      return this.$route.params.jobId
    }
    get user() {
      return this.$store.state.user
    }
    get isLogin() {
      return this.$store.state.auth.isLogin
    }
    get levels() {
      return Object.entries(LEVEL_MAPPER).map(([value, label]) => [parseInt(value), label])
    }

    isShowField(fieldName: string) {
      return this.job.requiredFields.includes(fieldName)
    }

    initApplication() {
      if (!this.isLogin) return

      this.resume = {...this.resume, ...this.user}
    }

    async loadJob() {
      try {
        const {data} = await this.$apollo.query({
          query: GetJobByIdGQL,
          variables: {jobId: this.jobId}
        })

        this.job = data.job
        this.resume.jobId = data.job.jobId
      } catch (error) {
        this.$message.error(error.message)
      }
    }

    async apply() {
      (<ElForm>this.$refs.applyForm).validate(async valid => {
        if (!valid) return this.$message.error('填写不正确')

        try {
          await this.$apollo.mutate({
            mutation: AddResumeGQL,
            variables: {resumeForm: this.resume}
          })

          this.$message.success('已提交内推信息')
          await this.$router.push('/resume-list')
        } catch (error) {
          this.$message.error(error.message)
        }
      })
    }
  }
</script>

<style scoped lang="scss">
.apply {
    .submit {
        text-align: center;
    }
}
</style>
