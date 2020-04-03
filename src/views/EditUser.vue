<template>
    <div class="edit-user" v-loading="loading" :element-loading-text="loadingText">
        <el-row class="avatar" type="flex" align="middle">
            <el-col :span="6">
                <el-avatar :src="avatarUrl" :size="100"/>
            </el-col>
            <el-col>
                <el-upload
                    action=""
                    :show-file-list="false"
                    :on-success="onUpload"
                    :before-upload="beforeUpload">
                    <el-button size="small" type="success" plain round>修改头像</el-button>
                </el-upload>
            </el-col>
        </el-row>
        <div v-if="form">
            <EditUserForm :form="form" @submit="onSubmit"/>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"
  import UpdateUserGQL from "@/graphql/UpdateUser.graphql"
  import GetUserGQL from '@/graphql/GetUser.graphql'
  import {EDIT_USER_RULES} from "@/constants/rules"
  import EditUserForm from "@/components/EditUserForm.vue"
  import {IMAGE_MIME_TYPES, IMAGE_SIZE} from '@/constants/file'
  import UploadAvatarGQL from '@/graphql/UploadAvatar.graphql'
  import {ElUploadInternalFileDetail} from 'element-ui/types/upload'

  @Component({
    components: {EditUserForm}
  })
  export default class EditUser extends Vue {
    form: TUserForm | null = null
    rules = EDIT_USER_RULES
    loading = false
    loadingText = '加载中'
    avatarUrl = ''

    get userId() {
      return this.$store.state.user.userId
    }

    mounted() {
      this.loadUser()
    }

    async onUpload(res: {id: string}, file: ElUploadInternalFileDetail) {
      try {
        await this.$apollo.mutate({
          mutation: UploadAvatarGQL,
          variables: {userId: this.userId, avatar: file.raw}
        })
        this.avatarUrl = URL.createObjectURL(file.raw);
        this.$message.success('修改成功')
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    }
    beforeUpload(file: File) {
      this.loading = true
      this.loadingText = '上传中'

      const isImage = IMAGE_MIME_TYPES.includes(file.type)
      const isValidSize = file.size <= IMAGE_SIZE

      if (!isImage) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isValidSize) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }

      return isImage && isValidSize
    }

    async loadUser() {
      try {
        this.loading = true
        this.loadingText = '加载用户中'
        const {data} = await this.$apollo.query({
          query: GetUserGQL,
          variables: {userId: this.userId}
        })

        this.form = data.user
        this.avatarUrl = data.user.avatarUrl
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    }

    async onSubmit(editUserForm: TUserForm) {
      try {
        this.loading = true
        this.loadingText = '提交中'
        await this.$apollo.mutate({
          mutation: UpdateUserGQL,
          variables: {
            userId: this.userId,
            userForm: editUserForm
          }
        })

        this.$message.success("已更新用户信息")
        await this.$router.push("/user")
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    }
  }
</script>

<style scoped lang="scss">
    .avatar {
        margin-bottom: 24px;
    }
</style>
