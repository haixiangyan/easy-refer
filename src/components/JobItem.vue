<template>
    <div class="job-item">
        <router-link class="avatar" to="/public">
            <img :src="job.imageUrl" alt="avatar">
        </router-link>
        <div class="content">
            <el-link class="title" href="/public">{{job.company}}</el-link>
            <p>内推人：{{job.referer}}</p>
            <p class="tags">
                <el-tag size="mini" class="tag" v-for="tag in job.tags" :type="tag.type" :key="tag.text">
                    {{tag.text}}
                </el-tag>
            </p>
            <div class="footer">
                <el-button type="text">开始内推</el-button>
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
            color: #999;
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
    }
</style>
