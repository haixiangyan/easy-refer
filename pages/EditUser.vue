<template>
    <div>
        <el-row class="avatar" type="flex" align="middle">
            <el-col :span="6">
                <el-avatar :src="avatarUrl" :size="100"/>
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
        <UserForm @submit="onSubmit"/>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'nuxt-property-decorator'
  import {EDIT_USER_RULES} from '@/constants/rules'
  import UserForm from '@/components/UserForm.vue'
  import {IMAGE_MIME_TYPES, IMAGE_SIZE} from '@/constants/file'
  import UserService from '@/service/UserService'
  import {USER_MODULE} from '@/store/user'
  import {Mutation} from 'vuex-class'

  @Component({
    components: {UserForm}
  })
  export default class EditUser extends Vue {
    @USER_MODULE.State(state => state.details.avatarUrl) avatarUrl!: string
    @USER_MODULE.Mutation('setUser') setUser!: Function
    @USER_MODULE.Mutation('setAvatarUrl') setAvatarUrl!: Function
    @Mutation('setLoading') setLoading!: Function

    form: TUserForm | null = null
    rules = EDIT_USER_RULES

    uploaded(response: IAvatar) {
      this.setAvatarUrl(response.avatarUrl)

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
      const {data: user} = await UserService.editUser(form)

      this.setUser(user)

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
