<template>
    <div class="intro">
        <div class="avatar">
            <el-avatar :src="intro.avatarUrl" :size="50"/>
            <p class="name">{{intro.name}}</p>
        </div>
        <div class="analysis">
            <div class="refer">
                <p class="number">{{intro.finishedRefers}} / {{intro.totalRefers}}</p>
                <p class="description">已申请的内推</p>
                <p class="rate">{{referRate}}%</p>
            </div>
            <div class="resume">
                <p class="number">{{intro.finishedResumes}} / {{intro.totalResumes}}</p>
                <p class="description">要处理的简历</p>
                <p class="rate">{{resumeRate}}%</p>
            </div>
        </div>
        <div class="function">
            <router-link to="/refer" tag="div">
                <el-button class="button" type="success" :round="true">查看内推状态</el-button>
            </router-link>
            <router-link to="/job" tag="div">
                <el-button class="button" type="primary" :round="true">发布内推职位</el-button>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import UserService from "@/services/UserService"
  import {Component} from 'vue-property-decorator'

  @Component
  export default class Intro extends Vue {
    intro: TIntro = {
      avatarUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      name: "",
      finishedRefers: 0,
      totalRefers: 0,
      finishedResumes: 0,
      totalResumes: 0,
    }
    referRate = "0"
    resumeRate = "0"

    mounted() {
      this.loadIntro()
    }

    async loadIntro() {
      try {
        const {data} = await UserService.getIntro("1")

        if (!data.success) return this.$message.error(data.message)

        this.intro = data.content
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
