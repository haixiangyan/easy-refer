<template>
    <el-form ref="resumeForm" :model="resumeForm" label-width="120px" label-position="left" :rules="rules">
        <!--必填-->
        <el-form-item required prop="name" label="姓名">
            <el-input :disabled="isLogin" v-model="resumeForm.name"></el-input>
        </el-form-item>
        <el-form-item required prop="experience" label="工作经验">
            <el-select v-model="resumeForm.experience" placeholder="请选择">
                <el-option v-for="[value, label] in levels" :key="value" :label="label" :value="value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item required prop="email" label="邮箱">
            <el-input type="email" :disabled="isLogin" v-model="resumeForm.email"></el-input>
        </el-form-item>
        <!--选填-->
        <el-form-item v-if="isShowField('phone')" required prop="phone" label="电话">
            <el-input type="tel" v-model.number="resumeForm.phone"></el-input>
        </el-form-item>
        <el-form-item v-if="isShowField('intro')" required prop="intro" label="个人简介">
            <el-input type="textarea" autosize v-model="resumeForm.intro"></el-input>
        </el-form-item>
        <el-form-item v-if="isShowField('thirdPersonIntro')" required prop="thirdPersonIntro" label="第三人称介绍">
            <el-input type="textarea" autosize v-model="resumeForm.thirdPersonIntro"></el-input>
        </el-form-item>
        <el-form-item v-if="isShowField('referLinks')" required prop="referLinks" label="内推链接">
            <el-input type="textarea" autosize v-model="resumeForm.referLinks"></el-input>
        </el-form-item>
        <el-form-item v-if="isShowField('leetCodeUrl')" required prop="leetCodeUrl" label="LeetCode">
            <el-input type="url" v-model="resumeForm.leetCodeUrl"></el-input>
        </el-form-item>
        <el-form-item v-if="isShowField('resumeUrl')" required prop="resumeUrl" label="简历链接">
            <el-input type="url" v-model="resumeForm.resumeUrl"></el-input>
        </el-form-item>

        <div class="submit">
            <el-button @click="submit" type="primary" round>提交</el-button>
            <el-button @click="back" round>返回</el-button>
        </div>
    </el-form>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component, Prop} from "vue-property-decorator"
  import JobItem from "@/components/JobItem.vue"
  import GetResumeByIdGQL from "@/graphql/GetResumeById.graphql"
  import {LEVEL_MAPPER} from "@/constants/level"
  import {ElForm} from "element-ui/types/form"
  import {RESUME_RULES} from "@/constants/rules"

  @Component({
    components: {JobItem}
  })
  export default class ResumeForm extends Vue {
    @Prop() resumeId: string | undefined
    @Prop({required: true}) requiredFields!: string[]
    resumeForm: TResumeForm = {
      // 必填
      jobId: "",
      refereeId: "",
      email: "",
      name: "",
      experience: 0,
      // 选填
      intro: "",
      leetCodeUrl: "",
      phone: "",
      referLinks: "",
      resumeUrl: "",
      thirdPersonIntro: "",
    }
    rules = RESUME_RULES

    mounted() {
      this.initForm()
    }

    get isLogin() {
      return this.$store.state.auth.isLogin
    }

    get levels() {
      return Object.entries(LEVEL_MAPPER).map(([value, label]) => [parseInt(value), label])
    }

    isShowField(fieldName: string) {
      return this.requiredFields.includes(fieldName)
    }

    async initForm() {
      if (this.resumeId) return await this.initResume()

      if (!this.isLogin) return

      const {userId, ...rest} = this.$store.state.user
      this.resumeForm = {...this.resumeForm, ...rest, refereeId: userId}
    }

    async initResume() {
      try {
        const {data} = await this.$apollo.query({
          query: GetResumeByIdGQL,
          variables: {resumeId: this.resumeId}
        })
        this.resumeForm = data.resume
      } catch (error) {
        this.$message.error(error.mesage)
      }
    }

    submit() {
      (<ElForm>this.$refs.resumeForm).validate(async valid => {
        if (!valid) return this.$message.error("填写不正确")

        this.$emit("submit", this.resumeForm)
      })
    }

    back() {
      this.$emit('back')
    }
  }
</script>

<style scoped lang="scss">
    .submit {
        text-align: center;
    }
</style>
