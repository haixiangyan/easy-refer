<template>
    <div class="intro">
        <div class="avatar">
            <el-avatar src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" :size="50"/>
            <p class="name">xxxxxx</p>
        </div>
        <div class="analysis">
            <div class="refer">
                <p class="number">{{finishedRefers}} / {{totalRefers}}</p>
                <p class="description">已申请的内推</p>
                <p class="rate">{{(finishedRefers / totalRefers).toFixed(2)}}%</p>
            </div>
            <div class="resume">
                <p class="number">{{finishedResumes}} / {{totalResumes}}</p>
                <p class="description">要处理的简历</p>
                <p class="rate">{{(finishedResumes / totalResumes).toFixed(2)}}%</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"

  @Component
  export default class Intro extends Vue {
    finishedRefers = 11
    totalRefers = 200
    finishedResumes = 22
    totalResumes = 300
  }
</script>

<style scoped lang="scss">
    @import '~@/assets/styles/variables.scss';

    .intro {
        padding: 0 24px 0 12px;

        .avatar {
            text-align: center;

            .name {
                margin-top: 10px;
            }
        }

        .selection {
            width: 100%;
        }

        .analysis {
            display: flex;
            margin-top: 16px;

            .refer, .resume {
                text-align: center;
                width: 50%;
                .number {
                    font-size: 1.7em;
                    color: #F56C6C;
                    font-weight: 500;
                }
                .description {
                    font-size: .8em;
                }
                .rate {
                    color: #E6A23C;
                }
            }

            .refer {
                border-right: 1px solid $border-color;
                .number {
                    color: #409EFF;
                }
            }
        }

        .check {
            margin-top: 20px;
        }
    }
</style>
