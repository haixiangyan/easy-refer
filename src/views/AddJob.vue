<template>
    <el-form ref="addJobForm" :model="addJobForm" label-width="120px" label-position="left" class="add-job-form" :rules="rules">
        <el-divider>内推信息</el-divider>
        <el-form-item prop="company" required label="内推公司">
            <el-input v-model="addJobForm.company" placeholder="内推的公司"></el-input>
        </el-form-item>
        <el-form-item required label="内推人">
            <el-input disabled v-model="addJobForm.referer" placeholder="请输入你的名字"></el-input>
        </el-form-item>
        <el-form-item required label="必填内容">
            <el-select
                class="full-width"
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
        <el-form-item required label="截止日期">
            <el-date-picker
                class="full-width"
                v-model="addJobForm.deadline"
                type="date"
                format="yyyy年MM月dd日"
                :picker-options="deadlineOptions"
                placeholder="选择截止日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item required label="X天默拒">
            <el-radio v-model="addJobForm.expiration" :label="3">3 天</el-radio>
            <el-radio v-model="addJobForm.expiration" :label="5">5 天</el-radio>
            <el-radio v-model="addJobForm.expiration" :label="7">7 天</el-radio>
        </el-form-item>
        <el-form-item required label="内推上限">
            <el-input-number v-model="addJobForm.referTotal" :min="20" :max="1000" :step="100" label="描述文字"/>
            <p class="limit-hint">上限范围：20~1000 请合理安排你的内推计划</p>
        </el-form-item>
        <el-form-item label="一亩三分地原贴">
            <el-input type="url" v-model="addJobForm.source" placeholder="添加原帖更方便追踪哦"/>
        </el-form-item>

        <div class="publish">
            <el-button @click="publish" type="primary" round>发布内推</el-button>
            <el-button type="danger" round>放弃编辑</el-button>
        </div>
    </el-form>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"
  import dayjs from 'dayjs'
  import {REQUIRED_REFER_FIELD_VALUES, REFER_FIELDS} from "@/contents/refer"
  import {ADD_JOB_RULES} from "@/contents/rules"
  import GetJobById from '@/graphql/GetJobById.graphql'
  import AddJobGQL from '@/graphql/AddJob.graphql'
  import {ElForm} from "element-ui/types/form"

  @Component
  export default class AddJob extends Vue {
    userId = '1'
    addJobForm: TJob = {
      jobId: "undefined",
      company: "",
      referer: this.$store.state.user.name,
      requiredFields: [...REQUIRED_REFER_FIELD_VALUES],
      deadline: new Date(dayjs().add(1, 'month').toISOString()),
      expiration: 3,
      referredCount: 0,
      referTotal: 100,
      source: "",
      imageUrl: "",
    }
    requiredReferFieldValues = REQUIRED_REFER_FIELD_VALUES
    referFields = REFER_FIELDS
    deadlineOptions = {
      disabledDate(date: Date) {
        const today = dayjs()
        const cellDate = dayjs(date)
        const afterOneYear = today.add(1, 'year')

        return cellDate.isBefore(today) || cellDate.isAfter(afterOneYear)
      }
    }
    rules = ADD_JOB_RULES

    mounted() {
      if (this.$route.params.jobId) {
        this.loadJob(this.$route.params.jobId)
      }
    }

    async loadJob(jobId: string) {
      try {
        const {data} = await this.$apollo.query({
          query: GetJobById,
          variables: {jobId}
        })

        this.addJobForm = data.job
      } catch (error) {
        this.$message.error(error.message)
      }
    }

    publish() {
      (<ElForm>this.$refs.addJobForm).validate(async valid => {
        if (!valid) return this.$message.error('填写不正确')
        try {
          await this.$apollo.mutate({
            mutation: AddJobGQL,
            variables: {userId: this.userId, jobForm: this.addJobForm}
          })

          this.$message.success('该职位已添加')
          await this.$router.push('/job-list')
        } catch (error) {
          this.$message.error(error.message)
        }
      })
    }
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
    @import '~@/assets/styles/variables.scss';
    .add-job-form {
        .full-width {
            width: 100%;
        }

        .limit-hint {
            color: $warning-color;
        }

        .publish {
            text-align: center;
        }
    }
</style>
