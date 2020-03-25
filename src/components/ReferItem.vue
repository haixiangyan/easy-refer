<template>
    <el-row class="refer-item">
        <el-col :span="6" class="status">
            <p>已提交</p>
            <p class="date">2019年2月10号</p>
        </el-col>
        <el-col :span="18" class="content">
            <div class="post">
                <el-link href="/">xxxxxxxxxxx</el-link>
            </div>
            <div class="company">Facebook</div>
            <div class="referer">内推人：yyyyy</div>
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

        }

        .content {
            font-size: 16px;
            line-height: 24px;
            .post a {
                margin-bottom: 4px;
                font-size: 20px;
                color: black;
                font-weight: bold;
            }
        }
    }
</style>
