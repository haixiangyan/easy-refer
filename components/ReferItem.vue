<template>
    <el-row class="refer-item">
        <el-col :span="6">
            <p class="status" :class="refer.status">{{statusName}}</p>
            <p class="updated-date">{{updatedAt}}</p>
        </el-col>
        <el-col :span="14" class="content">
            <div class="post">
                <el-link :href="refer.source">
                    原贴
                    <i class="el-icon-paperclip"></i>
                </el-link>
            </div>
            <div class="company">{{refer.job.company}}</div>
            <div class="referer">{{refer.referer.name}}正在处理</div>
        </el-col>
        <el-col :span="4">
            <nuxt-link :to="`/refer/edit/${refer.referId}`" tag="span">
                <el-link class="edit-button" type="primary" icon="el-icon-edit">修改</el-link>
            </nuxt-link>
            <el-link @click="withdraw" type="danger" icon="el-icon-close">撤销</el-link>
        </el-col>
    </el-row>
</template>

<script lang="ts">
  import Vue from 'vue'
  import dayjs from 'dayjs'
  import {Component, Prop} from 'nuxt-property-decorator'
  import {STATUS_NAMES_MAPPER} from '@/constants/status'
  import {DATETIME_FORMAT} from '@/constants/format'

  @Component
  export default class ReferItem extends Vue {
    @Prop({required: true}) refer!: TMyRefer

    get statusName() {
      return STATUS_NAMES_MAPPER[this.refer.status]
    }

    get updatedAt() {
      return dayjs(this.refer.updatedAt).format(DATETIME_FORMAT)
    }

    async withdraw() {
      await this.$alert('确定撤回该内推？', '撤回内推', {
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '撤回吧',
        cancelButtonText: '再想想',
        callback: action => {
          if (action === 'confirm') {
            this.confirmWithdraw()
          }
        }
      })
    }

    async confirmWithdraw() {
      await this.$axios.$delete(`/refers/${this.refer.referId}`)

      this.$message.success('已撤回')
    }
  }
</script>

<style scoped lang="scss">
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
