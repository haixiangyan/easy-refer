<template>
    <el-form ref="form"
             :model="form"
             label-width="120px"
             label-position="left"
             :rules="rules">
        <el-form-item required prop="name" :label="field('name')">
            <el-input :disabled="isLogin" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item required prop="email" :label="field('email')">
            <el-input type="email" :disabled="isLogin" v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item v-if="isShowField('phone')" required prop="phone" :label="field('phone')">
            <el-input type="tel" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item required prop="experience" :label="field('experience')">
            <el-select v-model="form.experience" placeholder="请选择">
                <el-option v-for="[value, label] in levels" :key="value" :label="label" :value="value"/>
            </el-select>
        </el-form-item>
        <el-form-item v-if="isShowField('intro')" required prop="intro" :label="field('intro')">
            <el-input type="textarea" autosize v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item v-if="isShowField('referLinks')" required prop="referLinks" :label="field('referLinks')">
            <el-input type="textarea" autosize v-model="form.referLinks"></el-input>
        </el-form-item>
        <el-form-item v-if="isShowField('thirdPersonIntro')" required prop="thirdPersonIntro"
                      :label="field('thirdPersonIntro')">
            <el-input type="textarea" autosize v-model="form.thirdPersonIntro"></el-input>
        </el-form-item>
        <el-form-item v-if="isShowField('leetCodeUrl')" required prop="leetCodeUrl" :label="field('leetCodeUrl')">
            <el-input type="url" v-model="form.leetCodeUrl"></el-input>
        </el-form-item>
        <el-form-item :label="field('resumeUrl')">
            <el-upload
                action="/refer-resume"
                :data="{resumeId: form.resumeId}"
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
  import {LEVEL_MAPPER} from '@/constants/level'
  import {ElForm} from 'element-ui/types/form'
  import {RESUME_RULES} from '@/constants/rules'
  import {getFieldName} from '@/constants/referFields'
  import {RESUME_MIME_TYPES, RESUME_SIZE} from '@/constants/file'
  import {USER_MODULE} from '@/store/modules/user'
  import {AUTH_MODULE} from '@/store/modules/auth'
  import {Mutation} from 'vuex-class'

  @Component({
    components: {JobItem}
  })
  export default class ReferForm extends Vue {
    @Prop() refer: TRefer | undefined
    @Prop({required: true}) requiredFields!: string[]

    @USER_MODULE.State('details') user!: TUser & TMapper
    @Mutation('setLoading') setLoading!: Function
    @AUTH_MODULE.State(state => state.isLogin) isLogin!: boolean

    form: TReferForm = {
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
    resume: TResume = {
      resumeId: '',
      url: '',
      name: ''
    }
    rules = RESUME_RULES
    field = getFieldName

    mounted() {
      this.initForm()
    }

    get levels() {
      return Object.entries(LEVEL_MAPPER).map(([value, label]) => [parseInt(value), label])
    }

    isShowField(fieldName: string) {
      return this.requiredFields.includes(fieldName)
    }

    uploaded(resume: IUploadResume) {
      this.form.resumeId = resume.resumeId
      this.resume = resume
      this.setLoading(false)
      this.$message.success('上传成功')
    }

    uploading({status}: { status: string }) {
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

    async initForm() {
      // 当修改 refer 时初始化
      if (this.refer) {
        return Object.keys(this.form).forEach((key: string) => {
          if (key in this.refer!) {
            this.form[key] = this.refer![key]
          }
        })
      }
      // 已经 login，自动填写表单
      if (this.isLogin) {
        return Object.keys(this.form).forEach((key: string) => {
          if (key in this.user!) {
            this.form[key] = this.user![key]
          }
        })
      }
    }

    submit() {
      (<ElForm>this.$refs.form).validate(async valid => {
        if (!valid) return this.$message.error('填写不正确')

        this.$emit('submit', this.form)
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
