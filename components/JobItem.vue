<template>
    <el-row class="job-item">
        <el-col :span="4">
            <el-progress type="circle"
                         :percentage="postedDayRatio"
                         :format="dateLeft"
                         :color="getProgressColor(postedDayRatio)"/>
        </el-col>
        <el-col class="content" :span="14">
            <section class="title">
                <span>{{job.company}}</span>
                <el-divider direction="vertical"></el-divider>
                <a v-if="job.source" :href="job.source">
                    原贴
                    <i class="el-icon-top-right"></i>
                </a>
            </section>
            <section class="info">
                <span>{{job.autoRejectDay}}天默拒</span>
                <el-divider direction="vertical"></el-divider>
                <span>{{deadline}}截止</span>
            </section>
            <section class="status">
                <span>已处理 {{job.referredCount}} / {{job.referTotal}}</span>
            </section>
        </el-col>

        <el-col class="refer-status" :span="6">
            <div class="apply-refer" :class="{'show-apply': showApply}">
                <el-button :disabled="!canApply" size="small" type="primary"
                           @click="$router.push(`/refer/apply/${job.jobId}`)">
                    申请内推
                </el-button>
            </div>
            <StatusChart class="chart" v-if="job" :data-source="job.processedChart" :max="yMax"/>
        </el-col>
    </el-row>
</template>

<script lang="ts">
  import Vue from 'vue'
  import dayjs from 'dayjs'
  import {Component, Prop} from 'nuxt-property-decorator'
  import CompanyImage from '@/components/CompanyImage.vue'
  import StatusChart from '@/components/StatusChart.vue'
  import {getProgressColor} from '@/utils/math'
  import {DATETIME_FORMAT} from '@/constants/format'
  import {dateLeft} from '@/utils/date'

  @Component({
    components: {CompanyImage, StatusChart}
  })
  export default class JobItem extends Vue {
    @Prop({required: true}) job!: TJob

    getProgressColor = getProgressColor

    get showApply() {
      return this.$route.name === 'job-list'
    }

    get yMax() {
      return this.job.processedChart.reduce((prev, {count}) => count > prev ? count : prev, 0)
    }

    get canApply() {
      // 没有 Login 时，或自己不能内推自己
      return !this.$auth.loggedIn || this.job.refererId !== this.$auth.user.info.userId
    }

    get deadline() {
      return dayjs(this.job.deadline).format(DATETIME_FORMAT)
    }

    get postedDayRatio() {
      const {deadline, createdAt} = this.job
      const postedDays = dayjs().diff(createdAt, 'day')
      const totalDays = dayjs(deadline).diff(createdAt, 'day')
      return totalDays / postedDays
    }

    dateLeft() {
      return dateLeft(this.job.deadline)
    }
  }
</script>

<style scoped lang="scss">
    .job-item {
        display: flex;
        padding: 16px 0;
        border-bottom: 1px solid $border-color;

        &:last-child {
            border-bottom: none;
        }

        .content {
            .title {
                color: #303133;
                font-size: 1.4em;
                font-weight: bold;
                a {
                    text-decoration: none;
                    font-size: .9em;
                    color: $primary-color;
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }

            .info, .status {
                margin-top: 8px;
            }
        }

        .refer-status {
            text-align: right;

            .apply-refer {
                margin-bottom: 16px;
                visibility: hidden;
                &.show-apply {
                    visibility: visible;
                }
            }
        }
    }
</style>
