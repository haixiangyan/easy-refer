<template>
    <el-form ref="form" :model="addJobForm" label-width="120px" label-position="left" class="add-job-form">
        <el-divider>内推信息</el-divider>
        <el-form-item label="内推公司">
            <el-input v-model="addJobForm.company" placeholder="内推的公司"></el-input>
        </el-form-item>
        <el-form-item label="内推人">
            <el-input v-model="addJobForm.referer" placeholder="请输入你的名字"></el-input>
        </el-form-item>
        <el-form-item label="必填内容">
            <el-select
                class="required-fields-select"
                v-model="addJobForm.requiredFields"
                multiple placeholder="选择候选人要填的信息">
                <el-option
                    v-for="field in referFields"
                    :key="field.value"
                    :label="field.label"
                    :value="field.value"
                    :disabled="requiredReferFieldValues.includes(field.value)"/>
            </el-select>
        </el-form-item>
        <el-form-item label="一亩三分地原贴">
            <el-input type="url" v-model="addJobForm.source"></el-input>
        </el-form-item>

        <div class="publish">
            <el-button type="primary" round>发布内推</el-button>
            <el-button type="danger" round>放弃编辑</el-button>
        </div>
    </el-form>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"
  import {REQUIRED_REFER_FIELD_VALUES, REFER_FIELDS} from "@/contents/refer"

  @Component
  export default class AddJob extends Vue {
    addJobForm: TJob = {
      id: "",
      company: "",
      source: "",
      imageUrl: "",
      referer: "",
      requiredFields: [...REQUIRED_REFER_FIELD_VALUES],
      tags: []
    }
    requiredReferFieldValues = REQUIRED_REFER_FIELD_VALUES
    referFields = REFER_FIELDS
  }
</script>

<style lang="scss">
    .add-job-form {
        .required-fields-select {
            .el-tag__close.el-icon-close {
                display: none;
            }
        }
    }
</style>

<style scoped lang="scss">
    .add-job-form {
        .required-fields-select {
            width: 100%;
            .el-tag__close.el-icon-close {
                display: none;
            }
        }

        .publish {
            text-align: center;
        }
    }
</style>
