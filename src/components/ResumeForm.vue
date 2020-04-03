<template>
    <el-form ref="resumeForm"
             v-loading="resumeLoading"
             element-loading-text="加载简历中"
             :model="resumeForm"
             label-width="120px"
             label-position="left"
             :rules="rules">
        <el-form-item required prop="name" :label="field('name')">
            <el-input :disabled="isLogin" v-model="resumeForm.name"></el-input>
        </el-form-item>
        <el-form-item required prop="email" :label="field('email')">
            <el-input type="email" :disabled="isLogin" v-model="resumeForm.email"></el-input>
        </el-form-item>
        <el-form-item v-if="isShowField('phone')" required prop="phone" :label="field('phone')">
            <el-input type="tel" v-model="resumeForm.phone"></el-input>
        </el-form-item>
        <el-form-item required prop="experience" :label="field('experience')">
            <el-select v-model="resumeForm.experience" placeholder="请选择">
                <el-option v-for="[value, label] in levels" :key="value" :label="label" :value="value"/>
            </el-select>
        </el-form-item>
        <el-form-item v-if="isShowField('intro')" required prop="intro" :label="field('intro')">
            <el-input type="textarea" autosize v-model="resumeForm.intro"></el-input>
        </el-form-item>
        <el-form-item v-if="isShowField('referLinks')" required prop="referLinks" :label="field('referLinks')">
            <el-input type="textarea" autosize v-model="resumeForm.referLinks"></el-input>
        </el-form-item>
        <el-form-item v-if="isShowField('thirdPersonIntro')" required prop="thirdPersonIntro"
                      :label="field('thirdPersonIntro')">
            <el-input type="textarea" autosize v-model="resumeForm.thirdPersonIntro"></el-input>
        </el-form-item>
        <el-form-item v-if="isShowField('leetCodeUrl')" required prop="leetCodeUrl" :label="field('leetCodeUrl')">
            <el-input type="url" v-model="resumeForm.leetCodeUrl"></el-input>
        </el-form-item>
        <el-form-item :label="field('resumeUrl')">
            <el-upload
                v-loading="loading"
                element-loading-text="上传中"
                action="/refer-resume"
                :data="{resumeId}"
                :on-success="uploaded"
                :on-change="uploading"
                :on-error="() => this.$message.error('上传失败')"
                :before-upload="beforeUpload"
                :show-file-list="false">
                <el-button size="small" type="primary">上传简历</el-button>
                <span style="margin-left: 12px">{{resumeForm.resumeUrl}}</span>
                <div slot="tip" class="el-upload__tip">只能上传 <strong>pdf</strong> 文件，且不超过5MB</div>
            </el-upload>
        </el-form-item>

        <div class="submit">
            <el-button @click="submit" type="primary" round>提交</el-button>
            <el-button @click="back" round>返回</el-button>
        </div>
    </el-form>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component, Prop} from 'vue-property-decorator'
  import JobItem from '@/components/JobItem.vue'
  import GetResumeBodyGQL from '@/graphql/GetResumeBody.graphql'
  import {LEVEL_MAPPER} from '@/constants/level'
  import {ElForm} from 'element-ui/types/form'
  import {RESUME_RULES} from '@/constants/rules'
  import {getFieldName} from '@/constants/referFields'
  import {RESUME_MIME_TYPES, RESUME_SIZE} from '@/constants/file'

  @Component({
    components: {JobItem}
  })
  export default class ResumeForm extends Vue {
    @Prop() resumeId: string | undefined
    @Prop({required: true}) requiredFields!: string[]
    resumeForm: TResumeForm = {
      // 必填
      jobId: '',
      refereeId: '',
      email: '',
      name: '',
      experience: 0,
      // 选填
      intro: '',
      leetCodeUrl: '',
      phone: '',
      referLinks: '',
      resumeUrl: '',
      thirdPersonIntro: '',
    }
    rules = RESUME_RULES
    field = getFieldName
    resumeLoading = false
    loading = false

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

    uploaded(response: IUploadResume) {
      this.resumeForm.resumeUrl = response.resumeUrl
      this.loading = false
      this.$message.success('上传成功')
    }

    uploading({status}: {status: string}) {
      this.loading = !(status === 'success' || status === 'fail')
    }

    beforeUpload(file: File) {
      const isPdf = RESUME_MIME_TYPES.includes(file.type)
      const isValidSize = file.size <= RESUME_SIZE

      if (!isPdf) {
        this.$message.error('上传简历只能是 PDF 格式')
        this.loading = false
      }
      if (!isValidSize) {
        this.$message.error('上传简历大小不能超过 5MB')
        this.loading = false
      }

      return isPdf && isValidSize
    }

    async initForm() {
      if (this.resumeId) return await this.initResume()

      if (!this.isLogin) return

      const {userId, ...rest} = this.$store.state.user
      this.resumeForm = {...this.resumeForm, ...rest, refereeId: userId}
    }

    async initResume() {
      try {
        this.resumeLoading = true

        const {data} = await this.$apollo.query({
          query: GetResumeBodyGQL,
          variables: {resumeId: this.resumeId}
        })

        this.resumeForm = data.resumeBody
      } catch (error) {
        this.$message.error(error.mesage)
      } finally {
        this.resumeLoading = false
      }
    }

    submit() {
      (<ElForm>this.$refs.resumeForm).validate(async valid => {
        if (!valid) return this.$message.error('填写不正确')

        this.$emit('submit', this.resumeForm)
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
