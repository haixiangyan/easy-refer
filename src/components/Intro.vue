<template>
    <div class="intro">
        <div class="avatar">
            <el-avatar src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" :size="50"/>
            <p>Haixiang</p>
        </div>
        <div>
            <el-select v-model="selectType" placeholder="查看" size="small" class="selection">
                <el-option label="已申请的内推" value="refer"></el-option>
                <el-option label="待处理的简历" value="resume"></el-option>
            </el-select>
        </div>
        <div class="analysis">
            analysis
        </div>
        <div class="data">
            <p>
                <el-link type="danger" icon="el-icon-view">
                    处理10份简历
                </el-link>
            </p>

            <p>
                <el-link type="warning" icon="el-icon-view">
                    查看10份内推进度
                </el-link>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"

  @Component
  export default class Intro extends Vue {
    selectType = "refer"
  }
</script>

<style scoped lang="scss">
    .intro {
        padding: 0 24px 0 12px;

        .avatar {
            text-align: center;
        }

        .selection {
            width: 100%;
        }

        .avatar > img {
            width: 100px;
            height: 100px;
        }
    }
</style>
