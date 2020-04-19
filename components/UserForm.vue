<template>
    <el-form v-if="form" class="user-form"
             ref="form" :model="form"
             label-width="120px"
             label-position="left"
             :rules="rules">
        <el-form-item required prop="name" :label="field('name')">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="email" required :label="field('email')">
            <el-input type="email" disabled v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item prop="phone" :label="field('phone')">
            <el-input type="tel" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item prop="experience" required :label="field('experience')">
            <el-select v-model="form.experience" placeholder="请选择">
                <el-option v-for="[value, label] in levels" :key="value" :label="label" :value="value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="intro" :label="field('intro')">
            <el-input type="textarea" :rows="4" v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item prop="thirdPersonIntro" :label="field('thirdPersonIntro')">
            <el-input type="textarea" :autosize="true" :rows="4" v-model="form.thirdPersonIntro"></el-input>
        </el-form-item>
        <el-form-item prop="leetCodeUrl" :label="field('leetCodeUrl')">
            <el-input type="url" v-model="form.leetCodeUrl"></el-input>
        </el-form-item>
        <el-form-item :label="field('resumeUrl')">
            <el-upload
                action="/api/upload/resume"
                :on-success="uploaded"
                :on-change="uploading"
                :on-error="() => this.$message.error('上传失败')"
                :before-upload="beforeUpload"
                :show-file-list="false">
                <el-button size="small" type="primary">上传简历</el-button>
                <span style="margin-left: 12px">{{resume.name}}</span>
                <div slot="tip" class="el-upload__tip">只能上传 <strong>pdf</strong> 文件，且不超过5MB</div>
            </el-upload>
        </el-form-item>

        <el-form-item class="user-form-submit">
            <el-button class="submit-button" round type="primary" @click="saveChange">保存</el-button>
            <nuxt-link tag="span" to="/user">
                <el-button round>返回</el-button>
            </nuxt-link>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'nuxt-property-decorator'
  import {LEVEL_MAPPER} from '@/constants/level'
  import {EDIT_USER_RULES} from '@/constants/rules'
  import {ElForm} from 'element-ui/types/form'
  import {getFieldName} from '@/constants/referFields'
  import {RESUME_MIME_TYPES, RESUME_SIZE} from '@/constants/file'
  import {Mutation} from 'vuex-class'

  @Component
  export default class UserForm extends Vue {
    @Mutation('setLoading') setLoading!: Function

    form: TUserForm = {
      avatarUrl: '',
      email: '',
      experience: 0,
      intro: '',
      leetCodeUrl: '',
      name: '',
      phone: '',
      resumeId: '',
      thirdPersonIntro: ''
    }
    resume: TResume = {
      resumeId: '',
      url: '',
      name: ''
    }
    rules = EDIT_USER_RULES
    field = getFieldName

    get userInfo() {
      return this.$auth.user.info
    }
    get levels() {
      return Object.entries(LEVEL_MAPPER).map(([value, label]) => [parseInt(value), label])
    }

    mounted() {
      this.initForm()
      this.loadResume()
    }

    initForm() {
      Object.keys(this.form).forEach((key: string) => {
        this.form[key] = this.userInfo[key]
      })
    }

    async loadResume() {
      const {resumeId} = this.userInfo.resume
      this.resume = await this.$axios.$get(`/resumes/${resumeId}`)
    }

    uploaded(resume: IUploadResume) {
      this.form.resumeId = resume.resumeId
      this.resume = resume
      this.setLoading(false)
      this.$message.success('上传成功')
    }

    uploading({status}: {status: string}) {
      this.setLoading(!(status === 'success' || status === 'fail'))
    }

    beforeUpload(file: File) {
      const isPdf = RESUME_MIME_TYPES.includes(file.type)
      const isValidSize = file.size <= RESUME_SIZE

      if (!isPdf) {
        this.$message.error('上传简历只能是 PDF 格式')
        this.setLoading(false)
      }
      if (!isValidSize) {
        this.$message.error('上传简历大小不能超过 5MB')
        this.setLoading(false)
      }

      return isPdf && isValidSize
    }

    saveChange() {
      (<ElForm>this.$refs.form).validate(async valid => {
        if (!valid) return this.$message.error('填写不正确')

        this.$emit('submit', this.form)
      })
    }
  }
</script>

<style scoped lang="scss">
    .user-form {
        &-submit {
            text-align: right;

            .submit-button {
                margin-right: 8px;
            }
        }
    }
</style>
