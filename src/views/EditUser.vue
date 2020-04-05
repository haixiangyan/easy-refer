<template>
    <div v-loading="loading" :element-loading-text="loadingText">
        <el-row class="avatar" type="flex" align="middle">
            <el-col :span="6">
                <el-avatar :src="user.avatarUrl" :size="100"/>
            </el-col>
            <el-col>
                <el-upload
                    action="/avatar"
                    :show-file-list="false"
                    :on-success="uploaded"
                    :on-change="uploading"
                    :before-upload="beforeUpload">
                    <el-button size="small" type="success" plain round>修改头像</el-button>
                </el-upload>
            </el-col>
        </el-row>
        <EditUserForm @submit="onSubmit"/>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator'
  import {EDIT_USER_RULES} from '@/constants/rules'
  import EditUserForm from '@/components/EditUserForm.vue'
  import {IMAGE_MIME_TYPES, IMAGE_SIZE} from '@/constants/file'
  import UserService from '@/service/UserService'

  @Component({
    components: {EditUserForm}
  })
  export default class EditUser extends Vue {
    form: TUserForm | null = null
    rules = EDIT_USER_RULES
    loading = false
    loadingText = '加载中'

    get user() {
      return this.$store.state.user
    }

    uploaded(response: IAvatar) {
      this.$store.commit('user/setAvatarUrl', response.avatarUrl)

      this.$message.success('修改成功')
    }

    uploading({status}: { status: string }) {
      this.loading = !(status === 'success' || status === 'fail')
    }

    beforeUpload(file: File) {
      const isImage = IMAGE_MIME_TYPES.includes(file.type)
      const isValidSize = file.size <= IMAGE_SIZE

      if (!isImage) {
        this.$message.error('上传头像图片格式不正确')
        this.loading = false
      }
      if (!isValidSize) {
        this.$message.error('上传头像图片大小不能超过 2MB')
        this.loading = false
      }

      return isImage && isValidSize
    }

    async onSubmit(form: TUserForm) {
      const {data: user} = await UserService.editUser(form)

      this.$store.commit('user/setUser', user)

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
