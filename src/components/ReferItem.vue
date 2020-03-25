<template>
    <el-row class="refer-item">
        <el-col :span="6">
            <p class="status" :class="'submitted'">已提交</p>
            <p class="update-date">2019年2月10号</p>
        </el-col>
        <el-col :span="18" class="content">
            <div class="post">
                <el-link type="primary" href="/">xxxxxxxxxxx</el-link>
            </div>
            <div class="company">Facebook</div>
            <div class="referer">yyyyy正在处理</div>
        </el-col>
    </el-row>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"

  @Component
  export default class ReferItem extends Vue {
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
            &.submitted {
                color: black;
            }
        }
        .update-date {
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
                font-size: 20px;
                font-weight: bold;
            }
        }
    }
</style>
