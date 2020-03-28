<template>
    <div class="apply">
        <div class="job-description">
            <JobItem :job="job"/>
        </div>

        <el-divider>填写你的信息</el-divider>

        <el-form ref="referForm" :model="application" label-width="120px" label-position="left">
            <!--必填-->
            <el-form-item required prop="name" label="姓名">
                <el-input :disabled="isLogin" v-model="application.name"></el-input>
            </el-form-item>
            <el-form-item required prop="experience" label="工作经验">
                <el-select v-model="application.experience" placeholder="请选择">
                    <el-option v-for="[value, label] in levels" :key="value" :label="label" :value="value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item required prop="email" label="邮箱">
                <el-input type="email" :disabled="isLogin" v-model="application.email"></el-input>
            </el-form-item>
            <!--选填-->
            <el-form-item v-if="isShowField('phone')" required prop="phone" label="电话">
                <el-input type="tel" v-model.number="application.phone"></el-input>
            </el-form-item>
            <el-form-item v-if="isShowField('intro')" required prop="intro" label="个人简介">
                <el-input type="textarea" autosize v-model="application.intro"></el-input>
            </el-form-item>
            <el-form-item v-if="isShowField('thirdPersonIntro')" required prop="thirdPersonIntro" label="第三人称介绍">
                <el-input type="textarea" autosize v-model="application.thirdPersonIntro"></el-input>
            </el-form-item>
            <el-form-item v-if="isShowField('referLinks')" required prop="referLinks" label="内推链接">
                <el-input type="textarea" autosize v-model="application.referLinks"></el-input>
            </el-form-item>
            <el-form-item v-if="isShowField('leetCodeUrl')" required prop="leetCodeUrl" label="LeetCode">
                <el-input type="url" v-model="application.leetCodeUrl"></el-input>
            </el-form-item>
            <el-form-item v-if="isShowField('resumeUrl')" required prop="resumeUrl" label="简历链接">
                <el-input type="url" v-model="application.resumeUrl"></el-input>
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
  import JobService from "@/services/JobService"
  import {LEVEL_MAPPER} from '@/contents/level'
  import ResumeService from "@/services/ResumeService"

  @Component({
    components: {JobItem}
  })
  export default class Apply extends Vue {
    job: TJob = {
      jobId: "",
      company: "",
      deadline: new Date(),
      expiration: 3,
      referredCount: 0,
      referTotal: 0,
      referer: "",
      requiredFields: []
    }
    application: TApplication = {
      // 必填
      applicationId: "undefined",
      jobId: "",
      userId: "",
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

      this.application = {...this.application, ...this.$store.state.user}
    }

    async loadJob() {
      try {
        const {data} = await JobService.getJob(this.jobId)

        if (!data.success) return this.$message.error(data.message)

        this.job = data.content
        this.application.jobId = data.content.jobId
      } catch (error) {
        this.$message.error(error.message)
      }
    }

    async apply() {
      try {
        const {data} = await ResumeService.applyForRefer(this.application)

        if (!data.success) return this.$message.error(data.message)

        this.$message.success(data.message)
        await this.$router.push('/resume-list')
      } catch (error) {
        this.$message.error(error.message)
      }
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
