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

        <div class="user-form-submit">
            <el-button class="submit-button" round type="primary" @click="saveChange">保存</el-button>
        </div>
    </el-form>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'nuxt-property-decorator'
  import {LEVEL_MAPPER} from '~/constants/level'
  import {EDIT_USER_RULES} from '~/constants/rules'
  import {ElForm} from 'element-ui/types/form'
  import {getFieldName} from '~/constants/referFields'
  import {Mutation} from 'vuex-class'

  @Component
  export default class UserForm extends Vue {
    @Mutation('setLoading') setLoading!: Function

    form: TUserForm = {
      email: '',
      experience: 0,
      intro: '',
      leetCodeUrl: '',
      name: '',
      phone: '',
      thirdPersonIntro: ''
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
    }

    initForm() {
      Object.keys(this.form).forEach((key: string) => {
        this.form[key] = this.userInfo[key]
      })
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
            text-align: center;
        }
    }
</style>
