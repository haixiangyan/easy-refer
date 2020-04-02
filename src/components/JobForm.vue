<template>
    <el-form v-loading="loading" element-loading-text="获取已创建职位" ref="jobForm" :model="jobForm"
             label-width="120px"
             label-position="left"
             class="job-form"
             :rules="rules">
        <el-divider>内推职位信息</el-divider>
        <el-form-item prop="company" required label="内推公司">
            <el-input v-model="jobForm.company" placeholder="内推的公司"></el-input>
        </el-form-item>
        <el-form-item required label="内推人">
            <el-input disabled v-model="jobForm.refererName" placeholder="请输入你的名字"></el-input>
        </el-form-item>
        <el-form-item required label="必填内容">
            <el-select
                class="full-width"
                v-model="jobForm.requiredFields"
                multiple placeholder="选择候选人要填的信息">
                <el-option
                    v-for="field in referFields"
                    :key="field.value"
                    :label="field.label"
                    :value="field.value"
                    :disabled="requiredReferFieldValues.includes(field.value)"/>
            </el-select>
        </el-form-item>
        <el-form-item required label="截止日期">
            <el-date-picker
                class="full-width"
                v-model="jobForm.deadline"
                type="date"
                format="yyyy年MM月dd日"
                :picker-options="deadlineOptions"
                placeholder="选择截止日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item required label="X天默拒">
            <el-radio v-model="jobForm.expiration" :label="3">3 天</el-radio>
            <el-radio v-model="jobForm.expiration" :label="5">5 天</el-radio>
            <el-radio v-model="jobForm.expiration" :label="7">7 天</el-radio>
        </el-form-item>
        <el-form-item required label="内推上限">
            <el-input-number v-model="jobForm.referTotal" :min="20" :max="1000" :step="100" label="描述文字"/>
            <p class="limit-hint">上限范围：20~1000 请合理安排你的内推计划</p>
        </el-form-item>
        <el-form-item label="一亩三分地原贴">
            <el-input type="url" v-model="jobForm.source" placeholder="添加原帖更方便追踪哦"/>
        </el-form-item>

        <div class="publish">
            <el-button class="publish-button" @click="submit" type="primary" round>
                {{user.jobId ? '修改内推' : '发布内推'}}
            </el-button>
            <router-link to="/job-list" tag="span">
                <el-button type="danger" round>放弃编辑</el-button>
            </router-link>
        </div>
    </el-form>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"
  import dayjs from "dayjs"
  import {REFER_FIELDS_MAPPER, REQUIRED_REFER_FIELD_VALUES} from '@/constants/referFields'
  import {JOB_RULES} from "@/constants/rules"
  import GetJobByIdGQL from "@/graphql/GetJobItem.graphql"
  import {ElForm} from "element-ui/types/form"

  @Component
  export default class JobForm extends Vue {
    jobForm: TJobForm & {[key: string]: string | number | string[]} = {
      company: "",
      refererName: this.user.name,
      requiredFields: [...REQUIRED_REFER_FIELD_VALUES],
      deadline: dayjs().add(1, "month").toISOString(),
      expiration: 3,
      referredCount: 0,
      referTotal: 100,
      createdAt: new Date().toISOString(),
      source: "",
      imageUrl: ""
    }
    requiredReferFieldValues = REQUIRED_REFER_FIELD_VALUES
    deadlineOptions = {
      disabledDate(date: Date) {
        const today = dayjs()
        const cellDate = dayjs(date)
        const afterOneYear = today.add(1, "year")

        return cellDate.isBefore(today) || cellDate.isAfter(afterOneYear)
      }
    }
    loading = false
    rules = JOB_RULES

    get referFields() {
      return Object.entries(REFER_FIELDS_MAPPER).map(([value, label]) => ({value, label}))
    }
    get user() {
      return this.$store.state.user
    }

    mounted() {
      this.user.jobId && this.loadJob()
    }

    async loadJob() {
      try {
        this.loading = true
        const {data} = await this.$apollo.query({
          query: GetJobByIdGQL,
          variables: {jobId: this.user.jobId}
        })

        Object.keys(this.jobForm).forEach(key => {
          this.jobForm[key] = data.job[key]
        })
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    }

    submit() {
      (<ElForm>this.$refs.jobForm).validate(async valid => {
        if (!valid) return this.$message.error("填写不正确")

        this.$emit('submit', this.jobForm)
      })
    }
  }
</script>

<style lang="scss">
    .job-form {
        .el-tag__close.el-icon-close {
            display: none!important;
        }
    }
</style>

<style scoped lang="scss">
    @import '~@/assets/styles/variables.scss';

    .job-form {
        .full-width {
            width: 100%;
        }

        .limit-hint {
            color: $warning-color;
        }

        .publish {
            text-align: center;

            &-button {
                margin-right: 8px;
            }
        }
    }
</style>
