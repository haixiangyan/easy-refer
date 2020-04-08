<template>
    <div class="intro">
        <div class="avatar">
            <nuxt-link to="/user">
                <el-avatar :src="user.avatarUrl" :size="100"/>
            </nuxt-link>
            <nuxt-link to="/user" tag="p">
                <el-link class="name">{{user.name}}</el-link>
            </nuxt-link>
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
            <nuxt-link to="/my/refer-list" tag="div">
                <el-button class="button" type="success" :round="true" icon="el-icon-view">
                   查看内推状态
                </el-button>
            </nuxt-link>
            <nuxt-link :to="user.jobId ? `/job/edit` : '/job/add'" tag="div">
                <el-button class="button"
                           type="primary"
                           :icon="user.jobId ? 'el-icon-edit' : 'el-icon-plus'"
                           :round="true">
                    {{user.jobId ? '修改' : '发布'}}内推职位
                </el-button>
            </nuxt-link>
        </div>
        <div v-if="user.jobId !== ''" class="link">
            <el-tooltip effect="dark" :content="`/refer/apply/${user.jobId}`" placement="bottom">
                <nuxt-link :to="`/apply-refer/${user.jobId}`" >
                    <el-link type="primary">我的内推Link</el-link>
                </nuxt-link>
            </el-tooltip>
            <el-tooltip effect="dark" :content="copyText" placement="bottom">
                <i class="el-icon-document-copy copy-icon"
                   :data-clipboard-text="`/apply-refer/${user.jobId}`"/>
            </el-tooltip>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "nuxt-property-decorator"
  import {USER_MODULE} from '~/store/user'
  import Clipboard from 'clipboard/src/clipboard'

  @Component
  export default class Intro extends Vue {
    @USER_MODULE.State('details') user!: TUser

    copyText = '复制Link'

    get referRate() {
      return this.calculateRate(this.user.finishedRefers, this.user.totalRefers)
    }
    get approvedRate() {
      return this.calculateRate(this.user.finishedResumes, this.user.totalResumes)
    }

    mounted() {
      this.initClipboard()
    }

    initClipboard() {
      const clipboard = new Clipboard('.copy-icon')
      clipboard.on('success', () => {
        this.copyText = '已复制'
      })
    }

    calculateRate(current: number, total: number): string {
      return total === 0 ? "0" : (current / total * 100).toFixed(2)
    }
  }
</script>

<style scoped lang="scss">
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

        .link {
            padding: 0 24px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            .copy-icon {
                margin-left: 8px;
                cursor: pointer;
            }
        }
    }
</style>
