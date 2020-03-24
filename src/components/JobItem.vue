<template>
    <div class="job-item">
        <router-link class="avatar" to="/public">
            <img src="../assets/img/facebook.png" alt="avatar">
        </router-link>
        <div class="content">
            <router-link class="title" to="/public">{{item.title}}</router-link>
            <p>{{item.content}}</p>
            <div class="footer">
                <el-button type="text">开始内推</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component, Prop} from "vue-property-decorator"

  type Item = {
    id: number
    title: string
    content: string
    company: string
  }

  @Component
  export default class JobItem extends Vue {
    @Prop({required: true}) item!: Item
  }
</script>

<style scoped lang="scss">
    .job-item {
        display: flex;
        padding: 15px 0 20px;
        border-bottom: 1px solid rgb(232, 234, 236);
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
