<template>
    <div class="intro">
        <div class="avatar">
            <router-link to="/user">
                <el-avatar :src="user.avatarUrl" :size="100"/>
            </router-link>
            <router-link to="/user" tag="p">
                <el-link class="name">{{user.name}}</el-link>
            </router-link>
        </div>
        <el-row class="analysis">
            <el-col :span="12" class="refer">
                <p class="number">{{user.finishedRefers}} / {{user.totalRefers}}</p>
                <p class="description">已完成的内推</p>
                <p class="rate">{{approvedRate}}%</p>
            </el-col>
            <div :span="12" class="resume">
                <p class="number">{{user.finishedResumes}} / {{user.totalResumes}}</p>
                <p class="description">要处理的简历</p>
                <p class="rate">{{referRate}}%</p>
            </div>
        </el-row>
        <div class="function">
            <router-link to="/my/refer-list" tag="div">
                <el-button class="button" type="success" :round="true" icon="el-icon-view">
                   查看内推状态
                </el-button>
            </router-link>
            <router-link :to="user.jobId ? `/edit-job` : '/add-job'" tag="div">
                <el-button class="button"
                           type="primary"
                           :icon="user.jobId ? 'el-icon-edit' : 'el-icon-plus'"
                           :round="true">
                    {{user.jobId ? '修改' : '发布'}}内推职位
                </el-button>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"

  @Component
  export default class Intro extends Vue {
    get user() {
      return this.$store.state.user
    }
    get referRate() {
      return this.calculateRate(this.user.finishedRefers, this.user.totalRefers)
    }
    get approvedRate() {
      return this.calculateRate(this.user.finishedResumes, this.user.totalResumes)
    }

    calculateRate(current: number, total: number): string {
      return total === 0 ? "0" : (current / total * 100).toFixed(2)
    }
  }
</script>

<style scoped lang="scss">
    @import '~@/assets/styles/variables.scss';

    .intro {
        padding: 0 24px 0;

        .avatar {
            text-align: center;

            .name {
                margin-top: 10px;
                font-size: 1.2em;
            }
        }

        .selection {
            width: 100%;
        }

        .analysis {
            margin-top: 16px;

            .refer, .resume {
                text-align: center;

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

        .function {
            margin-top: 20px;

            > div {
                margin-bottom: 10px;
                text-align: center;

                .button {
                    width: 90%;
                }
            }
        }
    }
</style>
