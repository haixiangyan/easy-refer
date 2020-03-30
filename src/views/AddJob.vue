<template>
    <el-form ref="addJobForm" :model="addJobForm" label-width="120px" label-position="left" class="add-job-form"
             :rules="rules">
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
            <el-button class="publish-button" @click="publish" type="primary" round>
                {{jobId ? '修改内推' : '发布内推'}}
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
  import {REQUIRED_REFER_FIELD_VALUES, REFER_FIELDS} from "@/contents/refer"
  import {ADD_JOB_RULES} from "@/contents/rules"
  import GetJobByIdGQL from "@/graphql/GetJobById.graphql"
  import AddJobGQL from "@/graphql/AddJob.graphql"
  import UpdateJobGQL from "@/graphql/UpdateJob.graphql"
  import {ElForm} from "element-ui/types/form"

  @Component
  export default class AddJob extends Vue {
    addJobForm: TJobForm = {
      jobId: undefined,
      company: "",
      refererId: this.userId,
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
    referFields = REFER_FIELDS
    deadlineOptions = {
      disabledDate(date: Date) {
        const today = dayjs()
        const cellDate = dayjs(date)
        const afterOneYear = today.add(1, "year")

        return cellDate.isBefore(today) || cellDate.isAfter(afterOneYear)
      }
    }
    rules = ADD_JOB_RULES

    get jobId() {
      return this.$route.params.jobId
    }
    get userId() {
      return this.$store.state.user.userId
    }

    mounted() {
      this.jobId && this.loadJob()
    }

    async loadJob() {
      try {
        const {data} = await this.$apollo.query({
          query: GetJobByIdGQL,
          variables: {jobId: this.jobId}
        })

        this.addJobForm = data.job
      } catch (error) {
        this.$message.error(error.message)
      }
    }

    publish() {
      (<ElForm>this.$refs.addJobForm).validate(async valid => {
        if (!valid) return this.$message.error("填写不正确")

        try {
          await this.$apollo.mutate({
            mutation: this.jobId ? UpdateJobGQL : AddJobGQL,
            variables: {userId: this.userId, jobForm: this.addJobForm}
          })

          this.$message.success(this.jobId ? "已修改加该职位" : "已添加该职位")
          await this.$router.push("/job-list")
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

            &-button {
                margin-right: 8px;
            }
        }
    }
</style>
