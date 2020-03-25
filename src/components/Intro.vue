<template>
    <div class="intro">
        <div class="avatar">
            <el-avatar src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" :size="50"/>
            <p class="name">xxxxxx</p>
        </div>
        <div class="analysis">
            <div class="refer">
                <p class="number">11 / 222</p>
                <p class="description">已申请的内推</p>
            </div>
            <div class="resume">
                <p class="number">22 / 3333</p>
                <p class="description">要处理的简历</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"

  @Component
  export default class Intro extends Vue {
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
                }
                .description {
                    font-size: .8em;
                }
            }
            .refer {
                border-right: 1px solid $border-color;
                .number {
                    color: #E6A23C;
                }
            }
        }

        .check {
            margin-top: 20px;
        }
    }
</style>
