<template>
    <div class="intro">
        <div class="avatar">
            <router-link to="/user">
                <el-avatar :src="avatarUrl" :size="100"/>
            </router-link>
            <router-link to="/user" tag="p">
                <el-link class="name">{{intro.name}}</el-link>
            </router-link>
        </div>
        <el-row class="analysis">
            <el-col :span="12" class="refer">
                <p class="number">{{intro.finishedRefers}} / {{intro.totalRefers}}</p>
                <p class="description">已申请的内推</p>
                <p class="rate">{{referRate}}%</p>
            </el-col>
            <div :span="12" class="resume">
                <p class="number">{{intro.finishedResumes}} / {{intro.totalResumes}}</p>
                <p class="description">要处理的简历</p>
                <p class="rate">{{resumeRate}}%</p>
            </div>
        </el-row>
        <div class="function">
            <router-link to="/my-refer-list" tag="div">
                <el-button class="button" type="success" :round="true" icon="el-icon-view">
                   查看内推状态
                </el-button>
            </router-link>
            <router-link :to="jobId ? `/edit-job` : '/add-job'" tag="div">
                <el-button class="button"
                           type="primary"
                           :icon="jobId ? 'el-icon-edit' : 'el-icon-plus'"
                           :round="true">
                    {{jobId ? '修改' : '发布'}}内推职位
                </el-button>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"
  import GetUserIntroGQL from '@/graphql/GetUserIntro.graphql'

  @Component
  export default class Intro extends Vue {
    intro: TIntro = {
      name: "",
      finishedRefers: 0,
      totalRefers: 0,
      finishedResumes: 0,
      totalResumes: 0,
    }
    referRate = "0"
    resumeRate = "0"

    get jobId() {
      return this.$store.state.user.jobId
    }
    get userId() {
      return this.$store.state.user.userId
    }
    get avatarUrl() {
      return this.$store.state.user.avatarUrl
    }

    mounted() {
      this.loadIntro()
    }

    async loadIntro() {
      try {
        const {data} = await this.$apollo.query({
          query: GetUserIntroGQL,
          variables: {userId: this.userId}
        })

        this.intro = data.userIntro
        this.referRate = this.calculateRate(this.intro.finishedRefers, this.intro.totalRefers)
        this.resumeRate = this.calculateRate(this.intro.finishedResumes, this.intro.totalResumes)
      } catch (error) {
        this.$message.error(error.message)
      }
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
