<template>
    <div class="job-item">
        <router-link class="avatar" to="/public">
            <img :src="job.imageUrl" alt="avatar">
        </router-link>
        <div class="content">
            <p class="title">
                {{job.company}}
                <el-divider direction="vertical"></el-divider>
                {{job.referer}}内推
            </p>
            <p><strong>{{job.deadline}}</strong>截止</p>
            <p><strong>{{job.expiration}}</strong>天内必推</p>
            <div class="footer">
                <el-button class="start-refer" round type="primary" plain size="small">申请内推</el-button>
                <el-link v-if="job.source" :href="job.source">
                    原贴
                    <i class="el-icon-top-right"></i>
                </el-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component, Prop} from "vue-property-decorator"

  @Component
  export default class JobItem extends Vue {
    @Prop({required: true}) job!: TJob
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
                height: 100px;
                width: 100px;
            }
        }
        .content {
            line-height: 24px;
            .title {
                margin-bottom: 7px;
                font-size: 1.1em;
                font-weight: bold;
            }
            p, div {
                font-size: .9em;
            }
            .tags > .tag {
                margin-right: 8px;
            }
        }
        .footer {
            margin-top: 8px;
            .start-refer {
                margin-right: 8px;
            }
        }
    }
</style>
