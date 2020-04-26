<template>
    <el-row class="job-item">
        <el-col :span="3">
            <nuxt-link class="avatar" :to="`/refer/apply/${job.jobId}`">
                <CompanyImage :src="job.referer.avatarUrl"/>
            </nuxt-link>
        </el-col>
        <el-col class="content" :span="15">
            <p class="title">
                {{job.company}}
                <el-divider direction="vertical"></el-divider>
                {{job.referer.name}}内推
            </p>
            <div class="tags">
                <el-tag size="mini" type="primary">{{deadline}}截止</el-tag>
                <el-tag size="mini" type="danger">{{job.autoRejectDay}}天必推</el-tag>
            </div>
            <el-progress class="progress" :percentage="referredPercentage" :color="referredProgress"/>
            <div>
                <el-link v-if="job.source" :href="job.source">
                    原贴
                    <i class="el-icon-top-right"></i>
                </el-link>
            </div>
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
  import {getReferProgress} from '@/utils/refer'
  import {DATETIME_FORMAT} from '@/constants/format'

  @Component({
    components: {CompanyImage, StatusChart}
  })
  export default class JobItem extends Vue {
    @Prop({required: true}) job!: TJob

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

    get referredPercentage() {
      const {referredCount, referTotal} = this.job
      return referTotal === 0 ? 0.00 : parseFloat((referredCount / referTotal * 100).toFixed(2))
    }

    get referredProgress() {
      return getReferProgress(this.referredPercentage)
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

        .avatar {
            margin-right: 24px;

            img {
                width: 80%;
            }
        }

        .content {
            line-height: 24px;

            .title {
                margin-bottom: 8px;
                font-size: 1.1em;
                font-weight: bold;
            }

            .tags {
                margin-bottom: 8px;

                > span {
                    margin-right: 8px;
                }
            }

            .progress {
                max-width: 240px;
                display: flex;
                align-items: center;
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
