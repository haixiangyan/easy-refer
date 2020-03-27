<template>
    <el-row class="job-item">
        <el-col :span="3">
            <router-link class="avatar" to="/public">
                <img :src="job.imageUrl" alt="avatar">
            </router-link>
        </el-col>
        <el-col class="content" :span="21">
            <p class="title">
                {{job.company}}
                <el-divider direction="vertical"></el-divider>
                {{job.referer}}内推
            </p>
            <div class="tags">
                <el-tag size="mini" type="primary">{{job.deadline}}截止</el-tag>
                <el-tag size="mini" type="danger">{{job.expiration}}天必推</el-tag>
            </div>
            <el-progress class="progress" :percentage="referredPercentage" :color="referredProgress"/>
            <div class="footer">
                <el-link class="start-refer" type="primary">申请内推</el-link>
                <el-link v-if="job.source" :href="job.source">
                    原贴
                    <i class="el-icon-top-right"></i>
                </el-link>
            </div>
        </el-col>
    </el-row>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component, Prop} from "vue-property-decorator"
  import {getReferProgress} from "@/utils/refer"

  @Component
  export default class JobItem extends Vue {
    @Prop({required: true}) job!: TJob

    get referredPercentage() {
      return parseFloat((this.job.referredCount / this.job.referTotal * 100).toFixed(2))
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
        .footer {
            .start-refer {
                margin-right: 8px;
            }
        }
    }
</style>
