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
            <el-menu-item :disabled="$auth.loggedIn && jobId === ''" index="/other/refer-list">
                <i class="el-icon-s-cooperation"></i>
                <span slot="title">处理内推</span>
            </el-menu-item>
        </el-menu>
        <nuxt-link :to="$auth.loggedIn ? '/user' : '/login'" tag="span">
            <el-link icon="el-icon-user">
                {{$auth.loggedIn ? '我' : '登录'}}
            </el-link>
        </nuxt-link>
    </nav>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'nuxt-property-decorator'
  import {USER_MODULE} from '~/store/user'

  @Component
  export default class extends Vue {
    @USER_MODULE.State(state => state.details.jobId) jobId!: string
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
    }
</style>
