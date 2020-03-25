<template>
    <div class="job-item">
        <router-link class="avatar" to="/public">
            <img :src="job.imageUrl" alt="avatar">
        </router-link>
        <div class="content">
            <router-link class="title" to="/public">{{job.title}}</router-link>
            <p>{{job.content}}</p>
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
    @Prop({required: true}) job!: Job
  }
</script>

<style scoped lang="scss">
    .job-item {
        display: flex;
        padding: 15px 0 20px;
        border-bottom: 1px solid rgb(232, 234, 236);
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
        .title {
            margin-bottom: 7px;
            font-size: 18px;
            color: black;
            font-weight: bold;
            &:hover {
                text-decoration: underline;
            }
        }
        .content {
            font-size: 13px;
            color: #999;
            line-height: 24px;
        }
    }
</style>
