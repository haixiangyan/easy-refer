<template>
    <div>
        <el-row class="avatar" type="flex" align="middle">
            <el-col :span="4">
                <el-avatar :src="$auth.user.info.avatarUrl" :size="100"/>
            </el-col>
            <el-col>
                <el-upload
                    action="/api/upload/avatar"
                    :headers="{Authorization: $auth.getToken('local')}"
                    :show-file-list="false"
                    :on-success="uploaded"
                    :on-change="uploading"
                    :before-upload="beforeUpload">
                    <el-button size="small" type="success" plain round>修改头像</el-button>
                </el-upload>
            </el-col>
        </el-row>
        <UserForm @submit="onSubmit"/>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'nuxt-property-decorator'
  import UserForm from '~/forms/UserForm.vue'
  import {IMAGE_MIME_TYPES, IMAGE_SIZE} from '~/constants/file'
  import {Mutation} from 'vuex-class'

  @Component({
    components: {UserForm}
  })
  export default class extends Vue {
    @Mutation('setLoading') setLoading!: Function

    get job() {
      return this.$auth.user.job
    }

    async uploaded() {
      await this.$auth.fetchUser()

      this.$message.success('修改成功')
    }

    uploading({status}: { status: string }) {
      this.setLoading(!(status === 'success' || status === 'fail'))
    }

    beforeUpload(file: File) {
      const isImage = IMAGE_MIME_TYPES.includes(file.type)
      const isValidSize = file.size <= IMAGE_SIZE

      if (!isImage) {
        this.$message.error('上传头像图片格式不正确')
        this.setLoading(false)
      }
      if (!isValidSize) {
        this.$message.error('上传头像图片大小不能超过 2MB')
        this.setLoading(false)
      }

      return isImage && isValidSize
    }

    async onSubmit(form: TUserForm) {
      // 添加 resume 和 avatarUrl
      await this.$axios.$put('/users', {
        ...form,
        avatarUrl: this.$auth.user.info.avatarUrl
      })

      await this.$auth.fetchUser()

      this.$message.success('已更新用户信息')

      await this.$router.push('/user')
    }
  }
</script>

<style scoped lang="scss">
    .avatar {
        margin-bottom: 24px;
    }
</style>
