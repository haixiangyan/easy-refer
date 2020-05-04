<template>
    <nav>
        <el-menu
            :default-active="$route.path"
            style="border-bottom: none"
            mode="horizontal"
            :router="true"
            class="menu">
            <el-menu-item class="logo-menu-item" index="/">
                <img src="@/assets/img/logo.png" alt="logo">
            </el-menu-item>
            <el-menu-item index="/job/list">
                <i class="el-icon-s-home"></i>
                <span slot="title">内推广场</span>
            </el-menu-item>
            <el-menu-item index="/my/refer-list">
                <i class="el-icon-s-order"></i>
                <span slot="title">内推进度</span>
            </el-menu-item>
            <el-menu-item index="/other/refer-list">
                <i class="el-icon-s-cooperation"></i>
                <span slot="title">处理内推</span>
            </el-menu-item>
        </el-menu>

        <el-dropdown v-if="$auth.loggedIn" @command="onCommand">
            <span class="user-drop">
                我<i class="el-icon-arrow-down el-icon--right"/>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="/user">个人信息</el-dropdown-item>
                <el-dropdown-item v-if="!jobId" command="/job/add">发布内推职位</el-dropdown-item>
                <el-dropdown-item v-if="jobId" command="/job/edit">修改内推职位</el-dropdown-item>
                <el-dropdown-item v-if="jobId" :command="`/refer/edit/${jobId}`">我的内推职位</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <nuxt-link v-else to="/login" tag="span">
            <el-link icon="el-icon-user">登录</el-link>
        </nuxt-link>
    </nav>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'nuxt-property-decorator'

  @Component
  export default class extends Vue {
    get jobId() {
      return this.$auth.user.job.jobId
    }

    onCommand(command: string) {
      console.log(command)
      this.$router.push(command)
    }
  }
</script>

<style scoped lang="scss">
    nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: fixed;
        top: 0;
        left: 50%;
        width: 1100px;
        border-bottom: 1px solid $border-color;
        transform: translateX(-50%);
        z-index: 1500;
        background: white;

        .menu {
            border-bottom: none;

            .logo-menu-item {
                text-align: center;

                > img {
                    width: 4em;
                    height: 4em;
                }
            }
        }
        .user-drop {
            cursor: pointer;
        }
    }
</style>
