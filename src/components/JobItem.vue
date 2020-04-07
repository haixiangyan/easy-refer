<template>
    <el-row class="job-item">
        <el-col :span="4">
            <router-link class="avatar" :to="`/apply-refer/${jobItem.jobId}`">
                <CompanyImage :src="jobItem.referer.avatarUrl"/>
            </router-link>
        </el-col>
        <el-col class="content" :span="14">
            <p class="title">
                {{jobItem.company}}
                <el-divider direction="vertical"></el-divider>
                {{jobItem.referer.name}}内推
            </p>
            <div class="tags">
                <el-tag size="mini" type="primary">{{deadline}}截止</el-tag>
                <el-tag size="mini" type="danger">{{jobItem.expiration}}天必推</el-tag>
            </div>
            <el-progress class="progress" :percentage="referredPercentage" :color="referredProgress"/>
            <div>
                <el-link v-if="jobItem.source" :href="jobItem.source">
                    原贴
                    <i class="el-icon-top-right"></i>
                </el-link>
            </div>
        </el-col>
        <el-col class="refer-status" :span="6">
            <div class="apply-refer" v-if="showApply">
                <router-link :to="`/apply-refer/${jobItem.jobId}`" tag="span">
                    <el-button size="small" type="primary">申请内推</el-button>
                </router-link>
            </div>
            <ReferredLineChart class="chart" v-if="jobItem" :data-source="finishedChartData"/>
        </el-col>
    </el-row>
</template>

<script lang="ts">
  import Vue from 'vue'
  import dayjs from 'dayjs'
  import {Component, Prop} from 'vue-property-decorator'
  import CompanyImage from '@/components/CompanyImage.vue'
  import ReferredLineChart from '@/components/ReferredLineChart.vue'
  import {getReferProgress} from '@/utils/refer'
  import {DATETIME_FORMAT} from '@/constants/format'

  @Component({
    components: {CompanyImage, ReferredLineChart}
  })
  export default class JobItem extends Vue {
    @Prop({required: true}) jobItem!: TJobItem

    get showApply() {
      return this.$route.name === 'JobList'
    }

    get deadline() {
      return dayjs(this.jobItem.deadline).format(DATETIME_FORMAT)
    }

    get finishedChartData() {
      return this.jobItem.finishedChart
        .map(({date, count}) => ({
          date: dayjs(date).format(DATETIME_FORMAT),
          count
        }))
    }

    get referredPercentage() {
      const {referredCount, referTotal} = this.jobItem
      return referTotal === 0 ? 0 : parseFloat((referredCount / referTotal * 100).toFixed(2))
    }

    get referredProgress() {
      return getReferProgress(this.referredPercentage)
    }
  }
</script>

<style scoped lang="scss">
    @import '~@/assets/styles/variables.scss';

    .job-item {
        display: flex;
        padding: 20px 0;
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
                margin-bottom: 8px;
            }
        }
    }
</style>
