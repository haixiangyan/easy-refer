<template>
    <el-row class="refer-item">
        <el-col :span="6">
            <p class="status" :class="refer.status">{{statusName}}</p>
            <p class="updated-date">{{refer.updatedDate}}</p>
        </el-col>
        <el-col :span="14" class="content">
            <div class="post">
                <el-link :href="refer.source">
                    原贴
                    <i class="el-icon-paperclip"></i>
                </el-link>
            </div>
            <div class="company">{{refer.company}}</div>
            <div class="referer">{{refer.referer}}正在处理</div>
        </el-col>
        <el-col :span="4">
            <router-link :to="`/apply/${refer.jobId}`" tag="span">
                <el-link class="edit-button" type="primary" icon="el-icon-edit">修改</el-link>
            </router-link>
            <el-link type="danger" icon="el-icon-close">撤销</el-link>
        </el-col>
    </el-row>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component, Prop} from "vue-property-decorator"
  import {STATUS_NAMES_MAPPER} from "@/contents/status"

  @Component
  export default class ReferItem extends Vue {
    @Prop({required: true}) refer!: TRefer

    get statusName() {
      return STATUS_NAMES_MAPPER[this.refer.status]
    }
  }
</script>

<style scoped lang="scss">
    @import '~@/assets/styles/variables.scss';

    .refer-item {
        display: flex;
        padding: 20px 0;
        border-bottom: 1px solid $border-color;

        &:last-child {
            border-bottom: none;
        }

        .status {
            font-weight: bold;
            font-size: 1.1em;

            &.processing {
                color: $warning-color;
            }

            &.rejected {
                color: $danger-color;
            }

            &.referred {
                color: $success-color;
            }
        }

        .updated-date {
            font-size: .9em;
            color: #303133;
        }

        .content {
            .company, .referer {
                font-size: .9em;
                color: #909399;
            }

            .post a {
                margin-bottom: 4px;
                font-size: 1.1em;
                font-weight: bold;
            }
        }
        .edit-button {
            margin-right: 4px;
        }
    }
</style>
