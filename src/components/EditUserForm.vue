<template>
    <el-form v-if="form" class="edit-form"
             ref="editUserForm" :model="editUserForm"
             label-width="120px"
             label-position="left"
             :rules="rules">
        <el-form-item required prop="name" :label="field('name')">
            <el-input v-model="editUserForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="email" required :label="field('email')">
            <el-input type="email" disabled v-model="editUserForm.email"></el-input>
        </el-form-item>
        <el-form-item prop="phone" :label="field('phone')">
            <el-input type="tel" v-model="editUserForm.phone"></el-input>
        </el-form-item>
        <el-form-item prop="experience" required :label="field('experience')">
            <el-select v-model="editUserForm.experience" placeholder="请选择">
                <el-option v-for="[value, label] in levels" :key="value" :label="label" :value="value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="intro" :label="field('intro')">
            <el-input type="textarea" :rows="4" v-model="editUserForm.intro"></el-input>
        </el-form-item>
        <el-form-item prop="thirdPersonIntro" :label="field('thirdPersonIntro')">
            <el-input type="textarea" :autosize="true" :rows="4" v-model="editUserForm.thirdPersonIntro"></el-input>
        </el-form-item>
        <el-form-item prop="leetCodeUrl" :label="field('leetCodeUrl')">
            <el-input type="url" v-model="editUserForm.leetCodeUrl"></el-input>
        </el-form-item>
        <el-form-item prop="resumeUrl" :label="field('resumeUrl')">
            <el-input type="url" v-model="editUserForm.resumeUrl"></el-input>
        </el-form-item>

        <el-form-item class="edit-form-submit">
            <el-button class="submit-button" round type="primary" @click="saveChange">保存</el-button>
            <router-link tag="span" to="/user">
                <el-button round>返回</el-button>
            </router-link>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component, Prop} from "vue-property-decorator"
  import {LEVEL_MAPPER} from "@/constants/level"
  import {EDIT_USER_RULES} from "@/constants/rules"
  import {ElForm} from 'element-ui/types/form'
  import {getFieldName} from '@/constants/referFields'

  @Component
  export default class EditUserForm extends Vue {
    @Prop() form!: TUserForm

    editUserForm: TUserForm = {
      jobId: "",
      email: "",
      name: "",
      experience: 0,
      intro: "",
      phone: "",
      leetCodeUrl: "",
      thirdPersonIntro: "",
      resumeUrl: ""
    }
    rules = EDIT_USER_RULES
    field = getFieldName

    get levels() {
      return Object.entries(LEVEL_MAPPER).map(([value, label]) => [parseInt(value), label])
    }

    mounted() {
      this.editUserForm = {...this.form}
    }

    saveChange() {
      (<ElForm>this.$refs.editUserForm).validate(async valid => {
        if (!valid) return this.$message.error('填写不正确')

        this.$emit('submit', this.editUserForm)
      })
    }
  }
</script>

<style scoped lang="scss">
    .edit-form {
        &-submit {
            text-align: right;

            .submit-button {
                margin-right: 8px;
            }
        }
    }
</style>
